const jwt = require("jsonwebtoken");

const generateToken = (res, userId) => {
  try {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });

    //set JWT as an HTTP-Only Cookie-> Sets a cookie named 'jwt' in the response.
    res.cookie("jwt", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      sameSite: "strict",
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });
    return token;
  } catch (error) {
    console.error("Error generating JWT and setting cookie:", error);
    throw new Error("Failed to generate token and set cookie");
  }
};
module.exports = generateToken;
