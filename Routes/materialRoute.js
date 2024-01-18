const Controllers = require("../Controllers/MaterialController");

const express = require("express");
const router = express.Router();

// User
router.post("/addmaterial", Controllers.materialAddController);

router.get("/allmaterial", Controllers.materialAllController);
router.put("/updatematerial/:id", Controllers.materialUpdateController);
router.delete("/deletematerial/:id", Controllers.materialDeleteController);
router.get("/getonematerial/:id", Controllers.materialOneController);

// Analytics

module.exports = router;
