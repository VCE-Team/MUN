"use client";
import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const committees = [
  {
    title: "DISEC",
    href: "/committees/disec",
  },
  {
    title: "UNHRC",
    href: "/committees/unhrc",
  },
  {
    title: "ECOSOC",
    href: "/committees/ecosoc",
  },
  {
    title: "International Press",
    href: "/committees/internationalpress",
  },
];

export function Header() {
  return (
    <AnimatePresence>
      <motion.header className="fixed top-0 left-0 right-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <Image
              src="/images/logos/munvcelogo.png"
              alt="VCEMUN Logo"
              width={50}
              height={50}
              priority
            />
          </Link>

          <NavigationMenu>
            <NavigationMenuList className="flex gap-3">
              <NavigationMenuItem>
                <Link href="/" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Home
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger>Committees</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="flex flex-col w-[200px] gap-1 p-2">
                    {committees.map(committee => (
                      <li key={committee.title}>
                        <NavigationMenuLink asChild>
                          <Link
                            href={committee.href}
                            className="block select-none rounded-md p-2 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                          >
                            <div className="text-sm font-medium leading-none">
                              {committee.title}
                            </div>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <Link href="/usg" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    USG
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <Link href="/chairs" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Chairs
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          <Link href="/register">
            <Button>Register</Button>
          </Link>
        </div>
      </motion.header>
    </AnimatePresence>
  );
}
