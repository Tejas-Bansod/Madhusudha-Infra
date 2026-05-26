"use client";

import { motion } from "framer-motion";
import { FileText, Image as ImageIcon, File, MoreHorizontal, Download, Share2, Trash2, Folder, FolderOpen, ArrowRight, Eye } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface FileItem {
  id: string;
  name: string;
  type: 'pdf' | 'image' | 'doc' | 'archive' | 'sheet' | 'folder';
  size?: string;
  date: string;
  category: string;
  parentId: string | null;
}

interface DocumentListProps {
  items: FileItem[];
  onFolderClick: (folderId: string) => void;
  onDelete: (id: string) => void;
}

const getFileIcon = (type: string) => {
  switch (type) {
    case "folder": return <Folder className="h-5 w-5 text-amber-500 fill-amber-500/20" />;
    case "pdf": return <FileText className="h-5 w-5 text-rose-500" />;
    case "image": return <ImageIcon className="h-5 w-5 text-blue-500" />;
    case "doc": return <FileText className="h-5 w-5 text-blue-600" />;
    case "archive": return <FolderOpen className="h-5 w-5 text-amber-600" />;
    case "sheet": return <File className="h-5 w-5 text-emerald-500" />;
    default: return <File className="h-5 w-5 text-slate-500" />;
  }
};

const getFileColor = (type: string) => {
  switch (type) {
    case "folder": return "bg-amber-500/10";
    case "pdf": return "bg-rose-500/10";
    case "image": return "bg-blue-500/10";
    case "doc": return "bg-blue-600/10";
    case "archive": return "bg-amber-600/10";
    case "sheet": return "bg-emerald-500/10";
    default: return "bg-slate-500/10";
  }
};

export function DocumentList({ items, onFolderClick, onDelete }: DocumentListProps) {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.03
      }
    }
  } as const;

  const itemAnim = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 25 } }
  } as const;

  if (items.length === 0) {
    return (
      <div className="text-center py-20 text-muted-foreground bg-background/30 rounded-xl border border-dashed border-border/50">
        No files or folders found here.
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-border/50 bg-background/50 backdrop-blur-xl overflow-hidden shadow-sm">
      <div className="grid grid-cols-12 gap-4 p-4 border-b border-border/50 bg-muted/20 text-sm font-medium text-muted-foreground">
        <div className="col-span-5 md:col-span-4 lg:col-span-5">Name</div>
        <div className="col-span-2 md:col-span-2 lg:col-span-2">Size</div>
        <div className="col-span-3 md:col-span-2 lg:col-span-2 hidden md:block">Category</div>
        <div className="col-span-3 md:col-span-3 lg:col-span-2 hidden lg:block">Last Modified</div>
        <div className="col-span-2 md:col-span-1 lg:col-span-1 text-right">Actions</div>
      </div>
      
      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className="divide-y divide-border/50"
      >
        {items.map((item) => (
          <motion.div 
            key={item.id} 
            variants={itemAnim}
            onClick={() => item.type === 'folder' && onFolderClick(item.id)}
            className={`grid grid-cols-12 gap-4 p-4 items-center transition-colors hover:bg-muted/30 group ${
              item.type === 'folder' ? 'cursor-pointer' : 'cursor-default'
            }`}
          >
            <div className="col-span-5 md:col-span-4 lg:col-span-5 flex items-center gap-3">
              <div className={`p-2 rounded-lg ${getFileColor(item.type)} transition-transform group-hover:scale-105`}>
                {getFileIcon(item.type)}
              </div>
              <span className="text-sm font-medium truncate group-hover:text-primary transition-colors">
                {item.name}
              </span>
            </div>
            
            <div className="col-span-2 md:col-span-2 lg:col-span-2 text-sm text-muted-foreground">
              {item.type === 'folder' ? '--' : item.size}
            </div>

            <div className="col-span-3 md:col-span-2 lg:col-span-2 hidden md:block">
              <Badge variant="secondary" className="bg-secondary/50 text-xs px-2 py-0.5">
                {item.category}
              </Badge>
            </div>
            
            <div className="col-span-3 md:col-span-3 lg:col-span-2 hidden lg:block text-sm text-muted-foreground">
              {item.date}
            </div>
            
            <div className="col-span-2 md:col-span-1 lg:col-span-1 flex justify-end" onClick={(e) => e.stopPropagation()}>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity">
                    <MoreHorizontal className="h-4 w-4" />
                    <span className="sr-only">Open menu</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-40">
                  {item.type !== 'folder' && (
                    <>
                      <DropdownMenuItem>
                        <Download className="mr-2 h-4 w-4" />
                        <span>Download</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Share2 className="mr-2 h-4 w-4" />
                        <span>Share</span>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                    </>
                  )}
                  <DropdownMenuItem className="text-destructive focus:text-destructive" onClick={() => onDelete(item.id)}>
                    <Trash2 className="mr-2 h-4 w-4" />
                    <span>Delete</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
