"use client";

import { NavBarProps } from "@/types";
import clsx from "clsx";
import { useRef, useState } from "react";
import { CartIcon, CloseIcon, HamburgerIcon } from "@/components/svg";
import { Dropdown } from "../dropdown";
import { useCart } from "@/components/context/cartContext";
import { CartDropdown } from "@/components/cartDropdown";
import { useClickOutside } from "@/hooks/useClickOutside";
import Image from "next/image";
import logo from "@/assets/VGlasses_logo.png";

export const MobileNavbar = ({
  navItems,
  className,
}: {
  navItems: NavBarProps[];
  className: string;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showCart, setShowCart] = useState(false);

  const navbarRef = useRef<HTMLDivElement>(null);

  const { cartCount } = useCart();

  useClickOutside(navbarRef, () => {
    setIsOpen(false);
    setShowCart(false);
  });

  const handleCart = () => {
    setShowCart((prev) => !prev);
    setIsOpen(false);
  };

  const handleMenu = () => {
    setIsOpen((prev) => !prev);
    setShowCart(false);
  };

  return (
    <nav className={clsx("px-8 py-3.5 bg-white shadow-sm", className)}>
      <div
        ref={navbarRef}
        className="relative flex items-center justify-between"
      >
        <div className="flex gap-2 items-center">
          <Image
            src={logo}
            alt={"VGlasses Logo"}
            className="w-10 h-10  rounded-full"
          />
          <p className="text-lg font-semibold">VGlasses</p>
        </div>

        <div className="flex gap-4 items-center">
          <div className="relative">
            <button
              onClick={handleCart}
              className="relative cursor-pointer"
              aria-label="Open cart"
            >
              <CartIcon className="h-7 w-7" fill="" />

              {cartCount > 0 && (
                <span className="absolute -right-2 -top-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1 text-xs font-semibold">
                  {cartCount}
                </span>
              )}
            </button>
          </div>

          {!isOpen ? (
            <button onClick={handleMenu}>
              <HamburgerIcon className="h-10 w-10" fill="" />
            </button>
          ) : (
            <button onClick={handleMenu}>
              <CloseIcon className="h-10 w-10" fill="" />
            </button>
          )}
        </div>

        {isOpen && <Dropdown navItems={navItems} />}

        {showCart && (
          <div className="absolute right-0 top-12">
            <CartDropdown />
          </div>
        )}
      </div>
    </nav>
  );
};
