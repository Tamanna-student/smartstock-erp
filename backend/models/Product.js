const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
    {
        productName: {
            type: String,
            required: [true, "Product name is required"],
            trim: true,
        },

        category: {
            type: String,
            required: [true, "Category is required"],
            trim: true,
        },

        price: {
    type: Number,
    required: true,
    min: 0,
},

        

        unit: {
            type: String,
            required: true,
            default: "piece",
        },

        description: {
            type: String,
            default: "",
        },

        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
    },
    {
        timestamps: true,
    }
);


module.exports = mongoose.model("Product", productSchema);