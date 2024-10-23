const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
let Users = require("../models/users.model");

// Create User
let register = async (req, res) => {
  const err = validationResult(req);
  if (!err.isEmpty()) {
const errorMessages = err.array().map(error => error.msg);
return res.status(400).json({
  status: 'fail',
  error: errorMessages
});
  }
  const notFound = await Users.findOne({ email: req.body.email });
  if (notFound) {
    return res.status(422).json({
      status: 422,
      message: `This email: "${req.body.email}" is already exist`,
    });
  }
  // Hash password
  const hashPass = await bcrypt.hash(req.body.password, 10);
  // Create avatar link if file exists
  let avatarUrl;
  if (req.file) {
    avatarUrl = `${process.env.BASE_URL}/uploads/${req.file.filename}`;
  } else {
    avatarUrl = `${process.env.BASE_URL}/uploads/avatar.jpeg`;
  }

  // Create user
  const user = new Users({ 
    ...req.body,
    image: avatarUrl,
    password: hashPass 
  });

  // Make Token
  const token = await jwt.sign(
    {
      id: user._id,
      name: `${req.body.first_name} ${req.body.last_name}`,
      email: req.body.email,
      role: req.body.role
    },
    process.env.JWT_SECRITE,
    { expiresIn: "1d" }
  );

  user.token = token;
  await user.save();


const userResponse = user.toObject();
userResponse.user_id=userResponse._id
delete userResponse.password;
delete userResponse._id;
  res.status(201).json({ status: 201,msg: "User created", data:userResponse });
};

// User Login 
let login = async (req, res) => {
  const { email, password } = req.body;
  const user = await Users.findOne({ email });
  if (!user)
    return res.status(404).send({ status: "fail", message: "المستخدم غير موجود" });
  const passTrue = await bcrypt.compare(password, user.password);
  if (!passTrue)
    return res.status(401).send({ status: "fail", message: "كلمة المرور خاطئة" });
  // Make Token
  const token = jwt.sign(
    {
      id: user._id,
      name: `${user.first_name} ${user.last_name}`,
      email: user.email,
      role: user.role
    },
    process.env.JWT_SECRITE,
    { expiresIn: "5d" }
  );
  user.token = token;
  await user.save();

  const userResponse = user.toObject();
  delete userResponse.password;
  delete userResponse.token;
  delete userResponse._id;
  userResponse.id = user._id;

  res.send({ status: "success", data: { token: user.token, user: userResponse } });
};

let getAuth = async (req, res) => {
  const token = req.headers.Authorization || req.headers.authorization;
  if (!token)
    return res
      .status(401)
      .send({ status: "fail", message: "You don't have token" });

  const isFound = await Users.findOne({token:token.split(" ")[1]})
  if(isFound){  
    res.status(200).send({auth:true});
  }else{
    res.status(200).send({auth:false});
  }
};

let updateProfile = async (req, res) => {
  try {
    let user = await Users.findById(req.currentUser.id);
    if (!user) {
      return res.status(404).json({ status: 'fail', message: 'User not found' });
    }

    const { first_name, last_name, phone, email, whats_phone, bio } = req.body;
    user.first_name = first_name || user.first_name;
    user.last_name = last_name || user.last_name;
    user.phone = phone || user.phone;
    user.email = email || user.email;
    user.whats_phone = whats_phone || user.whats_phone;
    user.bio = bio || user.bio;

    if (req.body.image) {
      user.image = req.body.image;
    }
    await user.save();
    res.status(200).json({ status: 'success', data: user });
  } catch (err) {
    res.status(500).json({ status: 'fail', message: err.message });
  }
};

module.exports = {
  register,
  login,
  getAuth,
  updateProfile
};
