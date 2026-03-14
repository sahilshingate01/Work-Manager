import { useState } from "react";
import { Layout } from "@/components/Layout";
import { useWorksList } from "@/hooks/use-works";
import { WorkCard } from "@/components/WorkCard";
import { WorkDialog } from "@/components/WorkDialog";
import { Work } from "@workspace/api-client-react/src/generated/api.schemas";
import { Plus, LayoutGrid, CheckCircle2, TrendingUp, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { format, isThisWeek, isToday } from "date-fns";

export default function Dashboard() {
  const { data: works, isLoading } = useWorksList();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingWork, setEditingWork] = useState<Work | null>(null);

  const handleEdit = (work: Work) => {
    setEditingWork(work);
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setTimeout(() => setEditingWork(null), 300); // Wait for exit animation
  };

  // Stats calculation
  const totalWorks = works?.length || 0;
  const worksThisWeek = works?.filter(w => isThisWeek(new Date(w.date))).length || 0;
  const worksToday = works?.filter(w => isToday(new Date(w.date))).length || 0;

  const recentWorks = works?.slice().sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 6);

  return (
    <Layout>
      <div className="max-w-6xl mx-auto space-y-8 pb-20 md:pb-0">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-1"
          >
            <h1 className="text-3xl md:text-4xl font-display font-bold text-white flex items-center gap-3">
              Good Morning <span className="animate-bounce inline-block origin-bottom-right">👋</span>
            </h1>
            <p className="text-white/60 text-lg">Here's what's happening with your projects today.</p>
          </motion.div>

          <motion.button
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={() => setIsDialogOpen(true)}
            className="bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-xl font-medium shadow-[0_0_20px_rgba(99,102,241,0.3)] hover:shadow-[0_0_30px_rgba(99,102,241,0.5)] transition-all flex items-center gap-2 w-fit transform hover:-translate-y-1"
          >
            <Plus className="w-5 h-5" />
            Log New Work
          </motion.button>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { label: "Total Logs", value: totalWorks, icon: LayoutGrid, color: "text-blue-400", bg: "bg-blue-400/10", border: "border-blue-400/20" },
            { label: "This Week", value: worksThisWeek, icon: TrendingUp, color: "text-accent", bg: "bg-accent/10", border: "border-accent/20" },
            { label: "Done Today", value: worksToday, icon: CheckCircle2, color: "text-emerald-400", bg: "bg-emerald-400/10", border: "border-emerald-400/20" },
          ].map((stat, i) => (
            <motion.div 
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className={`glass-card p-6 rounded-2xl flex items-center gap-5 border ${stat.border}`}
            >
              <div className={`w-14 h-14 rounded-2xl ${stat.bg} flex items-center justify-center`}>
                <stat.icon className={`w-7 h-7 ${stat.color}`} />
              </div>
              <div>
                <p className="text-white/50 text-sm font-medium mb-1">{stat.label}</p>
                <p className="text-3xl font-display font-bold text-white">{isLoading ? "-" : stat.value}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Content Area */}
        <div className="space-y-6">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <h2 className="text-xl font-display font-semibold text-white flex items-center gap-2">
              Recent Activity
            </h2>
          </div>

          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-20 text-white/50">
              <Loader2 className="w-10 h-10 animate-spin text-primary mb-4" />
              <p>Loading your work logs...</p>
            </div>
          ) : !recentWorks || recentWorks.length === 0 ? (
            <div className="glass-panel rounded-2xl p-12 text-center border-dashed border-2 border-white/20">
              <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-4">
                <LayoutGrid className="w-8 h-8 text-white/30" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">No work logged yet</h3>
              <p className="text-white/50 max-w-sm mx-auto mb-6">Start tracking your daily progress to build a powerful portfolio of your achievements.</p>
              <button 
                onClick={() => setIsDialogOpen(true)}
                className="text-primary hover:text-primary-foreground font-medium underline underline-offset-4"
              >
                Create your first entry
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recentWorks.map((work, idx) => (
                <WorkCard 
                  key={work.id} 
                  work={work} 
                  onEdit={handleEdit} 
                  index={idx} 
                />
              ))}
            </div>
          )}
        </div>
      </div>

      <WorkDialog 
        isOpen={isDialogOpen} 
        onClose={handleCloseDialog} 
        initialData={editingWork} 
      />
    </Layout>
  );
}
