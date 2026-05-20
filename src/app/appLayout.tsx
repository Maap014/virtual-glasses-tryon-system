import { NavBar } from "@/components/navbar/Navbar";
import React, { ReactNode } from "react";

export const AppLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <NavBar />
      <main className="px-8 py-4  overflow-y-scroll hidden-scrollbar">
        {children}
      </main>
    </div>
  );
};
