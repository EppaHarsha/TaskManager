const User = require("../models/userSchema.js");
const bcrypt = require("bcrypt");
const { createSecretToken } = require("../secretToken.js");

module.exports.signup = async (req, res) => {
  const { username, email, password } = req.body;

    if(username===""||email==="" || password===""){
      return res.json({message:"Enter Details",success:false})
    }

  const existingUser = await User.findOne({ username });

  try {
    if (existingUser) {
      return res.json({ message: "User Already exists", success: false });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      username: username,
      email: email,
      password: hashedPassword,
    });

    const save = await newUser.save();

    const token = createSecretToken(newUser._id);
    res.cookie("token", token, {
      withCredentials: true,
      httpOnly: false,
    });

    const userData = {
      username: username,
      email: email,
      token: token,
    };
    res.json({ message: "Welcome to TaskManager", success: true, userData });
  } catch (err) {
    res.json({ message: `something went wrong : ${err.message}` });
  }
};

module.exports.login = async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  try {
    if (!user) {
      return res.json({ message: "User is not exists", success: false });
    }
    const isCorrect = await bcrypt.compare(password, user.password);
    console.log(isCorrect);
    if (isCorrect) {
      const token = createSecretToken(user._id);
      res.cookie("token", token, {
        withCredentials: true,
        httpOnly: false,
      });
      const userData={
        username:user.username,
        token:token,
      }
      res.json({message:"Welcome back",success:true,userData});
    }else{
      return res.json({message:"password incorrect",success:false});
    }
  } catch (err) {
     res.json({ message: `error something went wrong ${err}` });
  }
};
