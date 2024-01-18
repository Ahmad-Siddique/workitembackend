const equipmentModel = require("../Models/EquipmentModel");

const asyncHandler = require("express-async-handler");

const equipmentAddController = asyncHandler(async (req, res) => {
  console.log("Add equipment accepted");
  const { code, name, specs, unit, rate } = req.body;
  console.log(req.body);
  const userfound = await equipmentModel.findOne({ code });
  if (userfound) {
    res.status(400);
    throw new Error("equipment ALREADY EXIST");
  }
  console.log("ggwp");
  const equipmentcreate = await equipmentModel.create({
    code,
    name,
    specs,
    unit,
    rate,
  });

  if (equipmentcreate) {
    return res.json({
      _id: equipmentcreate._id,
      code: equipmentcreate.code,
      email: equipmentcreate.email,
      specs: equipmentcreate.specs,
      unit: equipmentcreate.unit,
      rate: equipmentcreate.rate,
    });
  } else {
    throw new Error("equipment Not Created");
  }
});

const equipmentAllController = asyncHandler(async (req, res) => {
  console.log("Get Req accepted");
  const equipments = await equipmentModel.find();
  console.log(equipments);
  if (equipments) {
    res.json(equipments);
  } else {
    res.status(400);
    throw new Error("No equipments Available");
  }
});

const equipmentOneController = asyncHandler(async (req, res) => {
  const id = req.params.id;
  console.log("Get Req accepted");
  const equipment = await equipmentModel.findById(id);
  console.log(equipment);
  if (equipment) {
    res.json(equipment);
  } else {
    res.status(400);
    throw new Error("No equipments Available");
  }
});

const equipmentDeleteController = asyncHandler(async (req, res) => {
  console.log("Req accepted");
  const id = req.params.id;
  console.log(req.body);
  const equipment = await equipmentModel.findById(id);
  console.log(equipment);
  if (equipment) {
    await equipment.remove();
    res.json({ message: "equipment has been removed" });
  } else {
    throw new Error("Error Occured. equipment Not deleted");
  }
});

const equipmentUpdateController = asyncHandler(async (req, res) => {
  console.log("Req accepted");
  const { code, name, specs, unit, rate } = req.body;
  const id = req.params.id;
  console.log(req.body);
  const equipment = await equipmentModel.findById(id);
  console.log(equipment);
  if (equipment) {
    equipment.name = name;
    equipment.code = code;
    equipment.specs = specs;
    equipment.unit = unit;
    equipment.rate = rate;

    const updatedequipment = await equipment.save();
    res.json(updatedequipment);
  } else {
    res.status(400);
    throw new Error("Update Not Done");
  }
});

module.exports = {
  equipmentAddController,

  equipmentAllController,
  equipmentUpdateController,
  equipmentDeleteController,
  equipmentOneController,
};
