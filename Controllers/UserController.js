const userModel = require("../Models/UserModel");

const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const generateToken = require("../util/generateToken");
var currentdate = new Date(); 
var time =
  currentdate.getDate() +
  "/" +
  (currentdate.getMonth() + 1) +
  "/" +
  currentdate.getFullYear() +
  " @ " +
  currentdate.getHours() +
  ":" +
  currentdate.getMinutes() +
  ":" +
  currentdate.getSeconds();

const userRegisterController = asyncHandler(async (req, res) => {
  console.log('Register Req accepted')
  const { name, email, type, mobileno, password } = req.body;
  console.log(req.body)
  const userfound = await userModel.findOne({ email });
  if (userfound) {
    res.status(400);
    throw new Error("USER ALREADY EXIST");
  }
  console.log('ggwp')
  const usercreate = await userModel.create({
    name,
    email,
    type,
    mobileno,
    password
    
  });

  if (usercreate) {
    
     return res.json({
       _id: usercreate._id,
       name: usercreate.name,
       email: usercreate.email,
       type:usercreate.type,
       mobileno: usercreate.mobileno,
       token: generateToken(usercreate._id),
     });
  }
  else {
    throw new Error("INVALID CREDENTIALS");
  }
  
});




const userLoginController = asyncHandler(async (req, res) => {
 
  const { email, password } = req.body;

  const user = await userModel.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      id: user._id,
      name: user.name,
      email: user.email,
      mobileno: user.mobileno,
      type: user.type,

      token: generateToken(user._id),
    });
  } else {
    res.status(404).json({
      message: "Not Found",
    });
  }
});




const userAllController = asyncHandler(async (req, res) => {
  console.log("Get Req accepted");
  const user = await userModel.find();
  console.log(user);
  if (user) {
    res.json(user);
  } else {
    res.status(400);
    throw new Error("No Users Available");
  }
});

const userOneController = asyncHandler(async (req, res) => {
  const id = req.params.id;
  console.log("Get Req accepted");
  const user = await userModel.findById(id);
  console.log(user);
  if (user) {
    res.json(user);
  } else {
    res.status(400);
    throw new Error("No Users Available");
  }
});







const userDeleteController = asyncHandler(async (req, res) => {
  console.log("Req accepted");
  const id = req.params.id;
  console.log(req.body);
  const user = await userModel.findById( id );
  console.log(user);
  if (user) {
    await user.remove();
    res.json({ message: "User has been removed" });
  }
  else {
    throw new Error("Error Occured. User Not deleted");
  }
});


const userUpdateController = asyncHandler(async (req, res) => {
  console.log("Req accepted");
  const { email,name, mobileno,type } = req.body;
  const id = req.params.id;
  console.log(req.body);
  const user = await userModel.findById( id );
  console.log(user);
  if (user) {
    user.name = name;
    user.mobileno = mobileno;
    user.type = type;
    user.email = email;
    
   
    

    const updateduser = await user.save();
    res.json(updateduser);
  } else {
    res.status(400);
    throw new Error("Update Not Done");
  }
});





module.exports = {
  userRegisterController,
  userLoginController,
  userAllController,
  userUpdateController,
  userDeleteController,
  userOneController,
  
};
