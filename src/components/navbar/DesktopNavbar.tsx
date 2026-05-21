"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NavBarProps } from "@/types";
import clsx from "clsx";
import { CartIcon } from "../svg";

export const DesktopNavbar = ({
  navItems,
  className,
}: {
  navItems: NavBarProps[];
  className: string;
}) => {
  const pathname = usePathname();

  const isActive = (href: string) => pathname === href;

  return (
    <nav className={clsx("px-8 py-4  bg-white shadow-sm ", className)}>
      <div className=" flex items-center justify-between max-w-400 w-full mx-auto">
        <div className="flex gap-2 justify-between items-center">
          {/* <Image src="" alt="Logo" width={100} height={40} /> */}
          <div className="w-10 h-10 bg-gray-300 rounded-full" />
          <p className="text-lg font-semibold">VGlasses</p>
        </div>

        <ul className="flex space-x-6">
          {navItems.map((item) => (
            <li key={item.name}>
              <Link
                href={item.href}
                className={clsx(
                  isActive(item.href)
                    ? "text-foreground font-semibold"
                    : "text-foreground/70 hover:text-foreground",
                  "transition-colors duration-200",
                )}
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>

        <CartIcon className="h-8 w-8 cursor-pointer" fill="" />
      </div>
    </nav>
  );
};
