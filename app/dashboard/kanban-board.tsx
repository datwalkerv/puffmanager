'use client';

import { useState, useEffect } from 'react';
import { DndContext, closestCorners, DragEndEvent } from '@dnd-kit/core';
import {
    arrayMove,
    SortableContext,
    useSortable,
    verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Plus, Trash2 } from 'lucide-react';

function TaskCard({
                      id,
                      onDelete,
                      onEdit,
                  }: {
    id: string;
    onDelete: () => void;
    onEdit: (newName: string) => void;
}) {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });
    const style = { transform: CSS.Transform.toString(transform), transition };

    const [isEditing, setIsEditing] = useState(false);
    const [newName, setNewName] = useState(id);

    const handleEditConfirm = () => {
        if (newName.trim()) {
            onEdit(newName);
        } else {
            setNewName(id);
        }
        setIsEditing(false);
    };

    const handleDoubleClick = (e: React.MouseEvent) => {
        if ((e.target as HTMLElement).closest('button')) return;
        setIsEditing(true);
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            {...attributes}
            className="bg-neutral-700 p-3 rounded-lg mb-2 shadow hover:bg-neutral-600 transition cursor-default select-none flex justify-between items-center"
            onDoubleClick={handleDoubleClick}
        >
            <div
                {...listeners}
                className="cursor-grab active:cursor-grabbing flex-grow flex items-center gap-2"
            >
                {isEditing ? (
                    <input
                        value={newName}
                        onChange={(e) => setNewName(e.target.value)}
                        onBlur={handleEditConfirm}
                        onKeyDown={(e) => e.key === 'Enter' && handleEditConfirm()}
                        className="bg-neutral-800 text-white rounded px-2 py-1 w-full"
                        autoFocus
                    />
                ) : (
                    <span className="truncate w-full">{id}</span>
                )}
            </div>

            <button
                onClick={(e) => {
                    e.stopPropagation();
                    onDelete();
                }}
                className="ml-2 hover:text-red-400 transition flex-shrink-0"
            >
                <Trash2 size={16} />
            </button>
        </div>
    );
}

type ColumnKey = 'todo' | 'clarification' | 'change' | 'progress' | 'review' | 'done';
interface Column {
    name: string;
    items: string[];
}
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

    // LocalStorage mentés + visszatöltés
    useEffect(() => {
        const saved = localStorage.getItem('kanban-columns');
        if (saved) setColumns(JSON.parse(saved));
    }, []);

    useEffect(() => {
        localStorage.setItem('kanban-columns', JSON.stringify(columns));
    }, [columns]);

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

    const addTask = (col: ColumnKey, name: string) => {
        if (!name.trim()) return;
        setColumns((prev) => ({
            ...prev,
            [col]: { ...prev[col], items: [...prev[col].items, name] },
        }));
    };

    const deleteTask = (col: ColumnKey, id: string) => {
        setColumns((prev) => ({
            ...prev,
            [col]: { ...prev[col], items: prev[col].items.filter((x) => x !== id) },
        }));
    };

    const editTask = (col: ColumnKey, oldId: string, newId: string) => {
        setColumns((prev) => ({
            ...prev,
            [col]: {
                ...prev[col],
                items: prev[col].items.map((x) => (x === oldId ? newId : x)),
            },
        }));
    };

    return (
        <div className="flex gap-4 overflow-x-auto p-4">
            <DndContext collisionDetection={closestCorners} onDragEnd={handleDragEnd}>
                {(Object.entries(columns) as [ColumnKey, Column][]).map(([key, column]) => (
                    <div
                        key={key}
                        className="bg-neutral-900 rounded-xl p-4 w-72 flex-shrink-0 shadow-lg border border-neutral-800"
                    >
                        <h2 className="text-lg font-semibold mb-4 flex items-center justify-between text-white">
                            {column.name}
                        </h2>

                        <SortableContext items={column.items} strategy={verticalListSortingStrategy}>
                            {column.items.map((id) => (
                                <TaskCard
                                    key={id}
                                    id={id}
                                    onDelete={() => deleteTask(key, id)}
                                    onEdit={(newName) => editTask(key, id, newName)}
                                />
                            ))}
                        </SortableContext>

                        <AddTaskInput onAdd={(name) => addTask(key, name)} />
                    </div>
                ))}
            </DndContext>
        </div>
    );
}

function AddTaskInput({ onAdd }: { onAdd: (name: string) => void }) {
    const [value, setValue] = useState('');
    const [showInput, setShowInput] = useState(false);

    const handleSubmit = () => {
        if (!value.trim()) return;
        onAdd(value);
        setValue('');
        setShowInput(false);
    };

    return (
        <div className="mt-2">
            {showInput ? (
                <div className="flex gap-2">
                    <input
                        className="bg-neutral-800 text-white rounded px-2 py-1 flex-grow"
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
                        autoFocus
                    />
                    <button
                        onClick={handleSubmit}
                        className="bg-green-600 hover:bg-green-500 rounded px-3 py-1 text-sm"
                    >
                        Add
                    </button>
                </div>
            ) : (
                <button
                    onClick={() => setShowInput(true)}
                    className="flex items-center text-sm text-neutral-400 hover:text-white mt-2"
                >
                    <Plus size={16} className="mr-1" /> New task
                </button>
            )}
        </div>
    );
}