import mongoose from "mongoose";

const connectToMongoDB = async () => {
  try {
    console.log("Starting to connect to the Database");
    await mongoose.connect(process.env.MONGO_URL, {});
    console.log("Database connection successful");
  } catch (err) {
    console.error("Database connection failed");
    process.exit(1);
  }
};

export default connectToMongoDB;
