import { useState } from "react";
import { Layout } from "@/components/Layout";
import { useWorksList } from "@/hooks/use-works";
import { WorkCard } from "@/components/WorkCard";
import { WorkDialog } from "@/components/WorkDialog";
import { Work } from "@workspace/api-client-react/src/generated/api.schemas";
import { Search, Filter, Loader2, FolderOpen } from "lucide-react";
import { motion } from "framer-motion";

export default function MyWorks() {
  const { data: works, isLoading } = useWorksList();
  const [search, setSearch] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingWork, setEditingWork] = useState<Work | null>(null);

  const handleEdit = (work: Work) => {
    setEditingWork(work);
    setIsDialogOpen(true);
  };

  const filteredWorks = works?.filter(work => 
    work.title.toLowerCase().includes(search.toLowerCase()) || 
    work.details.toLowerCase().includes(search.toLowerCase())
  ).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <Layout>
      <div className="max-w-6xl mx-auto space-y-8 pb-20 md:pb-0">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <h1 className="text-3xl font-display font-bold text-white mb-2">My Works</h1>
            <p className="text-white/60">Browse and manage all your logged activities.</p>
          </div>

          <div className="w-full md:w-auto flex gap-3">
            <div className="relative flex-1 md:w-72">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
              <input 
                type="text"
                placeholder="Search works..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full glass-input pl-10 h-11 text-sm"
              />
            </div>
            <button className="h-11 px-4 glass-panel rounded-xl flex items-center gap-2 text-white/70 hover:text-white transition-colors">
              <Filter className="w-4 h-4" />
              <span className="hidden sm:inline text-sm font-medium">Filter</span>
            </button>
          </div>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-32">
            <Loader2 className="w-8 h-8 text-primary animate-spin" />
          </div>
        ) : !filteredWorks || filteredWorks.length === 0 ? (
           <div className="glass-panel rounded-2xl p-16 flex flex-col items-center justify-center text-center">
             <FolderOpen className="w-16 h-16 text-white/20 mb-4" />
             <h3 className="text-xl font-bold text-white mb-2">No results found</h3>
             <p className="text-white/50">Try adjusting your search criteria or add new work.</p>
           </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredWorks.map((work, idx) => (
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

      <WorkDialog 
        isOpen={isDialogOpen} 
        onClose={() => {
          setIsDialogOpen(false);
          setTimeout(() => setEditingWork(null), 300);
        }} 
        initialData={editingWork} 
      />
    </Layout>
  );
}
