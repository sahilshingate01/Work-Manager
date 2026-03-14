import { Layout } from "@/components/Layout";
import { useWorksList } from "@/hooks/use-works";
import { Sparkles, Loader2, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { format } from "date-fns";
import { Link } from "wouter";

export default function AISummary() {
  const { data: works, isLoading } = useWorksList();

  // Filter works that have an AI summary
  const summarizedWorks = works?.filter(w => w.summary && w.summary.trim() !== "")
                               .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <Layout>
      <div className="max-w-4xl mx-auto space-y-8 pb-20 md:pb-0">
        
        <div className="glass-panel bg-gradient-to-br from-primary/10 to-accent/10 border-primary/20 p-8 rounded-3xl relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-20">
            <Sparkles className="w-32 h-32 text-primary" />
          </div>
          <div className="relative z-10 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 text-primary text-sm font-semibold mb-4 border border-primary/30">
              <Sparkles className="w-4 h-4" />
              AI Intelligence
            </div>
            <h1 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">
              AI Summarized Insights
            </h1>
            <p className="text-white/70 text-lg leading-relaxed">
              Quickly review the core takeaways from your daily work. Our NVIDIA-powered AI digests your detailed logs into concise, actionable summaries.
            </p>
          </div>
        </div>

        {isLoading ? (
           <div className="flex justify-center py-20">
             <Loader2 className="w-8 h-8 text-primary animate-spin" />
           </div>
        ) : !summarizedWorks || summarizedWorks.length === 0 ? (
          <div className="text-center py-20 glass-panel rounded-3xl">
             <p className="text-white/50 text-lg">No AI summaries generated yet.</p>
             <p className="text-white/40 mt-2">Create a work entry and click "Generate AI Summary".</p>
          </div>
        ) : (
          <div className="space-y-6">
            {summarizedWorks.map((work, i) => (
              <motion.div 
                key={work.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="glass-card p-6 rounded-2xl group flex gap-6"
              >
                <div className="hidden sm:flex flex-col items-center pt-1 min-w-[80px]">
                  <span className="text-sm font-bold text-white/80">{format(new Date(work.date), "MMM d")}</span>
                  <span className="text-xs text-white/40">{format(new Date(work.date), "yyyy")}</span>
                  <div className="w-px h-full bg-gradient-to-b from-primary/50 to-transparent mt-3" />
                </div>
                
                <div className="flex-1">
                  <h3 className="text-xl font-display font-bold text-white mb-3 flex items-center justify-between">
                    {work.title}
                    <span className="sm:hidden text-xs font-normal text-white/40 border border-white/10 px-2 py-1 rounded-md">
                      {format(new Date(work.date), "MMM d")}
                    </span>
                  </h3>
                  
                  <div className="bg-black/30 rounded-xl p-4 border-l-2 border-primary relative">
                    <Sparkles className="absolute top-4 right-4 w-4 h-4 text-primary/30" />
                    <p className="text-white/90 leading-relaxed pr-6">
                      {work.summary}
                    </p>
                  </div>
                  
                  <div className="mt-4 flex justify-end">
                    <Link href={`/works`} className="text-sm font-medium text-white/40 hover:text-primary flex items-center gap-1 transition-colors">
                      Find in My Works <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}
