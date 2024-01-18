const Controllers = require("../Controllers/WorkItemController");

const express = require("express");
const router = express.Router();

// User
router.post("/addworkitem", Controllers.workitemAddController);

router.get("/allworkitem", Controllers.workitemAllController);
router.put("/updateworkitem/:id", Controllers.workitemUpdateController);
router.delete("/deleteworkitem/:id", Controllers.workitemDeleteController);
router.get("/getoneworkitem/:id", Controllers.workitemOneController);


router.post("/testing", Controllers.testingController);

// Analytics

module.exports = router;
