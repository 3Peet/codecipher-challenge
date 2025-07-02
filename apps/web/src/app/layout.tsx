import "../index.css";

import { Geist, Geist_Mono } from "next/font/google";

import Header from "@/components/header";
import Providers from "@/components/providers";
import type { Metadata } from "next";
import { Suspense } from "react";
import ProductsSkeleton from "./_components/products-skeleton";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "challenge-01",
	description: "challenge-01",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased`}
			>
				<Providers>
					<div className="grid h-svh grid-rows-[auto_1fr]">
						<Header />
						<Suspense fallback={<ProductsSkeleton />}>{children}</Suspense>
					</div>
				</Providers>
			</body>
		</html>
	);
}
