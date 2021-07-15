const router = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

router.post("/login", async (req, res) => {
  /* console.log(req.body); */
  User.findOne(
    { email: req.body.email },
    "name email password role",
    (error, user) => {
      if (error) {
        console.log(error);
        return res.send(error);
      }
      if (!user) return res.status(400).send("Not registered");
      bcrypt.compare(req.body.password, user.password, (error, valid) => {
        if (error) {
          console.log(error);
          return res.send(error);
        }
        if (!valid) return res.status(400).send("Incorrect password");
        const jwtToken = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
        return res.header("auth-token", jwtToken).send(user);
      });
    }
  );
});

router.post("/register", async (req, res) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPasswd = await bcrypt.hash(req.body.password, salt);
  req.body.password = hashedPasswd;
  const user = new User(req.body);
  try {
    const savedUser = await user.save();
    return res.send(savedUser);
  } catch (error) {
    console.log(error);
    if (error.code === 11000)
      return res.status(400).send("Account already exist's in this email id");
    return res.send(error);
  }
});

module.exports = router;
