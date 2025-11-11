'use client';

import { useState } from 'react';
import { DndContext, closestCorners, DragEndEvent } from '@dnd-kit/core';
import {
    arrayMove,
    SortableContext,
    useSortable,
    verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

function TaskCard({ id }: { id: string }) {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });
    const style = { transform: CSS.Transform.toString(transform), transition };

    return (
        <div
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}
            className="bg-neutral-700 p-3 rounded-lg mb-2 shadow hover:bg-neutral-600 transition cursor-grab select-none"
        >
            {id}
        </div>
    );
}

type ColumnKey = 'todo' | 'clarification' | 'change' | 'progress' | 'review' | 'done';
interface Column { name: string; items: string[]; }
type Columns = Record<ColumnKey, Column>;

export default function KanbanBoard() {
    const [columns, setColumns] = useState<Columns>({
        todo: { name: 'To do', items: ['Projekt setup', 'Design review'] },
        clarification: { name: 'In clarification', items: [] },
        change: { name: 'Change Requested', items: [] },
        progress: { name: 'In Progress', items: [] },
        review: { name: 'Review', items: [] },
        done: { name: 'Done', items: [] },
    });

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;
        if (!over || active.id === over.id) return;

        let sourceCol: ColumnKey | undefined;
        let destCol: ColumnKey | undefined;

        (Object.keys(columns) as ColumnKey[]).forEach((key) => {
            if (columns[key].items.includes(active.id as string)) sourceCol = key;
            if (columns[key].items.includes(over.id as string)) destCol = key;
        });

        if (!sourceCol || !destCol) return;

        const sCol = sourceCol as ColumnKey;
        const dCol = destCol as ColumnKey;
        const sourceItems = [...columns[sCol].items];
        const destItems = [...columns[dCol].items];

        if (sCol === dCol) {
            const oldIndex = sourceItems.indexOf(active.id as string);
            const newIndex = sourceItems.indexOf(over.id as string);
            const newItems = arrayMove(sourceItems, oldIndex, newIndex);
            setColumns((prev) => ({
                ...prev,
                [sCol]: { ...prev[sCol], items: newItems },
            }));
            return;
        }

        sourceItems.splice(sourceItems.indexOf(active.id as string), 1);
        destItems.splice(0, 0, active.id as string);

        setColumns((prev) => ({
            ...prev,
            [sCol]: { ...prev[sCol], items: sourceItems },
            [dCol]: { ...prev[dCol], items: destItems },
        }));
    };

    return (
        <div className="flex gap-4 overflow-x-auto">
            <DndContext collisionDetection={closestCorners} onDragEnd={handleDragEnd}>
                {(Object.entries(columns) as [ColumnKey, Column][]).map(([key, column]) => (
                    <div key={key} className="bg-neutral-800 rounded-xl p-4 w-64 flex-shrink-0">
                        <h2 className="text-lg font-semibold mb-4">{column.name}</h2>
                        <SortableContext items={column.items} strategy={verticalListSortingStrategy}>
                            {column.items.map((id) => (
                                <TaskCard key={id} id={id} />
                            ))}
                        </SortableContext>
                    </div>
                ))}
            </DndContext>
        </div>
    );
}