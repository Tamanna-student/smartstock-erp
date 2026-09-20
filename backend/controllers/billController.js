const Bill = require("../models/Bill");
const Inventory = require("../models/Inventory");
const Product = require("../models/Product");
const Counter = require("../models/Counter");
const mongoose = require("mongoose");
const createBill = async (req, res) => {
    const session = await mongoose.startSession();

    try {
        const ownerId =
            req.user.role === "admin"
                ? req.user.id
                : req.user.ownerId;

        const { customerName, items } = req.body;

        if (!customerName || !customerName.trim()) {
            return res.status(400).json({
                success: false,
                message: "Customer name is required",
            });
        }

        if (!Array.isArray(items) || items.length === 0) {
            return res.status(400).json({
                success: false,
                message: "At least one item is required",
            });
        }

        let createdBill;

        await session.withTransaction(async () => {

            // Generate invoice number
           // Generate invoice number using atomic counter
const counter = await Counter.findOneAndUpdate(
    { _id: "invoice" },
    { $inc: { seq: 1 } },
    {
        new: true,
        upsert: true,
        session,
    }
);

const invoiceNumber =
    "INV-" + String(counter.seq).padStart(6, "0");

            let totalAmount = 0;
            const verifiedItems = [];

            // Verify products, prices and stock
            for (const item of items) {

                if (
                    !item.product ||
                    !Number.isInteger(Number(item.quantity))
                ) {
                    throw new Error("Invalid product or quantity");
                }

                const quantity = Number(item.quantity);

                if (quantity < 1) {
                    throw new Error("Quantity must be at least 1");
                }

                // Get official product from database
                const product = await Product.findOne({
                    _id: item.product,
                    createdBy: ownerId,
                }).session(session);

                if (!product) {
                    throw new Error("Product not found");
                }

                // Get inventory
                const inventory = await Inventory.findOne({
                    product: product._id,
                    updatedBy: ownerId,
                }).session(session);

                if (!inventory) {
                    throw new Error(
                        `Inventory not found for ${product.productName}`
                    );
                }

                if (inventory.currentStock < quantity) {
                    throw new Error(
                        `Only ${inventory.currentStock} item(s) available in stock for ${product.productName}.`
                    );
                }

                // Use official database price
                const officialPrice = Number(product.price);
                const itemTotal = officialPrice * quantity;

                totalAmount += itemTotal;

                verifiedItems.push({
                    product: product._id,
                    quantity,
                    price: officialPrice,
                });

                // Deduct stock inside transaction
                inventory.currentStock -= quantity;
                inventory.lastUpdated = Date.now();

                await inventory.save({ session });
            }

            // Create bill inside same transaction
            const bill = new Bill({
                invoiceNumber,
                customerName: customerName.trim(),
                items: verifiedItems,
                totalAmount,
                createdBy: ownerId,
            });

            await bill.save({ session });

            createdBill = bill;
        });

        res.status(201).json({
            success: true,
            message: "Bill created successfully",
            bill: createdBill,
        });

    } catch (error) {

        console.error(error);

        res.status(400).json({
            success: false,
            message: error.message || "Unable to create bill",
        });

    } finally {
        await session.endSession();
    }
};
// Get All Bills
const getBills = async (req, res) => {

    try {
        const ownerId =
    req.user.role === "admin"
        ? req.user.id
        : req.user.ownerId;

        const bills = await Bill.find({
            createdBy: ownerId
        })
        .populate("items.product", "productName category price unit")
        .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: bills.length,
            bills,
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: "Server Error",
        });
    }

};
// Get Single Bill
const getBillById = async (req, res) => {

    try {
        const ownerId =
    req.user.role === "admin"
        ? req.user.id
        : req.user.ownerId;

        const bill = await Bill.findOne({
            _id: req.params.id,
            createdBy: ownerId,
        }).populate("items.product", "productName category price unit");

        if (!bill) {
            return res.status(404).json({
                success: false,
                message: "Bill not found",
            });
        }

        res.status(200).json({
            success: true,
            bill,
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: "Server Error",
        });

    }

};

module.exports = {
    createBill,
    getBills,
    getBillById,
};