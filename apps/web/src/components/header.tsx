import { caller } from "@/lib/trpc/server";
import { cn } from "@/lib/utils";
import { ModeToggle } from "./mode-toggle";

export default async function Header() {
	const healthCheck = await caller.healthCheck();
	return (
		<div>
			<div className="container mx-auto flex w-full justify-between px-4">
				<div className="flex flex-row items-center gap-2">
					<span className="text-current text-sm">API Status: </span>
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
				<ModeToggle />
			</div>
			<hr />
		</div>
	);
}
