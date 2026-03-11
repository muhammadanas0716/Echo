import Image from "next/image";
import Link from "next/link";

const HERO_CLOUDS = [
  { src: "/clouds/cloud1.svg", className: "left-[2%] top-28 w-28 sm:w-40 ocean-float" },
  { src: "/clouds/cloud2.svg", className: "right-[4%] top-24 w-24 sm:w-36 ocean-float-delayed" },
  { src: "/clouds/cloud3.svg", className: "left-[13%] top-[62%] w-20 sm:w-28 ocean-float-fast" },
  { src: "/clouds/cloud4.svg", className: "right-[18%] top-[68%] w-24 sm:w-34 ocean-float" },
];

const PARTNER_LOGOS = [
  { name: "Buffer", src: "/company-logos/buffer.svg" },
  { name: "Relevance AI", src: "/company-logos/relevanceai.svg" },
  { name: "HireVue", src: "/company-logos/hirevue.svg" },
  { name: "Zapier", src: "/company-logos/zapier.svg" },
  { name: "Notion", src: "/company-logos/notion.svg" },
  { name: "Linear", src: "/company-logos/linear.svg" },
  { name: "HubSpot", src: "/company-logos/hubspot.svg" },
  { name: "Intercom", src: "/company-logos/intercom.svg" },
];

const PROBLEM_ITEMS = [
  { emoji: "🧩", text: "Answers are buried across docs, tickets, and old team threads", color: "bg-[var(--pink)]" },
  { emoji: "🛒", text: "Website and Shopify shoppers expect fast, channel-aware help", color: "bg-[var(--sun)]" },
  { emoji: "🤖", text: "Generic bots sound polished until they guess wrong on real product questions", color: "bg-[var(--lavender)]" },
  { emoji: "🚨", text: "Each release quietly makes yesterday's support answers stale", color: "bg-[#d4e9ff]" },
];

const SUCCESS_CARDS = [
  {
    quote:
      "Our support bot stopped sounding like a template and started replying like someone who actually knows the product.",
    name: "A. Kareem",
    role: "Head of CX, Cartlane",
    statA: "41%",
    statB: "2.3x",
    labelA: "fewer repetitive tickets",
    labelB: "faster first replies",
    rotate: "-5deg",
  },
  {
    quote:
      "Connecting docs, SOPs, and the codebase changed everything. The agent finally answered like it had real context.",
    name: "J. Malik",
    role: "Support Lead, Flowpilot",
    statA: "64%",
    statB: "11h",
    labelA: "self-serve resolution",
    labelB: "saved per week",
    rotate: "6deg",
  },
  {
    quote:
      "The Discord bot handles onboarding questions around the clock and sends the edge cases to our team with proper context.",
    name: "S. Noor",
    role: "Community Ops, Patchwave",
    statA: "24/7",
    statB: "-48%",
    labelA: "community coverage",
    labelB: "repeat questions",
    rotate: "-4deg",
  },
  {
    quote:
      "Our Shopify assistant answers policy, product, and order questions in one place. It feels branded, not bolted on.",
    name: "L. Hassan",
    role: "Ecommerce Director, Norththread",
    statA: "+29%",
    statB: "-35%",
    labelA: "csat lift",
    labelB: "ticket backlog",
    rotate: "4deg",
  },
];

const FEATURE_CARDS = [
  {
    title: "Read the Docs. Then Read the Code.",
    body: "Train agents on help centers, internal SOPs, release notes, tickets, and your codebase so support stays grounded in how the product really works.",
    tag: "Knowledge",
    stat: "Docs + Code",
    statLabel: "one live support brain",
    bg: "bg-[#cde0ff]",
    accent: "bg-[var(--mint)]",
    rotate: "-2deg",
    emoji: "🧠",
  },
  {
    title: "Custom Chatbots for Website + Shopify.",
    body: "Launch branded AI chatbots that match your tone, routing, and workflows instead of shipping another generic widget with canned answers.",
    tag: "Design",
    stat: "Tailored",
    statLabel: "to your flows and voice",
    bg: "bg-[#fef3c7]",
    accent: "bg-[var(--sun)]",
    rotate: "2deg",
    emoji: "🎨",
  },
  {
    title: "Discord Today. Slack Soon.",
    body: "Deploy support bots where your users already ask for help. Run Discord support now and get your Slack support rollout queued for the next phase.",
    tag: "Channels",
    stat: "Coming",
    statLabel: "Slack support bots",
    bg: "bg-[#d4f8e8]",
    accent: "bg-[#a6ea47]",
    rotate: "-1deg",
    emoji: "💬",
  },
];

