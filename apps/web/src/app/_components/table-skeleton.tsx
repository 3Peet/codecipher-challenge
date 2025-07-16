import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";

import { Skeleton } from "@/components/ui/skeleton";

const ROWS = 27;
const COLUMNS = 10;

export default function TableSkeleton() {
	return (
		<Table>
			<TableHeader>
				<TableRow>
					{[...Array(COLUMNS)].map((_, cellIdx) => (
						// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
						<TableHead key={`headers-${cellIdx}`}>
							<Skeleton className="h-4 w-24" />
						</TableHead>
					))}
				</TableRow>
			</TableHeader>
			<TableBody>
				{[...Array(ROWS)].map((_, rowIdx) => (
					<TableRow
						// biome-ignore lint/suspicious/noArrayIndexKey: static skeleton rows
						key={`[body-rows-${rowIdx}]`}
					>
						{[...Array(COLUMNS)].map((_, cellIdx) => (
							// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
							<TableCell key={`body-columns-${cellIdx}`}>
								<Skeleton className="h-4 w-20" />
							</TableCell>
						))}
					</TableRow>
				))}
			</TableBody>
		</Table>
	);
}
