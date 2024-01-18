const materialModel = require("../Models/MaterialModel");


const asyncHandler = require("express-async-handler");



const materialAddController = asyncHandler(async (req, res) => {
  console.log("Add Material accepted");
  const { code,name,specs,unit,rate } = req.body;
  console.log(req.body);
  const userfound = await materialModel.findOne({ code });
  if (userfound) {
    res.status(400);
    throw new Error("MATERIAL ALREADY EXIST");
  }
  console.log("ggwp");
  const materialcreate = await materialModel.create({
    code,
    name,
    specs,
    unit,
    rate,
  });

  if (materialcreate) {
    return res.json({
      _id: materialcreate._id,
      code: materialcreate.code,
      email: materialcreate.email,
      specs: materialcreate.specs,
      unit: materialcreate.unit,
      rate: materialcreate.rate,
    });
  } else {
    throw new Error("Material Not Created");
  }
});



const materialAllController = asyncHandler(async (req, res) => {
  console.log("Get Req accepted");
  const materials = await materialModel.find();
  console.log(materials);
  if (materials) {
    res.json(materials);
  } else {
    res.status(400);
    throw new Error("No materials Available");
  }
});

const materialOneController = asyncHandler(async (req, res) => {
  const id = req.params.id;
  console.log("Get Req accepted");
  const material = await materialModel.findById(id);
  console.log(material);
  if (material) {
    res.json(material);
  } else {
    res.status(400);
    throw new Error("No materials Available");
  }
});

const materialDeleteController = asyncHandler(async (req, res) => {
  console.log("Req accepted");
  const id = req.params.id;
  console.log(req.body);
  const material = await materialModel.findById(id);
  console.log(material);
  if (material) {
    await material.remove();
    res.json({ message: "material has been removed" });
  } else {
    throw new Error("Error Occured. material Not deleted");
  }
});

const materialUpdateController = asyncHandler(async (req, res) => {
  console.log("Req accepted");
  const { code, name, specs, unit, rate } = req.body;
  const id = req.params.id;
  console.log(req.body);
  const material = await materialModel.findById(id);
  console.log(material);
  if (material) {
    material.name = name;
    material.code = code;
    material.specs = specs;
      material.unit = unit;
      material.rate = rate;

    const updatedmaterial = await material.save();
    res.json(updatedmaterial);
  } else {
    res.status(400);
    throw new Error("Update Not Done");
  }
});

module.exports = {
  materialAddController,
 
  materialAllController,
  materialUpdateController,
  materialDeleteController,
  materialOneController,
};
