"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderCircle, Pencil, Plus, Target, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import useAuth, { type Meta } from "@/app/login/auth-context";
import { ConfirmDialog } from "@/components/confirm-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { FieldError } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const metaSchema = z.object({
	descricao: z
		.string()
		.min(1, "A descrição é obrigatória.")
		.max(128, "A descrição pode ter no máximo 128 caracteres."),
	prazo: z.string(),
	status: z.string(),
});

type MetaFormData = z.infer<typeof metaSchema>;

const statusColors: Record<string, string> = {
	"Em andamento": "bg-blue-50 text-blue-700 border-blue-200",
	Concluída: "bg-green-50 text-green-700 border-green-200",
	Pendente: "bg-amber-50 text-amber-700 border-amber-200",
};

const statusOptions = [
	{ value: "Em andamento", label: "Em andamento" },
	{ value: "Concluída", label: "Concluída" },
	{ value: "Pendente", label: "Pendente" },
];

function CreateMetaDialog({ onCreated }: { onCreated: () => void }) {
	const [open, setOpen] = useState(false);
	const [loading, setLoading] = useState(false);
	const { createMeta } = useAuth();
	const { control, handleSubmit, reset } = useForm<MetaFormData>({
		resolver: zodResolver(metaSchema as never),
		defaultValues: {
			descricao: "",
			prazo: "",
			status: "Em andamento",
		},
	});

	async function onSubmit(data: MetaFormData) {
		setLoading(true);
		try {
			await createMeta({
				descricao: data.descricao,
				prazo: data.prazo ? Number(data.prazo) : null,
				status: data.status || undefined,
			});
			reset();
			setOpen(false);
			onCreated();
		} catch (err) {
			toast.error(err instanceof Error ? err.message : "Ocorreu um erro");
		} finally {
			setLoading(false);
		}
	}

	return (
		<Dialog
			open={open}
			onOpenChange={(v) => {
				setOpen(v);
				if (!v) reset();
			}}
		>
			<DialogTrigger asChild>
				<Button size="sm" className="gap-1.5">
					<Plus className="size-4" />
					Nova Meta
				</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogTitle>Nova Meta</DialogTitle>
				<DialogDescription>Defina um objetivo para alcançar</DialogDescription>
				<form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
					<div className="flex flex-col gap-1.5">
						<Controller
							name="descricao"
							control={control}
							render={({ field, fieldState }) => (
								<>
									<Label htmlFor="descricao">Descrição *</Label>
									<Input
										id="descricao"
										placeholder="Ex: Perder 5kg"
										{...field}
									/>
									{fieldState.invalid && (
										<FieldError errors={[fieldState.error]} />
									)}
								</>
							)}
						/>
					</div>
					<div className="flex flex-col gap-1.5">
						<Controller
							name="prazo"
							control={control}
							render={({ field }) => (
								<>
									<Label htmlFor="prazo">Prazo (dias)</Label>
									<Input
										id="prazo"
										type="number"
										placeholder="Ex: 30"
										{...field}
									/>
								</>
							)}
						/>
					</div>
					<div className="flex flex-col gap-1.5">
						<Controller
							name="status"
							control={control}
							render={({ field }) => (
								<>
									<Label htmlFor="status">Status</Label>
									<select
										id="status"
										value={field.value}
										onChange={field.onChange}
										className="flex h-9 w-full rounded-lg border border-[#e8f0e8] bg-white px-3 text-sm text-[#0f1a0f] outline-none focus:border-green-600 focus:ring-2 focus:ring-green-600/20"
									>
										{statusOptions.map((opt) => (
											<option key={opt.value} value={opt.value}>
												{opt.label}
											</option>
										))}
									</select>
								</>
							)}
						/>
					</div>
					<Button type="submit" disabled={loading} className="mt-2 gap-1.5">
						{loading && <LoaderCircle className="size-4 animate-spin" />}
						{loading ? "Criando..." : "Criar Meta"}
					</Button>
				</form>
			</DialogContent>
		</Dialog>
	);
}

