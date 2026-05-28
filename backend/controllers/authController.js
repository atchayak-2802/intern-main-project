const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// REGISTER
exports.register = async (req, res) => {
  const { name, email, password } = req.body;

  const exists = await User.findOne({ email });
  if (exists) return res.json({ message: "User exists" });

  const hash = await bcrypt.hash(password, 10);

  const user = new User({ name, email, password: hash });
  await user.save();

  res.json({ message: "Registered" });
};

// LOGIN
exports.login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) 
  return res.status(401).json({
  message: "User not found"
});

  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(401).json({
  message: "Wrong password"
});

  const token = jwt.sign({ id: user._id }, "secretkey", {
    expiresIn: "1h",
  });

  res.json({ token });
};