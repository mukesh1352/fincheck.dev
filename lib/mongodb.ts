import { MongoClient, Db } from "mongodb";

// Read env variable from Next.js runtime
const rawUri = process.env.MONGODB_URI;

// Runtime validation
if (!rawUri) {
  throw new Error("❌ Missing environment variable: MONGODB_URI");
}

// Tell TypeScript it is now definitely a string
const uri: string = rawUri;

const dbName: string = process.env.MONGODB_DB ?? "finalyear";

// Cached client & db
let cachedClient: MongoClient | null = null;
let cachedDb: Db | null = null;

export async function getMongo(): Promise<Db> {
  // If DB already exists, reuse it
  if (cachedDb) return cachedDb;

  // Create client if needed
  if (!cachedClient) {
    cachedClient = new MongoClient(uri);
  }

  // Connect — safe to call multiple times in MongoDB v5+
  await cachedClient.connect();

  // Select DB
  cachedDb = cachedClient.db(dbName);

  return cachedDb;
}
