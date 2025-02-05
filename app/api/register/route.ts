import { NextResponse } from "next/server";
import { MongoClient, Db, Collection, MongoError } from "mongodb";

const uri = process.env.MONGODB_URI;

async function connectToDatabase(): Promise<MongoClient> {
  if (!uri) {
    throw new Error("MongoDB URI is not defined");
  }

  const client = new MongoClient(uri);
  await client.connect();
  return client;
}

async function createUniqueIndex(collection: Collection): Promise<void> {
  await collection.createIndex({ email: 1 }, { unique: true });
}

export async function POST(request: Request) {
  try {
    const client = await connectToDatabase();
    const db: Db = client.db("vceMUN");
    const collection: Collection = db.collection("registrations");

    await createUniqueIndex(collection);

    const body: {
      name: string;
      email: string;
      phone: string;
      institution: string;
      committee: string;
      firstPreferenceCountry: string;
      secondPreferenceCountry: string;
      thirdPreferenceCountry: string;
      transactionId: string;
    } = await request.json();

    await collection.insertOne(body);

    return NextResponse.json({
      success: true,
      message: "Registration Successful",
    });
  } catch (error) {
    console.error("Error inserting document:", error);

    if (error instanceof MongoError && error.code === 11000) {
      return NextResponse.json(
        { success: false, message: "Email already exists" },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { success: false, message: "Registration Failed" },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const email = searchParams.get("email");

  if (!email) {
    return NextResponse.json({ exists: false });
  }

  try {
    const client = await connectToDatabase();
    const db: Db = client.db("vceMUN");
    const collection: Collection = db.collection("registrations");

    const user = await collection.findOne({ email });
    return NextResponse.json({ exists: !!user });
  } catch (error) {
    console.error("Error checking email:", error);
    return NextResponse.json({ exists: false }, { status: 500 });
  }
}
