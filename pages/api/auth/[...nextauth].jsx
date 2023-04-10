import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import clientPromise from "@/utils/clientPromise";

const options = {
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    GoogleProvider({
      clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
      clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET,
      profile(profile) {
        return {
          id: profile.sub,
          name: profile.name,
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
    session: async ({ session, token, user }) => {
      if (session?.user) {
        session.user.id = user.id;
        session.user.role = user.role;
        session.user.memberType = user.memberType;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(options);
