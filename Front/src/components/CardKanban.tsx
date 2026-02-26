import type { KanbanDTO } from "@/dtos/kanbanDTO";
import { useDraggable } from "@dnd-kit/core"
import { useState } from "react";
import { Button } from "./ui/button";
import { AdicionarColaboradoresDialog } from "./AdicionarColaboradoresDialog";
import { KanbanDetalhesDialog } from "./KanbanDetalhesDialog";
import { CancelarKanbanDialog } from "./CancelarKanbanDialog";
import { getProfile } from "@/api/profile";
import { useQuery } from "@tanstack/react-query";

export function CardKanban({ item }: { item: KanbanDTO }) {
  const [open, setOpen] = useState(false);
  const [openDetails, setOpenDetails] = useState(false);
  const [openCancel, setOpenCancel] = useState(false);

  const { data: user } = useQuery({
    queryKey: ['profile'],
    queryFn: getProfile,
  })

  const canCancel = item.status === "TODO" || item.status === "IN_PROGRESS";

  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: item.id,
      data: { status: item.status },
    });

  const style: React.CSSProperties | undefined = transform
    ? { transform: `translate3d(${transform.x}px, ${transform.y}px, 0)` }
    : undefined;

  return (
    <div
      ref={setNodeRef}
      style={style}
      // ❌ NÃO coloque listeners no container inteiro
      className={[
        "bg-background rounded-md p-4 shadow-sm border select-none",
        isDragging ? "opacity-60" : "",
      ].join(" ")}
    >
      {/* ✅ Drag handle: só aqui arrasta */}
      <div
        {...listeners}
        {...attributes}
        className="cursor-grab"
      >
        <div className="font-semibold">{item.titulo}</div>
        <div className="text-sm text-muted-foreground mt-1 flex justify-between">
          Criado por: {item.criadoPor}. Em: {item.criadoEm}
          <strong>Cod. {item.codAtividades}</strong>
        </div>
      </div>

      <div className="text-sm mt-2 line-clamp-2">{item.descricao}</div>

      <div className="text-xs text-muted-foreground mt-3 flex flex-wrap justify-between gap-2">
        <div className="flex flex-wrap gap-2">
          Colaboradores:
          {item.colaboradores.map((c) => (
            <span key={c.id} className="px-2 py-1 bg-muted rounded">
              {c.matricula}
            </span>
          ))}
        </div>

        {item.status === "IN_PROGRESS" ? (
          <>
            <Button
              size="sm"
              variant="secondary"
              onClick={(e) => {
                e.stopPropagation(); // ✅ extra segurança
                setOpen(true);
              }}
            >
              Colaboradores
            </Button>

            <AdicionarColaboradoresDialog
              kanbanId={item.id}
              open={open}
              onOpenChange={setOpen}
            />
          </>
        ) : null}
      </div>

      <div className="flex justify-between">
        <Button size="sm" variant="outline" onClick={() => setOpenDetails(true)}>
          Detalhes
        </Button>

        <KanbanDetalhesDialog
          kanban={item}
          open={openDetails}
          onOpenChange={setOpenDetails}
        />

        {canCancel ? (
          <>
            <Button
              size="sm"
              variant="destructive"
              onClick={(e) => {
                e.stopPropagation();
                setOpenCancel(true);
              }}
            >
              Cancelar
            </Button>

            <CancelarKanbanDialog
              kanbanId={item.id}
              userId={user?.user.id}
              open={openCancel}
              onOpenChange={setOpenCancel}
            />
          </>
        ) : null}
      </div>

    </div>
  );
}