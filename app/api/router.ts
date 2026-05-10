import { createRouter, publicQuery } from "./middleware";
import { messageRouter } from "./messageRouter";

export const appRouter = createRouter({
  ping: publicQuery.query(() => ({ ok: true, ts: Date.now() })),
  message: messageRouter,
});

export type AppRouter = typeof appRouter;
