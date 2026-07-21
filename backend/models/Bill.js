const mongoose = require("mongoose");

const billSchema = new mongoose.Schema(
    {
        invoiceNumber: {
    type: String,
    unique: true,
    },
        customerName: {
            type: String,
            required: true,
            trim: true,
        },

        items: [
            {
                product: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Product",
                    required: true,
                },

                quantity: {
                    type: Number,
                    required: true,
                },

                price: {
                    type: Number,
                    required: true,
                },
            },
        ],

        totalAmount: {
            type: Number,
            required: true,
        },

        paymentStatus: {
            type: String,
            enum: ["Pending", "Paid"],
            default: "Paid",
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

module.exports = mongoose.model("Bill", billSchema);