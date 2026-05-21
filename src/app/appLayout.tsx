import { NavBar } from "@/components/navbar/Navbar";
import clsx from "clsx";
import React, { ReactNode } from "react";

export const AppLayout = ({
  children,
  className,
  fotterClassName,
}: {
  children: ReactNode;
  className?: string;
  fotterClassName?: string;
}) => {
  return (
    <div>
      <NavBar />
      <main
        className={clsx(
          "px-10 pb-4 pt-10  overflow-y-scroll hidden-scrollbar bg-white min-h-screen",
          className,
        )}
      >
        <div className="max-w-400 mx-auto">{children}</div>
      </main>
      <footer
        className={clsx("border-t border-border p-8 mt-10", fotterClassName)}
      >
        <div className=" max-w-400 mx-auto  flex flex-col 768:flex-row items-center justify-between gap-4 text-sm text-foreground/60">
          <p>© 2026 VGlasses. All rights reserved.</p>

          <div className="flex gap-6">
            <span>Virtual Try-On</span>
            <span>Shop</span>
            <span>Privacy</span>
          </div>
        </div>
      </footer>
    </div>
  );
};
