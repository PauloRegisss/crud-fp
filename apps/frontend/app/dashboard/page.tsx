"use client";
import {
	Clock3,
	Dumbbell,
	LoaderCircle,
	Target,
	TrendingUp,
} from "lucide-react";
import { useEffect, useState } from "react";
import useAuth, {
	type Evolucao,
	type Exercicio,
	type Meta,
	type Treino,
} from "../login/auth-context";

export default function DashboardPage() {
	const {
		user,
		isLoading,
		fetchTreinos,
		fetchMetas,
		fetchExercicios,
		fetchEvolucoes,
	} = useAuth();
	const [treinos, setTreinos] = useState<Treino[] | null>(null);
	const [metas, setMetas] = useState<Meta[] | null>(null);
	const [exercicios, setExercicios] = useState<Exercicio[] | null>(null);
	const [evolucoes, setEvolucoes] = useState<Evolucao[] | null>(null);

	useEffect(() => {
		if (user) {
			Promise.all([
				fetchTreinos(),
				fetchMetas(),
				fetchExercicios(),
				fetchEvolucoes(),
			])
				.then(([t, m, e, ev]) => {
					setTreinos(t);
					setMetas(m);
					setExercicios(e);
					setEvolucoes(ev);
				})
				.catch(console.error);
		}
	}, [user, fetchTreinos, fetchMetas, fetchExercicios, fetchEvolucoes]);

	if (isLoading || !treinos || !metas || !exercicios) {
		return (
			<div className="flex h-full items-center justify-center">
				<LoaderCircle className="size-10 animate-spin text-[#4a5a4a]" />
			</div>
		);
	}

	if (!user) return null;

	const completedMetas = metas.filter((m) => m.status === "Concluída").length;
	const totalMetas = metas.length;
	const metaProgress =
		totalMetas > 0 ? Math.round((completedMetas / totalMetas) * 100) : 0;

	const now = new Date();
	const weekStart = new Date(now);
	weekStart.setDate(now.getDate() - now.getDay());
	weekStart.setHours(0, 0, 0, 0);
	const treinosSemana = treinos.filter((t) => {
		if (!t.data) return false;
		const parts = t.data.includes("-") ? t.data.split("-") : t.data.split("/");
		if (parts.length !== 3) return false;
		let year: number, month: number, day: number;
		if (t.data.includes("-")) {
			year = Number(parts[0]);
			month = Number(parts[1]) - 1;
			day = Number(parts[2]);
		} else {
			day = Number(parts[0]);
			month = Number(parts[1]) - 1;
			year = Number(parts[2]);
		}
		const d = new Date(year, month, day);
		return d >= weekStart;
	}).length;

	const statusColors: Record<string, string> = {
		"Em andamento": "bg-blue-50 text-blue-700",
		Concluída: "bg-green-50 text-green-700",
		Pendente: "bg-amber-50 text-amber-700",
	};

	return (
		<div className="p-6 md:p-10">
			<div className="mb-8">
				<h2 className="text-2xl font-bold text-[#0f1a0f]">Olá, {user.nome}!</h2>
				<p className="text-sm text-[#6a7a6a]">
					Aqui está o resumo da sua evolução fitness
				</p>
			</div>

			<div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
				<div className="rounded-2xl border bg-white p-5 shadow-sm">
					<div className="mb-3 flex items-center justify-between">
						<span className="text-sm text-[#6a7a6a]">Treinos</span>
						<div className="flex size-8 items-center justify-center rounded-lg bg-green-50">
							<Dumbbell className="size-4 text-green-600" />
						</div>
					</div>
					<p className="text-2xl font-bold text-[#0f1a0f]">{treinos.length}</p>
				</div>
				<div className="rounded-2xl border bg-white p-5 shadow-sm">
					<div className="mb-3 flex items-center justify-between">
						<span className="text-sm text-[#6a7a6a]">Metas</span>
						<div className="flex size-8 items-center justify-center rounded-lg bg-green-50">
							<Target className="size-4 text-green-600" />
						</div>
					</div>
					<p className="text-2xl font-bold text-[#0f1a0f]">{metas.length}</p>
				</div>
				<div className="rounded-2xl border bg-white p-5 shadow-sm">
					<div className="mb-3 flex items-center justify-between">
						<span className="text-sm text-[#6a7a6a]">Exercícios</span>
						<div className="flex size-8 items-center justify-center rounded-lg bg-green-50">
							<Clock3 className="size-4 text-green-600" />
						</div>
					</div>
					<p className="text-2xl font-bold text-[#0f1a0f]">
						{exercicios.length}
					</p>
				</div>
				<div className="rounded-2xl border bg-white p-5 shadow-sm">
					<div className="mb-3 flex items-center justify-between">
						<span className="text-sm text-[#6a7a6a]">Treinos da semana</span>
						<div className="flex size-8 items-center justify-center rounded-lg bg-green-50">
							<TrendingUp className="size-4 text-green-600" />
						</div>
					</div>
					<p className="text-2xl font-bold text-[#0f1a0f]">{treinosSemana}</p>
				</div>
			</div>

			<div className="mt-6 grid gap-6 lg:grid-cols-3">
				<div className="rounded-2xl border bg-white p-6 shadow-sm">
					<h3 className="mb-4 text-lg font-semibold text-[#0f1a0f]">
						Treinos Recentes
					</h3>
					{treinos.length === 0 ? (
						<p className="text-sm text-[#8a9a8a]">Nenhum treino cadastrado</p>
					) : (
						<div className="flex flex-col gap-3">
							{treinos.slice(0, 5).map((treino, _) => (
								<div
									key={treino.nome + String(_)}
									className="flex items-center justify-between rounded-xl bg-[#f8faf8] p-3"
								>
									<div className="flex items-center gap-3">
										<div className="flex size-8 items-center justify-center rounded-lg bg-green-50">
											<Dumbbell className="size-4 text-green-600" />
										</div>
										<span className="font-medium text-[#0f1a0f]">
											{treino.nome}
										</span>
									</div>
									{treino.tipo && (
										<span className="text-xs text-[#6a7a6a]">
											{treino.tipo}
										</span>
									)}
								</div>
							))}
						</div>
					)}
				</div>

				<div className="rounded-2xl border bg-white p-6 shadow-sm">
					<h3 className="mb-4 text-lg font-semibold text-[#0f1a0f]">
						Progresso das Metas
					</h3>
					{metas.length === 0 ? (
						<p className="text-sm text-[#8a9a8a]">Nenhuma meta cadastrada</p>
					) : (
						<div className="flex flex-col gap-4">
							<div className="flex items-center gap-3">
								<div className="flex-1">
									<div className="mb-1 flex justify-between text-sm">
										<span className="text-[#4a5a4a]">
											{completedMetas} de {totalMetas} metas concluídas
										</span>
										<span className="font-medium text-green-600">
											{metaProgress}%
										</span>
									</div>
									<div className="h-2 rounded-full bg-[#e8f0e8]">
										<div
											className="h-2 rounded-full bg-green-600 transition-all"
											style={{ width: `${metaProgress}%` }}
										/>
									</div>
								</div>
							</div>
							<div className="flex flex-col gap-2">
								{metas.slice(0, 5).map((meta, i) => (
									<div
										key={`${meta.descricao}-${String(i)}`}
										className="flex items-center justify-between rounded-xl bg-[#f8faf8] p-3"
									>
										<span className="max-w-[200px] truncate font-medium text-[#0f1a0f]">
											{meta.descricao}
										</span>
										<span
											className={`rounded-lg px-2.5 py-1 text-xs font-medium ${statusColors[meta.status ?? "Pendente"] ?? "bg-gray-50 text-gray-700"}`}
										>
											{meta.status ?? "Pendente"}
										</span>
									</div>
								))}
							</div>
						</div>
					)}
				</div>

				<div className="rounded-2xl border bg-white p-6 shadow-sm">
					<h3 className="mb-4 text-lg font-semibold text-[#0f1a0f]">
						Evolução Física
					</h3>
					{!evolucoes || evolucoes.length === 0 ? (
						<p className="text-sm text-[#8a9a8a]">Nenhuma medição registrada</p>
					) : (
						<div className="flex flex-col gap-3">
							{evolucoes
								.slice(-5)
								.reverse()
								.map((ev, i) => (
									<div
										key={`${ev.data}-${String(i)}`}
										className="flex items-center justify-between rounded-xl bg-[#f8faf8] p-3"
									>
										<div className="flex flex-col">
											<span className="font-medium text-[#0f1a0f]">
												{new Date(ev.data).toLocaleDateString("pt-BR")}
											</span>
											<span className="text-xs text-[#6a7a6a]">
												{ev.peso && `${ev.peso} kg`}
												{ev.gordura && ` · ${ev.gordura}% gordura`}
											</span>
										</div>
										{ev.peso && (
											<div className="flex size-8 items-center justify-center rounded-lg bg-green-50">
												<TrendingUp className="size-4 text-green-600" />
											</div>
										)}
									</div>
								))}
						</div>
					)}
				</div>
			</div>
		</div>
	);
}
