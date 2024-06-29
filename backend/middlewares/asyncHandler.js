const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch((error) => {
    res.status(500).json({ message: error.message });
  });
};
//used to handle asynchronous operations in Express route handlers. It ensures that any errors occurring in asynchronous route handlers are properly caught and handled, preventing the need to use repetitive try-catch blocks in each route handler
module.exports = asyncHandler;
