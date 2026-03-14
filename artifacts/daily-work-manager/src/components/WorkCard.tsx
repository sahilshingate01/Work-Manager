import { format } from "date-fns";
import { ExternalLink, Edit2, Trash2, Calendar, Sparkles } from "lucide-react";
import { Work } from "@workspace/api-client-react/src/generated/api.schemas";
import { useState } from "react";
import { useDeleteWorkMutation } from "@/hooks/use-works";
import { motion, AnimatePresence } from "framer-motion";

interface WorkCardProps {
  work: Work;
  onEdit: (work: Work) => void;
  index?: number;
}

export function WorkCard({ work, onEdit, index = 0 }: WorkCardProps) {
  const deleteMutation = useDeleteWorkMutation();
  const [showConfirm, setShowConfirm] = useState(false);

  const handleDelete = () => {
    deleteMutation.mutate({ id: work.id });
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="glass-card rounded-2xl p-5 flex flex-col h-full relative group overflow-hidden"
    >
      {/* Decorative Glow */}
      <div className="absolute -top-10 -right-10 w-32 h-32 bg-primary/20 rounded-full blur-[40px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      <div className="flex justify-between items-start mb-4 gap-4 relative z-10">
        <div>
          <h3 className="text-xl font-display font-semibold text-white group-hover:text-primary-foreground transition-colors line-clamp-1">
            {work.title}
          </h3>
          <div className="flex items-center gap-2 mt-2 text-white/50 text-xs font-medium">
            <Calendar className="w-3.5 h-3.5" />
            {format(new Date(work.date), "MMM d, yyyy")}
          </div>
        </div>
        
        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button 
            onClick={() => onEdit(work)}
            className="p-1.5 text-white/50 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
            title="Edit"
          >
            <Edit2 className="w-4 h-4" />
          </button>
          <button 
            onClick={() => setShowConfirm(true)}
            className="p-1.5 text-white/50 hover:text-destructive hover:bg-destructive/10 rounded-lg transition-colors"
            title="Delete"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {work.summary && (
        <div className="mb-4 bg-primary/5 border border-primary/10 rounded-xl p-3 relative z-10">
          <div className="flex items-center gap-1.5 mb-1 text-primary/80">
            <Sparkles className="w-3.5 h-3.5" />
            <span className="text-xs font-semibold uppercase tracking-wider">AI Summary</span>
          </div>
          <p className="text-sm text-white/80 leading-relaxed italic">
            "{work.summary}"
          </p>
        </div>
      )}

      <div className="flex-1 relative z-10">
        <p className="text-white/60 text-sm leading-relaxed line-clamp-3">
          {work.details}
        </p>
      </div>

      {work.link && (
        <div className="mt-5 pt-4 border-t border-white/5 relative z-10">
          <a 
            href={work.link} 
            target="_blank" 
            rel="norenoopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-accent hover:text-accent/80 transition-colors"
          >
            <ExternalLink className="w-4 h-4" />
            View Resource
          </a>
        </div>
      )}

      {/* Delete Confirmation Overlay */}
      <AnimatePresence>
        {showConfirm && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/80 backdrop-blur-md z-20 flex items-center justify-center p-6 flex-col text-center rounded-2xl"
          >
            <Trash2 className="w-10 h-10 text-destructive mb-3" />
            <h4 className="text-white font-bold mb-1">Delete Work?</h4>
            <p className="text-white/60 text-sm mb-4">This action cannot be undone.</p>
            <div className="flex gap-3 w-full">
              <button 
                onClick={() => setShowConfirm(false)}
                className="flex-1 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-sm font-medium transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={handleDelete}
                className="flex-1 py-2 rounded-xl bg-destructive hover:bg-destructive/90 text-white text-sm font-medium transition-colors shadow-lg shadow-destructive/20"
              >
                Delete
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
