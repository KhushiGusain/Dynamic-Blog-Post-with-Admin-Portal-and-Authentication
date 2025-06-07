import connectDb from "@/config/db";
import Admin from "@/models/Admin";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from 'bcryptjs'

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const { email, password } = credentials;
        console.log("Credentials received:", { email, password });
        await connectDb();

        const admin = await Admin.findOne({ email });
        if (!admin) {
          console.log("Admin not found");
          return null;
        }

        console.log("admin found!!");

        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) {
          console.log("password incorrect");
          return null;
        }

        console.log("password matched");

        return {
          id: admin._id.toString(),
          email: admin.email,
          role: admin.role || "admin",
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role || "admin";
      }
      return token;
    },
    async session({ session, token }) {
      session.user.role = token.role || "admin";
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/",
  },
});

export { handler as GET, handler as POST };
