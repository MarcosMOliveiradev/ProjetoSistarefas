import { useEffect, useMemo, useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/axios";

import type { KanbanDTO } from "@/dtos/kanbanDTO";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { ScrollArea } from "./ui/scroll-area";

const updateDetailsSchema = z.object({
  id: z.string(),
  titulo: z.string().optional(),
  descricao: z.string().optional(),
  codAtividades: z.coerce.number().int().positive().optional(),
});

type UpdateDetailsForm = z.infer<typeof updateDetailsSchema>;

function formatDate(v: any) {
  if (!v) return "-";
  try {
    const d = typeof v === "string" ? new Date(v) : v;
    return d.toLocaleDateString("pt-BR");
  } catch {
    return String(v);
  }
}

export function KanbanDetalhesDialog({
  kanban,
  open,
  onOpenChange,
}: {
  kanban: KanbanDTO;
  open: boolean;
  onOpenChange: (v: boolean) => void;
}) {
  const queryClient = useQueryClient();

  const canEdit = useMemo(
    () => kanban.status === "TODO" || kanban.status === "IN_PROGRESS",
    [kanban.status]
  );

  const form = useForm<UpdateDetailsForm>({
    resolver: zodResolver(updateDetailsSchema),
    defaultValues: {
      id: kanban.id,
      titulo: kanban.titulo,
      descricao: kanban.descricao,
      codAtividades: kanban.codAtividades,
    },
  });

  // Se abrir outro card, reseta o form
  useEffect(() => {
    if (!open) return;
    form.reset({
      id: kanban.id,
      titulo: kanban.titulo,
      descricao: kanban.descricao,
      codAtividades: kanban.codAtividades,
    });
  }, [open, kanban.id]);

  const mutation = useMutation({
    mutationFn: async (values: UpdateDetailsForm) => {
      // ✅ manda somente campos alterados (opcional, mas bom)
      const payload: UpdateDetailsForm = { id: values.id };
      if (values.titulo !== kanban.titulo) payload.titulo = values.titulo;
      if (values.descricao !== kanban.descricao) payload.descricao = values.descricao;
      if (values.codAtividades !== kanban.codAtividades)
        payload.codAtividades = values.codAtividades;

      const { data } = await api.patch("/kanban/updatedetails", payload);
      return data;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["kanban"] });
      onOpenChange(false);
    },
  });

  async function onSubmit(values: UpdateDetailsForm) {
    if (!canEdit) return;
    await mutation.mutateAsync(values);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[900px]">
        <DialogHeader>
          <DialogTitle>Detalhes do Kanban</DialogTitle>
          <DialogDescription>
            Visualize informações e edite os detalhes quando permitido.
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* =========================
              COLUNA 1: INFO (read-only)
             ========================= */}
          <div className="space-y-4">
            <div className="rounded-md border p-4">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">Informações</h3>
                <span className="text-xs px-2 py-1 rounded bg-muted">
                  {kanban.status}
                </span>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                <div>
                  <div className="text-muted-foreground">Criado por</div>
                  <div className="font-medium">{kanban.criadoPor ?? "-"}</div>
                </div>
                <div>
                  <div className="text-muted-foreground">Criado em</div>
                  <div className="font-medium">{formatDate(kanban.criadoEm)}</div>
                </div>

                <div>
                  <div className="text-muted-foreground">Iniciado por</div>
                  <div className="font-medium">{kanban.iniciadoPor ?? "-"}</div>
                </div>
                <div>
                  <div className="text-muted-foreground">Iniciado em</div>
                  <div className="font-medium">{formatDate(kanban.iniciadoEm)}</div>
                </div>

                <div>
                  <div className="text-muted-foreground">Finalizado por</div>
                  <div className="font-medium">{kanban.finalizadoPor ?? "-"}</div>
                </div>
                <div>
                  <div className="text-muted-foreground">Finalizado em</div>
                  <div className="font-medium">{formatDate(kanban.finalizadoEm)}</div>
                </div>

                <div>
                  <div className="text-muted-foreground">Cancelado por</div>
                  <div className="font-medium">{kanban.canceladoPor ?? "-"}</div>
                </div>
                <div>
                  <div className="text-muted-foreground">Cancelado em</div>
                  <div className="font-medium">{formatDate(kanban.canceladoEm)}</div>
                </div>
              </div>

              {kanban.motivoCancelamento ? (
                <div className="mt-4 text-sm">
                  <div className="text-muted-foreground">Motivo</div>
                  <div className="font-medium">{kanban.motivoCancelamento}</div>
                </div>
              ) : null}
            </div>

            <ScrollArea className="rounded-md border p-4">
              <h3 className="font-semibold">Colaboradores</h3>

              <div className="mt-3 flex flex-col gap-1">
                {kanban.colaboradores?.length ? (
                  kanban.colaboradores.map((c) => (
                    <span key={c.id} className="text-sm">
                      {c.name ?? c.matricula}
                    </span>
                  ))
                ) : (
                  <span className="text-sm text-muted-foreground">Nenhum.</span>
                )}
              </div>
            </ScrollArea>
          </div>

          {/* =========================
              COLUNA 2: EDIÇÃO (form)
             ========================= */}
          <div className="space-y-4">
            <div className="rounded-md border p-4">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">Editar detalhes</h3>
                {!canEdit ? (
                  <span className="text-xs text-muted-foreground">
                    Bloqueado para status {kanban.status}
                  </span>
                ) : null}
              </div>

              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-4">
                  <FormField
                    control={form.control}
                    name="titulo"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Título</FormLabel>
                        <FormControl>
                          <Input {...field} disabled={!canEdit || mutation.isPending} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="codAtividades"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Código da atividade</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            inputMode="numeric"
                            {...field}
                            disabled={!canEdit || mutation.isPending}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="descricao"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Descrição</FormLabel>
                        <FormControl>
                          <Textarea
                            className="min-h-[140px]"
                            {...field}
                            disabled={!canEdit || mutation.isPending}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <DialogFooter className="gap-2 pt-2">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => onOpenChange(false)}
                      disabled={mutation.isPending}
                    >
                      Fechar
                    </Button>

                    <Button type="submit" disabled={!canEdit || mutation.isPending}>
                      {mutation.isPending ? "Salvando..." : "Salvar alterações"}
                    </Button>
                  </DialogFooter>

                  {mutation.isError ? (
                    <div className="text-sm text-destructive">
                      {(mutation.error as Error).message ?? "Erro ao salvar."}
                    </div>
                  ) : null}
                </form>
              </Form>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}