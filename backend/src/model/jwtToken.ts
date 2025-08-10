import mongoose from "mongoose";

const Schema = mongoose.Schema;

const JwtToken = new Schema(
  {
    userEmail: {
      type: String,
      required: true,
    },
    token: {
      type: String,
      required: true,
    },
    refreshToken: {
      type: String,
      required: true,
    },
    isValid: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: {
      createdAt: "createdDate",
      updatedAt: "updatedDate",
    },
  }
);

export default mongoose.model("JwtToken", JwtToken);
