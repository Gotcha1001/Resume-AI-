// "use client";

// import * as React from "react";
// import { useTheme } from "next-themes";
// import { Monitor, Moon, Sun } from "lucide-react";

// import { Button } from "@/components/ui/button";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import { useState, useEffect } from "react";

// export function ThemeToggle() {
//   const { setTheme, resolvedTheme } = useTheme();
//   const [mounted, setMounted] = useState(false);

//   useEffect(() => {
//     setMounted(true);
//   }, []);

//   if (!mounted) {
//     return null;
//   }

//   return (
//     <DropdownMenu>
//       <DropdownMenuTrigger>
//         <Button variant="ghost" size="icon">
//           {resolvedTheme === "dark" ? <Moon /> : <Sun />}

//           <span className="sr-only">Toggle theme</span>
//         </Button>
//       </DropdownMenuTrigger>
//       <DropdownMenuContent align="end">
//         <DropdownMenuItem onClick={() => setTheme("light")}>
//           <Sun className="size-4" />
//           Light
//         </DropdownMenuItem>
//         <DropdownMenuItem onClick={() => setTheme("dark")}>
//           <Moon className="size-4" />
//           Dark
//         </DropdownMenuItem>
//         <DropdownMenuItem onClick={() => setTheme("system")}>
//           <Monitor className="size-4" />
//           System
//         </DropdownMenuItem>
//       </DropdownMenuContent>
//     </DropdownMenu>
//   );
// }

"use client";

import * as React from "react";
import { useTheme } from "@wrksz/themes/client";
import { Monitor, Moon, Sun } from "lucide-react";
import { useSyncExternalStore } from "react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "cn";

const themes = [
  {
    name: "Light",
    Icon: Sun,
    value: "light",
  },
  {
    name: "Dark",
    Icon: Moon,
    value: "dark",
  },
  {
    name: "System",
    Icon: Monitor,
    value: "system",
  },
] as const;

// Subscribe to nothing – we only care about the client snapshot
const emptySubscribe = () => () => {};

export function ThemeToggle() {
  const { setTheme, theme, resolvedTheme } = useTheme();

  // true only on the client after hydration
  const mounted = useSyncExternalStore(
    emptySubscribe,
    () => true, // client
    () => false, // server
  );

  if (!mounted) {
    return null; // or a skeleton / placeholder button
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger render={<Button variant="ghost" size="icon" />}>
        {resolvedTheme === "dark" ? <Moon /> : <Sun />}
        <span className="sr-only">Toggle theme</span>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {themes.map(({ name, Icon, value }) => (
          <DropdownMenuItem
            key={value}
            onClick={() => setTheme(value)}
            className={cn(
              "cursor-pointer",
              theme === value && "bg-accent text-accent-foreground",
            )}
          >
            <Icon className="size-4" />

            {name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