function EditMetaDialog({
	meta,
	index,
	onUpdated,
}: {
	meta: Meta;
	index: number;
	onUpdated: () => void;
}) {
	const [open, setOpen] = useState(false);
	const [loading, setLoading] = useState(false);
	const { updateMeta } = useAuth();
	const { control, handleSubmit, reset } = useForm<MetaFormData>({
		resolver: zodResolver(metaSchema as never),
		defaultValues: {
			descricao: meta.descricao,
			prazo: meta.prazo != null ? String(meta.prazo) : "",
			status: meta.status || "Em andamento",
		},
	});

	useEffect(() => {
		if (open) {
			reset({
				descricao: meta.descricao,
				prazo: meta.prazo != null ? String(meta.prazo) : "",
				status: meta.status || "Em andamento",
			});
		}
	}, [open, meta, reset]);

	async function onSubmit(data: MetaFormData) {
		setLoading(true);
		try {
			await updateMeta(index, {
				descricao: data.descricao || undefined,
				prazo: data.prazo ? Number(data.prazo) : null,
				status: data.status || undefined,
			});
			setOpen(false);
			onUpdated();
		} catch (err) {
			toast.error(err instanceof Error ? err.message : "Ocorreu um erro");
		} finally {
			setLoading(false);
		}
	}

	return (
		<Dialog
			open={open}
			onOpenChange={(v) => {
				setOpen(v);
				if (!v) reset();
			}}
		>
			<DialogTrigger asChild>
				<Button
					variant="ghost"
					size="icon-sm"
					className="text-blue-500 hover:bg-blue-50 hover:text-blue-600"
				>
					<Pencil className="size-4" />
				</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogTitle>Editar Meta</DialogTitle>
				<DialogDescription>Atualize os dados da meta</DialogDescription>
				<form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
					<div className="flex flex-col gap-1.5">
						<Controller
							name="descricao"
							control={control}
							render={({ field, fieldState }) => (
								<>
									<Label>Descrição *</Label>
									<Input placeholder="Ex: Perder 5kg" {...field} />
									{fieldState.invalid && (
										<FieldError errors={[fieldState.error]} />
									)}
								</>
							)}
						/>
					</div>
					<div className="flex flex-col gap-1.5">
						<Controller
							name="prazo"
							control={control}
							render={({ field }) => (
								<>
									<Label>Prazo (dias)</Label>
									<Input type="number" placeholder="Ex: 30" {...field} />
								</>
							)}
						/>
					</div>
					<div className="flex flex-col gap-1.5">
						<Controller
							name="status"
							control={control}
							render={({ field }) => (
								<>
									<Label>Status</Label>
									<select
										value={field.value}
										onChange={field.onChange}
										className="flex h-9 w-full rounded-lg border border-[#e8f0e8] bg-white px-3 text-sm text-[#0f1a0f] outline-none focus:border-green-600 focus:ring-2 focus:ring-green-600/20"
									>
										{statusOptions.map((opt) => (
											<option key={opt.value} value={opt.value}>
												{opt.label}
											</option>
										))}
									</select>
								</>
							)}
						/>
					</div>
					<Button type="submit" disabled={loading} className="mt-2 gap-1.5">
						{loading && <LoaderCircle className="size-4 animate-spin" />}
						{loading ? "Salvando..." : "Salvar"}
					</Button>
				</form>
			</DialogContent>
		</Dialog>
	);
}

