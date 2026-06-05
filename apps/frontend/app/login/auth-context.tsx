"use client";
import { useRouter } from "next/navigation";
import {
	createContext,
	useContext,
	useEffect,
	useState,
	useTransition,
} from "react";

interface User {
	nome: string;
}

const AuthContext = createContext<{
	user: User | null;
	isLoading: boolean;
}>({
	user: null,
	isLoading: true,
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
	const [user, setUser] = useState<User | null>(null);
	const [isLoading, setLoading] = useTransition();
	const router = useRouter();

	useEffect(() => {
		setLoading(() => {
			if (typeof window !== "undefined") {
				const user = localStorage.getItem("auth_info");
				if (!user) router.replace("/login");
				else {
					setUser({ nome: JSON.parse(user).name });
					router.replace("/dashboard");
				}
			}
		});
	}, [router.replace]);
	return (
		<AuthContext.Provider value={{ user, isLoading }}>
			{children}
		</AuthContext.Provider>
	);
}

export default function useAuth() {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error("useAuth must be used within a AuthContextProvider");
	}
	return context;
}
