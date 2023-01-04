const router = require("express").Router();
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

const User = require("../models/Users");
const Cart = require("../models/Cart");

//REGISTER
router.post("/register", async (req, res) => {
  const newUser = new User({
    fullname: req.body.fullname,
    username: req.body.username,
    email: req.body.email,
    role: req.body.role,
    password: CryptoJS.AES.encrypt(
      req.body.password,
      process.env.PASS_SEC
    ).toString(),
  });

  try {
    const savedUser = await newUser.save();
    await Cart.create({ username: savedUser.username });
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(500).json(err);
  }
});

//LOGIN

router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({
      userName: req.body.user_name,
    });

    !user && res.status(401).json("Wrong User Name");

    const hashedPassword = CryptoJS.AES.decrypt(
      user.password,
      process.env.PASS_SEC
    );

    const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);

    const inputPassword = req.body.password;

    originalPassword != inputPassword && res.status(401).json("Wrong Password");

    const accessToken = jwt.sign(
      {
        id: user._id,
        isAdmin: user.isAdmin,
      },
      process.env.JWT_SEC,
      { expiresIn: "3d" }
    );

    const { password, ...others } = user._doc;
    res.status(200).json({ ...others, accessToken });
  } catch (err) {
    res.status(500).json(err);
  }
});
router.put("/profile/edit/:id", async (req, res) => {
  const { id } = req.params;
  const myquery = { userId: id };
  const updateData = {
    $set: {
      name: req.body.name,
      email: req.body.email,
      username: req.body.username,
      about: req.body.about,
      image: req.body.image,
    },
  };
  const data = await User.updateOne(
    myquery,
    updateData,
    function (err, result) {
      if (err) {
        console.log(err);
      } else {
        console.log(result);
      }
    }
  ).clone();
  return res.status(200).json(updateData.$set);
});

router.get("/profile/:id", async (req, res) => {
  const { id } = req.params;
  const dataProfil = await User.find({ userId: id });
  const data = dataProfil.map((data) => {
    return {
      fullname: data.fullname,
      email: data.email,
      username: data.username,
      role: data.role,
      image: data.image,
    };
  });
  res.json(data);
});

module.exports = router;
