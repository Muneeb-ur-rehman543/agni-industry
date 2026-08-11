const express = require("express");
const router = express.Router();

const Order = require("../models/Order");

// ===============================
// PLACE NEW ORDER
// ===============================
router.post("/", async (req, res) => {
  try {
    const {
      customerName,
      email,
      phone,
      address,
      items,
      total,
    } = req.body;

    const order = new Order({
      customerName,
      email,
      phone,
      address,
      items,
      total,
    });

    const savedOrder = await order.save();

    res.status(201).json({
      success: true,
      message: "Order placed successfully",
      order: savedOrder,
    });
  } catch (error) {
    console.error("Order Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to place order",
    });
  }
});

// ===============================
// GET ALL ORDERS
// ===============================
router.get("/", async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      orders,
    });
  } catch (error) {
    console.error("Fetch Orders Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch orders",
    });
  }
});

// ===============================
// UPDATE ORDER STATUS
// ===============================
router.put("/:id/status", async (req, res) => {
  try {
    const { status } = req.body;

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Order status updated",
      order,
    });
  } catch (error) {
    console.error("Status Update Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to update order status",
    });
  }
});

// ===============================
// DELETE ORDER
// ===============================
router.delete("/:id", async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Order deleted successfully",
    });
  } catch (error) {
    console.error("Delete Order Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to delete order",
    });
  }
});

module.exports = router;