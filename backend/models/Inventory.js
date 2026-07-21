const mongoose = require("mongoose");

const inventorySchema = new mongoose.Schema(
    {
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
            required: true,
        },

        currentStock: {
            type: Number,
            required: true,
            default: 0,
        },

        minimumStock: {
            type: Number,
            default: 10,
        },

        lastUpdated: {
            type: Date,
            default: Date.now,
        },

        updatedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
    },
    {
        timestamps: true,
    }
);


module.exports = mongoose.model("Inventory", inventorySchema);