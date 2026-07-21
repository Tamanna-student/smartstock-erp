const Product = require("../models/Product");
const Inventory = require("../models/Inventory");
const Bill = require("../models/Bill");

const getDashboardSummary = async (req, res) => {

    try {
//totalProducts
        const totalProducts = await Product.countDocuments({
    createdBy: req.user.id,
});
//totalBills
const totalBills = await Bill.countDocuments({
    createdBy: req.user.id,
});
//lowStockItems
const lowStockItems = await Inventory.countDocuments({
    updatedBy: req.user.id,
    $expr: {
        $lte: ["$currentStock", "$minimumStock"],
    },
});
//Total Stock Value
const inventory = await Inventory.find({
    updatedBy: req.user.id,
}).populate("product", "price");

let totalStockValue = 0;

inventory.forEach((item) => {
    totalStockValue += item.currentStock * item.product.price;
});

//Today's Revenue   
const today = new Date();

today.setHours(0, 0, 0, 0);

const todayBills = await Bill.find({
    createdBy: req.user.id,
    createdAt: {
        $gte: today,
    },
});

let todayRevenue = 0;

todayBills.forEach((bill) => {
    todayRevenue += bill.totalAmount;
});

//Monthly Revenue
const firstDayOfMonth = new Date(
    today.getFullYear(),
    today.getMonth(),
    1
);

const monthlyBills = await Bill.find({
    createdBy: req.user.id,
    createdAt: {
        $gte: firstDayOfMonth,
    },
});

let monthlyRevenue = 0;

monthlyBills.forEach((bill) => {
    monthlyRevenue += bill.totalAmount;
});

//Recent Bills
const recentBills = await Bill.find({
    createdBy: req.user.id,
})
.sort({ createdAt: -1 })
.limit(5)
.select("invoiceNumber customerName totalAmount createdAt");

//Top Selling Products
const topSellingProducts = await Bill.aggregate([

    {
        $match: {
            createdBy: req.user._id,
        },
    },

    {
        $unwind: "$items",
    },

    {
        $group: {
            _id: "$items.product",
            totalSold: {
                $sum: "$items.quantity",
            },
        },
    },

    {
        $sort: {
            totalSold: -1,
        },
    },

    {
        $limit: 5,
    },

    {
        $lookup: {
            from: "products",
            localField: "_id",
            foreignField: "_id",
            as: "product",
        },
    },

    {
        $unwind: "$product",
    },

    {
        $project: {
            _id: 0,
            productName: "$product.productName",
            category: "$product.category",
            totalSold: 1,
        },
    },

]);
//Monthly Sales graph
const monthlySalesData = await Bill.aggregate([

    {
        $match: {
            createdBy: req.user._id,
        },
    },

    {
        $group: {
            _id: {
                month: { $month: "$createdAt" },
                year: { $year: "$createdAt" },
            },
            revenue: {
                $sum: "$totalAmount",
            },
            totalBills: {
                $sum: 1,
            },
        },
    },

    {
        $sort: {
            "_id.year": 1,
            "_id.month": 1,
        },
    },

]);

return res.status(200).json({
    success: true,
    dashboard: {

    totalProducts,

    totalBills,

    lowStockItems,

    totalStockValue,

    todayRevenue,

    monthlyRevenue,

    recentBills,

    topSellingProducts,

    monthlySalesData,

},
});

    } catch (error) {

        console.log(error);

        res.status(500).json({
            success: false,
            message: "Server Error",
        });

    }

};

module.exports = {
    getDashboardSummary,
};