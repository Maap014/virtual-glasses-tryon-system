"use client";

import { NavBarProps } from "@/types";
import clsx from "clsx";
import { useState } from "react";
import { CloseIcon, HamburgerIcon } from "@/components/svg";
import { Dropdown } from "../dropdown";

export const MobileNavbar = ({
  navItems,
  className,
}: {
  navItems: NavBarProps[];
  className: string;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className={clsx("px-8 py-3.5 bg-white shadow-sm", className)}>
      <div className="flex items-center justify-between">
        <div className="flex gap-2 items-center">
          <div className="w-8 h-8 bg-gray-300 rounded-full" />
          <p className="text-lg font-semibold">VGlasses</p>
        </div>
        {!isOpen ? (
          <span onClick={() => setIsOpen(true)}>
            <HamburgerIcon className="h-10 w-10" fill="" />
          </span>
        ) : (
          <span onClick={() => setIsOpen(false)}>
            <CloseIcon className="h-10 w-10" fill="" />
          </span>
        )}
        {isOpen && (
          <Dropdown
            navItems={navItems}
            className={clsx(
              "absolute top-full left-0 w-full bg-white shadow-md",
            )}
          />
        )}
      </div>
    </nav>
  );
};
