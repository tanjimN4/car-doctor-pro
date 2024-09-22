import { connectDB } from "@/lib/connectDb";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";

const handler = NextAuth({
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60,
  },
  providers: [
    CredentialsProvider({
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const { email, password } = credentials;

        // Check if both email and password are provided
        if (!email || !password) {
          console.error('Missing email or password');
          return null;
        }

        // Connect to the database
        const db = await connectDB();
        const currentUser = await db.collection('users').findOne({ email });

        // If user not found
        if (!currentUser) {
          console.error('User not found');
          return null;
        }

        // Here, you should verify the password (e.g., using bcrypt)
        // For simplicity, assuming passwords are stored in plain text (which is NOT recommended for production)
        if (password !== currentUser.password) {
          console.error('Invalid password');
          return null;
        }

        // Return the user object (without the password) to authenticate
        return { id: currentUser._id, email: currentUser.email, name: currentUser.name };
      },
    }),
    GoogleProvider({
        clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
        clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET,
      }),
      GitHubProvider({
        clientId: process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID,
        clientSecret: process.env.NEXT_PUBLIC_GITHUB_CLIENT_SECRET,
      }),
  ],
  pages: {
    signIn: '/login',
  },
  callbacks: {
    async signIn({ user, account }) {
        if (account.provider === "google" || account.provider === "github" || account.provider === "facebook") {
            const { name, email, image } = user;
            try {
              const db = await connectDB();
              const userCollection = db.collection("users");
              const userExist = await userCollection.findOne({ email });
              if (!userExist) {
                const res = await userCollection.insertOne(user);
                return user;
              } else {
                return user;
              }
            } catch (error) {
              console.log(error);
            }
          } else {
            return user;
          }
    },
  },
});

export { handler as GET, handler as POST };
