const workitemModel = require("../Models/WorkItemModel");

const asyncHandler = require("express-async-handler");

const workitemAddController = asyncHandler(async (req, res) => {
  console.log("Add workitem accepted");
  const { name, materials, labour, equipment } = req.body;
  console.log(req.body);
  // const userfound = await workitemModel.findOne({ code });
  // if (userfound) {
  //   res.status(400);
  //   throw new Error("workitem ALREADY EXIST");
  // }
  console.log("ggwp");
  const workitemcreate = await workitemModel.create({
    name,
    materials,
    labour,
    equipment,
  });

  if (workitemcreate) {
    return res.json({
      _id: workitemcreate._id,
      name: workitemcreate.name,
      materials: workitemcreate.materials,
      labour: workitemcreate.labour,
      equipment: workitemcreate.equipment,
     
    });
  } else {
    throw new Error("workitem Not Created");
  }
});

const workitemAllController = asyncHandler(async (req, res) => {
  console.log("Get Req accepted");
  const workitems = await workitemModel
    .find()
    .populate("materials.material")
    .populate("labour.labour")
    .populate("equipment.equipment");;
  console.log(workitems);
  if (workitems) {
    res.json(workitems);
  } else {
    res.status(400);
    throw new Error("No workitems Available");
  }
});

const workitemOneController = asyncHandler(async (req, res) => {
  const id = req.params.id;
  console.log("Get Req accepted");
  const workitem = await workitemModel
    .findById(id)
    .populate("materials.material")
    .populate("labour.labour")
    .populate("equipment.equipment");;
  // console.log(workitem);
  if (workitem) {
    res.json(workitem);
  } else {
    res.status(400);
    throw new Error("No workitems Available");
  }
});

const workitemDeleteController = asyncHandler(async (req, res) => {
  console.log("Req accepted");
  const id = req.params.id;
  console.log(req.body);
  const workitem = await workitemModel
    .findById(id)
    .populate("materials.material")
    .populate("labour.labour")
    .populate("equipment.equipment");;
  console.log(workitem);
  if (workitem) {
    await workitem.remove();
    res.json({ message: "workitem has been removed" });
  } else {
    throw new Error("Error Occured. workitem Not deleted");
  }
});

const workitemUpdateController = asyncHandler(async (req, res) => {
  console.log("Req accepted");
  const { name, materials, labour, equipment } = req.body;
  const id = req.params.id;
  console.log(req.body);
  const workitem = await workitemModel.findById(id);
  console.log(workitem);
  if (workitem) {
    workitem.name = name;
    workitem.materials = materials;
    workitem.labour = labour;
    workitem.equipment = equipment;
    

    const updatedworkitem = await workitem.save();
    res.json(updatedworkitem);
  } else {
    res.status(400);
    throw new Error("Update Not Done");
  }
});



const testingController = asyncHandler(async (req, res) => {
  // try {
  //   const { workItemId, quantity } = req.body; // Assuming you receive workItemId and quantity in the request body

  //   // Find the work item by its ID and populate the materials, equipment, and labor fields
  //   const workItem = await workitemModel
  //     .findById(workItemId)
  //     .populate("materials.material")
  //     .populate("labour.labour")
  //     .populate("equipment.equipment");

  //   if (!workItem) {
  //     return res.status(404).json({ message: "Work item not found" });
  //   }

  //   // Calculate quantities for each material, labor, and equipment item separately
  //   const materialQuantities = [];
  //   const laborQuantities = [];
  //   const equipmentQuantities = [];

  //   for (const material of workItem.materials) {
  //     const materialQuantity = material.quantity * quantity;
  //     const materialRate = material.rate * quantity;
  //     materialQuantities.push({
  //       material: material.material,
  //       quantity: materialQuantity,
  //       rate:materialRate
  //     });
  //   }

  //   for (const labor of workItem.labour) {
  //     const laborQuantity = labor.quantity * quantity;
  //     const laborRate = labor.rate * quantity;
  //     laborQuantities.push({ labor: labor.labor, quantity: laborQuantity });
  //   }

  //   for (const equipment of workItem.equipment) {
  //     const equipmentQuantity = equipment.quantity * quantity;
  //     equipmentQuantities.push({
  //       equipment: equipment.equipment,
  //       quantity: equipmentQuantity,
  //     });
  //   }

  //   // Construct the response object containing quantities for each category
  //   const quantities = {
  //     materials: materialQuantities,
  //     labor: laborQuantities,
  //     equipment: equipmentQuantities,
  //   };

  //   res.status(200).json(quantities);
  // } catch (error) {
  //   console.error(error);
  //   res.status(500).json({ message: "Server error" });
  // }










  try {
    // const { id } = req.params;
    const { quantity: inputQuantity, id } = req.body; // Quantity from request body
    console.log("JHEHEHEHEH")
    // Find the work item and populate the related fields
    const workItem = await workitemModel
      .findById(id)
      .populate("materials.material")
      .populate("labour.labour")
      .populate("equipment.equipment");

    if (!workItem) {
      return res.status(404).json({ message: "Work item not found" });
    }

    // Calculate totals
    let materialTotals = [],
      equipmentTotals = [],
      labourTotals = [];
    let grandTotal = 0;

    workItem.materials.forEach((item) => {
      const rate = parseFloat(item.material.rate); // Assuming 'rate' is stored as a string
      const total = item.quantity * rate * inputQuantity;
      materialTotals.push(total);
      grandTotal += total;
    });

    workItem.equipment.forEach((item) => {
      const rate = parseFloat(item.equipment.rate);
      const total = item.quantity * rate * inputQuantity;
      equipmentTotals.push(total);
      grandTotal += total;
    });

    workItem.labour.forEach((item) => {
      const rate = parseFloat(item.labour.rate);
      const total = item.quantity * rate * inputQuantity;
      labourTotals.push(total);
      grandTotal += total;
    });

    // Respond with the calculated totals
    res.json({
      materialTotals,
      equipmentTotals,
      labourTotals,
      grandTotal,
      workItem
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }

})

module.exports = {
  workitemAddController,

  workitemAllController,
  workitemUpdateController,
  workitemDeleteController,
  workitemOneController,
  testingController,
};
