"use client";

import Link from "next/link";
import { Menu } from "lucide-react";

import { Button, buttonVariants } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const navigationItems = [
  { label: "Home", href: "#home" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
] as const;

export function SiteNavbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-black/35 backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <Link href="#home" className="group inline-flex flex-col leading-tight">
          <span className="text-sm font-medium tracking-[0.18em] text-cyan-200/80 uppercase">
            Portfolio
          </span>
          <span className="font-heading text-lg font-semibold text-white transition-colors group-hover:text-cyan-200">
            Neki 3D Lab
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {navigationItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="rounded-md px-3 py-2 text-sm text-zinc-300 transition-colors hover:bg-white/5 hover:text-white"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="hidden md:block">
          <a
            href="#portfolio"
            className={buttonVariants({
              className: "border border-cyan-200/50 bg-cyan-200/10 text-cyan-100 hover:bg-cyan-200/20",
            })}
          >
            View Portfolio
          </a>
        </div>

        <div className="md:hidden">
          <Sheet>
            <SheetTrigger
              render={
                <Button variant="outline" size="icon" className="border-white/20 bg-white/5" />
              }
            >
              <Menu className="size-4" />
              <span className="sr-only">Open navigation</span>
            </SheetTrigger>
            <SheetContent side="right" className="border-white/10 bg-zinc-950 text-white">
              <SheetHeader>
                <SheetTitle className="text-white">Navigate</SheetTitle>
              </SheetHeader>
              <div className="mt-6 flex flex-col gap-2 px-4">
                {navigationItems.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    className="rounded-md px-3 py-2 text-sm text-zinc-200 transition-colors hover:bg-white/5"
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
