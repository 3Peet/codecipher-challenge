import { ProductStats } from "@/app/_components/stat";
import { HydrateClient, caller, getQueryClient, trpc } from "@/lib/trpc/server";
import { Suspense } from "react";
import { ProductsTable } from "./_components/table";
import TableSkeleton from "./_components/table-skeleton";

export default async function Home() {
	const queryClient = getQueryClient();
	void queryClient.prefetchQuery(
		trpc.getAllProducts.queryOptions({ limit: 50, cursor: 0 }),
	);
	const { stats } = await caller.getLatestProductStats();

	return (
		<div className="container mx-auto px-4 py-8">
			<div className="grid gap-6">
				<ProductStats stats={stats} />
				<HydrateClient>
					<Suspense fallback={<TableSkeleton />}>
						<ProductsTable />
					</Suspense>
				</HydrateClient>
			</div>
		</div>
	);
}
