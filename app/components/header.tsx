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
import { useEffect, useState } from "react";

const committees = [
  { title: "DISEC", href: "/committees/disec" },
  { title: "UNHRC", href: "/committees/unhrc" },
  { title: "ECOSOC", href: "/committees/ecosoc" },
  { title: "International Press", href: "/committees/internationalpress" },
];

export function Header() {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const controlHeader = () => {
    if (typeof window !== "undefined") {
      if (window.scrollY > lastScrollY) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      setLastScrollY(window.scrollY);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", controlHeader);
    return () => {
      window.removeEventListener("scroll", controlHeader);
    };
  }, [lastScrollY]);

  return (
    <AnimatePresence>
      <motion.header
        className={`fixed top-0 left-0 right-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 ${
          isVisible ? "translate-y-0" : "-translate-y-full"
        } transition-transform duration-300`}
      >
        <div className="container flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <Image
              src="/images/logos/munvcelogo.png"
              alt="VCEMUN Logo"
              width={40}
              height={40}
              priority
              className="logo-image"
            />
            <p
              className="font-bold text-xl"
              style={{ color: "var(--logo-gold-yellow)" }}
            >
              VCEMUN
            </p>
          </Link>

          <div className="hidden md:block">
            <NavigationMenu>
              <NavigationMenuList className="flex gap-3">
                <NavigationMenuItem>
                  <Link href="/" legacyBehavior passHref>
                    <NavigationMenuLink
                      className={navigationMenuTriggerStyle()}
                    >
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
                    <NavigationMenuLink
                      className={navigationMenuTriggerStyle()}
                    >
                      USG
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <Link href="/chairs" legacyBehavior passHref>
                    <NavigationMenuLink
                      className={navigationMenuTriggerStyle()}
                    >
                      Chairs
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link href="/register">
                    <Button>Register</Button>
                  </Link>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          <div className="flex items-center space-x-1 mr-6">
            <Link href="https://vardhaman.org/" target="_blank">
              <Image
                className="px-1"
                src="/images/logos/vardhamanlogo.png"
                alt="VCEMUN Logo"
                width={45}
                height={45}
                priority
              />
            </Link>
            <Image
              className="px-1"
              src="/images/logos/saclogomain.png"
              alt="VCEMUN Logo"
              width={50}
              height={50}
              priority
            />
          </div>
        </div>
      </motion.header>
    </AnimatePresence>
  );
}
