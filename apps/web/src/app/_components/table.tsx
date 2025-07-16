"use client";

import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { useTRPC } from "@/lib/trpc/client";
import { useInfiniteQuery } from "@tanstack/react-query";
import {
	type ColumnFiltersState,
	flexRender,
	getCoreRowModel,
	useReactTable,
} from "@tanstack/react-table";
import { useVirtualizer } from "@tanstack/react-virtual";
import { useCallback, useMemo, useRef, useState } from "react";
import { columns } from "./columns";
import Filters from "./filters";
import TableSkeleton from "./table-skeleton";

export function ProductsTable() {
	const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
	const trpc = useTRPC();

	// We need a reference to the scrolling element for logic down below
	const tableContainerRef = useRef<HTMLDivElement>(null);

	const queryOptions = columnFilters.length
		? trpc.getProductsByFilters.infiniteQueryOptions(
				{
					limit: 50,
					cursor: 0,
					filters: columnFilters,
				},
				{ getNextPageParam: (lastPage) => lastPage.nextCursor },
			)
		: trpc.getAllProducts.infiniteQueryOptions(
				{
					limit: 50,
					cursor: 0,
				},
				{ getNextPageParam: (lastPage) => lastPage.nextCursor },
			);

	const { data, fetchNextPage, isFetching, hasNextPage, isLoading } =
		useInfiniteQuery(queryOptions);

	const flatData = useMemo(
		() => data?.pages.flatMap((page) => page.products),
		[data?.pages],
	);

	const totalFetched = flatData?.length;

	// Called on scroll and possibly on mount to fetch more data as the user scrolls and reaches bottom of table
	const fetchMoreOnBottomReached = useCallback(
		(containerRefElement?: HTMLDivElement | null) => {
			if (containerRefElement) {
				const { scrollHeight, scrollTop, clientHeight } = containerRefElement;
				//once the user has scrolled within 800px of the bottom of the table, fetch more data if we can
				if (
					scrollHeight - scrollTop - clientHeight < 800 &&
					!isFetching &&
					hasNextPage
				) {
					fetchNextPage();
				}
			}
		},
		[fetchNextPage, isFetching, totalFetched, hasNextPage],
	);

	const table = useReactTable({
		data: flatData ?? [],
		columns,
		getCoreRowModel: getCoreRowModel(),
		state: {
			columnFilters,
		},
		onColumnFiltersChange: setColumnFilters,
		defaultColumn: {
			size: 100,
		},
		initialState: {
			// We can get initial state from the URL query params or local storage
			columnVisibility: {
				meta_title: false,
				meta_description: false,
				slug: false,
				tags: false,
				discontinued_at: false,
			},
		},
	});

	const { rows } = table.getRowModel();

	const rowVirtualizer = useVirtualizer({
		count: rows.length,
		estimateSize: () => 36, //estimate row height for accurate scrollbar dragging
		getScrollElement: () => tableContainerRef.current,
		overscan: 5,
	});

	return (
		<>
			<Filters table={table} />
			<div
				className="relative h-[74dvh] overflow-auto rounded-md border"
				onScroll={(e) => fetchMoreOnBottomReached(e.currentTarget)}
				ref={tableContainerRef}
			>
				{isLoading ? (
					<TableSkeleton />
				) : (
					<Table>
						<TableHeader className="sticky top-0 z-10 bg-white dark:bg-gray-950">
							{table.getHeaderGroups().map((headerGroup) => (
								<TableRow key={headerGroup.id} className="flex w-full">
									{headerGroup.headers.map((header) => (
										<TableHead
											key={header.id}
											className="flex items-center"
											style={{ width: header.getSize() }}
										>
											{flexRender(
												header.column.columnDef.header,
												header.getContext(),
											)}
										</TableHead>
									))}
								</TableRow>
							))}
						</TableHeader>

						<TableBody
							className="relative"
							style={{ height: `${rowVirtualizer.getTotalSize()}px` }}
						>
							{rowVirtualizer.getVirtualItems().map((virtualRow) => {
								const row = rows[virtualRow.index];
								return (
									<TableRow
										key={row.id}
										className="absolute"
										style={{ transform: `translateY(${virtualRow.start}px)` }}
									>
										{row.getVisibleCells().map((cell) => (
											<TableCell
												key={cell.id}
												style={{ width: cell.column.getSize() }}
											>
												{flexRender(
													cell.column.columnDef.cell,
													cell.getContext(),
												)}
											</TableCell>
										))}
									</TableRow>
								);
							})}
						</TableBody>
					</Table>
				)}
			</div>
		</>
	);
}
