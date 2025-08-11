import express from "express";
import dotenv from "dotenv";
dotenv.config();

import app from "./config/express";
import connectToMongoDB from "./config/db/mongo";

const server = async () => {
  try {
    console.log("Starting to run the server");

    // configurations for mongodb setup.
    await connectToMongoDB();

    app.listen(process.env.SERVER_PORT, () => {
      console.log(`Server is running on port ${process.env.SERVER_PORT}`);
    });
  } catch (err) {
    console.log("Server error", err);
    process.exit();
  }
};

server();
