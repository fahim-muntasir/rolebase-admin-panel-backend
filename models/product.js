const mongoose = require("mongoose");

const ProductSchema = mongoose.Schema({
  productId: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
    default: null,
  },
  creator: {
    type: mongoose.Types.ObjectId,
    ref: "user",
  },
  status: {
    type: String,
    enum: ["pending", "active", "cancel"],
    default: "pending",
  },
});

module.exports = mongoose.model("product", ProductSchema);
