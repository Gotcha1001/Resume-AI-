// import { PricingTable } from "@/components/PricingTable";
// import { ThemeToggle } from "@/components/ThemeToggle";
// import { SignInButton, UserButton } from "@clerk/nextjs";

// export default function HomePage() {
//   return (
//     <div className="p-4 space-y-4">
//       <div className="flex flex-col items-center gap-4">
//         <SignInButton />
//         <UserButton />
//         <ThemeToggle />
//       </div>
//       <PricingTable />
//     </div>
//   );
// }

import { LandingNavbar } from "@/components/Navbar";
import {
  Faq,
  Features,
  FinalCta,
  Footer,
  Hero,
  Marquee,
  MotionProvider,
  Steps,
} from "@/components/Sections";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Landr — AI mock interviews, practice questions & resume review",
  description:
    "Practice voice interviews with an AI interviewer, drill role-specific questions and get your resume scored against the job.",
};

export default function HomePage() {
  return (
    <MotionProvider>
      <LandingNavbar />
      <main className="relative flex-1 overflow-x-clip">
        <Hero />
        <Marquee />
        <Features />
        <Steps />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
    </MotionProvider>
  );
}
