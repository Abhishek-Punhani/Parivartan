const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;
const rewardSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please provide title"],
    },
    awardedBy: {
      type: ObjectId,
      ref: "User",
    },
    awardedTo: [
      {
        type: ObjectId,
        ref: "User",
      },
    ],
    campaign: {
      type: ObjectId,
      ref: "Campaign",
    },
  },
  {
    collection: "rewards",
    timestamps: true,
  }
);

const RewardModel =
  mongoose.models.reward || mongoose.model("Reward", rewardSchema);

module.exports = RewardModel;
