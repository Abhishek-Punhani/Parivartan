import { type } from "os";
import { date } from "yup";

const mongoose = require("mongoose");

const { ObjectId } = mongoose.Schema;

const postSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "please provide a title"],
    },
    content: {
      type: String,
      required: [true, "please provide a content"],
    },
    severity: {
      type: Number,
      required: true,
      min: [0, "minimum severity is 0"],
      max: [100, "maximum severity is 100"],
    },
    author: {
      type: ObjectId,
      ref: "User",
      required: true,
    },
    location: {
      type: String,
      required: [true, "please provide a location"],
    },
    comments: [
      {
        type: ObjectId,
        ref: "Message",
      },
    ],
    pollutionType: {
      type: String,
      enum: ["Air", "Water", "Soil"],
      required: true,
    },
    image: {
      type: String,
      required: [true, "please provide an image"],
    },
    upVotes: [
      {
        type: ObjectId,
        ref: "User",
      },
    ],
    reportError: {
      type: String,
      enum: [
        "Spam",
        "Inappropriate",
        "Wrong Category",
        "False Information",
        "Other",
      ],
    },
    customErrorReport: {
      type: String,
      required: function () {
        return this.reportError === "Other";
      },
    },
  },
  {
    collection: "posts",
    timestamps: true,
  }
);

const PostModel = mongoose.models.Post || mongoose.model("Post", postSchema);
export default PostModel;
