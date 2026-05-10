import { z } from "zod";
import { createRouter, publicQuery } from "./middleware";
import { findAllMessages, createMessage } from "./queries/messages";

export const messageRouter = createRouter({
  list: publicQuery.query(async () => {
    return findAllMessages();
  }),

  create: publicQuery
    .input(
      z.object({
        name: z.string().min(1, "Name is required").max(255),
        content: z.string().min(1, "Message is required").max(2000),
        imageUrl: z.string().max(10000000).optional(),
      })
    )
    .mutation(async ({ input }) => {
      await createMessage({
        name: input.name,
        content: input.content,
        imageUrl: input.imageUrl,
      });
      return { success: true };
    }),
});
