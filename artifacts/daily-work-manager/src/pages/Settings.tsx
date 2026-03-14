import { Layout } from "@/components/Layout";
import { Database, Shield, Zap, Settings as SettingsIcon } from "lucide-react";
import { motion } from "framer-motion";

export default function Settings() {
  return (
    <Layout>
      <div className="max-w-4xl mx-auto space-y-8 pb-20 md:pb-0">
        <div>
          <h1 className="text-3xl font-display font-bold text-white mb-2">Settings</h1>
          <p className="text-white/60">Manage your application preferences and integrations.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-panel p-6 rounded-2xl"
          >
            <div className="w-12 h-12 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center mb-4">
              <Zap className="w-6 h-6 text-accent" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">AI Integration</h3>
            <p className="text-white/60 text-sm mb-6">
              Your NVIDIA AI API key is configured at the server level via environment variables. The summarize feature is active.
            </p>
            <div className="flex items-center gap-2 text-sm text-emerald-400 bg-emerald-400/10 px-3 py-1.5 rounded-lg w-fit border border-emerald-400/20">
              <Shield className="w-4 h-4" />
              Connected & Secure
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="glass-panel p-6 rounded-2xl"
          >
            <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-4">
              <Database className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Database Storage</h3>
            <p className="text-white/60 text-sm mb-6">
              Your works are safely stored in a PostgreSQL database using Drizzle ORM.
            </p>
            <div className="text-sm text-white/40">
              Region: US-East<br/>
              Status: Operational
            </div>
          </motion.div>

        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-panel p-6 rounded-2xl border-white/10"
        >
           <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
             <SettingsIcon className="w-5 h-5 text-white/50" />
             Preferences
           </h3>
           <div className="space-y-4">
              <div className="flex items-center justify-between py-3 border-b border-white/5">
                <div>
                  <p className="text-white font-medium">Dark Mode</p>
                  <p className="text-white/50 text-sm">The application strictly uses the premium dark glass theme.</p>
                </div>
                <div className="w-12 h-6 bg-primary rounded-full relative opacity-50 cursor-not-allowed">
                  <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div>
                </div>
              </div>
              <div className="flex items-center justify-between py-3">
                <div>
                  <p className="text-white font-medium">Compact View</p>
                  <p className="text-white/50 text-sm">Show more cards per row on large screens.</p>
                </div>
                <div className="w-12 h-6 bg-white/10 rounded-full relative cursor-pointer border border-white/10">
                  <div className="absolute left-1 top-1 w-4 h-4 bg-white/50 rounded-full"></div>
                </div>
              </div>
           </div>
        </motion.div>

        <div className="text-center pt-8">
          <p className="text-white/30 text-sm">Daily Work Manager v1.0.0</p>
          <p className="text-white/20 text-xs mt-1">Built with React + Vite + Tailwind CSS</p>
        </div>
      </div>
    </Layout>
  );
}
