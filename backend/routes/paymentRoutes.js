const express = require("express");
const Razorpay = require("razorpay");
const { v4: uuidv4 } = require("uuid");
const dotenv = require("dotenv");

dotenv.config();

const router = express.Router();

const razorpay = new Razorpay({
  key_id: "rzp_test_VYAsBhGCqP0lu4",
  key_secret: "wirb7JUTwfD3Bq6gUr8LkQGA",
});

// router.post("/create-order", async (req, res) => {
//   const { amount } = req.body;
//   const payment_capture = 1;
//   const currency = "INR";

//   // Convert amount to paisa (integer)
//   const parsedAmount = parseFloat(amount) * 100;

//   if (isNaN(parsedAmount) || parsedAmount <= 0) {
//     return res.status(400).json({ error: "Invalid amount provided" });
//   }

//   const options = {
//     amount: Math.round(parsedAmount), // ensure amount is an integer
//     currency,
//     receipt: uuidv4(),
//     payment_capture,
//   };

//   console.log("Request Options:", options); // Log request options

//   try {
//     const response = await razorpay.orders.create(options);

//     console.log("Razorpay Response:", response); // Log Razorpay response

//     res.json({
//       id: response.id,
//       currency: response.currency,
//       amount: response.amount / 100, // return amount in rupees
//     });
//   } catch (error) {
//     console.error(
//       "Error creating Razorpay order:",
//       error.response ? error.response.data : error.message
//     );
//     res.status(500).send({
//       message: "Failed to create Razorpay order",
//       error: error.response ? error.response.data : error.message,
//     });
//   }
// });
// paymentRoutes.js
// paymentRoutes.js
router.post("/create-order", async (req, res) => {
  const { amount } = req.body;
  const payment_capture = 1;
  const currency = "INR";

  // Convert amount to paisa (integer)
  const parsedAmount = parseFloat(amount) * 100;

  if (isNaN(parsedAmount) || parsedAmount <= 0) {
    return res.status(400).json({ error: "Invalid amount provided" });
  }

  const options = {
    amount: Math.round(parsedAmount),
    currency,
    receipt: uuidv4(),
    payment_capture,
  };

  try {
    const response = await razorpay.orders.create(options);
    res.json({
      id: response.id,
      currency: response.currency,
      amount: response.amount, // Ensure amount is included
    });
  } catch (error) {
    console.error(
      "Error creating Razorpay order:",
      error.response ? error.response.data : error.message
    );
    res.status(500).send({
      message: "Failed to create Razorpay order",
      error: error.response ? error.response.data : error.message,
    });
  }
});

module.exports = router;
