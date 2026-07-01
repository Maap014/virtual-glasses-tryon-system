import { DesktopNavbar } from "./DesktopNavbar";
import { NavBarProps } from "@/types";
import { MobileNavbar } from "./MobileNavbar";

export const NavBar = () => {
  const navItems: NavBarProps[] = [
    { name: "Home", href: "/" },
    { name: "Shop", href: "/shop" },
  ];

  return (
    <div className=" sticky top-0 z-50">
      <DesktopNavbar navItems={navItems} className="hidden 768:flex " />
      <MobileNavbar navItems={navItems} className="block 768:hidden" />
    </div>
  );
};
