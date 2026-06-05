import { Sidebar } from "@/components/ui/sidebar";
import {
	Dumbbell,
	Target,
	Flame,
	Clock3,
} from "lucide-react";

const stats = [
	{
		title: "Treinos da Semana",
		value: "4",
		icon: Dumbbell,
	},
	{
		title: "Meta de Peso",
		value: "-2.5kg",
		icon: Target,
	},
	{
		title: "Horas Treinadas",
		value: "6.5h",
		icon: Clock3,
	},
	{
		title: "Sequência Atual",
		value: "12 dias",
		icon: Flame,
	},
];

export default function DashboardPage() {
	return (
		<div className="flex min-h-screen bg-[#fafafa]">
			<Sidebar />

			<main className="flex-1 p-8">
				<div className="mb-8 flex items-start justify-between">
					<div>
						<h1 className="text-3xl font-bold">
							Olá, Marina! 👋
						</h1>

						<p className="mt-1 text-muted-foreground">
							Aqui está o resumo da sua evolução fitness
						</p>
					</div>

					<button className="rounded-lg bg-primary px-5 py-2 text-sm font-medium text-white shadow">
						+ Novo Plano
					</button>
				</div>

				<div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
					{stats.map((stat) => {
						const Icon = stat.icon;

						return (
							<div
								key={stat.title}
								className="rounded-2xl border bg-white p-6 shadow-sm"
							>
								<div className="mb-5 flex items-center justify-between">
									<span className="text-sm text-muted-foreground">
										{stat.title}
									</span>

									<div className="rounded-lg bg-muted p-2">
										<Icon className="size-4 text-primary" />
									</div>
								</div>

								<h2 className="text-4xl font-bold">
									{stat.value}
								</h2>
							</div>
						);
					})}
				</div>

				<div className="mt-6 grid gap-4 xl:grid-cols-[2fr_1fr]">
					<div className="rounded-2xl border bg-white p-6 shadow-sm">
						<h3 className="mb-6 text-xl font-semibold">
							Treinos Recentes
						</h3>

						<div className="space-y-4">
							<div className="flex items-center justify-between rounded-xl bg-muted/40 p-4">
								<div>
									<p className="font-medium">
										Treino A - Peito e Tríceps
									</p>

									<p className="text-sm text-muted-foreground">
										Musculação • 55 min
									</p>
								</div>

								<span className="text-sm text-muted-foreground">
									Hoje
								</span>
							</div>

							<div className="flex items-center justify-between rounded-xl bg-muted/40 p-4">
								<div>
									<p className="font-medium">
										Corrida Intervalada
									</p>

									<p className="text-sm text-muted-foreground">
										Cardio • 30 min
									</p>
								</div>

								<span className="text-sm text-muted-foreground">
									Ontem
								</span>
							</div>

							<div className="flex items-center justify-between rounded-xl bg-muted/40 p-4">
								<div>
									<p className="font-medium">
										Treino B - Costas e Bíceps
									</p>

									<p className="text-sm text-muted-foreground">
										Musculação • 50 min
									</p>
								</div>

								<span className="text-sm text-muted-foreground">
									2 dias atrás
								</span>
							</div>

							<div className="flex items-center justify-between rounded-xl bg-muted/40 p-4">
								<div>
									<p className="font-medium">
										Treino Funcional
									</p>

									<p className="text-sm text-muted-foreground">
										Funcional • 40 min
									</p>
								</div>

								<span className="text-sm text-muted-foreground">
									3 dias atrás
								</span>
							</div>
						</div>
					</div>

					<div className="rounded-2xl border bg-white p-6 shadow-sm">
						<h3 className="mb-6 text-xl font-semibold">
							Suas Metas
						</h3>

						<div className="space-y-6">
							<div>
								<div className="mb-2 flex justify-between">
									<span>Perder 5kg</span>
									<span className="text-sm text-green-600">
										50%
									</span>
								</div>

								<div className="h-2 rounded-full bg-muted">
									<div className="h-2 w-1/2 rounded-full bg-green-500" />
								</div>

								<p className="mt-2 text-xs text-muted-foreground">
									2.5kg perdidos
								</p>
							</div>

							<div>
								<div className="mb-2 flex justify-between">
									<span>Treinar 4x por semana</span>
									<span className="text-sm text-blue-600">
										75%
									</span>
								</div>

								<div className="h-2 rounded-full bg-muted">
									<div className="h-2 w-3/4 rounded-full bg-blue-500" />
								</div>

								<p className="mt-2 text-xs text-muted-foreground">
									3/4 esta semana
								</p>
							</div>

							<div>
								<div className="mb-2 flex justify-between">
									<span>Correr 5km sem parar</span>
									<span className="text-sm text-violet-600">
										60%
									</span>
								</div>

								<div className="h-2 rounded-full bg-muted">
									<div className="h-2 w-[60%] rounded-full bg-violet-500" />
								</div>

								<p className="mt-2 text-xs text-muted-foreground">
									3km alcançados
								</p>
							</div>
						</div>
					</div>
				</div>
			</main>
		</div>
	);
}