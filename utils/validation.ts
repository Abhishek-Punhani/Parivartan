import UserModel from "@/models/User";
import PostModel from "@/models/Post";
import CampaignModel from "@/models/Campaign";

export const validateEmail = (email: string) => {
  const regextSt =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regextSt.test(email);
};
export const validatePhoneNumber = (phoneNumber: string) => {
  const phoneRegex = /^\+?[1-9]\d{1,14}$/; // E.164 format
  return phoneRegex.test(phoneNumber);
};

export const createUser = async (user: User) => {
  if (
    !user.name ||
    !user.username ||
    !user.email ||
    !user.password ||
    !user.age ||
    !user.phoneNumber
  ) {
    throw new Error("Please fill all fields");
  }

  const userExists = await UserModel.findOne({ email: user.email });
  if (userExists) {
    throw new Error("Email already exists,Try another email");
  }

  if (!validateEmail(user.email)) {
    throw new Error("Invalid email");
  }
  if (!validatePhoneNumber(user.phoneNumber)) {
    throw new Error("Invalid phone number");
  }

  if (user.password.length < 6 || user.password.length > 128) {
    throw new Error(
      "Password must be at least 6 characters and at most 128 characters"
    );
  }

  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/;
  if (!passwordRegex.test(user.password)) {
    throw new Error(
      "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
    );
  }

  const newUser = new UserModel({
    name: user.name,
    username: user.username,
    email: user.email,
    password: user.password,
    phoneNumber: user.phoneNumber,
    age: user.age,
    role: "User",
    isVerified: false,
  });


  return newUser;
};

export const createPost = async (post: Post, id: string) => {
    const { title, content, severity, location, pollutionType } = post;

    if (!title || !content || !severity || !location || !pollutionType) {
        throw new Error("Please fill all the fields");
    }

    if (typeof severity !== 'number' || severity < 0 || severity > 100) {
        throw new Error("Severity should be between 0 and 100");
    }

    const validPollutionTypes = ["Air", "Water", "Soil"];
    if (!validPollutionTypes.includes(pollutionType)) {
        throw new Error("Invalid pollution type");
    }

    const newPost = new PostModel({
        title,
        content,
        severity,
        location,
        pollutionType,
        author: id,
        comments: [],
        upVotes: [],
    });

    await newPost.save();


};

export const createCampaign = async (campaign: Campaign, id: string) => {
    const { title, description, location, date } = campaign;

    if (!title || !description || !date || !location ) {
        throw new Error("Please fill all the fields");
    }

    const newCampaign = new CampaignModel({
        title,
        description,
        location,
        date,
        organizer: id,
        images: [],
        upVotes: [],
    });

    await newCampaign.save();
};