export default function MetasPage() {
	const { user, isLoading, fetchMetas, deleteMeta } = useAuth();
	const [metas, setMetas] = useState<Meta[]>([]);
	const [loading, setLoading] = useState(true);
	const [filter, setFilter] = useState<string>("Todas");
	const [deleteIndex, setDeleteIndex] = useState<number | null>(null);

	async function loadData() {
		try {
			const data = await fetchMetas();
			setMetas(data);
		} catch (err) {
			toast.error(err instanceof Error ? err.message : "Ocorreu um erro");
		} finally {
			setLoading(false);
		}
	}

	// biome-ignore lint/correctness/useExhaustiveDependencies: false positive
	useEffect(() => {
		if (user) loadData();
	}, [user]);

	async function handleConfirmDelete() {
		if (deleteIndex === null) return;
		await deleteMeta(deleteIndex);
		setDeleteIndex(null);
		await loadData();
	}

	const filtered =
		filter === "Todas" ? metas : metas.filter((m) => m.status === filter);

	if (isLoading || loading) {
		return (
			<div className="flex h-full items-center justify-center">
				<LoaderCircle className="size-10 animate-spin text-[#4a5a4a]" />
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-[#f8faf8] p-6 md:p-10">
			<ConfirmDialog
				open={deleteIndex !== null}
				onOpenChange={(open) => {
					if (!open) setDeleteIndex(null);
				}}
				title="Excluir meta?"
				description="Essa acao nao pode ser desfeita."
				onConfirm={handleConfirmDelete}
			/>

			<div className="mb-8 flex items-center justify-between">
				<div>
					<h1 className="text-2xl font-bold text-[#0f1a0f]">Metas</h1>
					<p className="text-sm text-[#6a7a6a]">
						Acompanhe seus objetivos e prazos
					</p>
				</div>
				<CreateMetaDialog onCreated={loadData} />
			</div>

			<div className="mb-6 flex gap-2">
				{["Todas", "Em andamento", "Concluída", "Pendente"].map((s) => (
					<button
						key={s}
						type="button"
						onClick={() => setFilter(s)}
						className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
							filter === s
								? "bg-green-600 text-white"
								: "bg-white text-[#4a5a4a] hover:bg-[#f0f9f0] border border-[#e8f0e8]"
						}`}
					>
						{s}
					</button>
				))}
			</div>

			{metas.length === 0 ? (
				<div className="flex flex-col items-center justify-center rounded-2xl border bg-white py-16 shadow-sm">
					<Target className="size-12 text-[#4a5a4a]/30" />
					<p className="mt-4 text-[#4a5a4a]">Nenhuma meta cadastrada</p>
					<p className="text-sm text-[#8a9a8a]">
						Clique em "Nova Meta" para comecar
					</p>
				</div>
			) : (
				<div className="flex flex-col gap-3">
					{filtered.map((meta, i) => {
						const realIndex = metas.indexOf(meta);
						const colorClass =
							statusColors[meta.status ?? "Pendente"] ?? statusColors.Pendente;
						return (
							<div
								key={`${meta.descricao}-${String(i)}`}
								className="flex items-center justify-between rounded-2xl border bg-white p-5 shadow-sm"
							>
								<div className="flex items-center gap-4">
									<div className="flex size-10 items-center justify-center rounded-xl bg-green-50">
										<Target className="size-5 text-green-600" />
									</div>
									<div>
										<h3 className="font-semibold text-[#0f1a0f]">
											{meta.descricao}
										</h3>
										<div className="flex items-center gap-2 text-sm text-[#6a7a6a]">
											{meta.prazo && <span>Prazo: {meta.prazo} dias</span>}
										</div>
									</div>
								</div>
								<div className="flex items-center gap-3">
									<Badge className={`${colorClass} border`}>
										{meta.status ?? "Pendente"}
									</Badge>
									<EditMetaDialog
										meta={meta}
										index={realIndex}
										onUpdated={loadData}
									/>
									<Button
										variant="ghost"
										size="icon-sm"
										onClick={() => setDeleteIndex(realIndex)}
										className="text-red-500 hover:bg-red-50 hover:text-red-600"
									>
										<Trash2 className="size-4" />
									</Button>
								</div>
							</div>
						);
					})}
				</div>
			)}
		</div>
	);
}
