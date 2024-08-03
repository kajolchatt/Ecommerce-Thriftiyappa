//packages
const path = require("path");
const express = require("express");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const userRoutes = require("./routes/userRoutes.js");
const categoryRoutes = require("./routes/categoryRoutes.js");
const productRoutes = require("./routes/productRoutes.js");
const uploadRoutes = require("./routes/uploadRoutes.js");
const orderRoutes = require("./routes/orderRoutes.js");
//utils
const connectDB = require("./config/db.js");
dotenv.config();
const port = process.env.PORT || 5000;
connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/api/users", userRoutes); //aage userRoutes ko mount krega
app.use("/api/category", categoryRoutes);
app.use("/api/products", productRoutes);
app.use("/api/uploads", uploadRoutes);
app.use("/api/orders", orderRoutes);

console.log(process.env.PAYPAL_CLIENT_ID)
app.get('/api/config/paypal',(req,res)=>{
    res.send({clientId:process.env.PAYPAL_CLIENT_ID})
})
// const __dirname = path.resolve();
console.log(__dirname);
app.use("/uploads", express.static(path.join(__dirname, "..", "uploads")));
console.log(__dirname);
app.listen(port, () => console.log(`Server running on port :${port}`));
