"use client";

import { useState, useRef } from "react";
import { UploadCloud, X, File as FileIcon, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

export function FileUploadModal({ 
  triggerText = "Upload Files", 
  onUploadComplete 
}: { 
  triggerText?: string; 
  onUploadComplete?: (files: { name: string; type: 'pdf' | 'image' | 'doc' | 'archive' | 'sheet'; size: string }[]) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [files, setFiles] = useState<{name: string, size: number, progress: number, status: 'uploading' | 'completed' | 'error'}[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(Array.from(e.dataTransfer.files));
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFiles(Array.from(e.target.files));
    }
  };

  const handleFiles = (newFiles: File[]) => {
    const newFilesData = newFiles.map(file => ({
      name: file.name,
      size: file.size,
      progress: 0,
      status: 'uploading' as const
    }));
    
    // Capture the current files length before updating state asynchronously
    const startIdx = files.length;
    setFiles(prev => [...prev, ...newFilesData]);

    // Simulate upload progress for each file
    newFilesData.forEach((file, index) => {
      const currentIdx = startIdx + index;
      let progress = 0;
      
      const interval = setInterval(() => {
        progress += Math.random() * 15 + 5;
        if (progress >= 100) {
          progress = 100;
          clearInterval(interval);
          setFiles(prev => {
            const updated = [...prev];
            if(updated[currentIdx]) {
              updated[currentIdx].progress = 100;
              updated[currentIdx].status = 'completed';
            }
            return updated;
          });
        } else {
          setFiles(prev => {
            const updated = [...prev];
            if(updated[currentIdx]) {
              updated[currentIdx].progress = progress;
            }
            return updated;
          });
        }
      }, 300);
    });
  };

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  const formatSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="bg-primary text-primary-foreground shadow-lg hover:shadow-primary/25 transition-all">
          <UploadCloud className="mr-2 h-4 w-4" />
          {triggerText}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] border-border/50 bg-background/95 backdrop-blur-xl">
        <DialogHeader>
          <DialogTitle>Upload Files</DialogTitle>
          <DialogDescription>
            Drag and drop your files here or click to browse.
          </DialogDescription>
        </DialogHeader>

        <div 
          className={`mt-4 relative overflow-hidden rounded-xl border-2 border-dashed transition-all duration-300 flex flex-col items-center justify-center p-12 text-center cursor-pointer ${
            isDragging 
              ? 'border-primary bg-primary/5 scale-[1.02]' 
              : 'border-border/50 hover:border-primary/50 hover:bg-muted/30'
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
        >
          <input 
            type="file" 
            ref={fileInputRef} 
            className="hidden" 
            multiple 
            onChange={handleFileInput}
          />
          <div className={`p-4 rounded-full mb-4 transition-colors duration-300 ${isDragging ? 'bg-primary/20 text-primary' : 'bg-muted text-muted-foreground'}`}>
            <UploadCloud className="h-8 w-8" />
          </div>
          <h3 className="text-sm font-semibold mb-1">
            {isDragging ? 'Drop files here' : 'Select files or drag and drop'}
          </h3>
          <p className="text-xs text-muted-foreground">
            PDF, DOCX, JPG, PNG up to 50MB
          </p>
        </div>

        <AnimatePresence>
          {files.length > 0 && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-6 space-y-3 max-h-[200px] overflow-y-auto pr-2 custom-scrollbar"
            >
              {files.map((file, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="flex items-center gap-3 p-3 rounded-lg border border-border/50 bg-background/50 relative overflow-hidden group"
                >
                  <div className="p-2 rounded-md bg-primary/10 text-primary shrink-0">
                    {file.status === 'completed' ? <CheckCircle2 className="h-5 w-5 text-emerald-500" /> : <FileIcon className="h-5 w-5" />}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-center mb-1">
                      <p className="text-sm font-medium truncate pr-4">{file.name}</p>
                      <button 
                        onClick={(e) => { e.stopPropagation(); removeFile(i); }}
                        className="text-muted-foreground hover:text-foreground opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                    <div className="flex items-center justify-between gap-4">
                      <Progress value={file.progress} className={`h-1.5 ${file.status === 'completed' ? '[&>div]:bg-emerald-500' : ''}`} />
                      <span className="text-xs text-muted-foreground shrink-0 w-12 text-right">
                        {file.progress < 100 ? `${Math.round(file.progress)}%` : formatSize(file.size)}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
        
        {files.length > 0 && (
          <div className="mt-4 flex justify-end gap-2">
            <Button variant="outline" onClick={() => setFiles([])}>Clear All</Button>
            <Button onClick={() => {
              if (onUploadComplete) {
                const uploaded = files.filter(f => f.status === 'completed').map(f => {
                  const ext = f.name.split('.').pop() || '';
                  let fileType: 'pdf' | 'image' | 'doc' | 'archive' | 'sheet' = 'doc';
                  if (['pdf'].includes(ext.toLowerCase())) fileType = 'pdf';
                  else if (['png', 'jpg', 'jpeg', 'svg', 'webp'].includes(ext.toLowerCase())) fileType = 'image';
                  else if (['zip', 'rar', 'tar', 'gz'].includes(ext.toLowerCase())) fileType = 'archive';
                  else if (['xls', 'xlsx', 'csv'].includes(ext.toLowerCase())) fileType = 'sheet';
                  
                  return {
                    name: f.name,
                    type: fileType,
                    size: formatSize(f.size)
                  };
                });
                onUploadComplete(uploaded);
              }
              setFiles([]);
              setIsOpen(false);
            }}>Done</Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
