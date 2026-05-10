export type Message = {
  id: string;
  name: string;
  content: string;
  imageUrl: string | null;
  createdAt: Date;
};

export type InsertMessage = Omit<Message, "id" | "createdAt">;
