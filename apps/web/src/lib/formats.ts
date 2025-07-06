export function formatDate(date: string | Date | null | undefined) {
	if (!date) return "N/A";
	const d = typeof date === "string" ? new Date(date) : date;
	return Number.isNaN(d.getTime()) ? "N/A" : d.toLocaleDateString();
}
