import bcrypt from "bcryptjs";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { getMongo } from "@/lib/mongodb";

const handler = NextAuth({
  session: { strategy: "jwt" },

  providers: [
    Credentials({
      name: "Credentials",

      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) {
          console.log("Missing username or password");
          return null;
        }

        const username = credentials.username.trim();
        const password = credentials.password.trim();

        // === Connect to MongoDB ===
        const db = await getMongo();
        const users = db.collection("users");

        // === Find user ===
        const user = await users.findOne({ username });
        console.log("DEBUG USER:", user);

        if (!user) {
          console.log("❌ User not found");
          return null;
        }

        // === Compare password ===
        const valid = await bcrypt.compare(password, user.password);
        console.log("DEBUG PASSWORD VALID:", valid);

        if (!valid) {
          console.log("❌ Invalid password");
          return null;
        }

        // === SUCCESS ===
        return {
          id: user._id.toString(),
          username: user.username,
        };
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.username = user.username;
      }
      return token;
    },

    async session({ session, token }) {
      if (token) {
        session.user = {
          id: token.id as string,
          username: token.username as string,
        };
      }
      return session;
    },
  },
});

export { handler as GET, handler as POST };
