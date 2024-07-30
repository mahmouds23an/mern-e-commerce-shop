const express = require("express");
// const mongoose = require("mongoose");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const cookieParse = require("cookie-parser");

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
    allowedHeaders: ["content-type"],
  })
);
app.use(cookieParse());

mongoose
  .connect(process.env.MONGO_CONNECTION_STRING)
  .then(() => console.log("Connected successfully to mongodb..."));

// Routes
const userRoutes = require("./routes/userRoutes");
app.use("/users", userRoutes);

const productRoutes = require("./routes/productRoutes");
app.use("/products", productRoutes);

const cartRoutes = require("./routes/cartRoutes");
app.use("/carts", cartRoutes);

const paymentRoutes = require("./routes/paymentRoutes");
app.use("/payments", paymentRoutes);

app.listen(6001, () => {
  console.log("API working...");
});
