import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose
      .connect(process.env.DB_URI)
      .then(() => console.log("Database is connected successfully"))
      .catch((err) => console.log(err));
  } catch (error) {
    console.log("Database connection error", error);
  }
};

export default connectDB;
