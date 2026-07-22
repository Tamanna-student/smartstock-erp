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
                     min:1
                },

                price: {
                    type: Number,
                    required: true,
                    min:0
                },
            },
        ],

        totalAmount: {
            type: Number,
            required: true,
            min:0
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