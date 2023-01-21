const User = require("../model/User");

//GET METHOD

const getAllUsers = async (req, res, next) => {
  let users;
  try {
    users = await User.find();
  } catch (err) {
    return next(err);
  }
  if (!users) {
    return res.status(500).json({ message: "internal server error" });
  }

  return res.status(200).json({ users });
};

//POST METHOD
const addUser = async (req, res, next) => {
  const { name, email, password } = req.body;
  if (
    !name &&
    name.trim() == "" &&
    !email &&
    email.trim() === "" &&
    !password &&
    password.length > 6
  ) {
    return res.status(422).json({ message: "Invalid data" });
  }

  let user;
  try {
    user = new User({
      name,
      email,
      password,
    });
    user = await user.save();
  } catch (err) {
    return next(err);
  }
  if (!user) {
    return res.status(500).json({ message: "Unable to save User" });
  }
  return res.status(201).json({ user });
};

//PUT METHOD

const updateUser = async (req, res, next) => {
  const id = req.params.id;
  const { name, email, password } = req.body;
  if (
    !name &&
    name.trim() == "" &&
    !email &&
    email.trim() === "" &&
    !password &&
    password.length > 6
  ) {
    return res.status(422).json({ message: "Invalid data" });
  }

  let user;

  try {
    user = await User.findByIdAndUpdate(id, { name, email, password });
  } catch (err) {
    return next(err);
  }
  if (!user) {
    return res.status(500).json({ message: "Unable to save User" });
  }
  return res.status(200).json({ message: "Updated Succesdfully!" });
};

//DELETE Method

const deleteUser = async (req, res, next) => {
  const id = req.params.id;
  let user;
  try {
    user = await User.findByIdAndRemove(id);
  } catch (err) {
    return next(err);
  }
  if (!user) {
    return res.status(500).json({ message: "Unable to delete" });
  }
  return res.status(200).json({ message: "Deleted Succesdfully!" });
};

//GET USER by ID

const getUserById = async (req, res, next) => {
  const id = req.params.id;
  let user;

  try {
    user = await User.findById(id);
  } catch (err) {
    return next(err);
  }
  if (!user) {
    return res
      .status(404)
      .json({ message: "Unable to find user with this ID" });
  }
  return res.status(200).json({ user });
};

exports.getAllUsers = getAllUsers;
exports.addUser = addUser;
exports.updateUser = updateUser;
exports.deleteUser = deleteUser;
exports.getUserById = getUserById;
