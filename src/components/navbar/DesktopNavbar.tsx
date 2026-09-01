"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { NavBarProps } from "@/types";
import clsx from "clsx";
import { CartIcon } from "../svg";
import { useRef, useState } from "react";
import { useCart } from "@/components/context/cartContext";
import { CartDropdown } from "@/components/cartDropdown";
import { useClickOutside } from "@/hooks/useClickOutside";

export const DesktopNavbar = ({
  navItems,
  className,
}: {
  navItems: NavBarProps[];
  className: string;
}) => {
  const pathname = usePathname();
  const [showCart, setShowCart] = useState(false);

  const cartRef = useRef<HTMLDivElement>(null);

  const { cartCount } = useCart();

  const isActive = (href: string) => pathname === href;

  useClickOutside(cartRef, () => {
    setShowCart(false);
  });

  return (
    <nav className={clsx("px-8 py-4 bg-white shadow-sm", className)}>
      <div className="flex items-center justify-between max-w-400 w-full mx-auto">
        <div className="flex gap-2 justify-between items-center">
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

        <div ref={cartRef} className="relative">
          <button
            onClick={() => setShowCart((prev) => !prev)}
            className="relative cursor-pointer"
            aria-label="Open cart"
          >
            <CartIcon className="h-8 w-8" fill="" />

            {cartCount > 0 && (
              <span className="absolute -right-2 -top-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1 text-xs font-semibold">
                {cartCount}
              </span>
            )}
          </button>

          {showCart && <CartDropdown />}
        </div>
      </div>
    </nav>
  );
};
