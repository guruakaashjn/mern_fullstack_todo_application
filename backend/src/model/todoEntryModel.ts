import mongoose from "mongoose";

const Schema = mongoose.Schema;

const TodoEntry = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    enabled: {
      type: Boolean,
      required: true,
    },
    status: {
      type: String,
      enum: ["Not Started", "In Progress", "Completed", "Halted"],
      required: true,
    },
    deleted: {
      type: Boolean,
      default: false,
    },
    deletedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: { createdAt: "createdDate", updatedAt: "updatedDate" },
  }
);

export default mongoose.model("TodoEntries", TodoEntry);
