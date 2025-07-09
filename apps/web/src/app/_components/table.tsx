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
import { useSuspenseInfiniteQuery } from "@tanstack/react-query";
import {
	flexRender,
	getCoreRowModel,
	useReactTable,
} from "@tanstack/react-table";
import { useVirtualizer } from "@tanstack/react-virtual";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { columns } from "./columns";

export function ProductsTable() {
	const trpc = useTRPC();
	const { data, fetchNextPage, isFetching, hasNextPage } =
		useSuspenseInfiniteQuery(
			trpc.getAllProducts.infiniteQueryOptions(
				{ limit: 50, cursor: 0 },
				{ getNextPageParam: (lastPage) => lastPage.nextCursor },
			),
		);

	//we need a reference to the scrolling element for logic down below
	const tableContainerRef = useRef<HTMLDivElement>(null);

	const flatData = useMemo(
		() => data.pages.flatMap((page) => page.products),
		[data.pages],
	);

	const totalFetched = flatData.length;

	//called on scroll and possibly on mount to fetch more data as the user scrolls and reaches bottom of table
	const fetchMoreOnBottomReached = useCallback(
		(containerRefElement?: HTMLDivElement | null) => {
			if (containerRefElement) {
				const { scrollHeight, scrollTop, clientHeight } = containerRefElement;
				//once the user has scrolled within 500px of the bottom of the table, fetch more data if we can
				if (
					scrollHeight - scrollTop - clientHeight < 500 &&
					!isFetching &&
					hasNextPage
				) {
					fetchNextPage();
				}
			}
		},
		[fetchNextPage, isFetching, totalFetched, hasNextPage],
	);

	// check on mount and after a fetch to see if the table is already scrolled to the bottom and immediately needs to fetch more data
	useEffect(() => {
		fetchMoreOnBottomReached(tableContainerRef.current);
	}, [fetchMoreOnBottomReached]);

	const table = useReactTable({
		data: flatData,
		columns,
		getCoreRowModel: getCoreRowModel(),
		defaultColumn: {
			size: 100,
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
		<div
			className="relative h-[78dvh] overflow-auto"
			onScroll={(e) => fetchMoreOnBottomReached(e.currentTarget)}
			ref={tableContainerRef}
		>
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
										{flexRender(cell.column.columnDef.cell, cell.getContext())}
									</TableCell>
								))}
							</TableRow>
						);
					})}
				</TableBody>
			</Table>
		</div>
	);
}
