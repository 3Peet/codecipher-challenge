import { formatDate } from "@/lib/formats";
import type { ColumnDef } from "@tanstack/react-table"; // Import ColumnDef
import type { Product } from "server/src/db/schema/products";

// Define a type for API response with string date fields
export type ProductR = Omit<
	Product,
	"created_at" | "updated_at" | "last_restocked_at" | "discontinued_at"
> & {
	created_at: string | null;
	updated_at: string | null;
	last_restocked_at: string | null;
	discontinued_at: string | null;
};

export const columns: ColumnDef<ProductR>[] = [
	{
		accessorKey: "id", // Use accessorKey for simple accessors
		cell: (info) => info.getValue(),
		header: "ID",
		size: 50,
	},
	{
		accessorKey: "sku",
		cell: (info) => (
			<span className="font-medium">{info.getValue() as string}</span>
		),
		header: "SKU",
		size: 120,
	},
	{
		accessorKey: "name",
		cell: (info) => (
			<span className="font-medium">{info.getValue() as string}</span>
		),
		header: "Name",
		size: 280,
	},
	{
		accessorKey: "description",
		cell: (info) => (info.getValue() as string) || "N/A",
		header: "Description",
		size: 520,
	},
	{
		accessorKey: "brand",
		cell: (info) => (info.getValue() as string) || "N/A",
		header: "Brand",
		size: 100,
	},
	{
		accessorKey: "category",
		cell: (info) => (info.getValue() as string) || "N/A",
		header: "Category",
		size: 140,
	},
	{
		accessorKey: "subcategory",
		cell: (info) => (info.getValue() as string) || "N/A",
		header: "Subcategory",
		size: 210,
	},
	{
		accessorKey: "price",
		cell: (info) => {
			const value = info.getValue() as number;
			return value ? `$${value}` : "N/A";
		},
		header: "Price",
		size: 100,
	},
	{
		accessorKey: "cost",
		cell: (info) => {
			const value = info.getValue() as number;
			return value ? `$${value.toFixed(2)}` : "N/A";
		},
		header: "Cost",
	},
	{
		accessorKey: "weight",
		cell: (info) => (info.getValue() as number) || "N/A",
		header: "Weight",
	},
	{
		accessorKey: "length",
		cell: (info) => (info.getValue() as number) || "N/A",
		header: "Length",
	},
	{
		accessorKey: "width",
		cell: (info) => (info.getValue() as number) || "N/A",
		header: "Width",
	},
	{
		accessorKey: "height",
		cell: (info) => (info.getValue() as number) || "N/A",
		header: "Height",
	},
	{
		accessorKey: "color",
		cell: (info) => (info.getValue() as string) || "N/A",
		header: "Color",
	},
	{
		accessorKey: "size",
		cell: (info) => (info.getValue() as string) || "N/A",
		header: "Size",
	},
	{
		accessorKey: "material",
		cell: (info) => (info.getValue() as string) || "N/A",
		header: "Material",
	},
	{
		accessorKey: "manufacturer",
		cell: (info) => (info.getValue() as string) || "N/A",
		header: "Manufacturer",
		size: 120,
	},
	{
		accessorKey: "country_of_origin",
		cell: (info) => (info.getValue() as string) || "N/A",
		header: "Country of Origin",
		size: 150,
	},
	{
		accessorKey: "barcode",
		cell: (info) => (info.getValue() as string) || "N/A",
		header: "Barcode",
		size: 160,
	},
	{
		accessorKey: "stock_quantity",
		cell: (info) => info.getValue(),
		header: "Stock Qty",
	},
	{
		accessorKey: "min_stock_level",
		cell: (info) => info.getValue(),
		header: "Min Stock",
	},
	{
		accessorKey: "max_stock_level",
		cell: (info) => info.getValue(),
		header: "Max Stock",
	},
	{
		accessorKey: "is_active",
		cell: (info) => (info.getValue() ? "Yes" : "No"),
		header: "Active",
	},
	{
		accessorKey: "is_featured",
		cell: (info) => (info.getValue() ? "Yes" : "No"),
		header: "Featured",
	},
	{
		accessorKey: "is_digital",
		cell: (info) => (info.getValue() ? "Yes" : "No"),
		header: "Digital",
	},
	{
		accessorKey: "requires_shipping",
		cell: (info) => (info.getValue() ? "Yes" : "No"),
		header: "Requires Shipping",
		size: 150,
	},
	{
		accessorKey: "tax_rate",
		cell: (info) => {
			const value = info.getValue() as number;
			return value ? `${(value * 100).toFixed(1)}%` : "N/A";
		},
		header: "Tax Rate",
	},
	{
		accessorKey: "warranty_months",
		cell: (info) => (info.getValue() as number) || "N/A",
		header: "Warranty (mo)",
		size: 120,
	},
	{
		accessorKey: "supplier_name",
		cell: (info) => (info.getValue() as string) || "N/A",
		header: "Supplier Name",
		size: 180,
	},
	{
		accessorKey: "supplier_code",
		cell: (info) => (info.getValue() as string) || "N/A",
		header: "Supplier Code",
		size: 140,
	},
	{
		accessorKey: "season",
		cell: (info) => (info.getValue() as string) || "N/A",
		header: "Season",
		size: 120,
	},
	{
		accessorKey: "collection",
		cell: (info) => (info.getValue() as string) || "N/A",
		header: "Collection",
		size: 150,
	},
	{
		accessorKey: "style",
		cell: (info) => (info.getValue() as string) || "N/A",
		header: "Style",
	},
	{
		accessorKey: "pattern",
		cell: (info) => (info.getValue() as string) || "N/A",
		header: "Pattern",
	},
	{
		accessorKey: "fabric_composition",
		cell: (info) => (info.getValue() as string) || "N/A",
		header: "Fabric",
	},
	{
		accessorKey: "care_instructions",
		cell: (info) => (info.getValue() as string) || "N/A",
		header: "Care",
		size: 280,
	},
	{
		accessorKey: "tags",
		cell: (info) => (info.getValue() as string) || "N/A",
		header: "Tags",
		size: 300,
	},
	{
		accessorKey: "meta_title",
		cell: (info) => (info.getValue() as string) || "N/A",
		header: "Meta Title",
		size: 340,
	},
	{
		accessorKey: "meta_description",
		cell: (info) => (info.getValue() as string) || "N/A",
		header: "Meta Desc",
		size: 520,
	},
	{
		accessorKey: "slug",
		cell: (info) => (info.getValue() as string) || "N/A",
		header: "Slug",
		size: 260,
	},
	{
		accessorKey: "rating_average",
		cell: (info) => {
			const value = info.getValue() as number;
			return value ? value.toFixed(1) : "N/A";
		},
		header: "Rating",
	},
	{
		accessorKey: "rating_count",
		cell: (info) => info.getValue(),
		header: "Rating Count",
		size: 120,
	},
	{
		accessorKey: "view_count",
		cell: (info) => info.getValue(),
		header: "Views",
	},
	{
		accessorKey: "purchase_count",
		cell: (info) => info.getValue(),
		header: "Purchases",
	},
	{
		accessorKey: "created_at",
		cell: (info) => {
			const value = info.getValue() as string | null;
			return formatDate(value);
		},
		header: "Created At",
	},
	{
		accessorKey: "updated_at",
		cell: (info) => {
			const value = info.getValue() as string | null;
			return formatDate(value);
		},
		header: "Updated At",
	},
	{
		accessorKey: "last_restocked_at",
		cell: (info) => {
			const value = info.getValue() as string | null;
			return formatDate(value);
		},
		header: "Last Restocked",
		size: 120,
	},
	{
		accessorKey: "discontinued_at",
		cell: (info) => {
			const value = info.getValue() as string | null;
			return formatDate(value);
		},
		header: "Discontinued At",
	},
];
