const express = require("express");
const router = express.Router();

const userController = require("../controllers/userControllers");
const authToken = require("../middleware/authToken");

// http://localhost:5050/users/.....
router.post("/register", userController.createUser);
router.post("/login", userController.login);
router.get("/logout", userController.logout);
router.get("/user-details", authToken, userController.userDetails);
// admin panel
router.get("/all-users", userController.allUsers);
router.post("/update-user", authToken, userController.updateUser);

module.exports = router;