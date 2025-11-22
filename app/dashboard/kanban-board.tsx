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
import { Plus, Trash2, Calendar } from 'lucide-react';

interface Task {
    id: string;
    name: string;
    deadline?: string;
}

function TaskCard({
                      task,
                      onDelete,
                      onEdit,
                  }: {
    task: Task;
    onDelete: () => void;
    onEdit: (newName: string, newDeadline?: string) => void;
}) {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
        id: task.id,
    });
    const style = { transform: CSS.Transform.toString(transform), transition };

    const [isEditing, setIsEditing] = useState(false);
    const [newName, setNewName] = useState(task.name);
    const [newDeadline, setNewDeadline] = useState(task.deadline || '');

    const handleEditConfirm = () => {
        if (newName.trim()) {
            onEdit(newName, newDeadline);
        } else {
            setNewName(task.name);
            setNewDeadline(task.deadline || '');
        }
        setIsEditing(false);
    };

    const handleDoubleClick = (e: React.MouseEvent) => {
        if ((e.target as HTMLElement).closest('button')) return;
        setIsEditing(true);
    };

    const isOverdue = task.deadline && new Date(task.deadline) < new Date();

    return (
        <div
            ref={setNodeRef}
            style={style}
            {...attributes}
            className={`p-3 rounded-lg mb-2 shadow transition cursor-default select-none flex flex-col gap-2 ${
                isOverdue ? 'bg-red-500/30 hover:bg-red-500/50' : 'bg-neutral-700 hover:bg-neutral-600'
            }`}
            onDoubleClick={handleDoubleClick}
        >
            <div className="flex justify-between items-center">
                <div {...listeners} className="cursor-grab active:cursor-grabbing flex-grow">
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
                        <span className="truncate text-white">{task.name}</span>
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

            {isEditing ? (
                <div className="flex items-center gap-2">
                    <Calendar size={14} className="text-neutral-300" />
                    <input
                        type="date"
                        value={newDeadline}
                        onChange={(e) => setNewDeadline(e.target.value)}
                        onBlur={handleEditConfirm}
                        className="bg-neutral-800 text-white rounded px-2 py-1 w-full text-sm"
                    />
                </div>
            ) : (
                task.deadline && (
                    <div className="text-xs text-neutral-300 flex items-center gap-1">
                        <Calendar size={12} /> {task.deadline}
                    </div>
                )
            )}
        </div>
    );
}

type ColumnKey = 'todo' | 'clarification' | 'change' | 'progress' | 'review' | 'done';
interface Column {
    name: string;
    color: string;
    items: Task[];
}
type Columns = Record<ColumnKey, Column>;

