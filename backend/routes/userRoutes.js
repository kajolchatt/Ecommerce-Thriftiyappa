const express = require("express");
const router = express.Router();
const {
  createUser,
  loginUser,
  logoutCurrentUser,
  getAllUsers,
  getCurrentUserProfile,
  updateCurrentUserProfile,
  deleteUserById,
  getUserById,
  updateUserById,
} = require("../controllers/userController");
const {
  authenticate,
  authorizeAdmin,
} = require("../middlewares/authMiddleware");
router
  .route("/")
  .post(createUser)
  .get(authenticate, authorizeAdmin, getAllUsers);


router.post("/auth", loginUser);
router.post("/logout", logoutCurrentUser);

router
  .route("/profile")
  .get(authenticate, getCurrentUserProfile)
  .put(authenticate, updateCurrentUserProfile);
module.exports = router;

//ADMIN ROUTES
router
  .route("admin/userlist/:id")
  .delete(authenticate, authorizeAdmin, deleteUserById)
  .get(authenticate, authorizeAdmin, getUserById)
  .put(authenticate,authorizeAdmin,updateUserById)
