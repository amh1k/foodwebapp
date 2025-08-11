"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navbarItems = [
  //   { href: "/", children: "Home" },
  { href: "/foods", children: "order now" },
  { href: "/sign-in", children: "Sign in" },
  { href: "sign-up", children: "Sign up" },
];
interface navbarItemsProps {
  href: string;
  children: React.ReactNode;
  isActive?: Boolean;
}
const NavbarItem = ({ href, children, isActive }: navbarItemsProps) => {
  return (
    <Button asChild className={cn()}>
      <Link prefetch href={href}>
        {children}
      </Link>
    </Button>
  );
};

export const Navbar = () => {
  const pathName = usePathname();
  return (
    <div className="h-20 flex items-center justify-between font-medium p-4 lg:mb-8 mb-4">
      <Link className="text-3xl font-bold" href="/">
        WebsiteName
      </Link>
      <div className="hidden lg:flex items-center gap-4">
        {navbarItems.map((item) => (
          <NavbarItem
            href={item.href}
            isActive={pathName === item.href}
            key={item.href}
          >
            {item.children}
          </NavbarItem>
        ))}
      </div>
    </div>
  );
};
