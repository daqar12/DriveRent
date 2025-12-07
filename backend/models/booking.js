const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  car_id: { type: mongoose.Schema.Types.ObjectId, ref: "Car", required: true },
  start_date: { type: Date, required: true },
  end_date: { type: Date, required: true },
  pickup_location: { type: String, required: true },
  return_location: { type: String, required: true },
  total_price: { type: Number, required: true },
  status: { type: String, enum: ["pending", "approved", "cancelled"], default: "pending" },
  created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Booking", bookingSchema);
