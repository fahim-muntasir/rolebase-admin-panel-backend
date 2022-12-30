const Product = require("../models/product");
const uniqId = require("uniqid");
const fs = require("fs");

const addProduct = async (req, res) => {
    const { title, description, price, category } = req.body;
    const productId = uniqId().toUpperCase();

    if (req.files.length > 0) {
        try {
            const createProduct = new Product({
                productId,
                title,
                description,
                price,
                category,
                avatar: req.files[0].filename,
                creator: req.data.id,
            });
            await createProduct.save();

            res.status(200).json({ msg: "Product create successfull." });
        } catch {
            res.status(500).json({
                errors: { msg: "Something is wrong on user create!" },
            });
        }
    } else {
        res.status(500).json({
            errors: { avatar: "Please upload a product image!" },
        });
    }
};

// GET SINGLE PRODUCT
const getProduct = async (req, res) => {
    const { productId } = req.params;
    try {
        const products = await Product.findById(productId)
            .populate("creator", "firstName lastName email role avatar")
            .select({
                __v: 0,
            });
        res.status(200).json(products);
    } catch (error) {
        console.log(error);
        res.status(500).json({ errors: { msg: "Product not found!" } });
    }
};

// GET PRODUCTS
const getProducts = async (req, res) => {
    try {
        const products = await Product.find()
            .populate("creator", "firstName lastName email role avatar")
            .select({
                __v: 0,
            });
        res.status(200).json(products);
    } catch (e) {
        console.log(e);
        res.status(500).json({ errors: { msg: "Product not found!" } });
    }
};

// GET PRODUCTS BY STATUS
const getProductsByStatus = async (req, res) => {
    const { status } = req.params;
    try {
        const users = await Product.find({ status: status })
            .populate("creator", "firstName lastName email role avatar")
            .select({
                __v: 0,
            });
        res.status(200).json(users);
    } catch {
        res.status(500).json({ errors: { msg: "Product not found!" } });
    }
};

// UPDATE PRODUCT
const updateProduct = async (req, res) => {
    const productId = req.params.id;

    if (req.body?.status) {
        if (req.data.role === "admin") {
            try {
                const updateProduct = await Product.updateOne(
                    { _id: productId },
                    { $set: { ...req.body } }
                );

                res.status(200).json({ success: true });
            } catch {
                res.status(500).json({
                    errors: {
                        msg: "Somthing is wrong Product is not updated!",
                    },
                });
            }
        } else {
            res.status(403).json({
                errors: { msg: "You are not allow for edit this!" },
            });
        }
    } else {
        if (req.data.role === "admin" || req.data.role === "worker") {
            try {
                const updateProduct = await Product.updateOne(
                    { _id: productId },
                    { $set: { ...req.body } }
                );

                res.status(200).json({ success: true });
            } catch {
                res.status(500).json({
                    errors: {
                        msg: "Somthing is wrong Product is not updated!",
                    },
                });
            }
        } else {
            res.status(403).json({
                errors: { msg: "You are not allow for edit this!" },
            });
        }
    }
};

const updateProductImg = async (req, res) => {
    const productId = req.params.id;
    console.log(productId);
    if (req.files.length > 0) {
        fs.unlinkSync(
            `${__dirname}/../public/uploads/productImages/${req.body.old_avatar}`
        );

        try {
            const updateProductImg = await Product.updateOne(
                { _id: productId },
                { $set: { avatar: req.files[0].filename } }
            );

            res.status(200).json({
                success: true,
                updated_avatar: req.files[0].filename,
            });
        } catch {
            res.status(500).json({
                errors: {
                    msg: "Somthing is wrong Product Img is not updated!",
                },
            });
        }
    }
};

module.exports = {
    addProduct,
    getProducts,
    getProductsByStatus,
    updateProduct,
    updateProductImg,
    getProduct,
};
