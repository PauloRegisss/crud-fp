"use client";

import { Toaster } from "sonner";
import { AuthProvider } from "@/app/login/auth-context";
import { Sidebar } from "@/components/sidebar";

export default function DashboardLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<AuthProvider>
			<div className="flex h-screen flex-col md:flex-row">
				<Sidebar />
				<main className="flex-1 overflow-auto bg-[#f8faf8]">{children}</main>
			</div>
			<Toaster richColors position="top-right" />
		</AuthProvider>
	);
}