const FLOW_STEPS = [
  {
    step: "01",
    title: "Create one support hub",
    body: "Set up a single support hub for your brand, channels, docs, store policies, and product knowledge.",
    color: "bg-[#d4e9ff]",
  },
  {
    step: "02",
    title: "Spin up specialist agents",
    body: "Create focused bots for billing, refunds, technical questions, onboarding, or any other support lane.",
    color: "bg-[#fef3c7]",
  },
  {
    step: "03",
    title: "Route through one front-door chatbot",
    body: "Your main chatbot catches every incoming question first, then hands it to the right specialist bot behind the scenes.",
    color: "bg-[#d4f8e8]",
  },
  {
    step: "04",
    title: "Keep each bot locally scoped",
    body: "Each agent stays inside its own knowledge scope so billing data, product docs, and support playbooks do not interfere with each other.",
    color: "bg-[#ffd7d2]",
  },
];

const FLOW_BOTS = [
  { title: "Billing Bot", scope: "Invoices, failed payments, refunds", rotate: "-4deg", className: "ocean-float-soft" },
  { title: "Store Bot", scope: "Orders, shipping, Shopify policies", rotate: "3deg", className: "ocean-float-soft-delayed" },
  { title: "Product Bot", scope: "Features, setup, troubleshooting", rotate: "-2deg", className: "ocean-float-soft-fast" },
];

const SECURITY_CARDS = [
  {
    title: "Encryption in transit and at rest",
    body: "Every request moves through encrypted transport, and stored support data is protected after it lands.",
    stat: "TLS + Encrypted Storage",
    bg: "bg-[#d4e9ff]",
  },
  {
    title: "Workspace access stays tight",
    body: "Support knowledge stays scoped to the right team, channel, and workflow instead of floating around in disconnected tools.",
    stat: "Scoped access",
    bg: "bg-[#fef3c7]",
  },
  {
    title: "Sensitive knowledge handled carefully",
    body: "Docs, policies, product notes, and connected echontext are treated like operational data, not marketing exhaust.",
    stat: "Protected by default",
    bg: "bg-[#d4f8e8]",
  },
];

