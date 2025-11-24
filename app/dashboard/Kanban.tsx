"use client";

import { useState } from "react";
import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragStartEvent,
  KeyboardSensor,
  PointerSensor,
  UniqueIdentifier,
  closestCorners,
  useDroppable,
  useSensor,
  useSensors,
  DragOverlay,
  DragCancelEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  useSortable,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { AddProject } from "@/components/shared/Dashboard/AddProject";
import { SheetInfo } from "@/components/shared/Dashboard/SheetInfo";

interface Item {
  id: string;
  content: string;
}

interface Container {
  id: string;
  title: string;
  bg: string;
  items: Item[];
}

function SortableItem({
  id,
  content,
}: {
  id: UniqueIdentifier;
  content: string;
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`cursor-grab touch-none rounded border p-3 active:cursor-grabbing border-white/10 bg-darkgray/50 backdrop-blur-sm flex gap-2 items-center ${
        isDragging ? "z-10 opacity-50 shadow-md" : ""
      }`}
    >
      <span className="text-white">{content}</span>
      <SheetInfo />
    </div>
  );
}

function DroppableContainer({
  id,
  title,
  items,
  bg,
}: {
  id: string;
  title: string;
  items: Item[];
  bg: string;
}) {
  const { setNodeRef } = useDroppable({ id });

  return (
    <div
      ref={setNodeRef}
      className={`flex h-full min-h-40 flex-col rounded-md border border-white/10 p-3 ${bg}`}
    >
      <h3 className="mb-2 font-medium text-white">{title}</h3>

      <SortableContext
        items={items.map((i) => i.id)}
        strategy={verticalListSortingStrategy}
      >
        <ul className="flex flex-col gap-2">
          {items.map((item) => (
            <SortableItem key={item.id} id={item.id} content={item.content} />
          ))}
        </ul>
      </SortableContext>

      {items.length === 0 && (
        <div className="flex h-20 items-center justify-center rounded-md border border-dashed border-white/10">
          <p className="text-sm text-gray-300">Drop items here</p>
        </div>
      )}
    </div>
  );
}

function ItemOverlay({ children }: { children: React.ReactNode }) {
  return (
    <div className="cursor-grabbing touch-none rounded border p-3 shadow-md border-white/10 bg-darkgray/50 backdrop-blur-sm">
      <span className="text-white">{children}</span>
    </div>
  );
}

export default function Kanban({ org }: { org: any }) {
  const [containers, setContainers] = useState<Container[]>([
    {
      id: "todo",
      title: "To Do",
      bg: "bg-brown/20",
      items: [
        { id: "task-1", content: "Research @dnd-kit" },
        { id: "task-2", content: "Create basic example" },
        { id: "task-3", content: "Write tutorial" },
      ],
    },
    {
      id: "clarification",
      title: "In Clarification",
      bg: "bg-brown/40",
      items: [],
    },
    {
      id: "changes",
      title: "Change Requested",
      bg: "bg-brown",
      items: [],
    },
    {
      id: "progress",
      title: "In Progress",
      bg: "bg-darkyellow/20",
      items: [{ id: "task-4", content: "Record demo video" }],
    },
    {
      id: "review",
      title: "Review",
      bg: "bg-darkyellow/30",
      items: [],
    },
    {
      id: "done",
      title: "Done",
      bg: "bg-[#6ab04c]/20",
      items: [{ id: "task-5", content: "Setup project" }],
    },
  ]);

  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { delay: 20, tolerance: 5 },
    }),
    useSensor(KeyboardSensor)
  );

  function findContainerId(id: UniqueIdentifier) {
    if (containers.some((c) => c.id === id)) return id;
    return containers.find((c) => c.items.some((i) => i.id === id))?.id;
  }

  function handleDragStart(e: DragStartEvent) {
    setActiveId(e.active.id);
  }

  function handleDragCancel() {
    setActiveId(null);
  }

  function handleDragOver(event: DragOverEvent) {
    const { active, over } = event;
    if (!over) return;

    const activeContainer = findContainerId(active.id);
    const overContainer = findContainerId(over.id);
    if (!activeContainer || !overContainer || activeContainer === overContainer)
      return;

    setContainers((prev) => {
      const activeCol = prev.find((c) => c.id === activeContainer)!;
      const activeItem = activeCol.items.find((i) => i.id === active.id)!;

      return prev.map((col) => {
        if (col.id === activeContainer) {
          return { ...col, items: col.items.filter((i) => i.id !== active.id) };
        }
        if (col.id === overContainer) {
          const index = col.items.findIndex((i) => i.id === over.id);
          if (index === -1)
            return { ...col, items: [...col.items, activeItem] };
          return {
            ...col,
            items: [
              ...col.items.slice(0, index),
              activeItem,
              ...col.items.slice(index),
            ],
          };
        }
        return col;
      });
    });
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over) return setActiveId(null);

    const activeContainer = findContainerId(active.id);
    const overContainer = findContainerId(over.id);
    if (!activeContainer || !overContainer) return setActiveId(null);

    if (activeContainer === overContainer && active.id !== over.id) {
      setContainers((prev) =>
        prev.map((col) => {
          if (col.id !== activeContainer) return col;

          const oldIndex = col.items.findIndex((i) => i.id === active.id);
          const newIndex = col.items.findIndex((i) => i.id === over.id);
          return { ...col, items: arrayMove(col.items, oldIndex, newIndex) };
        })
      );
    }

    setActiveId(null);
  }

  function getActiveItem() {
    for (const col of containers) {
      const itm = col.items.find((i) => i.id === activeId);
      if (itm) return itm;
    }
    return null;
  }

  return (
    <div className="mx-auto w-full">
      <div className="w-full flex items-center justify-between mb-4 px-2">
        <h2 className="text-2xl font-header text-white">{org?.name}</h2>
        <AddProject />
      </div>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragStart={handleDragStart}
        onDragCancel={handleDragCancel}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
      >
        <div className="grid gap-4 grid-cols-1 md:grid-cols-3 xl:grid-cols-6">
          {containers.map((col) => (
            <DroppableContainer
              key={col.id}
              id={col.id}
              title={col.title}
              items={col.items}
              bg={col.bg}
            />
          ))}
        </div>

        <DragOverlay>
          {activeId ? (
            <ItemOverlay>{getActiveItem()?.content}</ItemOverlay>
          ) : null}
        </DragOverlay>
      </DndContext>
    </div>
  );
}
