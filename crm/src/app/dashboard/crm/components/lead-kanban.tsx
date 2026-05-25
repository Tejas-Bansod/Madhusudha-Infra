"use client";

import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { Lead, LeadStage, LeadPriority, LEAD_STAGES } from "../data/leads";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Phone,
  Mail,
  MapPin,
  IndianRupee,
  MoreHorizontal,
  Building2,
  Flame,
  Thermometer,
  Snowflake,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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

// ─── Priority badge helpers ───────────────────────────────────────────────────
const priorityConfig: Record<
  LeadPriority,
  { label: string; icon: React.ComponentType<any>; className: string }
> = {
  Hot: {
    label: "Hot",
    icon: Flame,
    className: "bg-rose-500/15 text-rose-600 border-rose-500/30 dark:text-rose-400",
  },
  Warm: {
    label: "Warm",
    icon: Thermometer,
    className: "bg-amber-500/15 text-amber-600 border-amber-500/30 dark:text-amber-400",
  },
  Cold: {
    label: "Cold",
    icon: Snowflake,
    className: "bg-blue-500/15 text-blue-600 border-blue-500/30 dark:text-blue-400",
  },
};

// ─── Individual Lead Card (display only) ─────────────────────────────────────
function LeadCard({ lead, isDragging }: { lead: Lead; isDragging?: boolean }) {
  const pCfg = priorityConfig[lead.priority];
  const PIcon = pCfg.icon;

  return (
    <div
      className={cn(
        "rounded-xl border border-border/50 bg-card/80 p-3.5 shadow-sm",
        "transition-all duration-150 group",
        isDragging ? "shadow-2xl ring-2 ring-primary/30 rotate-[1.5deg] scale-105" : "hover:shadow-md hover:border-border"
      )}
    >
      {/* Top row: avatar + name + priority + menu */}
      <div className="flex items-start justify-between gap-2 mb-2.5">
        <div className="flex items-center gap-2.5 min-w-0">
          <Avatar className="h-8 w-8 shrink-0 border border-border/50">
            <AvatarImage src={lead.avatar} alt={lead.name} />
            <AvatarFallback className="text-[10px] font-bold">
              {lead.name.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="min-w-0">
            <p className="text-xs font-semibold text-foreground truncate leading-tight">{lead.name}</p>
            <p className="text-[10px] text-muted-foreground truncate">{lead.email}</p>
          </div>
        </div>
        <div className="flex items-center gap-1 shrink-0">
          <Badge
            variant="outline"
            className={cn("text-[9px] font-bold px-1.5 py-0 h-5 gap-0.5 shrink-0", pCfg.className)}
          >
            <PIcon className="h-2.5 w-2.5" />
            {pCfg.label}
          </Badge>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-5 w-5 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <MoreHorizontal className="h-3 w-3" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="text-xs">
              <DropdownMenuItem>View Details</DropdownMenuItem>
              <DropdownMenuItem>Edit Lead</DropdownMenuItem>
              <DropdownMenuItem>Schedule Visit</DropdownMenuItem>
              <DropdownMenuItem className="text-rose-500">Delete</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Requirements */}
      <p className="text-[11px] text-muted-foreground mb-2.5 leading-relaxed line-clamp-2">
        {lead.requirements}
      </p>

      {/* Meta row */}
      <div className="flex items-center gap-2 mb-2 flex-wrap">
        <span className="flex items-center gap-1 text-[10px] font-semibold text-emerald-600 dark:text-emerald-400">
          <IndianRupee className="h-3 w-3" />
          {lead.budget}
        </span>
        <span className="w-0.5 h-3 bg-border" />
        <span className="flex items-center gap-1 text-[10px] text-muted-foreground">
          <Building2 className="h-3 w-3" />
          {lead.propertyType}
        </span>
        <span className="w-0.5 h-3 bg-border" />
        <span className="flex items-center gap-1 text-[10px] text-muted-foreground truncate">
          <MapPin className="h-3 w-3 shrink-0" />
          <span className="truncate">{lead.location.split(",")[0]}</span>
        </span>
      </div>

      {/* Footer: source + agent + quick actions */}
      <div className="flex items-center justify-between pt-2 border-t border-border/30">
        <div className="flex items-center gap-1.5">
          <Avatar className="h-5 w-5 border border-border/50">
            <AvatarImage src={lead.agentAvatar} />
            <AvatarFallback className="text-[8px]">{lead.agent.slice(0, 2)}</AvatarFallback>
          </Avatar>
          <span className="text-[9px] text-muted-foreground font-medium truncate max-w-[70px]">
            {lead.agent.split(" ")[0]}
          </span>
        </div>
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6 text-muted-foreground hover:text-blue-500"
            onClick={(e: React.MouseEvent) => { e.stopPropagation(); }}
          >
            <Phone className="h-3 w-3" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6 text-muted-foreground hover:text-violet-500"
            onClick={(e: React.MouseEvent) => { e.stopPropagation(); }}
          >
            <Mail className="h-3 w-3" />
          </Button>
        </div>
      </div>
    </div>
  );
}

