import { useState } from "react";
import { Layout } from "@/components/Layout";
import { WorkDialog } from "@/components/WorkDialog";
import { useLocation } from "wouter";

// This is a utility page that automatically opens the modal, 
// useful for the mobile bottom nav "+ Add" button which links to /add
export default function AddWork() {
  const [, setLocation] = useLocation();
  
  // We render the dashboard behind it, but immediately open the dialog
  // When dialog closes, we navigate back to dashboard
  return (
    <>
      <Layout>
         {/* Blank placeholder while modal is open on top */}
         <div className="h-full flex items-center justify-center">
            <div className="animate-pulse flex flex-col items-center text-white/30">
              <div className="w-12 h-12 border-4 border-white/20 border-t-primary rounded-full animate-spin mb-4" />
              <p>Opening Editor...</p>
            </div>
         </div>
      </Layout>
      <WorkDialog 
        isOpen={true} 
        onClose={() => setLocation("/")} 
      />
    </>
  );
}
