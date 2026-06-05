import { Sidebar } from "@/components/sidebar";
import { AuthProvider } from "../login/auth-context";

export default function DashboardLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<AuthProvider>
			<div className="flex h-screen">
				<Sidebar />
				<main className="flex-1 overflow-auto bg-[#f8faf8]">{children}</main>
			</div>
		</AuthProvider>
	);
}
