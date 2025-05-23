const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide your name"],
    },
    username: {
      type: String,
      required: [true, "Please provide your username"],
      unique: [true, "This username is already registered!!"],
    },
    email: {
      type: String,
      required: [true, "Please provide your email address"],
      unique: [true, "This email address is already registered!!"],
      lowercase: true,
      validate: [validator.isEmail, "Please provide a valid email address!"],
    },
    picture: {
      type: String,
      default:
        "https://res.cloudinary.com/dkd5jblv5/image/upload/v1675976806/Default_ProfilePicture_gjngnb.png",
    },
    password: {
      type: String,
      required: [true, "Please Provide your password"],
      minLength: [
        6,
        "Please make sure your password is atleast 6 characters long!",
      ],
      maxLength: [
        128,
        "Please make sure your password is atmost 128 characters long!",
      ],
    },
    role: {
      type: String,
      enum: ["User", "Admin", "SuperAdmin"],
      default: "User",
    },
    isEmailVerified: {
      type: Boolean,
      default: false,
      required: true,
    },
  },
  {
    collection: "users",
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  try {
    if (this.isNew) {
      const salt = await bcrypt.genSalt(12);
      const hashedPassword = await bcrypt.hash(this.password, salt);
      this.password = hashedPassword;
    }
    next();
  } catch (error) {
    next(error);
  }
});
const UserModel = mongoose.models.User || mongoose.model("User", userSchema);

module.exports = UserModel;
