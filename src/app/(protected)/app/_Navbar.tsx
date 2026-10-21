"use client";

import {
  BookOpenIcon,
  BrainCircuitIcon,
  CreditCardIcon,
  FileSlidersIcon,
  LogOut,
  SpeechIcon,
  User,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SignOutButton, useClerk } from "@clerk/nextjs";
import { ThemeToggle } from "@/components/ThemeToggle";
import Link from "next/link";
import { useState } from "react";
import { UserAvatar } from "@/features/users/components/UserAvatar";
import { useParams, usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { PricingDialog } from "@/components/PricingDialog";

const navLinks = [
  { name: "Interviews", href: "interviews", Icon: SpeechIcon },
  { name: "Questions", href: "questions", Icon: BookOpenIcon },
  { name: "Resume", href: "resume", Icon: FileSlidersIcon },
];

export function Navbar({ user }: { user: { name: string; imageUrl: string } }) {
  const { openUserProfile } = useClerk();
  const { jobInfoId } = useParams();
  const pathName = usePathname();
  const [pricingOpen, setPricingOpen] = useState(false);

  return (
    <nav className="h-header border-b">
      <div className="container flex h-full items-center justify-between">
        {/* Left side - Logo and App Name */}
        <Link href={"/app"} className="flex items-center gap-2">
          <BrainCircuitIcon className="h-8 w-8 text-primary" />
          <span className="text-xl font-bold">Landr</span>
        </Link>

        {/* Right side - Theme Toggle and User Menu */}
        <div className="flex items-center gap-4">
          {typeof jobInfoId === "string" &&
            navLinks.map(({ name, href, Icon }) => {
              const hrefPath = `/app/job-infos/${jobInfoId}/${href}`;
              const isActive = pathName === hrefPath;
              return (
                <Button
                  key={name}
                  variant={isActive ? "secondary" : "ghost"}
                  className="cursor-pointer max-sm:hidden p-4"
                  nativeButton={false}
                  render={<Link href={hrefPath} />}
                >
                  <Icon />
                  {name}
                </Button>
              );
            })}

          {/* Pricing (opens dialog) */}
          <Button
            variant="ghost"
            className="cursor-pointer max-sm:hidden p-4"
            onClick={() => setPricingOpen(true)}
          >
            <CreditCardIcon />
            Pricing
          </Button>

          <ThemeToggle />

          <DropdownMenu>
            <DropdownMenuTrigger
              render={<button className="relative h-8 w-8 rounded-full" />}
            >
              <UserAvatar user={user} />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuItem onClick={() => openUserProfile()}>
                <User className="mr-2 h-4 w-4" />
                Profile
              </DropdownMenuItem>
              {/* Shown here on mobile, where the navbar button is hidden */}
              <DropdownMenuItem
                className="sm:hidden"
                onClick={() => setPricingOpen(true)}
              >
                <CreditCardIcon className="mr-2 h-4 w-4" />
                Pricing
              </DropdownMenuItem>
              <SignOutButton>
                <DropdownMenuItem>
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </DropdownMenuItem>
              </SignOutButton>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Rendered outside the dropdown so it stays mounted when the menu closes */}
      <PricingDialog open={pricingOpen} onOpenChange={setPricingOpen} />
    </nav>
  );
}
