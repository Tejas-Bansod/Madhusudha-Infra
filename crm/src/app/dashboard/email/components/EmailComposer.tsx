"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Send, X, Plus, Paperclip, AtSign, Sparkles, Bold, Italic,
  Link, Image as ImageIcon, Minus, Eye, Code2, Type, FileText,
  File as FileIcon, Trash2, CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const TEMPLATES = [
  { id: "t1", name: "Property Viewing Confirmation", mode: "html" as const, body: `<div style="font-family:sans-serif;max-width:600px;margin:0 auto"><div style="background:#2563eb;padding:24px;border-radius:8px 8px 0 0"><h1 style="color:#fff;margin:0;font-size:20px">📅 Viewing Confirmed</h1></div><div style="padding:24px;border:1px solid #e5e7eb;border-top:none;border-radius:0 0 8px 8px"><p>Dear <strong>[Client Name]</strong>,</p><p>We are pleased to confirm your property viewing:</p><table style="width:100%;background:#f9fafb;border-radius:6px;padding:16px"><tr><td><strong>Property</strong></td><td>[Property Address]</td></tr><tr><td><strong>Date</strong></td><td>[Date]</td></tr><tr><td><strong>Time</strong></td><td>[Time]</td></tr><tr><td><strong>Agent</strong></td><td>[Agent Name]</td></tr></table><p style="margin-top:16px">Please carry a valid ID. Contact us to reschedule.</p><p>Best regards,<br/><strong>Madhusudha Infra Team</strong></p></div></div>` },
  { id: "t2", name: "New Listing Alert", mode: "html" as const, body: `<div style="font-family:sans-serif;max-width:600px;margin:0 auto"><div style="background:#7c3aed;padding:24px;border-radius:8px 8px 0 0"><h1 style="color:#fff;margin:0;font-size:20px">🏠 New Listing Alert</h1></div><div style="padding:24px;border:1px solid #e5e7eb;border-top:none;border-radius:0 0 8px 8px"><p>Dear <strong>[Client Name]</strong>,</p><p>A new property matching your wishlist is now available.</p><div style="background:#f3f4f6;border-radius:8px;padding:16px"><p style="margin:0 0 8px"><strong>[Property Title]</strong></p><p style="margin:0;color:#6b7280">[Location] • [Price] • [Area]</p></div><a href="#" style="display:inline-block;margin-top:16px;padding:12px 24px;background:#7c3aed;color:#fff;border-radius:6px;text-decoration:none">Schedule a Visit</a></div></div>` },
  { id: "t3", name: "Follow-Up After Showing", mode: "text" as const, body: `Dear [Client Name],\n\nThank you for visiting [Property Name] yesterday. We hope you found it to your liking!\n\nAs discussed:\n• Price: [Price]\n• EMI starts at: [EMI]\n• Documentation can be completed within 7 working days\n\nWe are ready to proceed at your convenience. Let us know if you'd like a second visit.\n\nWarm regards,\n[Agent Name]\nMadhusudha Infra` },
  { id: "t4", name: "Market Update", mode: "text" as const, body: `Dear [Client Name],\n\nHere is your personalized real estate market report for [Month Year].\n\n📈 Highlights:\n• Residential prices up [X]% YoY\n• Commercial leasing activity surged [X]% this quarter\n• Emerging micro-markets: [Locations]\n\nWould you like a detailed consultation? Book a call with your advisor.\n\nBest regards,\nMadhusudha Infra – Research Desk` },
];

const SUGGESTIONS = [
  "vikram.malhotra@email.com", "anjali.sen@company.com", "rajesh.kumar@firm.in",
  "priya.sharma@gmail.com", "arjun.mehta@outlook.com",
];

interface Attachment { id: string; name: string; size: string; type: string; }