export default function OceanLanding() {
  return (
    <main className="relative z-10 overflow-hidden">
      <section className="relative bg-[linear-gradient(180deg,#90ddf0_0%,#b8edfb_54%,#d4f8ff_100%)] px-4 pb-20 pt-40 sm:px-6 sm:pt-44 lg:px-8">
        <div className="pointer-events-none absolute inset-0 dotted-sea opacity-60" />
        {HERO_CLOUDS.map((cloud) => (
          <Image
            key={cloud.src}
            src={cloud.src}
            alt=""
            aria-hidden="true"
            width={220}
            height={120}
            className={`pointer-events-none absolute ${cloud.className}`}
          />
        ))}

        <div className="mx-auto max-w-6xl">
          <h1 className="mx-auto max-w-4xl text-balance text-center font-heading text-4xl font-extrabold leading-[1.05] tracking-[-0.03em] text-[var(--charcoal)] sm:text-6xl">
            AI support agents that actually know your product.
            <br />
            Echo makes them feel native.
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-balance text-center text-lg font-medium text-[var(--charcoal)]/80 sm:text-xl">
            Deploy custom-designed agents across your website, Shopify store, docs, and community channels. Feed them your help center, tickets, and codebase so every answer sounds like your team.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="mailto:hello@echobills.space?subject=Echo%20Demo"
              className="inline-flex items-center justify-center rounded-xl border-2 border-[var(--charcoal)] bg-[var(--mint)] px-7 py-3.5 font-heading text-lg font-bold text-[var(--charcoal)] shadow-[0_6px_0_#1a1a1a] transition hover:-translate-y-1 hover:shadow-[0_10px_0_#1a1a1a]"
            >
              Book Demo
            </Link>
            <Link
              href="/pricing"
              className="inline-flex items-center justify-center rounded-xl border-2 border-[var(--charcoal)] bg-white px-7 py-3.5 font-heading text-lg font-bold text-[var(--charcoal)] shadow-[0_6px_0_#1a1a1a] transition hover:-translate-y-1 hover:shadow-[0_10px_0_#1a1a1a]"
            >
              View Pricing
            </Link>
          </div>
          <div className="relative mt-16 overflow-hidden rounded-[2rem] border-2 border-[var(--charcoal)] bg-[#d4e9ff] p-4 shadow-[0_14px_0_#1a1a1a] sm:p-6">
            <div className="mb-4 flex items-center justify-between">
              <div className="inline-flex gap-2">
                <span className="h-3 w-3 rounded-full border border-[var(--charcoal)] bg-[var(--coral)]" />
                <span className="h-3 w-3 rounded-full border border-[var(--charcoal)] bg-[var(--sun)]" />
                <span className="h-3 w-3 rounded-full border border-[var(--charcoal)] bg-[var(--mint)]" />
              </div>
              <span className="rounded-full border border-[var(--charcoal)] bg-[#f1f8ff] px-3 py-1 text-xs font-semibold tracking-wide text-[var(--charcoal)]">
                Live Agent Preview
              </span>
            </div>
            <div className="relative aspect-[16/9] overflow-hidden rounded-2xl border border-[var(--charcoal)] bg-[#ebf5ff]">
              <Image
                src="/image.png"
                alt="Echo agent preview"
                fill
                className="object-cover object-top"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      <section className="ripple-border-green border-y-2 border-[var(--charcoal)] bg-[#c0f1dc]">
        <div className="mx-auto max-w-7xl overflow-hidden px-4 py-5 sm:px-6">
          <div className="partners-marquee-track flex w-max items-center gap-3">
            {[...PARTNER_LOGOS, ...PARTNER_LOGOS].map((company, index) => (
              <div
                key={`${company.name}-${index}`}
                className="flex h-14 min-w-[176px] items-center justify-center rounded-xl border-2 border-[var(--charcoal)] bg-white px-5 shadow-[0_4px_0_#1a1a1a]"
              >
                <div className="relative h-6 w-[120px]">
                  <Image src={company.src} alt={company.name} fill className="object-contain" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="ripple-border-green relative overflow-hidden bg-[linear-gradient(180deg,#d0f8ea_0%,#95ddc1_100%)] px-4 py-24 sm:px-6 lg:px-8">
        <svg
          className="absolute -top-[1px] left-0 h-8 w-full text-[#7fd7b8]"
          viewBox="0 0 1440 80"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path
            fill="currentColor"
            d="M0,40 C90,0 180,80 270,40 C360,0 450,80 540,40 C630,0 720,80 810,40 C900,0 990,80 1080,40 C1170,0 1260,80 1350,40 C1410,12 1440,40 1440,40 L1440,0 L0,0 Z"
          />
        </svg>
        <div className="pointer-events-none absolute inset-0 dotted-sea opacity-[0.06]" />

        <div className="relative mx-auto max-w-6xl">
          <div className="text-center">
            <span className="inline-flex items-center gap-2 rounded-full border-2 border-[var(--charcoal)] bg-white px-4 py-2 text-sm font-black uppercase tracking-wider shadow-[0_3px_0_#1a1a1a]">
              <span className="h-2 w-2 rounded-full bg-[var(--coral)]" />
              The Problem
            </span>
            <h2 className="mt-7 font-heading text-4xl font-extrabold leading-tight tracking-[-0.02em] text-[var(--charcoal)] sm:text-6xl">
              Your support knowledge is all over the place.
            </h2>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {PROBLEM_ITEMS.map((item, i) => (
              <div
                key={item.text}
                className={`rounded-2xl border-3 border-[var(--charcoal)] ${item.color} p-5 shadow-[0_6px_0_#1a1a1a] transition-all hover:-translate-y-1 hover:shadow-[0_9px_0_#1a1a1a]`}
                style={{ transform: `rotate(${i % 2 === 0 ? "-1.5" : "1.5"}deg)` }}
              >
                <span className="text-3xl">{item.emoji}</span>
                <p className="mt-3 text-sm font-bold leading-snug text-[var(--charcoal)]">{item.text}</p>
              </div>
            ))}
          </div>

          <div className="relative mx-auto mt-16 max-w-5xl">
            <div className="absolute -left-3 -top-3 h-full w-full rounded-[2rem] border-3 border-[var(--charcoal)] bg-[var(--charcoal)]" />
            <div className="relative rounded-[2rem] border-3 border-[var(--charcoal)] bg-white px-6 py-10 sm:px-12 sm:py-14">
              <div className="mx-auto max-w-3xl text-center">
                <span className="inline-flex rounded-full border-2 border-[var(--charcoal)] bg-[#a6ea47] px-4 py-1.5 text-xs font-black uppercase tracking-widest text-[var(--charcoal)] shadow-[0_3px_0_#1a1a1a]">
                  The Answer
                </span>
                <h3 className="mt-5 font-heading text-3xl font-extrabold text-[var(--charcoal)] sm:text-5xl">
                  One support brain.
                  <br />
                  Every channel. Less repetition.
                </h3>
                <p className="mx-auto mt-5 max-w-2xl text-lg font-medium text-[var(--charcoal)]/70">
                  Echo turns scattered docs, store policies, product logic, and team know-how into a live knowledge layer for customers, bots, and human agents.
                </p>
              </div>
              <div className="mt-10 grid gap-4 sm:grid-cols-3">
                {[
                  { icon: "🧠", label: "Codebase-aware", desc: "Learns from docs, tickets, and product logic" },
                  { icon: "🎨", label: "Custom-designed", desc: "Built around your brand and support flows" },
                  { icon: "🌍", label: "Multi-channel", desc: "Website, Shopify, Discord, and more" },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="rounded-xl border-2 border-[var(--charcoal)] bg-[var(--offwhite)] p-4 text-center shadow-[0_3px_0_#1a1a1a] transition hover:-translate-y-0.5 hover:shadow-[0_5px_0_#1a1a1a]"
                  >
                    <span className="text-2xl">{item.icon}</span>
                    <p className="mt-2 text-sm font-black uppercase tracking-wider text-[var(--charcoal)]">{item.label}</p>
                    <p className="mt-1 text-xs font-semibold text-[var(--charcoal)]/50">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="ripple-border-blue relative overflow-hidden border-y-2 border-[var(--charcoal)] bg-[#2f58cf] px-4 py-24 sm:px-6 lg:px-8">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_15%,rgba(255,255,255,0.13),transparent_38%),radial-gradient(circle_at_85%_78%,rgba(255,255,255,0.10),transparent_35%)]" />
        <div className="relative mx-auto max-w-6xl">
          <h2 className="text-center font-heading text-4xl font-extrabold tracking-[-0.02em] text-white sm:text-6xl">
            Support teams move faster when the agent knows the product.
          </h2>
          <div className="mt-14 grid gap-8 lg:grid-cols-2">
            {SUCCESS_CARDS.map((card) => (
              <article
                key={card.name}
                className="rounded-3xl border-2 border-[var(--charcoal)] bg-[#d6e2ff] p-6 shadow-[0_10px_0_#1a1a1a] sm:p-8"
                style={{ transform: `rotate(${card.rotate})` }}
              >
                <p className="text-xl font-semibold leading-relaxed text-[var(--charcoal)]">
                  &ldquo;{card.quote}&rdquo;
                </p>
                <p className="mt-6 font-heading text-xl font-bold text-[var(--charcoal)]">{card.name}</p>
                <p className="text-sm font-semibold text-[var(--charcoal)]/70">{card.role}</p>
                <div className="mt-6 grid grid-cols-2 gap-3">
                  <div className="rounded-xl border-2 border-[var(--charcoal)] bg-[#b9ec99] p-3">
                    <p className="font-heading text-4xl font-black text-[var(--charcoal)]">{card.statA}</p>
                    <p className="text-xs font-bold uppercase tracking-wide text-[var(--charcoal)]/70">{card.labelA}</p>
                  </div>
                  <div className="rounded-xl border-2 border-[var(--charcoal)] bg-[#b9ec99] p-3">
                    <p className="font-heading text-4xl font-black text-[var(--charcoal)]">{card.statB}</p>
                    <p className="text-xs font-bold uppercase tracking-wide text-[var(--charcoal)]/70">{card.labelB}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden border-y-2 border-[var(--charcoal)] bg-[linear-gradient(180deg,#d5efff_0%,#bfe8ff_52%,#d9f8eb_100%)] px-4 py-24 sm:px-6 lg:px-8">
        <div className="pointer-events-none absolute inset-0 dotted-sea opacity-[0.08]" />
        <Image
          src="/clouds/cloud1.svg"
          alt=""
          aria-hidden
          width={220}
          height={120}
          className="pointer-events-none absolute left-[4%] top-18 w-20 opacity-25 ocean-float-soft"
        />
        <Image
          src="/clouds/cloud3.svg"
          alt=""
          aria-hidden
          width={220}
          height={120}
          className="pointer-events-none absolute right-[6%] bottom-20 w-18 opacity-25 ocean-float-soft-delayed"
        />

        <div className="relative mx-auto max-w-6xl">
          <div className="text-center">
            <span className="inline-flex rounded-full border-2 border-[var(--charcoal)] bg-white px-4 py-1.5 text-xs font-black uppercase tracking-widest text-[var(--charcoal)] shadow-[0_3px_0_#1a1a1a]">
              Agent Flow
            </span>
            <h2 className="mt-5 font-heading text-4xl font-extrabold tracking-[-0.02em] text-[var(--charcoal)] sm:text-5xl lg:text-6xl">
              One chatbot in front.
              <br />
              Specialist bots behind it.
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg font-medium text-[var(--charcoal)]/70">
              Echo lets you run one main chatbot as the front door for every conversation. It receives the query, routes it to the right specialist agent, and keeps each bot inside its own local knowledge scope.
            </p>
          </div>

          <div className="mt-14 grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <div className="space-y-4">
              {FLOW_STEPS.map((item, index) => (
                <article
                  key={item.step}
                  className={`rounded-[1.75rem] border-3 border-[var(--charcoal)] ${item.color} p-5 shadow-[0_6px_0_#1a1a1a] transition hover:-translate-y-1 hover:shadow-[0_9px_0_#1a1a1a]`}
                  style={{ transform: `rotate(${index % 2 === 0 ? "-1deg" : "1deg"})` }}
                >
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border-2 border-[var(--charcoal)] bg-white font-heading text-sm font-black text-[var(--charcoal)] shadow-[0_3px_0_#1a1a1a]">
                      {item.step}
                    </div>
                    <div>
                      <h3 className="font-heading text-xl font-extrabold text-[var(--charcoal)]">{item.title}</h3>
                      <p className="mt-2 text-sm font-semibold leading-relaxed text-[var(--charcoal)]/70">{item.body}</p>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            <div className="relative rounded-[2rem] border-3 border-[var(--charcoal)] bg-[#1f49b8] p-6 shadow-[0_12px_0_#1a1a1a] sm:p-8">
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_18%,rgba(255,255,255,0.14),transparent_28%),radial-gradient(circle_at_78%_82%,rgba(255,255,255,0.10),transparent_32%)]" />

              <div className="relative mb-6 flex flex-wrap gap-3">
                {[
                  "Refund question",
                  "Order issue",
                  "Why did I get charged?",
                ].map((pill, index) => (
                  <span
                    key={pill}
                    className={`inline-flex rounded-full border-2 border-[var(--charcoal)] bg-white px-3 py-1 text-xs font-black text-[var(--charcoal)] shadow-[0_3px_0_#1a1a1a] ${
                      index === 0 ? "ocean-float-soft" : index === 1 ? "ocean-float-soft-delayed" : "ocean-float-soft-fast"
                    }`}
                  >
                    {pill}
                  </span>
                ))}
              </div>

              <div className="relative mx-auto max-w-xl">
                <div className="mx-auto flex max-w-sm flex-col items-center">
                  <div className="w-full rounded-[1.75rem] border-3 border-[var(--charcoal)] bg-[#99e8cf] p-5 text-center shadow-[0_8px_0_#1a1a1a] animate-pulse-subtle">
                    <div className="inline-flex rounded-full border-2 border-[var(--charcoal)] bg-white px-3 py-1 text-[10px] font-black uppercase tracking-widest text-[var(--charcoal)]">
                      Main Chatbot
                    </div>
                    <h3 className="mt-3 font-heading text-2xl font-extrabold text-[var(--charcoal)]">
                      Support Router
                    </h3>
                    <p className="mt-2 text-sm font-semibold text-[var(--charcoal)]/70">
                      Takes every incoming query, detects intent, and hands it to the right agent.
                    </p>
                  </div>

                  <div className="relative h-16 w-full">
                    <div className="absolute left-1/2 top-0 h-full w-1 -translate-x-1/2 rounded-full border-2 border-[var(--charcoal)] bg-white/80" />
                    <div className="absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-[var(--charcoal)] bg-[#a6ea47]" />
                  </div>
                </div>

                <div className="grid gap-5 md:grid-cols-3">
                  {FLOW_BOTS.map((bot, index) => (
                    <article
                      key={bot.title}
                      className={`relative rounded-[1.6rem] border-3 border-[var(--charcoal)] bg-white p-5 shadow-[0_7px_0_#1a1a1a] ${bot.className}`}
                      style={{ transform: `rotate(${bot.rotate})` }}
                    >
                      <div className="mb-3 inline-flex rounded-full border-2 border-[var(--charcoal)] bg-[#fef3c7] px-3 py-1 text-[10px] font-black uppercase tracking-widest text-[var(--charcoal)]">
                        Specialist Agent
                      </div>
                      <h4 className="font-heading text-xl font-extrabold text-[var(--charcoal)]">{bot.title}</h4>
                      <p className="mt-2 text-sm font-semibold leading-relaxed text-[var(--charcoal)]/70">{bot.scope}</p>
                      <div className="mt-4 rounded-xl border-2 border-[var(--charcoal)] bg-[#ebf5ff] px-3 py-2 text-[11px] font-black uppercase tracking-wider text-[var(--charcoal)]">
                        Local scope only
                      </div>

                      <div
                        className={`absolute -top-8 ${
                          index === 0
                            ? "right-7 md:right-4"
                            : index === 1
                              ? "left-1/2 -translate-x-1/2"
                              : "left-7 md:left-4"
                        } hidden h-8 w-0.5 border-l-2 border-dashed border-[var(--charcoal)]/70 md:block`}
                      />
                    </article>
                  ))}
                </div>
              </div>

              <div className="relative mt-8 rounded-[1.5rem] border-3 border-[var(--charcoal)] bg-[#d6e2ff] p-4 shadow-[0_5px_0_#1a1a1a]">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[var(--charcoal)]/60">
                      Why this matters
                    </p>
                    <p className="mt-1 text-sm font-semibold text-[var(--charcoal)]/75">
                      Billing answers stay with the billing bot. Product answers stay with the product bot. No cross-contamination, no weird blended replies.
                    </p>
                  </div>
                  <div className="inline-flex rounded-full border-2 border-[var(--charcoal)] bg-[#a6ea47] px-4 py-2 text-xs font-black uppercase tracking-widest text-[var(--charcoal)] shadow-[0_3px_0_#1a1a1a]">
                    Scoped by agent
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="ripple-border-blue relative overflow-hidden border-b-2 border-[var(--charcoal)] bg-[linear-gradient(180deg,#2950c0_0%,#1b3a95_100%)] px-4 py-24 sm:px-6 lg:px-8">
        <div className="pointer-events-none absolute inset-0 dotted-sea opacity-[0.06]" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_12%_20%,rgba(255,255,255,0.11),transparent_35%),radial-gradient(circle_at_88%_78%,rgba(255,255,255,0.08),transparent_40%)]" />

        <Image
          src="/clouds/cloud2.svg"
          alt=""
          aria-hidden
          width={220}
          height={120}
          className="pointer-events-none absolute left-[3%] top-16 w-16 opacity-20 ocean-float"
        />
        <Image
          src="/clouds/cloud4.svg"
          alt=""
          aria-hidden
          width={220}
          height={120}
          className="pointer-events-none absolute right-[5%] bottom-20 w-20 opacity-15 ocean-float-delayed"
        />

        <div className="relative mx-auto max-w-6xl">
          <div className="text-center">
            <span className="inline-flex rounded-full border-2 border-white/20 bg-white/10 px-4 py-1.5 text-xs font-black uppercase tracking-widest text-white/80">
              Unique Features
            </span>
            <h2 className="mt-5 font-heading text-4xl font-extrabold tracking-[-0.02em] text-white sm:text-5xl lg:text-6xl">
              Built for support teams, not chatbot demos.
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg font-medium text-white/60">
              Every piece is designed to make AI useful in production: stronger knowledge, cleaner handoffs, and channel-specific experiences.
            </p>
          </div>

          <div className="mt-14 grid gap-8 lg:grid-cols-3">
            {FEATURE_CARDS.map((feature) => (
              <article
                key={feature.title}
                className={`group rounded-[2rem] border-3 border-[var(--charcoal)] ${feature.bg} p-7 shadow-[0_10px_0_#1a1a1a] transition-all hover:-translate-y-1 hover:shadow-[0_14px_0_#1a1a1a] sm:p-8`}
                style={{ transform: `rotate(${feature.rotate})` }}
              >
                <div className="mb-4 flex items-center justify-between">
                  <span
                    className={`inline-flex rounded-full border-2 border-[var(--charcoal)] ${feature.accent} px-3 py-1 text-xs font-black uppercase tracking-widest text-[var(--charcoal)]`}
                  >
                    {feature.tag}
                  </span>
                  <span className="text-3xl">{feature.emoji}</span>
                </div>
                <h3 className="font-heading text-2xl font-extrabold text-[var(--charcoal)]">{feature.title}</h3>
                <p className="mt-3 text-sm font-semibold leading-relaxed text-[var(--charcoal)]/70">{feature.body}</p>
                <div className="mt-6 rounded-xl border-2 border-[var(--charcoal)] bg-white p-4 shadow-[0_3px_0_#1a1a1a]">
                  <p className="font-heading text-3xl font-black text-[var(--charcoal)]">{feature.stat}</p>
                  <p className="text-xs font-bold uppercase tracking-wider text-[var(--charcoal)]/50">
                    {feature.statLabel}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden border-b-2 border-[var(--charcoal)] bg-[linear-gradient(180deg,#fff1c5_0%,#ffd66b_100%)] px-4 py-24 sm:px-6 lg:px-8">
        <div className="pointer-events-none absolute inset-0 dotted-sea opacity-[0.08]" />
        <div className="relative mx-auto max-w-6xl">
          <div className="text-center">
            <span className="inline-flex rounded-full border-2 border-[var(--charcoal)] bg-white px-4 py-1.5 text-xs font-black uppercase tracking-widest text-[var(--charcoal)] shadow-[0_3px_0_#1a1a1a]">
              Security and Encryption
            </span>
            <h2 className="mt-5 font-heading text-4xl font-extrabold tracking-[-0.02em] text-[var(--charcoal)] sm:text-5xl lg:text-6xl">
              Encrypted first, trusted by design.
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg font-medium text-[var(--charcoal)]/70">
              The playful UI is one thing. Underneath it, Echo treats customer knowledge like sensitive infrastructure with encryption, controlled access, and protected storage by default.
            </p>
          </div>

          <div className="mt-14 grid gap-8 lg:grid-cols-3">
            {SECURITY_CARDS.map((card, index) => (
              <article
                key={card.title}
                className={`rounded-[2rem] border-3 border-[var(--charcoal)] ${card.bg} p-7 shadow-[0_10px_0_#1a1a1a] transition-all hover:-translate-y-1 hover:shadow-[0_14px_0_#1a1a1a] sm:p-8`}
                style={{ transform: `rotate(${index === 1 ? "1.5deg" : "-1.5deg"})` }}
              >
                <span className="inline-flex rounded-full border-2 border-[var(--charcoal)] bg-white px-3 py-1 text-xs font-black uppercase tracking-widest text-[var(--charcoal)]">
                  Locked Down
                </span>
                <h3 className="mt-4 font-heading text-2xl font-extrabold text-[var(--charcoal)]">{card.title}</h3>
                <p className="mt-3 text-sm font-semibold leading-relaxed text-[var(--charcoal)]/70">{card.body}</p>
                <div className="mt-6 rounded-xl border-2 border-[var(--charcoal)] bg-white p-4 shadow-[0_3px_0_#1a1a1a]">
                  <p className="font-heading text-xl font-black text-[var(--charcoal)]">{card.stat}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
