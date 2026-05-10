import { getDb } from "./connection";
import type { Message } from "@db/schema";

export async function findAllMessages(): Promise<Message[]> {
  const snapshot = await getDb()
    .collection("messages")
    .orderBy("createdAt", "desc")
    .get();

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    name: doc.data().name as string,
    content: doc.data().content as string,
    imageUrl: (doc.data().imageUrl as string | null) ?? null,
    createdAt: (doc.data().createdAt as { toDate(): Date }).toDate(),
  }));
}

export async function createMessage(data: {
  name: string;
  content: string;
  imageUrl?: string | null;
}) {
  const ref = await getDb()
    .collection("messages")
    .add({ ...data, createdAt: new Date() });
  return { id: ref.id };
}
