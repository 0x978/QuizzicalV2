import { createTRPCRouter } from "~/server/api/trpc";
import {questionRouter} from "~/server/api/routers/questionRouter";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({

});

// export type definition of API
export type AppRouter = typeof appRouter;
