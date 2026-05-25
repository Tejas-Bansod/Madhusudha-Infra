"use client";

import { useState, useEffect, useRef } from "react";
import { Task, TaskStatus } from "../data/tasks";
import { TaskCard } from "./task-card";
import { cn } from "@/lib/utils";
import { createPortal } from "react-dom";
import {
  DndContext,
  DragOverlay,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragStartEvent,
  DragOverEvent,
  DragEndEvent,
  useDroppable,
  defaultDropAnimationSideEffects,
  DropAnimation,
  MeasuringStrategy,
} from "@dnd-kit/core";
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable,
  arrayMove,
  AnimateLayoutChanges,
  defaultAnimateLayoutChanges,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

const columns: { title: string; status: TaskStatus; color: string; accent: string }[] = [
  {
    title: "To Do",
    status: "Todo",
    color: "bg-slate-400 dark:bg-slate-500",
    accent: "border-t-slate-400 dark:border-t-slate-500",
  },
  {
    title: "In Progress",
    status: "In Progress",
    color: "bg-blue-500 dark:bg-blue-600",
    accent: "border-t-blue-500 dark:border-t-blue-600",
  },
  {
    title: "Completed",
    status: "Completed",
    color: "bg-emerald-500 dark:bg-emerald-600",
    accent: "border-t-emerald-500 dark:border-t-emerald-600",
  },
];

const animateLayoutChanges: AnimateLayoutChanges = (args) =>
  defaultAnimateLayoutChanges({ ...args, wasDragging: true });

function SortableTask({ task }: { task: Task }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: task.id,
    data: { type: "Task", task },
    animateLayoutChanges,
  });

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition: transition ?? "transform 200ms cubic-bezier(0.25, 1, 0.5, 1)",
    willChange: isDragging ? "transform" : undefined,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={cn(
        "touch-none select-none rounded-xl outline-none",
        "transition-opacity duration-150",
        isDragging ? "opacity-0" : "opacity-100"
      )}
    >
      <TaskCard task={task} />
    </div>
  );
}

function Column({
  col,
  tasks,
}: {
  col: { title: string; status: TaskStatus; color: string; accent: string };
  tasks: Task[];
}) {
  const { setNodeRef, isOver } = useDroppable({
    id: col.status,
    data: { type: "Column", status: col.status },
  });

  return (
    <div
      className={cn(
        "flex flex-col rounded-xl border h-full min-h-0",
        "transition-all duration-200 ease-out",
        "border-t-[3px] glass-card",
        col.accent,
        isOver
          ? "border-border shadow-md scale-[1.01]"
          : "border-border/60 shadow-sm"
      )}
    >
      {/* Column Header */}
      <div className="flex items-center justify-between px-3 py-3 flex-shrink-0">
        <div className="flex items-center gap-2">
          <div className={cn("h-2 w-2 rounded-full shadow-sm", col.color)} />
          <h2 className="font-semibold text-xs text-foreground uppercase tracking-wider">
            {col.title}
          </h2>
        </div>
        <div className="bg-background text-foreground text-[10px] font-bold px-2 py-0.5 rounded-full border border-border shadow-sm tabular-nums">
          {tasks.length}
        </div>
      </div>

      {/* Scrollable task list — native div avoids Radix table-viewport stretch */}
      <div
        ref={setNodeRef}
        className="flex-1 min-h-0 overflow-y-auto scrollbar-thin px-2.5 pb-3"
      >
        <div className="flex flex-col gap-2.5 min-h-[180px]">
          <SortableContext
            items={tasks.map((t) => t.id)}
            strategy={verticalListSortingStrategy}
          >
            {tasks.map((task) => (
              <SortableTask key={task.id} task={task} />
            ))}
          </SortableContext>

          {/* Empty drop target */}
          {tasks.length === 0 && (
            <div
              className={cn(
                "flex items-center justify-center h-24 rounded-xl text-xs font-medium",
                "border-2 border-dashed transition-colors duration-200",
                isOver
                  ? "border-primary/50 bg-primary/5 text-primary"
                  : "border-border/50 bg-background/40 text-muted-foreground"
              )}
            >
              {isOver ? "Release to drop" : "No tasks"}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

const dropAnimation: DropAnimation = {
  duration: 220,
  easing: "cubic-bezier(0.2, 0, 0, 1)",
  sideEffects: defaultDropAnimationSideEffects({
    styles: {
      active: { opacity: "0" },
    },
  }),
};

const measuring = {
  droppable: { strategy: MeasuringStrategy.Always },
};

export function TaskBoard({
  initialTasks,
  onTasksUpdate,
}: {
  initialTasks: Task[];
  onTasksUpdate?: (tasks: Task[]) => void;
}) {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [activeTask, setActiveTask] = useState<Task | null>(null);
  const [mounted, setMounted] = useState(false);
  const tasksRef = useRef(tasks);
  tasksRef.current = tasks;

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    setTasks(initialTasks);
  }, [initialTasks]);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        // Require 8px movement to start drag — prevents accidental drags on click
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const onDragStart = ({ active }: DragStartEvent) => {
    if (active.data.current?.type === "Task") {
      setActiveTask(active.data.current.task);
    }
  };

  const onDragOver = ({ active, over }: DragOverEvent) => {
    if (!over || active.id === over.id) return;

    const isActiveTask = active.data.current?.type === "Task";
    const isOverTask = over.data.current?.type === "Task";
    const isOverColumn = over.data.current?.type === "Column";

    if (!isActiveTask) return;

    setTasks((prev) => {
      const activeIndex = prev.findIndex((t) => t.id === active.id);
      if (activeIndex === -1) return prev;

      const activeItem = prev[activeIndex];

      if (isOverTask) {
        const overIndex = prev.findIndex((t) => t.id === over.id);
        const overItem = prev[overIndex];

        if (activeItem.status !== overItem.status) {
          // Cross-column: change status, insert before target
          const updated = [...prev];
          updated[activeIndex] = { ...activeItem, status: overItem.status };
          return arrayMove(updated, activeIndex, overIndex > 0 ? overIndex - 1 : 0);
        }
        // Same column: reorder
        return arrayMove(prev, activeIndex, overIndex);
      }

      if (isOverColumn) {
        const newStatus = over.data.current?.status as TaskStatus;
        if (activeItem.status !== newStatus) {
          const updated = [...prev];
          updated[activeIndex] = { ...activeItem, status: newStatus };
          // Move to end of new column
          return arrayMove(updated, activeIndex, updated.length - 1);
        }
      }

      return prev;
    });
  };

  const onDragEnd = ({ over }: DragEndEvent) => {
    setActiveTask(null);
    onTasksUpdate?.(tasksRef.current);
  };

  if (!mounted) return null;

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={onDragStart}
      onDragOver={onDragOver}
      onDragEnd={onDragEnd}
      measuring={measuring}
    >
      <div className="grid grid-cols-3 gap-4 lg:gap-5 h-full min-h-0">
        {columns.map((col) => (
          <Column
            key={col.status}
            col={col}
            tasks={tasks.filter((t) => t.status === col.status)}
          />
        ))}
      </div>

      {typeof window !== "undefined" &&
        createPortal(
          <DragOverlay dropAnimation={dropAnimation}>
            {activeTask ? (
              <div
                className="rotate-[1.5deg] scale-105 shadow-2xl opacity-95 cursor-grabbing rounded-xl overflow-hidden ring-2 ring-primary/30"
                style={{ willChange: "transform" }}
              >
                <TaskCard task={activeTask} />
              </div>
            ) : null}
          </DragOverlay>,
          document.body
        )}
    </DndContext>
  );
}
