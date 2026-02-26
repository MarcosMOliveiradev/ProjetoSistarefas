import { useEffect } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/axios";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";

const cancelSchema = z.object({
  id: z.string(),
  userId: z.string(),
  motivo: z.string().max(300, "Motivo muito longo").optional(),
});

type CancelForm = z.infer<typeof cancelSchema>;

export function CancelarKanbanDialog({
  kanbanId,
  userId,
  open,
  onOpenChange,
}: {
  kanbanId: string;
  userId: string;
  open: boolean;
  onOpenChange: (v: boolean) => void;
}) {
  const queryClient = useQueryClient();

  const form = useForm<CancelForm>({
    resolver: zodResolver(cancelSchema),
    defaultValues: { id: kanbanId, userId, motivo: "" },
  });

  useEffect(() => {
    if (!open) return;
    form.reset({ id: kanbanId, userId, motivo: "" });
  }, [open, kanbanId, userId]);

  const mutation = useMutation({
    mutationFn: async (values: CancelForm) => {
      const payload = {
        id: values.id,
        userId: values.userId,
        motivo: values.motivo?.trim() ? values.motivo.trim() : undefined,
      };

      // ajuste para POST/PATCH se sua rota for diferente
      await api.patch("/kanban/cancel", payload);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["kanban"] });
      onOpenChange(false);
    },
  });

  async function onSubmit(values: CancelForm) {
    await mutation.mutateAsync(values);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[520px]">
        <DialogHeader>
          <DialogTitle>Cancelar atividade</DialogTitle>
          <DialogDescription>
            Isso vai mover a atividade para <strong>CANCELED</strong>. Você pode
            informar um motivo (opcional).
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="motivo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Motivo (opcional)</FormLabel>
                  <FormControl>
                    <Textarea
                      className="min-h-[120px]"
                      placeholder="Ex: atividade duplicada / não será mais necessária..."
                      {...field}
                      disabled={mutation.isPending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {mutation.isError ? (
              <div className="text-sm text-destructive">
                {(mutation.error as any)?.response?.data?.message ??
                  (mutation.error as Error).message ??
                  "Erro ao cancelar."}
              </div>
            ) : null}

            <DialogFooter className="gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
                disabled={mutation.isPending}
              >
                Voltar
              </Button>

              <Button
                type="submit"
                variant="destructive"
                disabled={mutation.isPending}
              >
                {mutation.isPending ? "Cancelando..." : "Cancelar"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}