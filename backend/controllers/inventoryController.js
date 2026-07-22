const Inventory = require("../models/Inventory");


// Update Inventory Stock
const updateStock = async (req, res) => {

    try {
        const ownerId =
    req.user.role === "admin"
        ? req.user.id
        : req.user.ownerId;

        const {
            productId,
            quantity,
            minimumStock
        } = req.body;


        if (!productId || quantity === undefined) {
            return res.status(400).json({
                success: false,
                message: "Product ID and quantity are required",
            });
        }


        let inventory = await Inventory.findOne({
            product: productId,
            updatedBy: ownerId
        });


       if (!inventory) {
    return res.status(404).json({
        success: false,
        message: "Inventory not found",
    });
}

inventory.currentStock = quantity;

if (minimumStock !== undefined) {
    inventory.minimumStock = minimumStock;
}

inventory.lastUpdated = Date.now();

await inventory.save();


        res.status(200).json({
            success: true,
            message: "Inventory updated successfully",
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
// Get Inventory
const getInventory = async (req, res) => {

    try {
        const ownerId =
    req.user.role === "admin"
        ? req.user.id
        : req.user.ownerId;

        const inventory = await Inventory.find({
            updatedBy: ownerId
        }).populate("product");


        res.status(200).json({
            success: true,
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

// Low Stock Products
const getLowStock = async (req, res) => {

    try {
        const ownerId =
    req.user.role === "admin"
        ? req.user.id
        : req.user.ownerId;

        const lowStockProducts = await Inventory.find({
            updatedBy: ownerId,
            $expr: {
                $lte: [
                    "$currentStock",
                    "$minimumStock"
                ]
            }
        }).populate("product");


        res.status(200).json({
            success: true,
            count: lowStockProducts.length,
            products: lowStockProducts,
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
    updateStock,
    getInventory,
    getLowStock,
};