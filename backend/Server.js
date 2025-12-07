require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./db");
const carRoutes = require("./routes/carRoutes");
const authRoutes = require("./routes/authRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const locationRoutes = require("./routes/locationRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
const logRoutes = require("./routes/logRoutes");


const app = express();
app.use(cors());
app.use(express.json());

// connect to mongo
connectDB();

//middleware
app.use(express.json());

// routes
app.use("/api/auth", authRoutes);
app.use("/api/cars", carRoutes);
app.use("/api/booking", bookingRoutes);
app.use("/api/locations", locationRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/logs", logRoutes);





const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
