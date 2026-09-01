"use client";
import { NavBarProps } from "@/types";
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export const Dropdown = ({ navItems }: { navItems: NavBarProps[] }) => {
  const pathname = usePathname();

  const isActive = (href: string) => pathname === href;
  return (
    <div
      className={clsx(
        " bg-white shadow-lg rounded-md p-4  flex flex-col gap-3 absolute w right-7 top-18 z-10",
      )}
    >
      {navItems.map((item) => (
        <Link
          key={item.name}
          href={item.href}
          className={clsx(
            isActive(item.href)
              ? "text-foreground font-semibold"
              : "text-foreground/70 hover:text-foreground",
            "text-foreground/90 hover:text-foreground transition-colors duration-200",
          )}
        >
          {item.name}
        </Link>
      ))}
    </div>
  );
};
