const Product = require("../models/Product");
const Inventory = require("../models/Inventory");

// Get All Products
const getProducts = async (req, res) => {

    try {

        const ownerId =
    req.user.role === "admin"
        ? req.user.id
        : req.user.ownerId;

        const products = await Product.find({
            createdBy:  ownerId
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
// Update Product
const updateProduct = async (req, res) => {

    try {
        const ownerId =
    req.user.role === "admin"
        ? req.user.id
        : req.user.ownerId;

        const product = await Product.findOne({
            _id: req.params.id,
            createdBy:  ownerId
        });


        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found",
            });
        }


        const updatedProduct = await Product.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
        new: true,
        runValidators: true,
    }
);


        res.status(200).json({
            success: true,
            message: "Product updated successfully",
            product: updatedProduct,
        });


    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: "Server Error",
        });
    }
};
// Delete Product
const deleteProduct = async (req, res) => {

    try {
        const ownerId =
    req.user.role === "admin"
        ? req.user.id
        : req.user.ownerId;

        const product = await Product.findOne({
            _id: req.params.id,
            createdBy:  ownerId
        });


        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found",
            });
        }


        await product.deleteOne();

        await Inventory.findOneAndDelete({
    product: req.params.id,
});

        res.status(200).json({
            success: true,
            message: "Product deleted successfully",
        });


    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: "Server Error",
        });
    }
};
// Add Product
const addProduct = async (req, res) => {
    try {
        const ownerId =
    req.user.role === "admin"
        ? req.user.id
        : req.user.ownerId;

        const {
            productName,
            category,
            price,
            unit,
            description
        } = req.body;


        if (!productName || !category || !price) {
            return res.status(400).json({
                success: false,
                message: "Please fill all required fields",
            });
        }


        const product = await Product.create({
            productName,
            category,
            price,
            unit,
            description,
            createdBy: ownerId,
        });

        await Inventory.create({
    product: product._id,
    currentStock: 0,
    minimumStock: 10,
    updatedBy:  ownerId ,
});


        res.status(201).json({
            success: true,
            message: "Product added successfully",
            product,
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
    addProduct,
    getProducts,
    updateProduct,
    deleteProduct,
};