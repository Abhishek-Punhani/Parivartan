import { getToken } from "next-auth/jwt";

export default async function auth(req, res, next) {
  try {
    const token = await getToken({
      req,
      secret: process.env.JWT_SECRET,
      secureCookie: process.env.NODE_ENV === "production",
    });

    if (!token) {
      return res.status(401).json({ message: "Not signed in" });
    }

    req.user = {
      id: token.sub,
      name: token.name,
      email: token.email,
      role: token.role,
      isEmailVerified: token.isEmailVerified,
    };

    next();
  } catch (error) {
    console.error("Auth middleware error:", error);
    res.status(401).json({ message: "Not authorized" });
  }
}
