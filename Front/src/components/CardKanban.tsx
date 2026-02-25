import type { KanbanDTO } from "@/dtos/kanbanDTO";
import { useDraggable } from "@dnd-kit/core"

export function CardKanban({ item }: { item: KanbanDTO }) {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: item.id,
      data: { status: item.status }, // ✅ guarda o status de origem
    });

  const style: React.CSSProperties | undefined = transform
    ? { transform: `translate3d(${transform.x}px, ${transform.y}px, 0)` }
    : undefined;

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className={[
        "bg-background rounded-md p-4 shadow-sm border cursor-grab select-none",
        isDragging ? "opacity-60" : "",
      ].join(" ")}
    >
      <div className="font-semibold">{item.titulo}</div>
      <div className="text-sm text-muted-foreground mt-1">
        Criado por: {item.criadoPor}. Em: {item.criadoEm}
      </div>
      <div className="text-sm mt-2 line-clamp-2">{item.descricao}</div>

      <div className="text-xs text-muted-foreground mt-3 flex flex-wrap gap-2">
        {item.colaboradores.map((c) => (
          <span key={c.id} className="px-2 py-1 bg-muted rounded">
            {c.matricula}
          </span>
        ))}
      </div>
    </div>
  );
}