export default function KanbanBoard() {
    const [columns, setColumns] = useState<Columns>({
        todo: {
            name: 'To do',
            color: 'bg-neutral-800/60',
            items: [
                { id: '1', name: 'Projekt setup' },
                { id: '2', name: 'Design review' },
            ],
        },
        clarification: { name: 'In clarification', color: 'bg-blue-500/20', items: [] },
        change: { name: 'Change Requested', color: 'bg-yellow-500/20', items: [] },
        progress: { name: 'In Progress', color: 'bg-purple-500/20', items: [] },
        review: { name: 'Review', color: 'bg-green-500/20', items: [] },
        done: { name: 'Done', color: 'bg-emerald-500/20', items: [] },
    });

    // LocalStorage mentés + visszatöltés
    useEffect(() => {
        const saved = localStorage.getItem('kanban-columns-v2');
        if (saved) setColumns(JSON.parse(saved));
    }, []);

    useEffect(() => {
        localStorage.setItem('kanban-columns-v2', JSON.stringify(columns));
    }, [columns]);

    const handleDragEnd = (event: DragEndEvent) => {
  const { active, over } = event;
  if (!over || active.id === over.id) return;

  let sourceCol: ColumnKey | undefined;
  let destCol: ColumnKey | undefined;

  (Object.keys(columns) as ColumnKey[]).forEach((key) => {
    if (columns[key].items.some((x) => x.id === active.id)) sourceCol = key;
    if (columns[key].items.some((x) => x.id === over.id)) destCol = key;
  });

  if (!sourceCol || !destCol) return;

  const sCol = sourceCol;
  const dCol = destCol;

  const sourceItems = [...columns[sCol].items];
  const destItems = sCol === dCol ? sourceItems : [...columns[dCol].items];
  const draggedItemIndex = sourceItems.findIndex((x) => x.id === active.id);
  const draggedItem = sourceItems[draggedItemIndex];
  if (!draggedItem) return;

  // remove from source
  sourceItems.splice(draggedItemIndex, 1);

  if (sCol === dCol) {
    // same column reorder
    const overIndex = sourceItems.findIndex((x) => x.id === over.id);
    const newItems = arrayMove([...sourceItems, draggedItem], draggedItemIndex, overIndex >= 0 ? overIndex : sourceItems.length);
    setColumns((prev) => ({ ...prev, [sCol]: { ...prev[sCol], items: newItems } }));
  } else {
    // different column
    const overIndex = destItems.findIndex((x) => x.id === over.id);
    if (overIndex >= 0) destItems.splice(overIndex, 0, draggedItem);
    else destItems.push(draggedItem);

    setColumns((prev) => ({
      ...prev,
      [sCol]: { ...prev[sCol], items: sourceItems },
      [dCol]: { ...prev[dCol], items: destItems },
    }));
  }
};


    const addTask = (col: ColumnKey, name: string, deadline?: string) => {
        if (!name.trim()) return;
        const newTask: Task = {
            id: Date.now().toString(),
            name,
            deadline,
        };
        setColumns((prev) => ({
            ...prev,
            [col]: { ...prev[col], items: [...prev[col].items, newTask] },
        }));
    };

    const deleteTask = (col: ColumnKey, id: string) => {
        setColumns((prev) => ({
            ...prev,
            [col]: { ...prev[col], items: prev[col].items.filter((x) => x.id !== id) },
        }));
    };

    const editTask = (col: ColumnKey, id: string, newName: string, newDeadline?: string) => {
        setColumns((prev) => ({
            ...prev,
            [col]: {
                ...prev[col],
                items: prev[col].items.map((x) =>
                    x.id === id ? { ...x, name: newName, deadline: newDeadline } : x
                ),
            },
        }));
    };

    return (
        <div className="flex gap-4 overflow-x-auto p-4 items-start">
            <DndContext collisionDetection={closestCorners} onDragEnd={handleDragEnd}>
                {(Object.entries(columns) as [ColumnKey, Column][]).map(([key, column]) => (
                    <div
                        key={key}
                        className={`${column.color} rounded-xl p-4 w-72 flex-shrink-0 shadow-lg border border-neutral-700`}
                    >
                        <h2 className="text-lg font-semibold mb-4 flex items-center justify-between text-white">
                            <span>{column.name}</span>
                            <span className="text-sm text-neutral-400">
                                {column.items.length}
                            </span>
                        </h2>

                        <SortableContext
                            items={column.items.map((t) => t.id)}
                            strategy={verticalListSortingStrategy}
                        >
                            {column.items.map((task) => (
                                <TaskCard
                                    key={task.id}
                                    task={task}
                                    onDelete={() => deleteTask(key, task.id)}
                                    onEdit={(newName, newDeadline) =>
                                        editTask(key, task.id, newName, newDeadline)
                                    }
                                />
                            ))}
                        </SortableContext>

                        <AddTaskInput onAdd={(name, deadline) => addTask(key, name, deadline)} />
                    </div>
                ))}
            </DndContext>
        </div>
    );
}

function AddTaskInput({ onAdd }: { onAdd: (name: string, deadline?: string) => void }) {
  const [value, setValue] = useState('');
  const [showInput, setShowInput] = useState(false);
  const [deadline, setDeadline] = useState('');

  const handleSubmit = () => {
    if (!value.trim()) return;
    onAdd(value, deadline || undefined);
    setValue('');
    setDeadline('');
    setShowInput(false);
  };

  return (
    <div className="mt-2">
      {showInput ? (
        <div className="flex flex-col gap-2">
          <input
            className="bg-neutral-800 text-white rounded px-2 py-1 w-full"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
            placeholder="Task name"
            autoFocus
          />
          <input
            type="date"
            className="bg-neutral-800 text-white rounded px-2 py-1 w-full text-sm"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
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
