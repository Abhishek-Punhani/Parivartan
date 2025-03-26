const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;
const campaignSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please provide title"],
    },
    description: {
      type: String,
      required: [true, "Please provide description"],
    },
    location: {
      type: String,
      required: [true, "Please provide Location"],
    },
    date: {
      type: Date,
      required: [true, "Please provide Date"],
    },
    organiser: {
      type: ObjectId,
      ref: "User",
    },
    images: [
      {
        type: String,
      },
    ],
    upVotes: [
      {
        type: ObjectId,
        ref: "User",
      },
    ],
    reportErrors: {
      type: String,
      enum: [
        "Spam",
        "Inappropriate",
        "Hate Speech",
        "Violence",
        "False Information",
        "Other",
      ],
    },
    customErrorReport: {
      type: String,
      required: function () {
        return this.reportErrors == "Other";
      },
    },
  },
  {
    collection: "campaigns",
    timestamps: true,
  }
);

const CampaignModel =
  mongoose.models.Campaign || mongoose.model("Campaign", campaignSchema);

module.exports = CampaignModel;
