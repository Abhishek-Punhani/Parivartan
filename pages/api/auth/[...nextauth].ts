import NextAuth, { NextAuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import clientPromise from "./lib/mongoDb";
import bcrypt from "bcrypt";
import UserModel from "../../../models/User";
import db from "../../../utils/db";
import jwt from "jsonwebtoken";
db.connectDb();

export const authOptions: NextAuthOptions = {
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        await db.connectDb();
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Missing email or password");
        }
        const user = await UserModel.findOne({ email: credentials.email });
        if (!user) {
          throw new Error("User not found");
        }
        const isValid = await bcrypt.compare(
          credentials.password,
          user.password
        );
        if (!isValid) {
          throw new Error("Invalid credentials");
        }
        return {
          id: user._id.toString(),
          email: user.email,
          name: user.name,
          username: user.username,
          role: user.role,
          isVerified: user.isVerified,
          age: user.age,
        };
      },
    }),
  ],
  pages: {
    signIn: "/auth/signin",
    newUser: "/onboarding",
  },
  callbacks: {
    async signIn({ user, account, profile }) {
      await db.connectDb();

      if (account?.provider === "github" || account?.provider === "google") {
        const existingUser = await UserModel.findOne({ email: user.email });
        if (!existingUser) {
          const name = profile?.name || user.name || "Unknown";
          const emailUserPart = user.email?.split("@")[0] || "user";
          const randomPassword = Math.random().toString(36).slice(-8);
          const newUser = new UserModel({
            name,
            username: emailUserPart,
            phoneNumber: "",
            email: user.email,
            password: randomPassword,
            role: "User",
            isVerified: true,
            age: 0,
          });
          await newUser.save();
        }
      }
      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
  },
  session: {
    strategy: "jwt",
  },
};

export default NextAuth(authOptions);
