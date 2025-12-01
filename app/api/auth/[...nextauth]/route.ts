import bcrypt from "bcryptjs";
import clientPromise from "@/lib/mongodb";
import Credentials from "next-auth/providers/credentials";
import NextAuth from "next-auth";

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
        const client = await clientPromise;
        const db = client.db(process.env.MONGODB_DB);
        const users = db.collection("users");

        // === Find user ===
        const user = await users.findOne({ username });
        console.log("DEBUG USER:", user);

        if (!user) {
          console.log("User not found");
          return null;
        }

        // === Compare password ===
        const valid = await bcrypt.compare(password, user.password);
        console.log("DEBUG PASSWORD VALID:", valid);

        if (!valid) {
          console.log("Password incorrect");
          return null;
        }

        // === SUCCESS — return user object ===
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
          id: token.id,
          username: token.username,
        };
      }
      return session;
    },
  },
});

export { handler as GET, handler as POST };
