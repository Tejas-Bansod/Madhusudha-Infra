"use client";

import { motion } from "framer-motion";
import { FileText, Image as ImageIcon, File, MoreVertical, Download, Share2, Trash2, Folder, FolderOpen } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";

interface FileItem {
  id: string;
  name: string;
  type: 'pdf' | 'image' | 'doc' | 'archive' | 'sheet' | 'folder';
  size?: string;
  date: string;
  category: string;
  parentId: string | null;
}

interface DocumentGridProps {
  items: FileItem[];
  onFolderClick: (folderId: string) => void;
  onDelete: (id: string) => void;
}

const getFileIcon = (type: string) => {
  switch (type) {
    case "folder": return <Folder className="h-8 w-8 text-amber-500 fill-amber-500/20" />;
    case "pdf": return <FileText className="h-8 w-8 text-rose-500" />;
    case "image": return <ImageIcon className="h-8 w-8 text-blue-500" />;
    case "doc": return <FileText className="h-8 w-8 text-blue-600" />;
    case "archive": return <FolderOpen className="h-8 w-8 text-amber-600" />;
    case "sheet": return <File className="h-8 w-8 text-emerald-500" />;
    default: return <File className="h-8 w-8 text-slate-500" />;
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

export function DocumentGrid({ items, onFolderClick, onDelete }: DocumentGridProps) {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  } as const;

  const itemAnim = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
  } as const;

  if (items.length === 0) {
    return (
      <div className="text-center py-20 text-muted-foreground bg-background/30 rounded-xl border border-dashed border-border/50">
        No files or folders found here.
      </div>
    );
  }

  // Sort folders first
  const sortedItems = [...items].sort((a, b) => {
    if (a.type === 'folder' && b.type !== 'folder') return -1;
    if (a.type !== 'folder' && b.type === 'folder') return 1;
    return 0;
  });

  return (
    <motion.div 
      variants={container}
      initial="hidden"
      animate="show"
      className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
    >
      {sortedItems.map((doc) => (
        <motion.div key={doc.id} variants={itemAnim}>
          <Card 
            onClick={() => doc.type === 'folder' && onFolderClick(doc.id)}
            className={`group p-0 relative overflow-hidden border-border/50 bg-background/40 backdrop-blur-xl transition-all duration-300 hover:shadow-lg hover:border-primary/50 ${
              doc.type === 'folder' ? 'cursor-pointer hover:bg-amber-500/5' : ''
            }`}
          >
            <CardContent className="p-4">
              <div className="flex justify-between items-start mb-4">
                <div className={`p-3 rounded-2xl ${getFileColor(doc.type)} transition-transform duration-300 group-hover:scale-110`}>
                  {getFileIcon(doc.type)}
                </div>
                
                <div onClick={(e) => e.stopPropagation()}>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity">
                        <MoreVertical className="h-4 w-4" />
                        <span className="sr-only">Open menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-40">
                      {doc.type !== 'folder' && (
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
                      <DropdownMenuItem className="text-destructive focus:text-destructive" onClick={() => onDelete(doc.id)}>
                        <Trash2 className="mr-2 h-4 w-4" />
                        <span>Delete</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
              
              <div className="space-y-1">
                <h4 className="text-sm font-semibold truncate group-hover:text-primary transition-colors" title={doc.name}>
                  {doc.name}
                </h4>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>{doc.type === 'folder' ? 'Folder' : doc.size}</span>
                  <span>{doc.date}</span>
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between">
                <Badge variant="secondary" className="bg-secondary/50 text-xs px-2 py-0.5">
                  {doc.category}
                </Badge>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </motion.div>
  );
}
