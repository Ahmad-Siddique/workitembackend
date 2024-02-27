const Controllers = require("../Controllers/GeneralItemsController");

const express = require("express");
const router = express.Router();

// User
router.post("/addgeneralitems", Controllers.generalItemsAddController);

router.get("/allgeneralitems", Controllers.generalItemsAllController);
router.put("/updategeneralitems/:id", Controllers.generalItemsUpdateController);
router.delete("/deletegeneralitems/:id", Controllers.generalItemsDeleteController);
router.get("/getonegeneralitems/:id", Controllers.generalItemsOneController);

// Analytics

module.exports = router;
