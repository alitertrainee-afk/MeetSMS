// local imports
import User from "../models/User.js";

export const findUserByEmailRepo = async (email) => {
  return User.findOne({ email });
};

export const createUserRepo = async (userObj) => {
  return await User.create(userObj);
};


// findUserByIdentifier("email", "chauhanmeet1803@gmail.com")
