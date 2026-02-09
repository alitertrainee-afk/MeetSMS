// libs imports
import mongoose from "mongoose";

export const connect = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URL);
    console.log("🚀 ~ connect ~ db:", conn.connection.host);
  } catch (error) {
    console.error("Failed to connect MongoDB: ",error);
    process.exit(1);
  }
};
