"use client";

import { useState, useMemo } from "react";
import { Search, Filter, LayoutGrid, List, SortAsc, FolderPlus, ChevronRight, Home, ArrowLeft } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { FileUploadModal } from "../components/FileUploadModal";
import { DocumentStats } from "../components/DocumentStats";
import { DocumentGrid } from "../components/DocumentGrid";
import { DocumentList } from "../components/DocumentList";

interface FileItem {
  id: string;
  name: string;
  type: 'pdf' | 'image' | 'doc' | 'archive' | 'sheet' | 'folder';
  size?: string;
  date: string;
  category: string;
  parentId: string | null;
}

const initialItems: FileItem[] = [
  { id: "1", name: "Property Documents", type: "folder", date: "May 25, 2026", category: "System", parentId: null },
  { id: "2", name: "Financial Reports", type: "folder", date: "May 24, 2026", category: "System", parentId: null },
  { id: "3", name: "Client Agreements", type: "folder", date: "May 23, 2026", category: "System", parentId: null },
  { id: "4", name: "Project_Blueprint_v2.pdf", type: "pdf", size: "4.2 MB", date: "May 22, 2026", category: "Plans", parentId: "1" },
  { id: "5", name: "Site_Survey_Report.docx", type: "doc", size: "1.8 MB", date: "May 22, 2026", category: "Reports", parentId: "1" },
  { id: "6", name: "Property_Images_HQ.zip", type: "archive", size: "145 MB", date: "May 21, 2026", category: "Media", parentId: "1" },
  { id: "7", name: "Client_Contract_Final.pdf", type: "pdf", size: "2.1 MB", date: "May 20, 2026", category: "Legal", parentId: "3" },
  { id: "8", name: "Floor_Plan_A.png", type: "image", size: "8.5 MB", date: "May 18, 2026", category: "Design", parentId: null },
  { id: "9", name: "Quarterly_Budget.xlsx", type: "sheet", size: "3.4 MB", date: "May 15, 2026", category: "Finance", parentId: "2" },
];

