import { ReactNode } from "react";
import { Link, useLocation } from "wouter";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { 
  LayoutDashboard, 
  Briefcase, 
  Sparkles, 
  Settings, 
  Plus,
  Command
} from "lucide-react";
import { format } from "date-fns";
import { Background } from "./Background";

const navItems = [
  { name: "Dashboard", href: "/", icon: LayoutDashboard },
  { name: "My Works", href: "/works", icon: Briefcase },
  { name: "AI Summary", href: "/ai-summary", icon: Sparkles },
  { name: "Settings", href: "/settings", icon: Settings },
];

export function Layout({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  const today = format(new Date(), "EEEE, MMM d, yyyy");

  return (
    <div className="min-h-screen w-full flex text-foreground">
      <Background />
      
      {/* Sidebar */}
      <aside className="w-64 flex-shrink-0 hidden md:flex flex-col glass-panel border-y-0 border-l-0 border-r-white/10 z-10">
        <div className="h-20 flex items-center px-6 border-b border-white/5">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-primary to-accent flex items-center justify-center shadow-lg shadow-primary/20">
              <Command className="w-5 h-5 text-white" />
            </div>
            <span className="font-display font-bold text-xl tracking-wide text-white">WorkLog</span>
          </div>
        </div>

        <div className="flex-1 py-8 px-4 flex flex-col gap-2">
          <p className="px-2 text-xs font-semibold text-white/40 uppercase tracking-wider mb-2">Menu</p>
          {navItems.map((item) => {
            const isActive = location === item.href;
            return (
              <Link key={item.name} href={item.href} className="block group">
                <div className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 relative overflow-hidden",
                  isActive ? "bg-white/10 text-white shadow-sm" : "text-white/60 hover:bg-white/5 hover:text-white"
                )}>
                  {isActive && (
                    <motion.div 
                      layoutId="sidebar-active" 
                      className="absolute left-0 top-0 bottom-0 w-1 bg-primary rounded-r-full" 
                    />
                  )}
                  <item.icon className={cn("w-5 h-5", isActive ? "text-primary" : "group-hover:text-primary/70 transition-colors")} />
                  <span className="font-medium">{item.name}</span>
                </div>
              </Link>
            );
          })}
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 z-0">
        {/* Topbar */}
        <header className="h-20 glass-panel border-x-0 border-t-0 border-b-white/5 flex items-center justify-between px-6 lg:px-10 sticky top-0 z-20">
          <div className="flex items-center gap-4">
            <div className="md:hidden">
              <span className="font-display font-bold text-xl text-white">WorkLog</span>
            </div>
            <div className="hidden sm:block">
              <p className="text-sm font-medium text-white/50">{today}</p>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <Link href="/add" className="hidden sm:flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-full font-medium transition-all backdrop-blur-md border border-white/10 hover:border-white/20 shadow-lg hover:shadow-xl hover:-translate-y-0.5">
              <Plus className="w-4 h-4" />
              <span>Add Work</span>
            </Link>
            <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white/10 p-0.5">
              <div className="w-full h-full rounded-full overflow-hidden bg-white/5">
                <img src={`${import.meta.env.BASE_URL}images/avatar.png`} alt="User" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 p-6 lg:p-10 overflow-y-auto">
          {children}
        </div>
      </main>

      {/* Mobile Nav Bar (Bottom) */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 glass-panel border-b-0 border-x-0 border-t-white/10 z-50 px-6 py-4 flex justify-between items-center pb-safe">
        {navItems.map((item) => {
            const isActive = location === item.href;
            return (
              <Link key={item.name} href={item.href} className="flex flex-col items-center gap-1">
                <div className={cn(
                  "p-2 rounded-xl transition-all",
                  isActive ? "bg-primary/20 text-primary" : "text-white/50"
                )}>
                  <item.icon className="w-6 h-6" />
                </div>
              </Link>
            );
          })}
          <Link href="/add" className="flex flex-col items-center gap-1">
             <div className="p-2 rounded-xl transition-all bg-primary text-white shadow-lg shadow-primary/30 transform -translate-y-2">
                <Plus className="w-6 h-6" />
             </div>
          </Link>
      </div>
    </div>
  );
}
