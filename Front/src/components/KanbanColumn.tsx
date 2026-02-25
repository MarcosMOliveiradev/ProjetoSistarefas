import { useDroppable } from "@dnd-kit/core";
import type { KanbanDTO } from "@/dtos/kanbanDTO";
import { CardKanban } from "./CardKanban";

type ColumnId = "TODO" | "IN_PROGRESS" | "DONE";

export function KanbanColumn({
  id,
  title,
  items,
}: {
  id: ColumnId;
  title: string;
  items: KanbanDTO[];
}) {
  const { setNodeRef, isOver } = useDroppable({ id });

  return (
    <div
      ref={setNodeRef}
      className={[
        "bg-muted-foreground/10 rounded-[2px] p-5 w-full h-[80vh]",
        isOver ? "ring-2 ring-primary/40" : "",
      ].join(" ")}
    >
      <div className="flex items-center justify-between">
        <p className="font-bold text-[1.2rem]">{title}</p>
        <span className="text-sm text-muted-foreground">{items.length}</span>
      </div>

      <div className="flex flex-col gap-3 mt-4">
        {items.map((item) => (
          <CardKanban key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}