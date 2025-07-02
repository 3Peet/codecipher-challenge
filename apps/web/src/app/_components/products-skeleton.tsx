import StatSkeleton from "./stat-skeleton";
import TableSkeleton from "./table-skeleton";

export default function ProductsSkeleton() {
	return (
		<div className="container mx-auto px-4 py-8">
			<div className="grid gap-6">
				<StatSkeleton />
				<TableSkeleton />
			</div>
		</div>
	);
}
