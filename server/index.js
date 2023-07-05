const express = require("express");
const mongoose = require("mongoose");
const app = express();


// Connect DB
mongoose.connect("mongodb://localhost:27017/product-monitoring-app").then(() => {
  console.log("DB Connected Successfully.");
});

// Middlewares
app.use(express.json()); // for parsing application/json
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.setHeader("Access-Control-Allow-Credentials", "true"); // credentials ayarı
  next();
});

const PORT = 3001;

app.use("/", (req, res) => {
    res.send("Hello World");
});

app.listen(PORT, () => {
    console.log("App Started on Port: ", PORT);
});