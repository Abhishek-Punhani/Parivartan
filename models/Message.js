import mongoose from "mongoose";

const { ObjectId } = mongoose.Schema;

const messageSchema = new mongoose.Schema(
  {
    sender: {
      type: ObjectId,
      ref: "User",
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    collection: "messages",
    timestamps: true,
  }
);

const MessageModel = mongoose.models.Message || mongoose.model("Message", messageSchema);
export default MessageModel;