// ─── Sortable wrapper ─────────────────────────────────────────────────────────
const animateLayoutChanges: AnimateLayoutChanges = (args) =>
  defaultAnimateLayoutChanges({ ...args, wasDragging: true });

function SortableLead({ lead }: { lead: Lead }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({
      id: lead.id,
      data: { type: "Lead", lead },
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
      <LeadCard lead={lead} />
    </div>
  );
}

// ─── Column ───────────────────────────────────────────────────────────────────
function KanbanColumn({
  stageDef,
  leads,
}: {
  stageDef: (typeof LEAD_STAGES)[number];
  leads: Lead[];
}) {
  const { setNodeRef, isOver } = useDroppable({
    id: stageDef.stage,
    data: { type: "Column", stage: stageDef.stage },
  });

  const totalBudget = leads.reduce((sum, l) => {
    const num = parseFloat(l.budget.replace(/[^0-9.]/g, ""));
    const unit = l.budget.includes("Cr") ? 1 : 0.01; // L to Cr
    return sum + num * unit;
  }, 0);

  return (
    <div
      className={cn(
        "flex flex-col rounded-xl border border-t-[3px] h-full min-h-0 min-w-[270px] max-w-[300px]",
        "transition-all duration-200 ease-out glass-card",
        stageDef.accentBorder,
        isOver ? "border-border shadow-lg scale-[1.01]" : "border-border/50 shadow-sm"
      )}
    >
      {/* Column header */}
      <div className="flex items-center justify-between px-3 py-3 flex-shrink-0">
        <div className="flex items-center gap-2">
          <div className={cn("h-2 w-2 rounded-full shadow-sm", stageDef.color)} />
          <h2 className="font-semibold text-[11px] text-foreground uppercase tracking-wider">
            {stageDef.label}
          </h2>
        </div>
        <div className="flex items-center gap-1.5">
          {leads.length > 0 && (
            <span className="text-[9px] text-muted-foreground font-mono">
              ₹{totalBudget.toFixed(1)}Cr
            </span>
          )}
          <div className="bg-background text-foreground text-[10px] font-bold px-2 py-0.5 rounded-full border border-border shadow-sm tabular-nums">
            {leads.length}
          </div>
        </div>
      </div>

      {/* Scrollable list */}
      <div
        ref={setNodeRef}
        className="flex-1 min-h-0 overflow-y-auto scrollbar-thin px-2.5 pb-3"
      >
        <div className="flex flex-col gap-2.5 min-h-[180px]">
          <SortableContext items={leads.map((l) => l.id)} strategy={verticalListSortingStrategy}>
            {leads.map((lead) => (
              <SortableLead key={lead.id} lead={lead} />
            ))}
          </SortableContext>

          {leads.length === 0 && (
            <div
              className={cn(
                "flex flex-col items-center justify-center h-24 rounded-xl text-xs font-medium gap-1",
                "border-2 border-dashed transition-colors duration-200",
                isOver
                  ? "border-primary/50 bg-primary/5 text-primary"
                  : "border-border/40 bg-background/30 text-muted-foreground"
              )}
            >
              {isOver ? (
                "Release to drop"
              ) : (
                <>
                  <span className="text-[10px]">No leads</span>
                  <span className="text-[9px] opacity-60">Drag here</span>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── DnD config ───────────────────────────────────────────────────────────────
const dropAnimation: DropAnimation = {
  duration: 220,
  easing: "cubic-bezier(0.2, 0, 0, 1)",
  sideEffects: defaultDropAnimationSideEffects({
    styles: { active: { opacity: "0" } },
  }),
};

const measuring = { droppable: { strategy: MeasuringStrategy.Always } };

export interface LeadKanbanRef {
  scrollLeft: () => void;
  scrollRight: () => void;
}

interface LeadKanbanProps {
  initialLeads: Lead[];
  onLeadsUpdate?: (leads: Lead[]) => void;
}

// ─── Main export ──────────────────────────────────────────────────────────────
export const LeadKanban = React.forwardRef<LeadKanbanRef, LeadKanbanProps>(
  ({ initialLeads, onLeadsUpdate }, ref) => {
    const [leads, setLeads] = useState<Lead[]>(initialLeads);
    const [activeLead, setActiveLead] = useState<Lead | null>(null);
    const [mounted, setMounted] = useState(false);
    const containerRef = React.useRef<HTMLDivElement>(null);

    useEffect(() => { setMounted(true); }, []);
    useEffect(() => { setLeads(initialLeads); }, [initialLeads]);

    React.useImperativeHandle(ref, () => ({
      scrollLeft: () => {
        if (containerRef.current) {
          containerRef.current.scrollBy({ left: -300, behavior: "smooth" });
        }
      },
      scrollRight: () => {
        if (containerRef.current) {
          containerRef.current.scrollBy({ left: 300, behavior: "smooth" });
        }
      },
    }));

    const sensors = useSensors(
      useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
      useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
    );

    const onDragStart = ({ active }: DragStartEvent) => {
      if (active.data.current?.type === "Lead") {
        setActiveLead(active.data.current.lead);
      }
    };

    const onDragOver = ({ active, over }: DragOverEvent) => {
      if (!over || active.id === over.id) return;
      const isActiveLead = active.data.current?.type === "Lead";
      const isOverLead = over.data.current?.type === "Lead";
      const isOverColumn = over.data.current?.type === "Column";
      if (!isActiveLead) return;

      setLeads((prev) => {
        const activeIdx = prev.findIndex((l) => l.id === active.id);
        if (activeIdx === -1) return prev;
        const activeItem = prev[activeIdx];

        if (isOverLead) {
          const overIdx = prev.findIndex((l) => l.id === over.id);
          const overItem = prev[overIdx];
          if (activeItem.stage !== overItem.stage) {
            const updated = [...prev];
            updated[activeIdx] = { ...activeItem, stage: overItem.stage };
            return arrayMove(updated, activeIdx, overIdx > 0 ? overIdx - 1 : 0);
          }
          return arrayMove(prev, activeIdx, overIdx);
        }

        if (isOverColumn) {
          const newStage = over.data.current?.stage as LeadStage;
          if (activeItem.stage !== newStage) {
            const updated = [...prev];
            updated[activeIdx] = { ...activeItem, stage: newStage };
            return arrayMove(updated, activeIdx, updated.length - 1);
          }
        }
        return prev;
      });
    };

    const onDragEnd = () => {
      setActiveLead(null);
      onLeadsUpdate?.(leads);
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
        {/* Horizontally scrollable kanban */}
        <div
          ref={containerRef}
          className="flex gap-4 h-full min-h-0 overflow-x-auto scrollbar-thin pb-2"
        >
          {LEAD_STAGES.map((stageDef: typeof LEAD_STAGES[number]) => (
            <KanbanColumn
              key={stageDef.stage}
              stageDef={stageDef}
              leads={leads.filter((l) => l.stage === stageDef.stage)}
            />
          ))}
        </div>

        {typeof window !== "undefined" &&
          createPortal(
            <DragOverlay dropAnimation={dropAnimation}>
              {activeLead ? <LeadCard lead={activeLead} isDragging /> : null}
            </DragOverlay>,
            document.body
          )}
      </DndContext>
    );
  }
);

LeadKanban.displayName = "LeadKanban";
