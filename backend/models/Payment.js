const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
  booking_id: { type: mongoose.Schema.Types.ObjectId, ref: "Booking", required: true },
  amount_paid: { type: Number, required: true },
  payment_status: { type: String, enum: ["pending", "paid", "failed"], default: "pending" },
  payment_date: { type: Date, default: Date.now },
  created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Payment", paymentSchema);
