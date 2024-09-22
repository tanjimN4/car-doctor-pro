// /src/app/signup/api/route.js
import { connectDB } from "@/lib/connectDb";

export const POST = async (request) => {
  try {
    const newUser = await request.json();  // Parse incoming JSON data
    console.log(newUser);
    
    const db = await connectDB();  // Connect to the database
    const userCollection = db.collection('users');

    // Check if the user already exists
    const existingUser = await userCollection.findOne({ email: newUser.email });
    if (existingUser) {
      return new Response(JSON.stringify({ message: 'User Already Exists' }), { status: 409 });
    }

    // Insert new user into the database
    await userCollection.insertOne(newUser);

    return new Response(JSON.stringify({ message: 'User Created Successfully' }), { status: 201 });
  } catch (error) {
    return new Response(JSON.stringify({ message: 'Error Creating User', error }), { status: 500 });
  }
};
