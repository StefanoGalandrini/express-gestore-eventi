
// Required packages and modules
const express = require("express");
const router = express.Router();
const eventsController = require("../controllers/eventsController");

// route for method Index
router.get("/", eventsController.index);

// route for method Show
router.get("/:id", eventsController.show);

// route for method Store
router.post("/", eventsController.store);

// route for method Update
router.put("/:id", eventsController.update);



module.exports = router;
