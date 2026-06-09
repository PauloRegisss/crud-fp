"use client";

import {
	CheckCircle2,
	Dumbbell,
	Flame,
	Lightbulb,
	LoaderCircle,
} from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import useAuth from "@/app/login/auth-context";
import { Badge } from "@/components/ui/badge";
import type { SugestaoItem } from "@/lib/api";

const OBJETIVOS = [
	{ label: "Todos", value: "" },
	{ label: "Hipertrofia", value: "Hipertrofia" },
	{ label: "Emagrecimento", value: "Emagrecimento" },
];

const OBJETIVO_ICONS: Record<string, typeof Dumbbell> = {
	Hipertrofia: Dumbbell,
	Emagrecimento: Flame,
};

export default function SugestoesPage() {
	const { user, isLoading, fetchSugestoes, sugestoes } = useAuth();
	const [loading, setLoading] = useState(true);
	const [objetivo, setObjetivo] = useState<string>("");
	const [items, setItems] = useState<SugestaoItem[]>([]);

	// biome-ignore lint/correctness/useExhaustiveDependencies: initial load only
	useEffect(() => {
		if (user) {
			setLoading(true);
			fetchSugestoes(objetivo || undefined)
				.then(() => {})
				.catch((err: unknown) => {
					toast.error(
						err instanceof Error ? err.message : "Erro ao carregar sugestões",
					);
				})
				.finally(() => setLoading(false));
		}
	}, [user]);

	useEffect(() => {
		setItems(sugestoes as unknown as SugestaoItem[]);
	}, [sugestoes]);

	async function handleFilter(obj: string) {
		setObjetivo(obj);
		setLoading(true);
		try {
			await fetchSugestoes(obj || undefined);
		} catch (err: unknown) {
			toast.error(
				err instanceof Error ? err.message : "Erro ao filtrar sugestões",
			);
		} finally {
			setLoading(false);
		}
	}

	if (isLoading || loading) {
		return (
			<div className="flex h-full items-center justify-center">
				<LoaderCircle className="size-10 animate-spin text-[#4a5a4a]" />
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-[#f8faf8] p-6 md:p-10">
			<div className="mb-8">
				<h1 className="text-2xl font-bold text-[#0f1a0f]">Sugestões</h1>
				<p className="text-sm text-[#6a7a6a]">
					Recomendações de treinos personalizados para você
				</p>
			</div>

			<div className="mb-6 flex gap-2">
				{OBJETIVOS.map((item) => (
					<button
						key={item.value}
						type="button"
						onClick={() => handleFilter(item.value)}
						className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
							objetivo === item.value
								? "bg-green-600 text-white"
								: "bg-white text-[#4a5a4a] hover:bg-[#f0f9f0] border border-[#e8f0e8]"
						}`}
					>
						{item.label}
					</button>
				))}
			</div>

			{items.length === 0 ? (
				<div className="flex flex-col items-center justify-center rounded-2xl border bg-white py-16 shadow-sm">
					<Lightbulb className="size-12 text-[#4a5a4a]/30" />
					<p className="mt-4 text-[#4a5a4a]">Nenhuma sugestão disponível</p>
					<p className="text-sm text-[#8a9a8a]">
						Selecione um objetivo para ver sugestões de treinos
					</p>
				</div>
			) : (
				<div className="flex flex-col gap-4">
					{items.map((treino: SugestaoItem, i: number) => {
						const Icon = OBJETIVO_ICONS[treino.objetivo ?? ""] ?? Lightbulb;
						const isHipertrofia = treino.objetivo === "Hipertrofia";
						return (
							<div
								key={`${treino.nome}-${String(i)}`}
								className="rounded-2xl border bg-white p-5 shadow-sm"
							>
								<div className="flex items-start justify-between">
									<div className="flex items-center gap-3">
										<div
											className={`flex size-10 items-center justify-center rounded-xl ${
												isHipertrofia ? "bg-green-50" : "bg-orange-50"
											}`}
										>
											<Icon
												className={`size-5 ${
													isHipertrofia ? "text-green-600" : "text-orange-600"
												}`}
											/>
										</div>
										<div>
											<div className="flex items-center gap-2">
												<h3 className="font-semibold text-[#0f1a0f]">
													{treino.nome}
												</h3>
												{treino.ja_existe && (
													<Badge className="bg-gray-100 text-gray-600 border border-gray-200 text-xs">
														Já cadastrado
													</Badge>
												)}
											</div>
											<div className="flex items-center gap-2 text-sm text-[#6a7a6a]">
												{treino.tipo && <span>{treino.tipo}</span>}
												{treino.duracao && (
													<>
														{treino.tipo && (
															<span className="text-[#8a9a8a]">&#183;</span>
														)}
														<span>{treino.duracao}</span>
													</>
												)}
											</div>
										</div>
									</div>
									{treino.objetivo && (
										<Badge
											variant="secondary"
											className={`border ${
												isHipertrofia
													? "border-green-200 bg-green-50 text-green-700"
													: "border-orange-200 bg-orange-50 text-orange-700"
											}`}
										>
											{treino.objetivo}
										</Badge>
									)}
								</div>
								{(treino.meta || treino.objetivo) && (
									<div className="mt-3 rounded-lg bg-[#f8faf8] p-3">
										{treino.objetivo && (
											<p className="text-sm">
												<span className="font-medium text-[#0f1a0f]">
													Objetivo:
												</span>{" "}
												<span className="text-[#4a5a4a]">
													{treino.objetivo}
												</span>
											</p>
										)}
										{treino.meta && (
											<p className="text-sm">
												<span className="font-medium text-[#0f1a0f]">
													Meta:
												</span>{" "}
												<span className="text-[#4a5a4a]">{treino.meta}</span>
											</p>
										)}
									</div>
								)}
								{treino.habitos_saudaveis && (
									<div className="mt-3 rounded-lg bg-green-50 border border-green-100 p-3">
										<div className="flex items-center gap-2 mb-1">
											<CheckCircle2 className="size-4 text-green-600" />
											<span className="text-sm font-medium text-green-800">
												Hábitos Saudáveis
											</span>
										</div>
										<p className="text-sm text-green-700">
											{treino.habitos_saudaveis}
										</p>
									</div>
								)}
								{treino.dicas && treino.dicas.length > 0 && (
									<div className="mt-3 rounded-lg bg-blue-50 border border-blue-100 p-3">
										<p className="text-sm font-medium text-blue-800 mb-1">
											Dicas
										</p>
										<ul className="list-disc list-inside text-sm text-blue-700 space-y-0.5">
											{treino.dicas.map((dica: string, j: number) => (
												<li key={String(j)}>{dica}</li>
											))}
										</ul>
									</div>
								)}
							</div>
						);
					})}
				</div>
			)}
		</div>
	);
}
