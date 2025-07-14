import { formatDate } from "@/lib/formats";
import { createColumnHelper } from "@tanstack/react-table";
import type { Product } from "server/src/db/schema/products";

// Define a type for API response with string date fields
type ProductR = Omit<
	Product,
	"created_at" | "updated_at" | "last_restocked_at" | "discontinued_at"
> & {
	created_at: string | null;
	updated_at: string | null;
	last_restocked_at: string | null;
	discontinued_at: string | null;
};

const columnHelper = createColumnHelper<ProductR>();

export const columns = [
	columnHelper.accessor("id", {
		cell: (info) => info.getValue(),
		header: "ID",
		size: 50,
	}),
	columnHelper.accessor("sku", {
		cell: (info) => <span className="font-medium">{info.getValue()}</span>,
		header: "SKU",
		size: 120,
	}),
	columnHelper.accessor("name", {
		cell: (info) => <span className="font-medium">{info.getValue()}</span>,
		header: "Name",
		size: 280,
	}),
	columnHelper.accessor("description", {
		cell: (info) => info.getValue() || "N/A",
		header: "Description",
		size: 520,
	}),
	columnHelper.accessor("brand", {
		cell: (info) => info.getValue() || "N/A",
		header: "Brand",
		size: 100,
	}),
	columnHelper.accessor("category", {
		cell: (info) => info.getValue() || "N/A",
		header: "Category",
		size: 140,
	}),
	columnHelper.accessor("subcategory", {
		cell: (info) => info.getValue() || "N/A",
		header: "Subcategory",
		size: 210,
	}),
	columnHelper.accessor("price", {
		cell: (info) => {
			const value = info.getValue();
			return value ? `$${value}` : "N/A";
		},
		header: "Price",
		size: 100,
	}),
	columnHelper.accessor("cost", {
		cell: (info) => {
			const value = info.getValue();
			return value ? `$${value.toFixed(2)}` : "N/A";
		},
		header: "Cost",
	}),
	columnHelper.accessor("weight", {
		cell: (info) => info.getValue() || "N/A",
		header: "Weight",
	}),
	columnHelper.accessor("length", {
		cell: (info) => info.getValue() || "N/A",
		header: "Length",
	}),
	columnHelper.accessor("width", {
		cell: (info) => info.getValue() || "N/A",
		header: "Width",
	}),
	columnHelper.accessor("height", {
		cell: (info) => info.getValue() || "N/A",
		header: "Height",
	}),
	columnHelper.accessor("color", {
		cell: (info) => info.getValue() || "N/A",
		header: "Color",
	}),
	columnHelper.accessor("size", {
		cell: (info) => info.getValue() || "N/A",
		header: "Size",
	}),
	columnHelper.accessor("material", {
		cell: (info) => info.getValue() || "N/A",
		header: "Material",
	}),
	columnHelper.accessor("manufacturer", {
		cell: (info) => info.getValue() || "N/A",
		header: "Manufacturer",
		size: 120,
	}),
	columnHelper.accessor("country_of_origin", {
		cell: (info) => info.getValue() || "N/A",
		header: "Country of Origin",
		size: 150,
	}),
	columnHelper.accessor("barcode", {
		cell: (info) => info.getValue() || "N/A",
		header: "Barcode",
		size: 160,
	}),
	columnHelper.accessor("stock_quantity", {
		cell: (info) => info.getValue(),
		header: "Stock Qty",
	}),
	columnHelper.accessor("min_stock_level", {
		cell: (info) => info.getValue(),
		header: "Min Stock",
	}),
	columnHelper.accessor("max_stock_level", {
		cell: (info) => info.getValue(),
		header: "Max Stock",
	}),
	columnHelper.accessor("is_active", {
		cell: (info) => (info.getValue() ? "Yes" : "No"),
		header: "Active",
	}),
	columnHelper.accessor("is_featured", {
		cell: (info) => (info.getValue() ? "Yes" : "No"),
		header: "Featured",
	}),
	columnHelper.accessor("is_digital", {
		cell: (info) => (info.getValue() ? "Yes" : "No"),
		header: "Digital",
	}),
	columnHelper.accessor("requires_shipping", {
		cell: (info) => (info.getValue() ? "Yes" : "No"),
		header: "Requires Shipping",
		size: 150,
	}),
	columnHelper.accessor("tax_rate", {
		cell: (info) => {
			const value = info.getValue();
			return value ? `${(value * 100).toFixed(1)}%` : "N/A";
		},
		header: "Tax Rate",
	}),
	columnHelper.accessor("warranty_months", {
		cell: (info) => info.getValue() || "N/A",
		header: "Warranty (mo)",
		size: 120,
	}),
	columnHelper.accessor("supplier_name", {
		cell: (info) => info.getValue() || "N/A",
		header: "Supplier Name",
		size: 180,
	}),
	columnHelper.accessor("supplier_code", {
		cell: (info) => info.getValue() || "N/A",
		header: "Supplier Code",
		size: 140,
	}),
	columnHelper.accessor("season", {
		cell: (info) => info.getValue() || "N/A",
		header: "Season",
		size: 120,
	}),
	columnHelper.accessor("collection", {
		cell: (info) => info.getValue() || "N/A",
		header: "Collection",
		size: 150,
	}),
	columnHelper.accessor("style", {
		cell: (info) => info.getValue() || "N/A",
		header: "Style",
	}),
	columnHelper.accessor("pattern", {
		cell: (info) => info.getValue() || "N/A",
		header: "Pattern",
	}),
	columnHelper.accessor("fabric_composition", {
		cell: (info) => info.getValue() || "N/A",
		header: "Fabric",
	}),
	columnHelper.accessor("care_instructions", {
		cell: (info) => info.getValue() || "N/A",
		header: "Care",
		size: 280,
	}),
	columnHelper.accessor("tags", {
		cell: (info) => info.getValue() || "N/A",
		header: "Tags",
		size: 300,
	}),
	columnHelper.accessor("meta_title", {
		cell: (info) => info.getValue() || "N/A",
		header: "Meta Title",
		size: 340,
	}),
	columnHelper.accessor("meta_description", {
		cell: (info) => info.getValue() || "N/A",
		header: "Meta Desc",
		size: 520,
	}),
	columnHelper.accessor("slug", {
		cell: (info) => info.getValue() || "N/A",
		header: "Slug",
		size: 260,
	}),
	columnHelper.accessor("rating_average", {
		cell: (info) => {
			const value = info.getValue();
			return value ? value.toFixed(1) : "N/A";
		},
		header: "Rating",
	}),
	columnHelper.accessor("rating_count", {
		cell: (info) => info.getValue(),
		header: "Rating Count",
		size: 120,
	}),
	columnHelper.accessor("view_count", {
		cell: (info) => info.getValue(),
		header: "Views",
	}),
	columnHelper.accessor("purchase_count", {
		cell: (info) => info.getValue(),
		header: "Purchases",
	}),
	columnHelper.accessor("created_at", {
		cell: (info) => {
			const value = info.getValue();
			return formatDate(value);
		},
		header: "Created At",
	}),
	columnHelper.accessor("updated_at", {
		cell: (info) => {
			const value = info.getValue();
			return formatDate(value);
		},
		header: "Updated At",
	}),
	columnHelper.accessor("last_restocked_at", {
		cell: (info) => {
			const value = info.getValue();
			return formatDate(value);
		},
		header: "Last Restocked",
		size: 120,
	}),
	columnHelper.accessor("discontinued_at", {
		cell: (info) => {
			const value = info.getValue();
			return formatDate(value);
		},
		header: "Discontinued At",
	}),
];
