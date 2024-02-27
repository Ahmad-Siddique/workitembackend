const generalItemsModel = require("../Models/GeneralItems");

const asyncHandler = require("express-async-handler");

const generalItemsAddController = asyncHandler(async (req, res) => {
  console.log("Add generalItems accepted");
  const { code, name, specs, unit, rate } = req.body;
  console.log(req.body);
  const userfound = await generalItemsModel.findOne({ code });
  if (userfound) {
    res.status(400);
    throw new Error("generalItems ALREADY EXIST");
  }
  console.log("ggwp");
  const generalItemscreate = await generalItemsModel.create({
    code,
    name,
    specs,
    unit,
    rate,
  });

  if (generalItemscreate) {
    return res.json({
      _id: generalItemscreate._id,
      code: generalItemscreate.code,
      email: generalItemscreate.email,
      specs: generalItemscreate.specs,
      unit: generalItemscreate.unit,
      rate: generalItemscreate.rate,
    });
  } else {
    throw new Error("generalItems Not Created");
  }
});

const generalItemsAllController = asyncHandler(async (req, res) => {
  console.log("Get Req accepted");
  const generalItemss = await generalItemsModel.find();
  console.log(generalItemss);
  if (generalItemss) {
    res.json(generalItemss);
  } else {
    res.status(400);
    throw new Error("No generalItemss Available");
  }
});

const generalItemsOneController = asyncHandler(async (req, res) => {
  const id = req.params.id;
  console.log("Get Req accepted");
  const generalItems = await generalItemsModel.findById(id);
  console.log(generalItems);
  if (generalItems) {
    res.json(generalItems);
  } else {
    res.status(400);
    throw new Error("No generalItemss Available");
  }
});

const generalItemsDeleteController = asyncHandler(async (req, res) => {
  console.log("Req accepted");
  const id = req.params.id;
  console.log(req.body);
  const generalItems = await generalItemsModel.findById(id);
  console.log(generalItems);
  if (generalItems) {
    await generalItems.remove();
    res.json({ message: "generalItems has been removed" });
  } else {
    throw new Error("Error Occured. generalItems Not deleted");
  }
});

const generalItemsUpdateController = asyncHandler(async (req, res) => {
  console.log("Req accepted");
  const { code, name, specs, unit, rate } = req.body;
  const id = req.params.id;
  console.log(req.body);
  const generalItems = await generalItemsModel.findById(id);
  console.log(generalItems);
  if (generalItems) {
    generalItems.name = name;
    generalItems.code = code;
    generalItems.specs = specs;
    generalItems.unit = unit;
    generalItems.rate = rate;

    const updatedgeneralItems = await generalItems.save();
    res.json(updatedgeneralItems);
  } else {
    res.status(400);
    throw new Error("Update Not Done");
  }
});

module.exports = {
  generalItemsAddController,

  generalItemsAllController,
  generalItemsUpdateController,
  generalItemsDeleteController,
  generalItemsOneController,
};
