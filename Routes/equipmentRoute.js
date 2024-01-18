const Controllers = require("../Controllers/EquipmentController");

const express = require("express");
const router = express.Router();

// User
router.post("/addequipment", Controllers.equipmentAddController);

router.get("/allequipment", Controllers.equipmentAllController);
router.put("/updateequipment/:id", Controllers.equipmentUpdateController);
router.delete("/deleteequipment/:id", Controllers.equipmentDeleteController);
router.get("/getoneequipment/:id", Controllers.equipmentOneController);

// Analytics

module.exports = router;
