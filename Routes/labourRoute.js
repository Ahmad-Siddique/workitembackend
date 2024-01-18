const Controllers = require("../Controllers/LabourController");

const express = require("express");
const router = express.Router();

// User
router.post("/addlabour", Controllers.labourAddController);

router.get("/alllabour", Controllers.labourAllController);
router.put("/updatelabour/:id", Controllers.labourUpdateController);
router.delete("/deletelabour/:id", Controllers.labourDeleteController);
router.get("/getonelabour/:id", Controllers.labourOneController);

// Analytics

module.exports = router;
