import { DesktopNavbar } from "./DesktopNavbar";
import { NavBarProps } from "@/types";
import { MobileNavbar } from "./MobileNavbar";

export const NavBar = () => {
  const navItems: NavBarProps[] = [
    { name: "Home", href: "/" },
    { name: "Shop", href: "/shop" },
    { name: "Categories", href: "/categories" },
  ];

  return (
    <div className="relative">
      <DesktopNavbar navItems={navItems} className="hidden 768:flex " />
      <MobileNavbar navItems={navItems} className="block 768:hidden" />
    </div>
  );
};
