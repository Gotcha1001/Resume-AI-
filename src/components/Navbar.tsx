"use client";

import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { BrainCircuitIcon, MenuIcon, XIcon } from "lucide-react";
import { useAuth } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import { PricingDialog } from "./PricingDialog";

const links = [
  ["Features", "#features"],
  ["How it works", "#how-it-works"],
  ["FAQ", "#faq"],
] as const;

const linkClass =
  "relative isolate rounded-full px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground";

export function LandingNavbar() {
  const { isLoaded, isSignedIn } = useAuth();
  const [pricing, setPricing] = useState(false);
  const [menu, setMenu] = useState(false);
  const [hover, setHover] = useState<string | null>(null);

  const pill = (name: string) =>
    hover === name && (
      <motion.span
        layoutId="nav-pill"
        className="absolute inset-0 -z-10 rounded-full bg-muted"
      />
    );

  return (
    <>
      <motion.header
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="fixed inset-x-0 top-0 z-50 px-4 pt-3"
      >
        <nav className="mx-auto max-w-5xl rounded-2xl border bg-background/70 px-3 shadow-sm backdrop-blur-xl">
          <div className="flex h-14 items-center justify-between">
            <Link href="/" className="flex items-center gap-2 pl-1">
              <BrainCircuitIcon className="size-7 text-primary" />
              <span className="text-lg font-bold">Landr</span>
            </Link>

            <div
              className="hidden items-center gap-1 md:flex"
              onMouseLeave={() => setHover(null)}
            >
              {links.map(([name, href]) => (
                <a
                  key={name}
                  href={href}
                  onMouseEnter={() => setHover(name)}
                  className={linkClass}
                >
                  {pill(name)}
                  {name}
                </a>
              ))}
              <button
                onMouseEnter={() => setHover("Pricing")}
                onClick={() => setPricing(true)}
                className={linkClass}
              >
                {pill("Pricing")}Pricing
              </button>
            </div>

            <div className="flex items-center gap-2">
              <ThemeToggle />
              {!isLoaded ? (
                <div className="h-9 w-28" />
              ) : isSignedIn ? (
                <Button
                  size="sm"
                  className="rounded-full"
                  nativeButton={false}
                  render={<Link href="/app" />}
                >
                  Dashboard
                </Button>
              ) : (
                <>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="max-sm:hidden"
                    nativeButton={false}
                    render={<Link href="/sign-in" />}
                  >
                    Sign in
                  </Button>
                  <Button
                    size="sm"
                    className="rounded-full"
                    nativeButton={false}
                    render={<Link href="/sign-up" />}
                  >
                    Get started
                  </Button>
                </>
              )}
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                aria-label="Menu"
                onClick={() => setMenu((m) => !m)}
              >
                {menu ? <XIcon /> : <MenuIcon />}
              </Button>
            </div>
          </div>

          <AnimatePresence>
            {menu && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden md:hidden"
              >
                <div className="flex flex-col gap-1 pb-3">
                  {links.map(([name, href]) => (
                    <a
                      key={name}
                      href={href}
                      onClick={() => setMenu(false)}
                      className="rounded-lg px-3 py-2 text-sm hover:bg-muted"
                    >
                      {name}
                    </a>
                  ))}
                  <button
                    onClick={() => {
                      setMenu(false);
                      setPricing(true);
                    }}
                    className="rounded-lg px-3 py-2 text-left text-sm hover:bg-muted"
                  >
                    Pricing
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </nav>
      </motion.header>
      <PricingDialog open={pricing} onOpenChange={setPricing} />
    </>
  );
}
