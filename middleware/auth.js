import { getToken } from "next-auth/jwt";

export default async (req, res, next) => {
    const token = await getToken({
      req,
      secret: process.env.JWT_SECRET,
      secureCookie: process.env.NODE_ENV === "production",
    });

    if (token) {
      // Signed in: Store full user object
      req.user = { _id: token.sub }; // Store as an object with `_id`
      next();
    } else {
      res.status(401).json({ message: "Not signed in" });
    }
};
