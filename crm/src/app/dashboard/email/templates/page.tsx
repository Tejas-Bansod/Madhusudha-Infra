"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LayoutTemplate, Plus, Search, Eye, Edit2, Trash2, Code2, Type, Sparkles, Copy, CheckCircle2, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";

type TemplateMode = "html" | "text";
type TemplateCategory = "viewing" | "listing" | "follow-up" | "offer" | "general";

interface EmailTemplate {
  id: string;
  name: string;
  category: TemplateCategory;
  mode: TemplateMode;
  subject: string;
  body: string;
  usageCount: number;
  createdAt: string;
}

const CATEGORY_META: Record<TemplateCategory, { label: string; color: string; bg: string }> = {
  viewing:    { label: "Viewing",    color: "text-blue-500",    bg: "bg-blue-500/10 border-blue-500/20" },
  listing:    { label: "Listing",    color: "text-violet-500",  bg: "bg-violet-500/10 border-violet-500/20" },
  "follow-up":{ label: "Follow-Up", color: "text-amber-500",   bg: "bg-amber-500/10 border-amber-500/20" },
  offer:      { label: "Offer",      color: "text-emerald-500", bg: "bg-emerald-500/10 border-emerald-500/20" },
  general:    { label: "General",    color: "text-slate-500",   bg: "bg-slate-500/10 border-slate-500/20" },
};

const INITIAL_TEMPLATES: EmailTemplate[] = [
  {
    id: "tmpl-1", name: "Property Viewing Confirmation", category: "viewing", mode: "html",
    subject: "Your Viewing is Confirmed – [Property Name]",
    body: `<div style="font-family:sans-serif;max-width:600px;margin:0 auto">\n  <div style="background:#2563eb;padding:24px;border-radius:8px 8px 0 0">\n    <h1 style="color:#fff;margin:0;font-size:20px">📅 Viewing Confirmed</h1>\n  </div>\n  <div style="padding:24px;border:1px solid #e5e7eb;border-top:none;border-radius:0 0 8px 8px">\n    <p>Dear <strong>[Client Name]</strong>,</p>\n    <p>Your viewing at <strong>[Property Name]</strong> is confirmed for <strong>[Date]</strong> at <strong>[Time]</strong>.</p>\n    <p>Your advisor <strong>[Agent Name]</strong> will meet you at the site.</p>\n    <p>Best regards,<br/>Madhusudha Infra Team</p>\n  </div>\n</div>`,
    usageCount: 48, createdAt: "12 May 2026",
  },
  {
    id: "tmpl-2", name: "New Listing Alert", category: "listing", mode: "html",
    subject: "New Property Alert – [Property Title]",
    body: `<div style="font-family:sans-serif;max-width:600px;margin:0 auto">\n  <div style="background:#7c3aed;padding:24px;border-radius:8px 8px 0 0">\n    <h1 style="color:#fff;margin:0">🏠 New Listing Alert</h1>\n  </div>\n  <div style="padding:24px;border:1px solid #e5e7eb;border-top:none;border-radius:0 0 8px 8px">\n    <p>Dear <strong>[Client Name]</strong>,</p>\n    <p>A property matching your wishlist is available at <strong>[Location]</strong> for <strong>[Price]</strong>.</p>\n    <a href="#" style="display:inline-block;margin-top:16px;padding:12px 24px;background:#7c3aed;color:#fff;border-radius:6px;text-decoration:none">Schedule a Visit →</a>\n  </div>\n</div>`,
    usageCount: 61, createdAt: "8 May 2026",
  },
  {
    id: "tmpl-3", name: "Follow-Up After Showing", category: "follow-up", mode: "text",
    subject: "Following Up – [Property Name]",
    body: "Dear [Client Name],\n\nThank you for visiting [Property Name] yesterday!\n\nWe hope it met your expectations. Here are the key details:\n• Price: [Price]\n• EMI: [EMI/month]\n• Documentation: 7 working days\n\nReady to proceed? Let us know!\n\nWarm regards,\n[Agent Name]\nMadhusudha Infra",
    usageCount: 34, createdAt: "3 May 2026",
  },
  {
    id: "tmpl-4", name: "Formal Offer Letter", category: "offer", mode: "text",
    subject: "Offer Letter – [Property Name]",
    body: "Dear [Client Name],\n\nWe are pleased to present the following offer:\n\nProperty: [Property Name]\nOffer Price: [Price]\nValidity: 7 days\nTerms: 30% upfront, balance on registration\n\nKindly review and revert at your earliest convenience.\n\nWarm regards,\n[Agent Name]\nMadhusudha Infra",
    usageCount: 19, createdAt: "1 May 2026",
  },
  {
    id: "tmpl-5", name: "Monthly Market Update", category: "general", mode: "text",
    subject: "Your Real Estate Market Report – [Month Year]",
    body: "Dear [Client Name],\n\nHere is your market report for [Month Year].\n\n📈 Key Highlights:\n• Residential prices up [X]% YoY\n• Top areas: [Locations]\n• Commercial activity: +[X]% this quarter\n\nBook a consultation with your advisor today.\n\nBest regards,\nMadhusudha Infra – Research Desk",
    usageCount: 27, createdAt: "28 Apr 2026",
  },
];

