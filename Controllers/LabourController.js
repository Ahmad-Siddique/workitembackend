const labourModel = require("../Models/LabourModel");

const asyncHandler = require("express-async-handler");

const labourAddController = asyncHandler(async (req, res) => {
  console.log("Add labour accepted");
  const { code, name, specs, unit, rate } = req.body;
  console.log(req.body);
  const userfound = await labourModel.findOne({ code });
  if (userfound) {
    res.status(400);
    throw new Error("labour ALREADY EXIST");
  }
  console.log("ggwp");
  const labourcreate = await labourModel.create({
    code,
    name,
    specs,
    unit,
    rate,
  });

  if (labourcreate) {
    return res.json({
      _id: labourcreate._id,
      code: labourcreate.code,
      email: labourcreate.email,
      specs: labourcreate.specs,
      unit: labourcreate.unit,
      rate: labourcreate.rate,
    });
  } else {
    throw new Error("labour Not Created");
  }
});

const labourAllController = asyncHandler(async (req, res) => {
  console.log("Get Req accepted");
  const labours = await labourModel.find();
  console.log(labours);
  if (labours) {
    res.json(labours);
  } else {
    res.status(400);
    throw new Error("No labours Available");
  }
});

const labourOneController = asyncHandler(async (req, res) => {
  const id = req.params.id;
  console.log("Get Req accepted");
  const labour = await labourModel.findById(id);
  console.log(labour);
  if (labour) {
    res.json(labour);
  } else {
    res.status(400);
    throw new Error("No labours Available");
  }
});

const labourDeleteController = asyncHandler(async (req, res) => {
  console.log("Req accepted");
  const id = req.params.id;
  console.log(req.body);
  const labour = await labourModel.findById(id);
  console.log(labour);
  if (labour) {
    await labour.remove();
    res.json({ message: "labour has been removed" });
  } else {
    throw new Error("Error Occured. labour Not deleted");
  }
});

const labourUpdateController = asyncHandler(async (req, res) => {
  console.log("Req accepted");
  const { code, name, specs, unit, rate } = req.body;
  const id = req.params.id;
  console.log(req.body);
  const labour = await labourModel.findById(id);
  console.log(labour);
  if (labour) {
    labour.name = name;
    labour.code = code;
    labour.specs = specs;
    labour.unit = unit;
    labour.rate = rate;

    const updatedlabour = await labour.save();
    res.json(updatedlabour);
  } else {
    res.status(400);
    throw new Error("Update Not Done");
  }
});

module.exports = {
  labourAddController,

  labourAllController,
  labourUpdateController,
  labourDeleteController,
  labourOneController,
};
