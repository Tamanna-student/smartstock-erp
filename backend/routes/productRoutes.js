const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
    addProduct,
    getProducts,
    updateProduct,
    deleteProduct
} = require("../controllers/productController");


router.post(
    "/",
    protect,
    addProduct
);

router.get(
    "/",
    protect,
    getProducts
);

router.put(
    "/:id",
    protect,
    updateProduct
);

router.delete(
    "/:id",
    protect,
    deleteProduct
);


module.exports = router;