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
              premiumTime: "",
              securityStatus: user.securityStatus,
            };
          }
        }

        // return null;
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
          premiumTime: "",
          securityStatus: false,
        };
      },
    }),
  ],
  secret: process.env.NEXT_PUBLIC_AUTH_SECRET,
  callbacks: {
    async session({ session }) {
      const data = await User.findOne({ email: session.user.email });

      session.user = {
        id: data._id,
        email: data.email,
        name: data.name,
        surname: data.surname,
        image: data.image,
        role: data.role,
        memberType: data.memberType,
        premiumTime: data.premiumTime,
      };

      return session;
    },
    async jwt({ token, account, user }) {
      if (account?.accessToken) {
        token.accessToken = account.accessToken;
      }

      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.memberType = user.memberType;
      }

      return token;
    },
  },
  pages: {
    signIn: "/auth/sign-in",
    error: "/",
    signOut: "/",
  },
};

export default NextAuth(options);
