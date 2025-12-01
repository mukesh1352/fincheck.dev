import clientPromise from "@/lib/mongodb";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    const { username, password } = await req.json();

    if (!username || !password) {
      return new Response("Missing fields", { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db("finalyear");
    const users = db.collection("users");

    const exists = await users.findOne({ username });

    if (exists) {
      return new Response("Username already exists", { status: 400 });
    }

    const hashed = await bcrypt.hash(password, 10);

    const result = await users.insertOne({
      username,
      password: hashed,
      createdAt: new Date(),
    });

    return Response.json({ success: true, userId: result.insertedId });
  } catch (err) {
    console.error(err);
    return new Response("Error creating new user", { status: 500 });
  }
}
