//packages
const path = require("path");
const express = require("express");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const userRoutes = require("./routes/userRoutes.js");
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
app.listen(port, () => console.log(`Server running on port :${port}`));
