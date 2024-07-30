const express = require("express");
const router = express.Router();

const paymentController = require("../controllers/paymentControllers");
const authToken = require("../middleware/authToken");

// http://localhost:6001/payments/.....
router.post("/all-payments", authToken, paymentController.postPayments);
router.get("/get-payment", authToken, paymentController.getPayment);
router.get("/get-allPayment", paymentController.getAllPayments);
router.patch("/payment-status/:id", paymentController.confirmPaymentStatus);
router.delete("/delete-payment/:id", paymentController.deletePayment);

module.exports = router;
