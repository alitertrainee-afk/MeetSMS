// local imports
import User from "../models/User.js";

export const findUserByIdentifier = async (key, value) => {
  return await User.findOne({ [key]: value });
};

export const createUser = async (userObj) => {
  return await User.create(userObj);
};


// findUserByIdentifier("email", "chauhanmeet1803@gmail.com")
