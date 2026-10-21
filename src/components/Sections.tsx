"use client";

import Link from "next/link";
import { ReactNode, useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  MotionConfig,
  animate,
  motion,
  useInView,
  useMotionValue,
  useTransform,
} from "framer-motion";
import {
  ArrowRightIcon,
  BookOpenIcon,
  BrainCircuitIcon,
  FileSlidersIcon,
  PlusIcon,
  SparklesIcon,
  SpeechIcon,
  TargetIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/* Disables transform animations for users who prefer reduced motion */
export const MotionProvider = ({ children }: { children: ReactNode }) => (
  <MotionConfig reducedMotion="user">{children}</MotionConfig>
);

function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function SectionTitle({
  eyebrow,
  title,
  text,
}: {
  eyebrow: string;
  title: string;
  text?: string;
}) {
  return (
    <Reveal className="mx-auto mb-12 max-w-2xl text-center">
      <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-primary">
        {eyebrow}
      </p>
      <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">{title}</h2>
      {text && <p className="mt-4 text-muted-foreground">{text}</p>}
    </Reveal>
  );
}

function LinkButton({
  href,
  variant,
  children,
}: {
  href: string;
  variant?: "outline" | "secondary";
  children: ReactNode;
}) {
  return (
    <Button
      size="lg"
      variant={variant}
      className="group h-12 rounded-full px-6 text-base"
      nativeButton={false}
      render={<Link href={href} />}
    >
      {children}
    </Button>
  );
}

/* ---------------------------------- HERO ---------------------------------- */

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};
const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

function ScoreRing({ score }: { score: number }) {
  const ref = useRef<SVGSVGElement>(null);
  const inView = useInView(ref, { once: true });
  const n = useMotionValue(0);
  const text = useTransform(n, (v) => v.toFixed(1));
  useEffect(() => {
    if (!inView) return;
    const c = animate(n, score, { duration: 1.6, ease: "easeOut" });
    return () => c.stop();
  }, [inView, n, score]);
  return (
    <div className="relative size-28 shrink-0">
      <svg ref={ref} viewBox="0 0 100 100" className="size-full -rotate-90">
        <circle
          cx="50"
          cy="50"
          r="42"
          fill="none"
          strokeWidth="8"
          className="stroke-muted"
        />
        <motion.circle
          cx="50"
          cy="50"
          r="42"
          fill="none"
          strokeWidth="8"
          strokeLinecap="round"
          className="stroke-primary"
          initial={{ pathLength: 0 }}
          animate={inView ? { pathLength: score / 10 } : {}}
          transition={{ duration: 1.6, ease: "easeOut" }}
        />
      </svg>
      <motion.span className="absolute inset-0 grid place-items-center text-2xl font-bold">
        {text}
      </motion.span>
    </div>
  );
}

const bars = [
  ["ATS compatibility", 9],
  ["Job match", 8.2],
  ["Writing & formatting", 7.8],
  ["Keyword coverage", 8.6],
] as const;
const wave = [40, 75, 55, 95, 60, 100, 45, 85, 50, 90, 65, 40, 80, 55];

function Waveform({ className }: { className?: string }) {
  return (
    <div className={cn("flex h-10 items-center gap-1", className)}>
      {wave.map((h, i) => (
        <span
          key={i}
          style={{ height: `${h}%`, animationDelay: `${i * 0.09}s` }}
          className="w-1 animate-wave rounded-full bg-primary"
        />
      ))}
    </div>
  );
}

