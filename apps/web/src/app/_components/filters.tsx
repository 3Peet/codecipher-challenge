import { DebouncedInput } from "@/components/debounced-input";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuCheckboxItem,
	DropdownMenuContent,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { Table } from "@tanstack/react-table";
import { ChevronDown, Columns2 } from "lucide-react";
import type { ProductR } from "./columns";

export default function Filters({ table }: { table: Table<ProductR> }) {
	const column = table.getColumn("name");
	const columnFilterValue = column?.getFilterValue();

	return (
		<div className="flex items-center gap-4 sm:gap-0">
			<DebouncedInput
				value={(columnFilterValue ?? "") as string}
				onChange={(value) => column?.setFilterValue(value)}
				debounce={700}
				placeholder="Search..."
				className="max-w-sm"
				type="text"
			/>
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button variant="outline" className="ml-auto">
						<Columns2 />
						<span className="hidden sm:block">Customize Columns</span>
						<ChevronDown />
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent align="end">
					{table
						.getAllColumns()
						.filter((column) => column.getCanHide())
						.map((column) => {
							return (
								<DropdownMenuCheckboxItem
									key={column.id}
									checked={column.getIsVisible()}
									onCheckedChange={(value) => column.toggleVisibility(!!value)}
								>
									{column.columnDef.header?.toString()}
								</DropdownMenuCheckboxItem>
							);
						})}
				</DropdownMenuContent>
			</DropdownMenu>
		</div>
	);
}
