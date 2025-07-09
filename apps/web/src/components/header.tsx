import { caller } from "@/lib/trpc/server";
import { cn } from "@/lib/utils";

export default async function Header() {
	const healthCheck = await caller.healthCheck();
	return (
		<div>
			<div className="flex flex-row items-center gap-2 px-2 py-1">
				<span className="text-muted-foreground text-sm">API Status: </span>
				<span className="relative flex size-2">
					<span
						className={cn(
							"absolute inline-flex h-full w-full animate-ping rounded-full opacity-90",
							healthCheck ? "bg-emerald-400" : "bg-red-300",
						)}
					/>
					<span
						className={cn(
							"relative inline-flex size-2 rounded-full bg-emerald-500",
							healthCheck ? "bg-emerald-500" : "bg-red-400",
						)}
					/>
				</span>
			</div>
			<hr />
		</div>
	);
}
