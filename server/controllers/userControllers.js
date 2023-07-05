const argon2 = require("argon2");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const User = require("../models/User");

exports.register = async (req, res) => {
  try {
    const user = new User(req.body); 
    user.password = await argon2.hash(user.password);
    await user.save();
    res.status(200).json({
      status: "success",
      desc: "User Created",
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error,
    });
  }
};


exports.login = async (req, res, next) => {
  try {
    let { email, password } = req.body;

    let existingUser;
    existingUser = await User.findOne({ email: email });
    if (existingUser != null) {
      if (await argon2.verify(existingUser.password, password)) {
        //Creating jwt token
        token = jwt.sign(
          { id: existingUser.id, email: existingUser.email },
          process.env.TOKEN_SECRET,
          { expiresIn: "1h" }
        );
        res.status(200).json({
          success: true,
          data: {
            userId: existingUser.id,
            email: existingUser.email,
            token: token,
          },
        });
      }
      else {
        throw Error(JSON.stringify({code: 400, status: "Password Incorrect"}));
      }
    }
    else {
      throw Error(JSON.stringify({code: 400, status: "User Not Found"}));
    }
  } catch (error) {
    res.status(400).send(JSON.parse(error.message));
  }
};


exports.getUserInfo = async (req, res) => {
  try {
    let user = await User.findById(req.user.id);
    
    res.status(200).json({
      id: user.id,
      username: user.username
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error
    })
  }
}