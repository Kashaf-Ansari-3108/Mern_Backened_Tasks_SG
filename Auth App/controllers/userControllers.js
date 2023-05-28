const userModel = require("../models/userSchema");
const bcrypt = require("bcrypt-inzi");
const jwt = require('../middlewares/jwtMiddleware');

exports.createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    // if user already exist
    const existing = await userModel.findOne({ email });
    if (existing) {
      res.status(400).json({
        message: "User already exist !!..",
      });
      return;
    }
    // If fields are missing
    if (!name || !email || !password) {
      res.status(400).json({ message: "Required fields are missing" });
      return;
    }
    // hash password
    const hashpwd = await bcrypt.stringToHash(password, 10);
    // create user
    const user = new userModel({
      name,
      email,
      password: hashpwd,
    });
    await user.save();
    const token = await jwt.sign(req.body);
    res.status(200).json({
      message: "User created succesfully !!..",
      data: user,
      token,
      status: true,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Something went wrong !!..",
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    // find user 
    const user = await userModel.findOne({email});
    // Verify Password
    const verifyHash = await bcrypt.varifyHash(password,user.password);
    if(!verifyHash){
        res.status(400).json({ message: "Crendentials error" });
        return;
    }
    // User get
    res.status(200).json({
        message: "User find succesfully !!..",
        data: user,
        status: true,
      });

  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Something went wrong !!..",
    });
  }
};


