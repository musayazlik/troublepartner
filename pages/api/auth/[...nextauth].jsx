import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import clientPromise from "@/utils/clientPromise";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import dbConnect from "@/utils/dbconnect";
import User from "@models/users";
import bcrypt from "bcrypt";
import NextAuth from "next-auth";

const options = {
  adapter: MongoDBAdapter(clientPromise),
  session: {
    strategy: "jwt",
    maxAge: 3000,
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        await dbConnect();
        const user = await User.findOne({
          email: credentials.email,
        });

        if (user) {
          const isMatch = await bcrypt.compare(
            credentials.password,
            user.password
          );
          if (isMatch) {
            return {
              id: user._id,
              name: user.name,
              surname: user.surname,
              email: user.email,
              image: user.image,
              role: user.role,
              memberType: user.memberType,
              securityStatus: user.securityStatus,
            };
          }
        }

        return null;
      },
    }),

    GoogleProvider({
      clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
      clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET,
      profile(profile) {
        return {
          id: profile.sub,
          name: profile.given_name,
          surname: profile.family_name,
          email: profile.email,
          password: "",
          image: profile.picture,
          role: "user",
          memberType: "free",
          securityStatus: false,
        };
      },
    }),
  ],

  callbacks: {
    async session({ session, token, user }) {
      if (user) {
        session.user = {
          id: user.id,
          email: user.email,
          name: user.name,
          image: user.image,
        };
      }

      if (token) {
        session.user = {
          id: token.sub,
          email: token.email,
          image: token.picture,
          name: token.name,
        };
      }

      return session;
    },
  },
};

export default NextAuth(options);
