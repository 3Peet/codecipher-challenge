import { productStats, products } from "../db/schema/products";
import { publicProcedure, router } from "../lib/trpc";

import { gt } from "drizzle-orm";
import { z } from "zod";
import { db } from "../db";

export const appRouter = router({
	healthCheck: publicProcedure.query(() => {
		return "OK";
	}),
	getAllProducts: publicProcedure
		.input(
			z.object({
				limit: z.number().min(1).max(100).nullish(),
				cursor: z.number().nullish(), // cursor is the last seen product id
			}),
		)
		.query(async ({ input }) => {
			const limit = input.limit ?? 20;
			const cursor = input.cursor;

			// Fetch one extra to check if there's a next page
			const productsQuery = db
				.select()
				.from(products)
				.orderBy(products.id) // or .orderBy(products.id, 'desc') for reverse
				.limit(limit + 1);

			if (cursor) {
				productsQuery.where(gt(products.id, cursor));
			}

			const allProducts = await productsQuery;

			let nextCursor: number | null = null;
			if (allProducts.length > limit) {
				// More products exist
				nextCursor = allProducts[limit].id;
				allProducts.length = limit; // Trim to requested limit
			}

			// await new Promise((resolve) => setTimeout(resolve, 3000));

			return {
				products: allProducts,
				nextCursor,
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
