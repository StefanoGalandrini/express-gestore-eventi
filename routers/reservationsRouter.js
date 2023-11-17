const express = require("express");
const router = express.Router();
const reservationsController = require("../controllers/reservationsController");

router.get("/events/:event/reservations", reservationsController.index);
router.post("/events/:event/reservations", reservationsController.store);
router.delete("/events/:event/reservations/:reservation", reservationsController.destroy);

module.exports = router;
