import NextAuth, { NextAuthOptions, Session } from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import clientPromise from "./lib/mongoDb";
import bcrypt from "bcrypt";
import UserModel from "../../../models/User";
import db from "../../../utils/db";
db.connectDb();

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      role?: string;
    };
  }
}

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
        console.log(credentials);
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
        if (!user.isEmailVerified) {
          throw new Error("Account not verified , please check your email");
        }
        return {
          id: user._id.toString(),
          email: user.email,
          name: user.name,
          username: user.username,
          role: user.role,
          isEmailVerified: user.isEmailVerified,
          age: user.age,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      let user = await UserModel.findById(token.sub);
      if (session?.user) {
        session.user = {
          ...session.user,
          id: token.sub || user._id.toString(),
          role: user.role || "user",
        };
      }
      token.role = user.role || "user";
      return session;
    },
  },
  pages: {
    signIn: "/auth/signin",
    newUser: "/auth/onboarding",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.JWT_SECRET,
  debug: true,
};

export default NextAuth(authOptions);
