import Order from '../models/Order.js';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from "url";

// 🔹 Recreate __dirname for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const orderController = {
  createOrder: async (req, res, next) => {
    try {
      const { customerName, email, contactNumber, shippingAddress, productName, quantity } = req.body;
      let productImageUrl = null;

      if (req.file) {
        // store relative path
        productImageUrl = `/uploads/${req.file.filename}`;
      }

      const order = await Order.create({
        customerName,
        email,
        contactNumber,
        shippingAddress,
        productName,
        quantity,
        productImageUrl,
      });

      if (req.io) req.io.emit('newOrder', order);

      res.status(201).json({ message: 'Order placed', order });
    } catch (err) {
      next(err);
    }
  },

  getAllOrders: async (req, res, next) => {
    try {
      const { productName, fromDate, toDate } = req.query;
      const filter = {};

      if (productName) filter.productName = new RegExp(productName, 'i');
      if (fromDate || toDate) {
        filter.createdAt = {};
        if (fromDate) filter.createdAt.$gte = new Date(fromDate);
        if (toDate) filter.createdAt.$lte = new Date(toDate);
      }

      const orders = await Order.find(filter).sort({ createdAt: -1 });
      res.json({ orders });
    } catch (err) {
      next(err);
    }
  },

  getOrder: async (req, res, next) => {
    try {
      const order = await Order.findById(req.params.id);
      if (!order) return res.status(404).json({ message: 'Order not found' });
      res.json({ order });
    } catch (err) {
      next(err);
    }
  },

  updateQuantity: async (req, res, next) => {
    try {
      const { quantity } = req.body;
      if (!Number.isInteger(quantity) || quantity < 1 || quantity > 100) {
        return res.status(400).json({ message: 'Invalid quantity' });
      }

      const order = await Order.findByIdAndUpdate(req.params.id, { quantity }, { new: true });
      if (!order) return res.status(404).json({ message: 'Order not found' });

      if (req.io) req.io.emit('updateOrder', order);

      res.json({ message: 'Quantity updated', order });
    } catch (err) {
      next(err);
    }
  },

  deleteOrder: async (req, res, next) => {
    try {
      const order = await Order.findByIdAndDelete(req.params.id);
      if (!order) return res.status(404).json({ message: "Order not found" });

      if (order.productImageUrl) {
        // convert "/uploads/xxxx.png" → "uploads/xxxx.png"
        const relativePath = order.productImageUrl.replace(/^\/+/, "");
        const filePath = path.join(__dirname, "..", relativePath);

        fs.unlink(filePath, (err) => {
          if (err) console.error("⚠️ Failed to delete image:", err.message);
        });
      }

      if (req.io) req.io.emit("deleteOrder", { id: req.params.id });

      res.json({ message: "Order deleted" });
    } catch (err) {
      next(err);
    }
  }
};

export default orderController;
