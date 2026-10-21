"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { PricingTable } from "@/components/PricingTable";

export function PricingDialog({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[calc(100dvh-2rem)] overflow-y-auto sm:max-w-5xl">
        <DialogTitle className="text-center text-2xl font-bold">
          Simple, flexible pricing
        </DialogTitle>
        <DialogDescription className="text-center">
          Pick the plan that fits your job search. Upgrade anytime.
        </DialogDescription>
        <PricingTable />
      </DialogContent>
    </Dialog>
  );
}

/** Self-contained "Pricing" button, handy for the in-app navbar too. */
export function PricingButton({ className }: { className?: string }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button
        variant="ghost"
        className={className}
        onClick={() => setOpen(true)}
      >
        Pricing
      </Button>
      <PricingDialog open={open} onOpenChange={setOpen} />
    </>
  );
}
