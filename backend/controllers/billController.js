const Bill = require("../models/Bill");
const Inventory = require("../models/Inventory");
const createBill = async (req, res) => {

    try {
        const ownerId =
    req.user.role === "admin"
        ? req.user.id
        : req.user.ownerId;

        const { customerName, items } = req.body;

        if (!customerName || !items || items.length === 0) {
            return res.status(400).json({
                success: false,
                message: "Customer name and items are required"
            });
        }

       const lastBill = await Bill.findOne({
    createdBy: ownerId
}).sort({ createdAt: -1 });

let invoiceNumber = "INV-000001";

if (lastBill && lastBill.invoiceNumber) {

    const lastNumber = parseInt(
        lastBill.invoiceNumber.split("-")[1]
    );

    invoiceNumber =
        "INV-" +
        String(lastNumber + 1).padStart(6, "0");

}
      
        let totalAmount = 0;

        items.forEach(item => {
            totalAmount += item.price * item.quantity;
        });

        // Check stock and update inventory
for (const item of items) {

    const inventory = await Inventory.findOne({
    product: item.product,
    updatedBy: ownerId,
});

    if (!inventory) {
        return res.status(404).json({
            success: false,
            message: "Inventory not found for product",
        });
    }

    if (inventory.currentStock < item.quantity) {
        return res.status(400).json({
            success: false,
            message: `Only ${inventory.currentStock} item(s) available in stock.`,
        });
    }

    inventory.currentStock -= item.quantity;
    inventory.lastUpdated = Date.now();

    await inventory.save();
}

       const bill = await Bill.create({

    invoiceNumber,

    customerName,

    items,

    totalAmount,

    createdBy:ownerId

});

        res.status(201).json({
            success: true,
            message: "Bill created successfully",
            bill
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: "Server Error"
        });

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