export default function DocumentsPage() {
  const [items, setItems] = useState<FileItem[]>(initialItems);
  const [currentFolderId, setCurrentFolderId] = useState<string | null>(null);
  const [view, setView] = useState<"grid" | "list">("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [newFolderName, setNewFolderName] = useState("");
  const [isFolderDialogOpen, setIsFolderDialogOpen] = useState(false);

  // Navigate folder helper
  const handleFolderClick = (folderId: string) => {
    setCurrentFolderId(folderId);
  };

  // Navigate up/back
  const handleBackClick = () => {
    if (currentFolderId) {
      const currentFolder = items.find(item => item.id === currentFolderId);
      setCurrentFolderId(currentFolder ? currentFolder.parentId : null);
    }
  };

  // Build breadcrumbs
  const breadcrumbs = useMemo(() => {
    const crumbs = [];
    let currentId = currentFolderId;
    while (currentId !== null) {
      const folder = items.find(item => item.id === currentId);
      if (folder) {
        crumbs.unshift(folder);
        currentId = folder.parentId;
      } else {
        break;
      }
    }
    return crumbs;
  }, [currentFolderId, items]);

  // Create folder handler
  const handleCreateFolder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFolderName.trim()) return;

    const newFolder: FileItem = {
      id: Math.random().toString(36).substring(7),
      name: newFolderName,
      type: "folder",
      date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
      category: "User",
      parentId: currentFolderId,
    };

    setItems(prev => [...prev, newFolder]);
    setNewFolderName("");
    setIsFolderDialogOpen(false);
  };

  // Handle uploaded files
  const handleUploadComplete = (uploadedFiles: { name: string; type: 'pdf' | 'image' | 'doc' | 'archive' | 'sheet'; size: string }[]) => {
    const newFileItems: FileItem[] = uploadedFiles.map(file => ({
      id: Math.random().toString(36).substring(7),
      name: file.name,
      type: file.type,
      size: file.size,
      date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
      category: "Uploads",
      parentId: currentFolderId,
    }));

    setItems(prev => [...prev, ...newFileItems]);
  };

  // Delete file/folder handler
  const handleDeleteItem = (id: string) => {
    // Delete all children recursively if it's a folder
    const deleteIds = new Set([id]);
    let prevSize = 0;
    while (deleteIds.size !== prevSize) {
      prevSize = deleteIds.size;
      items.forEach(item => {
        if (item.parentId && deleteIds.has(item.parentId)) {
          deleteIds.add(item.id);
        }
      });
    }

    setItems(prev => prev.filter(item => !deleteIds.has(item.id)));
  };

  // Filter items in the current folder based on search query
  const filteredItems = useMemo(() => {
    return items.filter(item => {
      const matchesFolder = item.parentId === currentFolderId;
      const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesFolder && matchesSearch;
    });
  }, [items, currentFolderId, searchQuery]);

  return (
    <div className="flex-1 space-y-6 p-8 pt-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Document Management</h2>
          <p className="text-muted-foreground mt-1">
            Store, organize, and share your real estate documents securely.
          </p>
        </div>
        <div className="flex items-center gap-2">
          {/* Create Folder Dialog */}
          <Dialog open={isFolderDialogOpen} onOpenChange={setIsFolderDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" className="bg-background/50 border-border/50">
                <FolderPlus className="mr-2 h-4 w-4" />
                New Folder
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] border-border/50 bg-background/95 backdrop-blur-xl">
              <form onSubmit={handleCreateFolder}>
                <DialogHeader>
                  <DialogTitle>Create Folder</DialogTitle>
                  <DialogDescription>
                    Enter a name for your new folder to keep things organized.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">
                      Name
                    </Label>
                    <Input
                      id="name"
                      value={newFolderName}
                      onChange={(e) => setNewFolderName(e.target.value)}
                      placeholder="Folder name"
                      className="col-span-3 bg-background/50 border-border/50"
                      autoFocus
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="button" variant="outline" onClick={() => setIsFolderDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit">Create</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>

          <FileUploadModal triggerText="Upload Documents" onUploadComplete={handleUploadComplete} />
        </div>
      </div>

      <DocumentStats />

      {/* Breadcrumbs and navigation controls */}
      <div className="flex items-center gap-2 text-sm text-muted-foreground bg-muted/20 p-3 rounded-lg border border-border/50 backdrop-blur-sm">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setCurrentFolderId(null)}
          className={`h-7 w-7 ${currentFolderId === null ? 'pointer-events-none opacity-50' : ''}`}
        >
          <Home className="h-4 w-4" />
        </Button>
        
        {currentFolderId && (
          <>
            <ChevronRight className="h-4 w-4 shrink-0" />
            <Button
              variant="ghost"
              size="sm"
              onClick={handleBackClick}
              className="h-7 px-2 flex items-center gap-1"
            >
              <ArrowLeft className="h-3 w-3" /> Back
            </Button>
          </>
        )}

        {breadcrumbs.map((crumb, idx) => (
          <span key={crumb.id} className="flex items-center gap-2">
            <ChevronRight className="h-4 w-4 shrink-0" />
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleFolderClick(crumb.id)}
              className={`h-7 px-2 ${idx === breadcrumbs.length - 1 ? 'font-semibold text-foreground pointer-events-none' : ''}`}
            >
              {crumb.name}
            </Button>
          </span>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 py-2">
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search in this folder..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 bg-background/50 border-border/50 focus-visible:ring-primary/20"
            />
          </div>
          <Button variant="outline" size="icon" className="shrink-0 bg-background/50 border-border/50">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-end">
          <Tabs value={view} onValueChange={(v) => setView(v as "grid" | "list")} className="h-9">
            <TabsList className="grid w-[100px] grid-cols-2 h-9 p-1 bg-background/50 border border-border/50">
              <TabsTrigger value="grid" className="data-[state=active]:bg-background shadow-sm">
                <LayoutGrid className="h-4 w-4" />
              </TabsTrigger>
              <TabsTrigger value="list" className="data-[state=active]:bg-background shadow-sm">
                <List className="h-4 w-4" />
              </TabsTrigger>
            </TabsList>
          </Tabs>
          
          <Button variant="outline" size="sm" className="bg-background/50 border-border/50 h-9">
            <SortAsc className="mr-2 h-4 w-4" />
            Sort
          </Button>
        </div>
      </div>

      {view === "grid" ? (
        <DocumentGrid 
          items={filteredItems} 
          onFolderClick={handleFolderClick} 
          onDelete={handleDeleteItem} 
        />
      ) : (
        <DocumentList 
          items={filteredItems} 
          onFolderClick={handleFolderClick} 
          onDelete={handleDeleteItem} 
        />
      )}
    </div>
  );
}
