const { User, hashPassword } = require("../models/user");
const gravatar = require("gravatar");
const { v4 } = require("uuid");

const createUser = async (email, password) => {
  const hashedPassword = hashPassword(password);
  const gravatarUrl = gravatar.url(email);
  try {
    const newUser = new User({
      email,
      password: hashedPassword,
      avatarURL: gravatarUrl,
    });
    await newUser.save();
    return newUser;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const getUserById = async (id) => {
  try {
    return await User.findById(id);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const getUserByEmail = async (email) => {
  try {
    return await User.findOne({ email });
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const getUserByToken = async (token) => {
  try {
    return await User.findOne({ token });
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const logout = async (req, res) => {
  const { _id } = req.user;
  try {
    await User.findByIdAndUpdate(_id, { token: "" });
    return res.status(204).send();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const updateToken = async (_id, token) => {
  try {
    return await User.findByIdAndUpdate(_id, { token });
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const verifyUser = async (verificationToken) => {
  try {
    return await User.findOne({ verificationToken });
  } catch (error) {
    console.error(error);
    throw error;
  }
};

module.exports = {
  createUser,
  getUserById,
  getUserByEmail,
  getUserByToken,
  logout,
  updateToken,
  verifyUser,
};
