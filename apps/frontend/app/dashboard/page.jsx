import {
	Dumbbell,
	Target,
	Flame,
	Clock3,
	LayoutDashboard,
	ListChecks,
	TrendingUp,
} from "lucide-react";
import Link from "next/link";

const stats = [
	{
		title: "Treinos da Semana",
		value: "12",
		icon: Dumbbell,
	},
	{
		title: "Meta de Peso",
		value: "78kg",
		icon: Target,
	},
	{
		title: "Horas Treinadas",
		value: "24h",
		icon: Clock3,
	},
	{
		title: "Sequência Atual",
		value: "18 dias",
		icon: Flame,
	},
];

export default function DashboardPage() {
	return (
		<div className="min-h-screen bg-[#f8faf8]">
			<div className="flex">
				<aside className="flex min-h-screen w-72 flex-col bg-linear-to-b from-primary to-green-800 p-8 text-white">
					<div className="mb-10">
						<h1 className="text-3xl font-bold">FitPlanner</h1>
						<p className="text-sm text-white/80">
							Sua jornada fitness
						</p>
					</div>

					<nav className="flex flex-col gap-3">
						<Link
							href="/dashboard"
							className="flex items-center gap-3 rounded-xl bg-white/15 p-3"
						>
							<LayoutDashboard size={20} />
							Dashboard
						</Link>

						<Link
							href="/planos"
							className="flex items-center gap-3 rounded-xl p-3 transition hover:bg-white/10"
						>
							<ListChecks size={20} />
							Planos de Treino
						</Link>

						<Link
							href="#"
							className="flex items-center gap-3 rounded-xl p-3 transition hover:bg-white/10"
						>
							<TrendingUp size={20} />
							Evolução
						</Link>
					</nav>
				</aside>

				<main className="flex-1 p-10">
					<div className="mb-8">
						<h2 className="text-4xl font-extrabold">
							Olá, ---
						</h2>
						<p className="text-muted-foreground">
							Acompanhe sua evolução fitness.
						</p>
					</div>

					<div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
						{stats.map((stat) => {
							const Icon = stat.icon;

							return (
								<div
									key={stat.title}
									className="rounded-2xl border bg-card p-6 shadow-lg shadow-black/5"
								>
									<div className="mb-4 flex justify-between">
										<span className="text-muted-foreground">
											{stat.title}
										</span>

										<Icon className="text-primary" />
									</div>

									<h3 className="text-3xl font-bold">
										{stat.value}
									</h3>
								</div>
							);
						})}
					</div>

					<div className="mt-8 grid gap-6 lg:grid-cols-2">
						<div className="rounded-2xl border bg-card p-6 shadow-lg shadow-black/5">
							<h3 className="mb-4 text-xl font-bold">
								Treinos Recentes
							</h3>

							<div className="space-y-4">
								<div className="rounded-xl bg-muted/50 p-4">
									Treino A - Peito e Tríceps
								</div>

								<div className="rounded-xl bg-muted/50 p-4">
									Treino B - Costas e Bíceps
								</div>

								<div className="rounded-xl bg-muted/50 p-4">
									Cardio Moderado
								</div>
							</div>
						</div>

						<div className="rounded-2xl border bg-card p-6 shadow-lg shadow-black/5">
							<h3 className="mb-4 text-xl font-bold">
								Metas Atuais
							</h3>

							<div className="space-y-5">
								<div>
									<p className="mb-2 font-medium">
										Perder 5kg
									</p>

									<div className="h-3 rounded-full bg-muted">
										<div className="h-3 w-[70%] rounded-full bg-primary" />
									</div>
								</div>

								<div>
									<p className="mb-2 font-medium">
										20 treinos este mês
									</p>

									<div className="h-3 rounded-full bg-muted">
										<div className="h-3 w-[55%] rounded-full bg-primary" />
									</div>
								</div>
							</div>
						</div>
					</div>
				</main>
			</div>
		</div>
	);
}