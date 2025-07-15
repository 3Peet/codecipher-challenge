import { type Product, productStats, products } from "../db/schema/products";
import { publicProcedure, router } from "../lib/trpc";

import { type Column, and, eq, gt, like } from "drizzle-orm";
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
	getProductsByFilters: publicProcedure
		.input(
			z.object({
				limit: z.number().min(1).max(100).nullish(),
				cursor: z.number().nullish(), // cursor is the last seen product id
				filters: z
					.array(
						z.object({
							id: z.string(),
							value: z.unknown(),
						}),
					)
					.optional(), // Make the entire filters array optional
			}),
		)
		.query(async ({ input }) => {
			const limit = input.limit ?? 20;
			const cursor = input.cursor;
			const whereConditions = [];

			if (input.filters && input.filters.length > 0) {
				for (const filter of input.filters) {
					const column = products[filter.id as keyof Product] as Column; // Access the column dynamically

					if (!column) {
						console.warn(`Attempted to filter by unknown column: ${filter.id}`);
						continue; // Use 'continue' to skip to the next iteration in for...of
					}

					// Basic handling: If value is a string, use 'like' for partial search, otherwise 'eq'
					if (typeof filter.value === "string") {
						whereConditions.push(like(column, `%${filter.value}%`));
					} else if (
						typeof filter.value === "number" ||
						typeof filter.value === "boolean"
					) {
						whereConditions.push(eq(column, filter.value));
					}
					// Add more `else if` for other types or custom operators (e.g., gt, lt, inArray)
				}
			}

			// Add cursor condition if provided
			if (cursor) {
				whereConditions.push(gt(products.id, cursor));
			}
			// Fetch one extra to check if there's a next page
			const productsQuery = db
				.select()
				.from(products)
				.where(whereConditions.length > 0 ? and(...whereConditions) : undefined)
				.orderBy(products.id) // or .orderBy(products.id, 'desc') for reverse
				.limit(limit + 1);

			const allProducts = await productsQuery;

			let nextCursor: number | null = null;
			if (allProducts.length > limit) {
				// More products exist
				nextCursor = allProducts[limit].id;
				allProducts.length = limit; // Trim to requested limit
			}

			return {
				products: allProducts,
				nextCursor,
			};
		}),
});
export type AppRouter = typeof appRouter;
