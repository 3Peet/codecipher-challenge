import { productStats, products } from "../db/schema/products";
import { publicProcedure, router } from "../lib/trpc";

import { z } from "zod";
import { db } from "../db";

export const appRouter = router({
	healthCheck: publicProcedure.query(() => {
		return "OK";
	}),
	getAllProducts: publicProcedure
		.input(
			z.object({
				limit: z.number().min(1).max(100).default(50),
				offset: z.number().min(0).default(0),
			}),
		)
		.query(async ({ input }) => {
			const { limit, offset } = input;
			const allProducts = await db
				.select()
				.from(products)
				.limit(limit)
				.offset(offset);
			await new Promise((resolve) => setTimeout(resolve, 3000));

			return {
				products: allProducts,
			};
		}),
	getLatestProductStats: publicProcedure.query(async () => {
		const latestStats = await db
			.select()
			.from(productStats)
			.orderBy(productStats.created_at)
			.limit(1);

		return {
			stats: latestStats[0] || null,
		};
	}),
});
export type AppRouter = typeof appRouter;