export function Hero() {
  return (
    <section className="relative px-4 pt-36 pb-24">
      <div aria-hidden className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] bg-[size:48px_48px] opacity-50 [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]" />
        <div className="absolute left-1/4 top-10 size-96 animate-blob rounded-full bg-primary/25 blur-3xl" />
        <div className="absolute right-1/4 top-40 size-80 animate-blob rounded-full bg-teal-400/20 blur-3xl [animation-delay:-7s]" />
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="mx-auto max-w-3xl text-center"
      >
        <motion.div
          variants={item}
          className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full border bg-background/60 px-4 py-1.5 text-sm backdrop-blur"
        >
          <SparklesIcon className="size-4 text-primary" /> AI-powered interview
          prep
        </motion.div>
        <motion.h1
          variants={item}
          className="text-5xl font-bold tracking-tight sm:text-6xl"
        >
          Land the job you{" "}
          <span className="animate-gradient bg-linear-to-r from-primary via-teal-400 to-primary bg-[length:200%_auto] bg-clip-text text-transparent">
            actually want
          </span>
        </motion.h1>
        <motion.p
          variants={item}
          className="mx-auto mt-6 max-w-xl text-lg text-muted-foreground"
        >
          Practice voice interviews with an AI interviewer, drill questions for
          your exact role, and get your resume scored against the job
          description.
        </motion.p>
        <motion.div
          variants={item}
          className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row"
        >
          <LinkButton href="/sign-up">
            Get started{" "}
            <ArrowRightIcon className="transition-transform group-hover:translate-x-1" />
          </LinkButton>
          <LinkButton href="#how-it-works" variant="outline">
            See how it works
          </LinkButton>
        </motion.div>
      </motion.div>

      {/* Product mock */}
      <Reveal delay={0.4} className="relative mx-auto mt-16 max-w-4xl">
        <div className="grid gap-4 md:grid-cols-5">
          <div className="animate-float rounded-3xl border bg-card/80 p-6 shadow-xl backdrop-blur md:col-span-3">
            <p className="mb-4 text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Resume analysis · example
            </p>
            <div className="flex items-center gap-6">
              <ScoreRing score={8.4} />
              <div className="flex-1 space-y-3">
                {bars.map(([label, v], i) => (
                  <div key={label}>
                    <div className="mb-1 flex justify-between text-xs">
                      <span className="text-muted-foreground">{label}</span>
                      <span className="font-medium">{v}</span>
                    </div>
                    <div className="h-1.5 rounded-full bg-muted">
                      <motion.div
                        className="h-full rounded-full bg-primary"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${v * 10}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.5 + i * 0.12 }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-5 flex flex-wrap gap-2 text-xs">
              <span className="rounded-full bg-primary/15 px-3 py-1 text-primary">
                ✓ Strong, quantified impact
              </span>
              <span className="rounded-full bg-amber-500/15 px-3 py-1 text-amber-600 dark:text-amber-400">
                ! Add missing job keywords
              </span>
            </div>
          </div>

          <div className="animate-float rounded-3xl border bg-card/80 p-6 shadow-xl backdrop-blur [animation-delay:-3s] md:col-span-2">
            <p className="mb-4 text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Mock interview · Question 2 of 5
            </p>
            <div className="rounded-2xl rounded-tl-sm bg-muted p-3 text-sm">
              Walk me through a project where you improved performance. What was
              your approach?
            </div>
            <div className="mt-4 flex items-center gap-3 rounded-2xl rounded-tr-sm bg-primary/10 p-3">
              <Waveform />
              <span className="text-xs text-muted-foreground">Listening…</span>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

/* --------------------------------- MARQUEE -------------------------------- */

const roles = [
  "Software Engineer",
  "Product Manager",
  "Data Analyst",
  "UX Designer",
  "Marketing Manager",
  "Project Manager",
  "Sales Associate",
  "Customer Success",
  "Accountant",
  "Operations Lead",
];

export function Marquee() {
  return (
    <section className="border-y bg-muted/30 py-8">
      <p className="mb-5 text-center text-sm text-muted-foreground">
        Tailored to roles like
      </p>
      <div className="overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
        <div className="flex w-max animate-marquee gap-3 hover:[animation-play-state:paused]">
          {[...roles, ...roles].map((r, i) => (
            <span
              key={i}
              className="whitespace-nowrap rounded-full border bg-background px-5 py-2 text-sm"
            >
              {r}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

/* --------------------------------- FEATURES -------------------------------- */

const features = [
  {
    icon: SpeechIcon,
    title: "Voice mock interviews",
    className: "md:col-span-2",
    text: "Talk to an AI interviewer in real time. Five questions tailored to the job, natural follow-ups, then a detailed feedback report on your answers and delivery.",
    extra: <Waveform className="mt-6 h-14" />,
  },
  {
    icon: TargetIcon,
    title: "Built around your target job",
    className: "",
    text: "Add the title, experience level and job description once. Everything you practice is tailored to it.",
  },
  {
    icon: BookOpenIcon,
    title: "Practice questions",
    className: "",
    text: "Generate questions at your level and get instant AI feedback on every answer.",
    extra: (
      <div className="mt-6 flex gap-2 text-xs">
        {["Easy", "Medium", "Hard"].map((d) => (
          <span key={d} className="rounded-full border px-3 py-1">
            {d}
          </span>
        ))}
      </div>
    ),
  },
  {
    icon: FileSlidersIcon,
    title: "Resume analysis",
    className: "md:col-span-2",
    text: "See how your resume stacks up against the job: ATS compatibility, job match, writing & formatting and keyword coverage, each scored out of 10 with specific fixes.",
    extra: (
      <div className="mt-6 flex flex-wrap gap-2 text-xs">
        <span className="rounded-full bg-primary/15 px-3 py-1 text-primary">
          Strength
        </span>
        <span className="rounded-full bg-amber-500/15 px-3 py-1 text-amber-600 dark:text-amber-400">
          Minor improvement
        </span>
        <span className="rounded-full bg-destructive/15 px-3 py-1 text-destructive">
          Major improvement
        </span>
      </div>
    ),
  },
];

export function Features() {
  return (
    <section
      id="features"
      className="mx-auto max-w-6xl scroll-mt-24 px-4 py-24"
    >
      <SectionTitle
        eyebrow="Features"
        title="Everything you need to ace the process"
        text="Three tools, one workflow — all focused on the job you're going for."
      />
      <div className="grid gap-4 md:grid-cols-3">
        {features.map(({ icon: Icon, title, text, extra, className }, i) => (
          <Reveal key={title} delay={i * 0.08} className={className}>
            <motion.div
              whileHover={{ y: -6 }}
              className="group h-full rounded-3xl border bg-card p-6 transition-colors hover:border-primary/50"
            >
              <div className="mb-4 grid size-11 place-items-center rounded-xl bg-primary/10 text-primary transition-transform group-hover:scale-110 group-hover:rotate-3">
                <Icon className="size-5" />
              </div>
              <h3 className="text-xl font-semibold">{title}</h3>
              <p className="mt-2 text-muted-foreground">{text}</p>
              {extra}
            </motion.div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ---------------------------------- STEPS ---------------------------------- */

const steps = [
  [
    "Add your target job",
    "Enter the job title, your experience level and paste the description.",
  ],
  [
    "Practice your way",
    "Run a voice interview, generate practice questions or upload your resume.",
  ],
  [
    "Review and improve",
    "Get clear, specific feedback, fix what matters, and go again.",
  ],
];

export function Steps() {
  return (
    <section id="how-it-works" className="scroll-mt-24 bg-muted/30 px-4 py-24">
      <SectionTitle
        eyebrow="How it works"
        title="From job post to job-ready in three steps"
      />
      <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-3">
        {steps.map(([title, text], i) => (
          <Reveal key={title} delay={i * 0.12}>
            <div className="relative h-full rounded-3xl border bg-background p-6">
              <span className="text-5xl font-bold text-primary/20">
                0{i + 1}
              </span>
              <h3 className="mt-2 text-lg font-semibold">{title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{text}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ----------------------------------- FAQ ----------------------------------- */

const faqs = [
  [
    "How does the mock interview work?",
    "You talk out loud with an AI interviewer that asks five questions tailored to your job, with follow-ups based on your answers. Afterwards you get written feedback.",
  ],
  [
    "Do I need to add a job first?",
    "Yes. You add a job title (optional), your experience level and the job description, so every interview, question and resume check is tailored to that role.",
  ],
  [
    "What does the resume analysis check?",
    "ATS compatibility, job match, writing and formatting, and keyword coverage. Each is scored out of 10 and comes with strengths and suggested improvements.",
  ],
  [
    "Where can I see the plans?",
    "Open Pricing in the navigation bar to compare plans and upgrade whenever you're ready.",
  ],
];

export function Faq() {
  const [open, setOpen] = useState(0);
  return (
    <section id="faq" className="mx-auto max-w-3xl scroll-mt-24 px-4 py-24">
      <SectionTitle eyebrow="FAQ" title="Questions, answered" />
      <div className="space-y-3">
        {faqs.map(([q, a], i) => (
          <Reveal key={q} delay={i * 0.06}>
            <div className="rounded-2xl border bg-card">
              <button
                onClick={() => setOpen(open === i ? -1 : i)}
                aria-expanded={open === i}
                className="flex w-full items-center justify-between gap-4 p-5 text-left font-medium"
              >
                {q}
                <motion.span animate={{ rotate: open === i ? 45 : 0 }}>
                  <PlusIcon className="size-5 text-primary" />
                </motion.span>
              </button>
              <AnimatePresence initial={false}>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="overflow-hidden"
                  >
                    <p className="px-5 pb-5 text-muted-foreground">{a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ------------------------------- CTA + FOOTER ------------------------------ */

export function FinalCta() {
  return (
    <section className="px-4 pb-24">
      <Reveal>
        <div className="relative mx-auto max-w-5xl overflow-hidden rounded-3xl bg-primary px-6 py-16 text-center text-primary-foreground">
          <div
            aria-hidden
            className="absolute -left-10 -top-10 size-64 animate-blob rounded-full bg-white/10 blur-2xl"
          />
          <div
            aria-hidden
            className="absolute -bottom-16 -right-10 size-72 animate-blob rounded-full bg-white/10 blur-2xl [animation-delay:-6s]"
          />
          <h2 className="relative text-3xl font-bold sm:text-4xl">
            Your next interview starts here
          </h2>
          <p className="relative mx-auto mt-4 max-w-lg opacity-90">
            Practice until it feels natural, so you walk in confident.
          </p>
          <div className="relative mt-8 flex justify-center">
            <LinkButton href="/sign-up" variant="secondary">
              Get started{" "}
              <ArrowRightIcon className="transition-transform group-hover:translate-x-1" />
            </LinkButton>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="border-t px-4 py-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 text-sm text-muted-foreground sm:flex-row">
        <div className="flex items-center gap-2">
          <BrainCircuitIcon className="size-5 text-primary" />
          <span className="font-semibold text-foreground">Landr</span>
        </div>
        <div className="flex gap-6">
          <a href="#features" className="hover:text-foreground">
            Features
          </a>
          <a href="#how-it-works" className="hover:text-foreground">
            How it works
          </a>
          <a href="#faq" className="hover:text-foreground">
            FAQ
          </a>
        </div>
        <p>© Landr. All rights reserved.</p>
      </div>
    </footer>
  );
}
