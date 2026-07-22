const Bill = require("../models/Bill");
const Inventory = require("../models/Inventory");
const Product = require("../models/Product");

const getOwnerId = (req) =>
    req.user.role === "admin"
        ? req.user.id
        : req.user.ownerId;

        // Sales Report
const getSalesReport = async (req, res) => {

    try {

        const ownerId = getOwnerId(req);

        const bills = await Bill.find({
            createdBy: ownerId,
        })
        .populate("items.product", "productName category")
        .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            totalBills: bills.length,
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

// Revenue Report
const getRevenueReport = async (req, res) => {
    try {

        const ownerId = getOwnerId(req);

        const bills = await Bill.find({
            createdBy: ownerId,
        });

        let totalRevenue = 0;

        bills.forEach((bill) => {
            totalRevenue += bill.totalAmount;
        });

        res.status(200).json({
            success: true,
            totalBills: bills.length,
            totalRevenue,
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: "Server Error",
        });

    }
};
// Inventory Report
const getInventoryReport = async (req, res) => {
    try {

        const ownerId = getOwnerId(req);

        const inventory = await Inventory.find({
            updatedBy: ownerId,
        }).populate("product", "productName category price");

        res.status(200).json({
            success: true,
            totalProducts: inventory.length,
            inventory,
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: "Server Error",
        });

    }
};
// Search Products
const searchProducts = async (req, res) => {

    try {

        const ownerId = getOwnerId(req);
        const keyword = req.query.keyword || "";

        const products = await Product.find({
            createdBy: ownerId,
            productName: {
                $regex: keyword,
                $options: "i",
            },
        });

        res.status(200).json({
            success: true,
            count: products.length,
            products,
        });

    } catch (error) {

       console.error(error);

        res.status(500).json({
            success: false,
            message: "Server Error",
        });

    }

};
// Search Bills
const searchBills = async (req, res) => {

    try {

        const ownerId = getOwnerId(req);
        const keyword = req.query.keyword || "";

        const bills = await Bill.find({
            createdBy: ownerId,
            customerName: {
                $regex: keyword,
                $options: "i",
            },
        });

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
module.exports = {
    getSalesReport,
    getRevenueReport,
    getInventoryReport,
    searchProducts,
    searchBills,
};