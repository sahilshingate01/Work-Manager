import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { format } from "date-fns";
import { motion, AnimatePresence } from "framer-motion";
import { X, Sparkles, Link as LinkIcon, Calendar, FileText, Loader2 } from "lucide-react";
import { 
  useCreateWorkMutation, 
  useUpdateWorkMutation, 
  useAiSummaryMutation 
} from "@/hooks/use-works";
import { Work } from "@workspace/api-client-react/src/generated/api.schemas";

// Schema based on OpenAPI definitions
const workSchema = z.object({
  title: z.string().min(1, "Title is required"),
  details: z.string().min(5, "Details must be at least 5 characters"),
  link: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  summary: z.string().optional(),
  date: z.string(),
});

type WorkFormValues = z.infer<typeof workSchema>;

interface WorkDialogProps {
  isOpen: boolean;
  onClose: () => void;
  initialData?: Work | null;
}

export function WorkDialog({ isOpen, onClose, initialData }: WorkDialogProps) {
  const createMutation = useCreateWorkMutation();
  const updateMutation = useUpdateWorkMutation();
  const aiMutation = useAiSummaryMutation();
  
  const form = useForm<WorkFormValues>({
    resolver: zodResolver(workSchema),
    defaultValues: {
      title: "",
      details: "",
      link: "",
      summary: "",
      date: format(new Date(), "yyyy-MM-dd"),
    },
  });

  useEffect(() => {
    if (initialData && isOpen) {
      form.reset({
        title: initialData.title,
        details: initialData.details,
        link: initialData.link || "",
        summary: initialData.summary || "",
        date: initialData.date,
      });
    } else if (!initialData && isOpen) {
      form.reset({
        title: "",
        details: "",
        link: "",
        summary: "",
        date: format(new Date(), "yyyy-MM-dd"),
      });
    }
  }, [initialData, isOpen, form]);

  const onSubmit = (data: WorkFormValues) => {
    // Send empty strings as null to match schema if needed, but schema allows optional
    const payload = {
      ...data,
      link: data.link === "" ? null : data.link,
      summary: data.summary === "" ? null : data.summary,
    };

    if (initialData) {
      updateMutation.mutate(
        { id: initialData.id, data: payload },
        { onSuccess: () => onClose() }
      );
    } else {
      createMutation.mutate(
        { data: payload },
        { onSuccess: () => onClose() }
      );
    }
  };

  const handleGenerateSummary = async (e: React.MouseEvent) => {
    e.preventDefault();
    const details = form.getValues("details");
    if (!details || details.length < 10) {
      form.setError("details", { type: "manual", message: "Please provide more details to summarize." });
      return;
    }

    aiMutation.mutate(
      { data: { details } },
      {
        onSuccess: (res) => {
          form.setValue("summary", res.summary, { shouldValidate: true, shouldDirty: true });
        }
      }
    );
  };

  const isPending = createMutation.isPending || updateMutation.isPending;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="w-full max-w-2xl max-h-[90vh] overflow-y-auto glass-panel rounded-2xl pointer-events-auto border border-white/20 shadow-2xl shadow-black/50"
            >
              <div className="p-6 border-b border-white/10 flex justify-between items-center sticky top-0 bg-white/5 backdrop-blur-md z-10">
                <h2 className="text-2xl font-display font-bold text-white">
                  {initialData ? "Edit Work Log" : "Log Daily Work"}
                </h2>
                <button 
                  onClick={onClose}
                  className="p-2 rounded-full hover:bg-white/10 text-white/50 hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={form.handleSubmit(onSubmit)} className="p-6 space-y-6">
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-white/70">Work Title</label>
                  <input
                    {...form.register("title")}
                    placeholder="e.g. Implemented new authentication flow"
                    className="w-full glass-input"
                  />
                  {form.formState.errors.title && (
                    <p className="text-destructive text-sm mt-1">{form.formState.errors.title.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-end">
                    <label className="text-sm font-medium text-white/70">Details</label>
                  </div>
                  <textarea
                    {...form.register("details")}
                    rows={4}
                    placeholder="What did you do today in detail?"
                    className="w-full glass-input resize-none"
                  />
                  {form.formState.errors.details && (
                    <p className="text-destructive text-sm mt-1">{form.formState.errors.details.message}</p>
                  )}
                </div>

                <div className="glass-panel p-4 rounded-xl bg-white/5 border-primary/20 space-y-3 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-[40px] pointer-events-none" />
                  
                  <div className="flex justify-between items-center">
                    <label className="text-sm font-medium text-white/90 flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-primary" />
                      AI Summary
                    </label>
                    <button
                      onClick={handleGenerateSummary}
                      disabled={aiMutation.isPending}
                      className="text-xs font-medium bg-primary/20 hover:bg-primary/30 text-primary border border-primary/30 px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {aiMutation.isPending ? <Loader2 className="w-3 h-3 animate-spin" /> : <Sparkles className="w-3 h-3" />}
                      {aiMutation.isPending ? "Generating..." : "Generate AI"}
                    </button>
                  </div>
                  <textarea
                    {...form.register("summary")}
                    rows={2}
                    placeholder="Auto-generated summary will appear here..."
                    className="w-full glass-input bg-black/40 border-primary/20 placeholder:text-primary/30 text-primary-foreground focus:ring-primary/30"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-white/70 flex items-center gap-2">
                      <LinkIcon className="w-4 h-4" />
                      Related Link <span className="text-white/30 text-xs">(Optional)</span>
                    </label>
                    <input
                      {...form.register("link")}
                      placeholder="https://github.com/..."
                      className="w-full glass-input"
                    />
                     {form.formState.errors.link && (
                      <p className="text-destructive text-sm mt-1">{form.formState.errors.link.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-white/70 flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      Date
                    </label>
                    <input
                      type="date"
                      {...form.register("date")}
                      className="w-full glass-input [color-scheme:dark]"
                    />
                  </div>
                </div>

                <div className="pt-6 border-t border-white/10 flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-5 py-2.5 rounded-xl font-medium text-white/70 hover:text-white hover:bg-white/10 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isPending}
                    className="px-6 py-2.5 rounded-xl font-medium bg-gradient-to-r from-primary to-accent text-white shadow-lg shadow-primary/25 hover:shadow-primary/40 hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isPending && <Loader2 className="w-4 h-4 animate-spin" />}
                    {initialData ? "Save Changes" : "Save Work"}
                  </button>
                </div>

              </form>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
