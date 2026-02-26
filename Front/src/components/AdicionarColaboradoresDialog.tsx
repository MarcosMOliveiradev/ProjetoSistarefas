import { findUser } from "@/api/findUser";
import type { usersDTO } from "@/dtos/userDto";
import { api } from "@/lib/axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "./ui/dialog";
import { Input } from "./ui/input";
import { Checkbox } from "./ui/checkbox";
import { Button } from "./ui/button";

export function AdicionarColaboradoresDialog({
  kanbanId,
  open,
  onOpenChange,
}: {
  kanbanId: string;
  open: boolean;
  onOpenChange: (v: boolean) => void;
}) {
  const queryClient = useQueryClient();
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<string[]>([]);

  const { data: users = [], isLoading } = useQuery<usersDTO[]>({
    queryKey: ["findUser"],
    queryFn: () => findUser(),
    enabled: open, // ✅ só busca quando dialog abre
  });

  const filtered = useMemo(() => {
    const s = search.trim().toLowerCase();
    if (!s) return users;
    return users.filter((u) => u.name.toLowerCase().includes(s));
  }, [users, search]);

  const addMutation = useMutation({
    mutationFn: async (userIds: string[]) => {
      // ✅ 1 chamada por usuário (já que sua API é assim)
      const results = await Promise.allSettled(
        userIds.map((usuario) =>
          api.patch("/kanban/in_progress", { id: kanbanId, userId: usuario })
        )
      );

      const failed = results.filter((r) => r.status === "rejected");
      if (failed.length > 0) {
        // você pode devolver detalhes melhores aqui
        throw new Error(`${failed.length} usuário(s) não foram adicionados.`);
      }
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["kanban"] });
      setSelected([]);
      setSearch("");
      onOpenChange(false);
    },
  });

  function toggleUser(id: string) {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[560px]">
        <DialogHeader>
          <DialogTitle>Adicionar colaboradores</DialogTitle>
          <DialogDescription>
            Selecione um ou mais usuários para colaborar nesta atividade.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-3">
          <Input
            placeholder="Buscar usuário..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <div className="max-h-[320px] overflow-auto border rounded-md p-2">
            {isLoading ? (
              <div className="text-sm text-muted-foreground p-2">
                Carregando usuários...
              </div>
            ) : filtered.length === 0 ? (
              <div className="text-sm text-muted-foreground p-2">
                Nenhum usuário encontrado.
              </div>
            ) : (
              <div className="flex flex-col gap-2">
                {filtered.map((u) => (
                  <label
                    key={u.id}
                    className="flex items-center gap-3 p-2 rounded hover:bg-muted cursor-pointer"
                  >
                    <Checkbox
                      checked={selected.includes(u.id)}
                      onCheckedChange={() => toggleUser(u.id)}
                    />
                    <div className="flex flex-col">
                      <span className="text-sm font-medium">{u.name}</span>
                      <span className="text-xs text-muted-foreground">
                        {u.id}
                      </span>
                    </div>
                  </label>
                ))}
              </div>
            )}
          </div>
        </div>

        <DialogFooter className="gap-2">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={addMutation.isPending}
          >
            Cancelar
          </Button>

          <Button
            onClick={() => addMutation.mutate(selected)}
            disabled={selected.length === 0 || addMutation.isPending}
          >
            {addMutation.isPending ? "Adicionando..." : `Adicionar (${selected.length})`}
          </Button>
        </DialogFooter>

        {addMutation.isError ? (
          <div className="text-sm text-destructive mt-2">
            {(addMutation.error as Error).message}
          </div>
        ) : null}
      </DialogContent>
    </Dialog>
  );
}