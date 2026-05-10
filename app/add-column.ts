import { getDb } from "./api/queries/connection";

async function main() {
  const db = getDb();
  try {
    await db.execute("ALTER TABLE messages ADD COLUMN imageUrl TEXT");
    console.log("Column added successfully");
  } catch (e: any) {
    if (e.sqlMessage?.includes("Duplicate column")) {
      console.log("Column already exists");
    } else {
      console.error("Error:", e.sqlMessage || e.message);
    }
  }
}

main();