const EMPTY_TEMPLATE: Omit<EmailTemplate, "id" | "usageCount" | "createdAt"> = {
  name: "", category: "general", mode: "text", subject: "", body: "",
};

export default function TemplatesPage() {
  const [templates, setTemplates] = useState<EmailTemplate[]>(INITIAL_TEMPLATES);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [showEditor, setShowEditor] = useState(false);
  const [editing, setEditing] = useState<EmailTemplate | null>(null);
  const [form, setForm] = useState({ ...EMPTY_TEMPLATE });
  const [previewTemplate, setPreviewTemplate] = useState<EmailTemplate | null>(null);
  const [copied, setCopied] = useState<string | null>(null);

  const filtered = templates.filter((t) => {
    const ms = t.name.toLowerCase().includes(search.toLowerCase()) || t.subject.toLowerCase().includes(search.toLowerCase());
    const mc = categoryFilter === "all" || t.category === categoryFilter;
    return ms && mc;
  });

  const openCreate = () => {
    setEditing(null);
    setForm({ ...EMPTY_TEMPLATE });
    setShowEditor(true);
  };

  const openEdit = (tmpl: EmailTemplate) => {
    setEditing(tmpl);
    setForm({ name: tmpl.name, category: tmpl.category, mode: tmpl.mode, subject: tmpl.subject, body: tmpl.body });
    setShowEditor(true);
  };

  const handleSave = () => {
    if (!form.name || !form.subject || !form.body) return;
    if (editing) {
      setTemplates((p) => p.map((t) => t.id === editing.id ? { ...t, ...form } : t));
    } else {
      setTemplates((p) => [...p, {
        id: `tmpl-${Date.now()}`, ...form,
        usageCount: 0, createdAt: new Date().toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" }),
      }]);
    }
    setShowEditor(false);
  };

  const handleDelete = (id: string) => setTemplates((p) => p.filter((t) => t.id !== id));

  const handleCopy = (id: string, body: string) => {
    navigator.clipboard.writeText(body);
    setCopied(id);
    setTimeout(() => setCopied(null), 1500);
  };

  return (
    <div className="flex-1 space-y-6 w-full max-w-full">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-foreground tracking-tight flex items-center gap-2">
            <div className="h-8 w-8 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center">
              <LayoutTemplate className="h-4 w-4 text-amber-500" />
            </div>
            Email Templates
          </h1>
          <p className="text-xs text-muted-foreground mt-1">Create and manage reusable email templates for your CRM.</p>
        </div>
        <Button onClick={openCreate} size="sm" className="h-9 text-xs rounded-xl gap-1.5 bg-primary hover:bg-primary/90">
          <Plus className="h-4 w-4" /> New Template
        </Button>
      </motion.div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: "Total Templates", value: templates.length, color: "text-foreground" },
          { label: "HTML Templates", value: templates.filter((t) => t.mode === "html").length, color: "text-violet-500" },
          { label: "Text Templates", value: templates.filter((t) => t.mode === "text").length, color: "text-blue-500" },
          { label: "Total Uses", value: templates.reduce((a, t) => a + t.usageCount, 0), color: "text-emerald-500" },
        ].map((s, i) => (
          <motion.div key={s.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}
            className="p-4 rounded-2xl border border-border/50 bg-muted/20 text-center">
            <p className={`text-2xl font-extrabold font-mono ${s.color}`}>{s.value}</p>
            <p className="text-[10px] text-muted-foreground uppercase tracking-wider font-bold mt-1">{s.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground/50" />
          <Input placeholder="Search templates..." className="pl-9 h-9 text-xs rounded-xl bg-background/60 border-border/50" value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
          <SelectTrigger className="w-full sm:w-[160px] h-9 text-xs rounded-xl bg-background/60 border-border/50">
            <Tag className="h-3.5 w-3.5 mr-1.5 text-muted-foreground" />
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent className="bg-popover border-border/50">
            <SelectItem value="all">All Categories</SelectItem>
            {(Object.keys(CATEGORY_META) as TemplateCategory[]).map((c) => (
              <SelectItem key={c} value={c}>{CATEGORY_META[c].label}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Templates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        <AnimatePresence mode="popLayout">
          {filtered.map((tmpl, i) => {
            const cat = CATEGORY_META[tmpl.category];
            return (
              <motion.div key={tmpl.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95 }} transition={{ delay: i * 0.05 }}>
                <Card className="group p-0 border-border/50 bg-card/50 hover:border-primary/30 hover:shadow-md transition-all duration-300 flex flex-col h-full">
                  <CardHeader className="p-4 pb-3 border-b border-border/20">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm font-extrabold text-foreground truncate group-hover:text-primary transition-colors">{tmpl.name}</h3>
                        <p className="text-[11px] text-muted-foreground truncate mt-0.5">{tmpl.subject}</p>
                      </div>
                      <div className="flex items-center gap-1.5 shrink-0">
                        <Badge variant="outline" className={cn("text-[9px] px-1.5 py-0 border font-bold", cat.bg, cat.color)}>{cat.label}</Badge>
                        <Badge variant="outline" className={cn("text-[9px] px-1.5 py-0 border font-bold", tmpl.mode === "html" ? "bg-violet-500/10 border-violet-500/20 text-violet-500" : "bg-blue-500/10 border-blue-500/20 text-blue-500")}>
                          {tmpl.mode === "html" ? <Code2 className="h-2.5 w-2.5" /> : <Type className="h-2.5 w-2.5" />}
                          {tmpl.mode.toUpperCase()}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="p-4 flex-1">
                    <div className="h-24 overflow-hidden rounded-lg border border-border/30 bg-muted/20 p-2.5 relative">
                      {tmpl.mode === "html" ? (
                        <div className="text-[10px] text-muted-foreground font-mono leading-relaxed line-clamp-5 overflow-hidden">
                          {tmpl.body.replace(/<[^>]+>/g, "").trim()}
                        </div>
                      ) : (
                        <pre className="text-[10px] text-muted-foreground font-sans leading-relaxed line-clamp-5 whitespace-pre-wrap">{tmpl.body}</pre>
                      )}
                      <div className="absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t from-muted/20 to-transparent rounded-b-lg" />
                    </div>
                  </CardContent>

                  <CardFooter className="p-4 pt-0 flex items-center justify-between gap-2">
                    <div className="text-[10px] text-muted-foreground font-mono">
                      Used <span className="font-bold text-foreground">{tmpl.usageCount}×</span> · {tmpl.createdAt}
                    </div>
                    <div className="flex items-center gap-1">
                      <Button variant="ghost" size="icon" className="h-7 w-7 rounded-lg hover:bg-muted/40" onClick={() => setPreviewTemplate(tmpl)} title="Preview">
                        <Eye className="h-3.5 w-3.5" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-7 w-7 rounded-lg hover:bg-muted/40" onClick={() => handleCopy(tmpl.id, tmpl.body)} title="Copy Body">
                        {copied === tmpl.id ? <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" /> : <Copy className="h-3.5 w-3.5" />}
                      </Button>
                      <Button variant="ghost" size="icon" className="h-7 w-7 rounded-lg hover:bg-primary/10 hover:text-primary" onClick={() => openEdit(tmpl)} title="Edit">
                        <Edit2 className="h-3.5 w-3.5" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-7 w-7 rounded-lg hover:bg-destructive/10 hover:text-destructive" onClick={() => handleDelete(tmpl.id)} title="Delete">
                        <Trash2 className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              </motion.div>
            );
          })}

          {/* Create New Card */}
          <motion.div key="create-btn" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
            <button onClick={openCreate} className="w-full h-full min-h-[200px] rounded-2xl border-2 border-dashed border-border/40 hover:border-primary/40 hover:bg-primary/5 transition-all duration-300 flex flex-col items-center justify-center gap-3 group p-6">
              <div className="h-12 w-12 rounded-2xl bg-muted/30 border border-border/40 group-hover:bg-primary/10 group-hover:border-primary/30 flex items-center justify-center transition-all">
                <Plus className="h-6 w-6 text-muted-foreground/50 group-hover:text-primary transition-colors" />
              </div>
              <div className="text-center">
                <p className="text-sm font-bold text-muted-foreground group-hover:text-foreground transition-colors">Create Template</p>
                <p className="text-[11px] text-muted-foreground/60 mt-0.5">HTML or plain text</p>
              </div>
            </button>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Editor Dialog */}
      <Dialog open={showEditor} onOpenChange={setShowEditor}>
        <DialogContent className="sm:max-w-[680px] bg-background/95 backdrop-blur-xl border-border/50 max-h-[90vh] flex flex-col">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-sm">
              <Sparkles className="h-4 w-4 text-primary" />
              {editing ? "Edit Template" : "Create New Template"}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 overflow-y-auto flex-1 pr-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Template Name</Label>
                <Input value={form.name} onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))} placeholder="e.g. Property Viewing Confirmation" className="text-xs bg-background/60 border-border/50 rounded-xl" />
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Category</Label>
                <Select value={form.category} onValueChange={(v) => setForm((p) => ({ ...p, category: v as TemplateCategory }))}>
                  <SelectTrigger className="text-xs bg-background/60 border-border/50 rounded-xl">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-popover border-border/50">
                    {(Object.keys(CATEGORY_META) as TemplateCategory[]).map((c) => (
                      <SelectItem key={c} value={c} className="text-xs">{CATEGORY_META[c].label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-1.5">
              <Label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Subject Line</Label>
              <Input value={form.subject} onChange={(e) => setForm((p) => ({ ...p, subject: e.target.value }))} placeholder="e.g. Your Viewing is Confirmed – [Property Name]" className="text-xs bg-background/60 border-border/50 rounded-xl" />
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <Label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Format</Label>
                <div className="flex items-center border border-border/40 rounded-xl overflow-hidden bg-muted/20">
                  {(["text", "html"] as const).map((m) => (
                    <button key={m} onClick={() => setForm((p) => ({ ...p, mode: m }))}
                      className={cn("flex items-center gap-1 px-3 h-7 text-[11px] font-bold transition-colors",
                        form.mode === m ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground")}>
                      {m === "text" ? <Type className="h-3 w-3" /> : <Code2 className="h-3 w-3" />}
                      {m.toUpperCase()}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-1.5">
              <Label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Body</Label>
              <Textarea
                value={form.body}
                onChange={(e) => setForm((p) => ({ ...p, body: e.target.value }))}
                placeholder={form.mode === "html" ? "<div>Your HTML content here...</div>" : "Write your template. Use [Client Name], [Property Name] as placeholders."}
                className={cn("min-h-[200px] text-xs bg-background/60 border-border/50 rounded-xl resize-none leading-relaxed",
                  form.mode === "html" && "font-mono text-violet-400 dark:text-violet-300")}
              />
              {form.mode === "html" && form.body && (
                <div className="rounded-xl border border-border/30 overflow-hidden mt-2">
                  <div className="px-3 py-1.5 bg-muted/30 border-b border-border/20 text-[10px] font-bold text-muted-foreground flex items-center gap-1">
                    <Eye className="h-3 w-3" /> Live Preview
                  </div>
                  <div className="bg-white dark:bg-background p-3 min-h-[80px] max-h-[160px] overflow-auto">
                    <div dangerouslySetInnerHTML={{ __html: form.body }} />
                  </div>
                </div>
              )}
              <p className="text-[10px] text-muted-foreground">Use <code className="bg-muted px-1 rounded text-[9px]">[Client Name]</code>, <code className="bg-muted px-1 rounded text-[9px]">[Property Name]</code>, <code className="bg-muted px-1 rounded text-[9px]">[Agent Name]</code> as placeholders.</p>
            </div>
          </div>
          <DialogFooter className="border-t border-border/20 pt-4">
            <Button variant="outline" size="sm" className="rounded-xl border-border/50 text-xs" onClick={() => setShowEditor(false)}>Cancel</Button>
            <Button size="sm" className="rounded-xl text-xs gap-1.5" onClick={handleSave} disabled={!form.name || !form.subject || !form.body}>
              <CheckCircle2 className="h-3.5 w-3.5" />
              {editing ? "Save Changes" : "Create Template"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Preview Dialog */}
      <Dialog open={!!previewTemplate} onOpenChange={() => setPreviewTemplate(null)}>
        <DialogContent className="sm:max-w-[640px] bg-background/95 backdrop-blur-xl border-border/50 max-h-[85vh] flex flex-col">
          <DialogHeader>
            <DialogTitle className="text-sm flex items-center gap-2">
              <Eye className="h-4 w-4 text-primary" /> {previewTemplate?.name}
              <Badge variant="outline" className="ml-auto text-[9px] border-border/50">{previewTemplate?.mode.toUpperCase()}</Badge>
            </DialogTitle>
          </DialogHeader>
          <div className="overflow-auto flex-1 space-y-3">
            <div className="p-3 rounded-xl bg-muted/20 border border-border/30 text-xs font-mono space-y-1">
              <p><span className="text-muted-foreground">Subject:</span> <span className="font-bold">{previewTemplate?.subject}</span></p>
            </div>
            <div className="rounded-xl border border-border/30 overflow-hidden">
              <div className="px-3 py-2 bg-muted/20 border-b border-border/20 text-[10px] font-bold text-muted-foreground flex items-center gap-1.5">
                {previewTemplate?.mode === "html" ? <><Code2 className="h-3 w-3 text-violet-500" />HTML Rendered</> : <><Type className="h-3 w-3 text-blue-500" />Plain Text</>}
              </div>
              <div className="bg-white dark:bg-background p-4 min-h-[200px]">
                {previewTemplate?.mode === "html"
                  ? <div dangerouslySetInnerHTML={{ __html: previewTemplate.body }} />
                  : <pre className="text-sm text-foreground whitespace-pre-wrap font-sans leading-relaxed">{previewTemplate?.body}</pre>}
              </div>
            </div>
          </div>
          <DialogFooter className="border-t border-border/20 pt-4">
            <Button variant="outline" size="sm" className="rounded-xl text-xs gap-1.5 border-border/50" onClick={() => { if (previewTemplate) { openEdit(previewTemplate); setPreviewTemplate(null); } }}>
              <Edit2 className="h-3.5 w-3.5" /> Edit Template
            </Button>
            <Button size="sm" className="rounded-xl text-xs gap-1.5" onClick={() => { if (previewTemplate) handleCopy(previewTemplate.id, previewTemplate.body); }}>
              {copied === previewTemplate?.id ? <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
              Copy Body
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