export function EmailComposer({ onSend }: { onSend?: (d: any) => void }) {
  const [recipients, setRecipients] = useState<string[]>([]);
  const [recipientInput, setRecipientInput] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [subject, setSubject] = useState("");
  const [mode, setMode] = useState<"text" | "html">("text");
  const [body, setBody] = useState("");
  const [showCc, setShowCc] = useState(false);
  const [cc, setCc] = useState("");
  const [attachments, setAttachments] = useState<Attachment[]>([]);
  const [isSending, setIsSending] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const filteredSuggestions = SUGGESTIONS.filter(
    (s) => s.includes(recipientInput) && !recipients.includes(s) && recipientInput.length > 0
  );

  const addRecipient = (email: string) => {
    const t = email.trim();
    if (t && !recipients.includes(t)) setRecipients((p) => [...p, t]);
    setRecipientInput(""); setShowSuggestions(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if ((e.key === "Enter" || e.key === ",") && recipientInput) { e.preventDefault(); addRecipient(recipientInput); }
    if (e.key === "Backspace" && !recipientInput && recipients.length) setRecipients((p) => p.slice(0, -1));
  };

  const applyTemplate = (id: string) => {
    const t = TEMPLATES.find((t) => t.id === id);
    if (t) { setSubject(t.name); setBody(t.body); setMode(t.mode); }
    setSelectedTemplate(id);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const newAttachments: Attachment[] = files.map((f) => ({
      id: `att-${Date.now()}-${f.name}`,
      name: f.name,
      size: f.size < 1024 * 1024 ? `${(f.size / 1024).toFixed(1)} KB` : `${(f.size / (1024 * 1024)).toFixed(1)} MB`,
      type: f.type,
    }));
    setAttachments((p) => [...p, ...newAttachments]);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSend = async () => {
    if (!recipients.length || !subject || !body) return;
    setIsSending(true);
    await new Promise((r) => setTimeout(r, 1500));
    onSend?.({ to: recipients, subject, body, mode, attachments });
    setIsSending(false);
    setRecipients([]); setSubject(""); setBody("");
    setAttachments([]); setSelectedTemplate(""); setCc("");
  };

  return (
    <div className="space-y-2">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-2">
        <Select value={selectedTemplate} onValueChange={applyTemplate}>
          <SelectTrigger className="h-8 text-xs w-full sm:w-[200px] bg-muted/20 border-border/50 rounded-xl">
            <Sparkles className="h-3.5 w-3.5 text-primary mr-1.5 shrink-0" />
            <SelectValue placeholder="Load template..." />
          </SelectTrigger>
          <SelectContent className="bg-popover border-border/50">
            {TEMPLATES.map((t) => (
              <SelectItem key={t.id} value={t.id} className="text-xs">
                {t.name}
                <Badge variant="outline" className="ml-2 text-[9px] py-0 px-1 border-border/50">{t.mode.toUpperCase()}</Badge>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Mode Toggle */}
        <div className="flex items-center border border-border/40 rounded-xl overflow-hidden bg-muted/20 shrink-0">
          {(["text", "html"] as const).map((m) => (
            <button
              key={m}
              onClick={() => setMode(m)}
              className={cn(
                "flex items-center gap-1 px-3 h-8 text-[11px] font-bold transition-colors",
                mode === m ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
              )}
            >
              {m === "text" ? <Type className="h-3 w-3" /> : <Code2 className="h-3 w-3" />}
              {m.toUpperCase()}
            </button>
          ))}
        </div>

        {/* Format buttons (text mode) */}
        {mode === "text" && (
          <div className="flex items-center gap-1 border border-border/40 p-1 rounded-xl bg-muted/20">
            {[{ icon: Bold, title: "Bold" }, { icon: Italic, title: "Italic" }, { icon: Link, title: "Link" }].map(({ icon: Icon, title }) => (
              <button key={title} title={title} className="h-6 w-6 flex items-center justify-center rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/40 transition-colors">
                <Icon className="h-3.5 w-3.5" />
              </button>
            ))}
          </div>
        )}

        <div className="ml-auto flex items-center gap-2">
          <Button variant="outline" size="sm" className="h-8 text-xs rounded-xl border-border/50 gap-1.5" onClick={() => setShowPreview(true)} disabled={!body}>
            <Eye className="h-3.5 w-3.5" /> Preview
          </Button>
          <button onClick={() => setShowCc(!showCc)} className="text-[10px] font-bold text-muted-foreground hover:text-primary transition-colors flex items-center gap-1">
            {showCc ? <Minus className="h-3 w-3" /> : <Plus className="h-3 w-3" />} CC
          </button>
        </div>
      </div>

      {/* To Field */}
      <div className="space-y-1.5">
        <Label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">To</Label>
        <div className="relative min-h-[42px] flex flex-wrap items-center gap-1.5 p-2.5 rounded-xl border border-border/50 bg-background/60 focus-within:border-primary/50 transition-colors">
          <AnimatePresence mode="popLayout">
            {recipients.map((email) => (
              <motion.div key={email} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }}
                className="inline-flex items-center gap-1 bg-primary/10 text-primary border border-primary/20 rounded-full px-2.5 py-0.5 text-xs font-medium">
                <AtSign className="h-3 w-3 shrink-0" />
                <span>{email}</span>
                <button onClick={() => setRecipients((p) => p.filter((r) => r !== email))} className="hover:text-destructive transition-colors">
                  <X className="h-3 w-3" />
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
          <input
            className="flex-1 min-w-[160px] text-xs bg-transparent outline-none placeholder:text-muted-foreground/50"
            placeholder={recipients.length === 0 ? "Add recipients (Enter or comma)..." : "Add more..."}
            value={recipientInput}
            onChange={(e) => { setRecipientInput(e.target.value); setShowSuggestions(true); }}
            onKeyDown={handleKeyDown}
            onFocus={() => setShowSuggestions(true)}
            onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
          />
          <AnimatePresence>
            {showSuggestions && filteredSuggestions.length > 0 && (
              <motion.div initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }}
                className="absolute top-full left-0 right-0 mt-1 z-50 bg-popover border border-border/50 rounded-xl shadow-xl overflow-hidden">
                {filteredSuggestions.map((s) => (
                  <button key={s} onMouseDown={() => addRecipient(s)} className="w-full flex items-center gap-2 px-3 py-2 text-xs hover:bg-muted/40 transition-colors text-left">
                    <AtSign className="h-3 w-3 text-primary shrink-0" />{s}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* CC Field */}
      <AnimatePresence>
        {showCc && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden space-y-1.5">
            <Label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">CC</Label>
            <Input value={cc} onChange={(e) => setCc(e.target.value)} placeholder="cc@example.com" className="text-xs bg-background/60 border-border/50 rounded-xl focus:border-primary/50" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Subject */}
      <div className="space-y-1.5">
        <Label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Subject</Label>
        <Input value={subject} onChange={(e) => setSubject(e.target.value)} placeholder="e.g. Property Viewing Confirmation – Villa 32" className="bg-background/60 border-border/50 rounded-xl focus:border-primary/50" />
      </div>

      {/* Body */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between">
          <Label className="text-xs font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-1.5">
            {mode === "html" ? <Code2 className="h-3.5 w-3.5 text-violet-500" /> : <Type className="h-3.5 w-3.5 text-blue-500" />}
            {mode === "html" ? "HTML Body" : "Plain Text Body"}
          </Label>
          <span className="text-[10px] text-muted-foreground font-mono">{body.length} chars</span>
        </div>
        <Textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder={mode === "html" ? "<div>Your HTML email content...</div>" : "Compose your message here..."}
          className={cn("min-h-[180px] text-xs bg-background/60 border-border/50 rounded-xl focus:border-primary/50 resize-none leading-relaxed",
            mode === "html" && "font-mono text-violet-400 dark:text-violet-300"
          )}
        />
        {mode === "html" && (
          <p className="text-[10px] text-muted-foreground flex items-center gap-1">
            <Code2 className="h-3 w-3" /> Write HTML directly. Click <strong>Preview</strong> to see the rendered output.
          </p>
        )}
      </div>

      {/* Attachments */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label className="text-xs font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-1.5">
            <Paperclip className="h-3.5 w-3.5" /> Attachments
          </Label>
          <button onClick={() => fileInputRef.current?.click()} className="text-[10px] font-bold text-primary hover:text-primary/80 transition-colors flex items-center gap-1">
            <Plus className="h-3 w-3" /> Add Files
          </button>
          <input ref={fileInputRef} type="file" multiple className="hidden" onChange={handleFileChange} />
        </div>

        {attachments.length === 0 ? (
          <button
            onClick={() => fileInputRef.current?.click()}
            className="w-full flex items-center justify-center gap-2 p-3 rounded-xl border border-dashed border-border/50 hover:border-primary/40 hover:bg-muted/20 transition-all text-xs text-muted-foreground group"
          >
            <Paperclip className="h-4 w-4 group-hover:text-primary transition-colors" />
            Click to attach files (PDF, DOCX, Images...)
          </button>
        ) : (
          <div className="space-y-1.5">
            <AnimatePresence mode="popLayout">
              {attachments.map((att) => (
                <motion.div key={att.id} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 8 }}
                  className="flex items-center gap-3 p-2.5 rounded-lg border border-border/40 bg-muted/20 group hover:border-primary/30 transition-colors">
                  <div className="h-8 w-8 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                    <FileIcon className="h-4 w-4 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold text-foreground truncate">{att.name}</p>
                    <p className="text-[10px] text-muted-foreground">{att.size}</p>
                  </div>
                  <button onClick={() => setAttachments((p) => p.filter((a) => a.id !== att.id))}
                    className="text-muted-foreground/40 hover:text-destructive transition-colors opacity-0 group-hover:opacity-100">
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </motion.div>
              ))}
            </AnimatePresence>
            <button onClick={() => fileInputRef.current?.click()} className="text-[10px] text-primary hover:underline flex items-center gap-1">
              <Plus className="h-3 w-3" /> Add another file
            </button>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-2 border-t border-border/20">
        <span className="text-xs text-muted-foreground">{recipients.length} recipient{recipients.length !== 1 ? "s" : ""} · {attachments.length} attachment{attachments.length !== 1 ? "s" : ""}</span>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="h-9 text-xs rounded-xl border-border/50" onClick={() => { setRecipients([]); setSubject(""); setBody(""); setAttachments([]); }}>
            Clear
          </Button>
          <Button size="sm" className="h-9 text-xs rounded-xl gap-1.5 bg-primary hover:bg-primary/90" onClick={handleSend} disabled={isSending || !recipients.length || !subject || !body}>
            {isSending ? (
              <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }} className="h-3.5 w-3.5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full" />
            ) : <Send className="h-3.5 w-3.5" />}
            {isSending ? "Sending..." : "Send Email"}
          </Button>
        </div>
      </div>

      {/* Preview Dialog */}
      <Dialog open={showPreview} onOpenChange={setShowPreview}>
        <DialogContent className="sm:max-w-[680px] bg-background/95 backdrop-blur-xl border-border/50 max-h-[85vh] flex flex-col">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-sm">
              <Eye className="h-4 w-4 text-primary" /> Email Preview
              <Badge variant="outline" className="ml-auto text-[10px] border-border/50">{mode.toUpperCase()}</Badge>
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-3 overflow-auto flex-1">
            {/* Email Meta */}
            <div className="p-3 rounded-xl bg-muted/20 border border-border/30 space-y-1 text-xs font-mono">
              <p><span className="text-muted-foreground">To:</span> <span className="text-foreground">{recipients.join(", ") || "—"}</span></p>
              {cc && <p><span className="text-muted-foreground">CC:</span> <span className="text-foreground">{cc}</span></p>}
              <p><span className="text-muted-foreground">Subject:</span> <span className="font-bold text-foreground">{subject || "—"}</span></p>
              {attachments.length > 0 && (
                <p><span className="text-muted-foreground">Attachments:</span> <span className="text-foreground">{attachments.map((a) => a.name).join(", ")}</span></p>
              )}
            </div>

            {/* Rendered Body */}
            <div className="rounded-xl border border-border/30 overflow-hidden">
              <div className="flex items-center gap-2 px-3 py-2 bg-muted/20 border-b border-border/20 text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
                {mode === "html" ? <><Code2 className="h-3 w-3 text-violet-500" />Rendered HTML</> : <><FileText className="h-3 w-3 text-blue-500" />Plain Text</>}
              </div>
              <div className="bg-white dark:bg-background p-4 min-h-[200px]">
                {mode === "html" ? (
                  <div dangerouslySetInnerHTML={{ __html: body || "<p style='color:#9ca3af'>No content yet...</p>" }} />
                ) : (
                  <pre className="text-sm text-foreground whitespace-pre-wrap font-sans leading-relaxed">{body || <span className="text-muted-foreground">No content yet...</span>}</pre>
                )}
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
