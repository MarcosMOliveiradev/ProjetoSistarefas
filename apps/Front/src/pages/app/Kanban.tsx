import { getProfile } from "@/api/profile";
import { CriarKanban } from "@/components/CriarKanban";
import { KanbanColumn } from "@/components/KanbanColumn";
import type { KanbanDTO } from "@/dtos/kanbanDTO";
import { api } from "@/lib/axios";
import { DndContext, type DragEndEvent } from "@dnd-kit/core";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

type ColumnId = "TODO" | "IN_PROGRESS" | "DONE";

export function Kanban() {
  const queryClient = useQueryClient();

    const { data: user } = useQuery({
      queryKey: ['profile'],
      queryFn: getProfile,
    })

  const { data: kanban = [], isLoading, isError, error } = useQuery<KanbanDTO[]>({
    queryKey: ["kanban"],
    queryFn: async () => {
      const { data } = await api.get("/kanban/findall");
      return data;
    },
  });

  const startMutation = useMutation({
    mutationFn: async (id: string) => api.patch(`/kanban/in_progress`, {
      id,
      userId: user?.user.id
    }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["kanban"] }),
  });

  const finishMutation = useMutation({
    mutationFn: async (id: string) => api.patch(`/kanban/finish`, {
      id,
      userId: user?.user.id
    }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["kanban"] }),
  });

  function optimisticMove(id: string, toStatus: ColumnId) {
    queryClient.setQueryData<KanbanDTO[]>(["kanban"], (old = []) =>
      old.map((k) => (k.id === id ? { ...k, status: toStatus } : k))
    );
  }

  async function onDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over) return;

    const id = String(active.id);
    const fromStatus = active.data.current?.status as ColumnId | undefined;
    const toStatus = String(over.id) as ColumnId;

    if (!fromStatus) return;
    if (fromStatus === toStatus) return;

    // bloqueios
    // if (fromStatus === "DONE") return;
    if (fromStatus === "IN_PROGRESS" && toStatus === "TODO") return;

    // optimistic UI
    const prev = queryClient.getQueryData<KanbanDTO[]>(["kanban"]) ?? [];
    optimisticMove(id, toStatus);

    try {
      if (toStatus === "IN_PROGRESS") {
        await startMutation.mutateAsync(id);
      } else if (toStatus === "DONE") {
        await finishMutation.mutateAsync(id);
      } else {
        // toStatus === "TODO" (não permitimos voltar)
        // se você quiser permitir, criaria endpoint específico
      }
    } catch (e) {
      // revert
      queryClient.setQueryData(["kanban"], prev);
      console.error(e);
    }
  }

  const todo = kanban.filter((k) => k.status === "TODO");
  const inProgress = kanban.filter((k) => k.status === "IN_PROGRESS");
  const done = kanban.filter((k) => k.status === "DONE");

  if (isLoading) return <div className="mx-10 mt-6">Carregando...</div>;
  if (isError) return <div className="mx-10 mt-6 text-destructive">Erro: {(error as any)?.message}</div>;

  return (
    <div className="flex flex-col justify-around mx-10">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">KANBAN</h2>
        <CriarKanban />
      </div>

      <div className="h-[85vh]">
        <DndContext onDragEnd={onDragEnd}>
          <div className="grid grid-cols-3 gap-4 mt-4">
            <KanbanColumn id="TODO" title="A FAZER" items={todo} />
            <KanbanColumn id="IN_PROGRESS" title="EM ANDAMENTO" items={inProgress} />
            <KanbanColumn id="DONE" title="CONCLUÍDO" items={done} />
          </div>
        </DndContext>
      </div>
    </div>
  );
}