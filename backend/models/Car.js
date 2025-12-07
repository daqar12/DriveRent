const mongoose = require("mongoose");

const carSchema = new mongoose.Schema({
  name: { type: String, required: true }, // Car name
  brand: { type: String, required: true }, // Brand
  model: { type: String, required: true }, // Model (e.g., X5 2023)
  year: { type: Number }, // Year of manufacture
  pricePerDay: { type: Number, required: true }, // Price per day
  seats: { type: Number, default: 5 }, // Number of seats
  fuelType: { type: String, default: "Petrol" }, // Fuel type
  transmission: { type: String, default: "Automatic" }, // Transmission type
  status: {
    type: String,
    enum: ["available", "rented", "maintenance"],
    default: "available",
  }, // Car status
  location: { type: String, default: "Unknown" }, // Car location
  rating: { type: Number, default: 0 }, // Car rating
  images: { type: [String], default: [] }, // Array of image URLs
  createdAt: { type: Date, default: Date.now }, // Created timestamp
});
module.exports = mongoose.model("Car", carSchema);
