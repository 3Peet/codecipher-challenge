import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Skeleton } from "@/components/ui/skeleton";

export default function StatSkeleton() {
	return (
		<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
			{[...Array(3)].map((_, i) => (
				<Card
					// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
					key={i}
				>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="font-medium text-sm">
							<Skeleton className="h-4 w-24" />
						</CardTitle>
						<Skeleton className="h-4 w-4" />
					</CardHeader>
					<CardContent>
						<Skeleton className="mb-2 h-8 w-20" />
						<Skeleton className="h-3 w-28" />
					</CardContent>
				</Card>
			))}
		</div>
	);
}
