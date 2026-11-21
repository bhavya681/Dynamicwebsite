export type NavItem = {
  label: string;
  href: string;
  index: string;
};

export const NAV_ITEMS: NavItem[] = [
  { label: "Home", href: "#home", index: "01" },
  { label: "About", href: "#about", index: "02" },
  { label: "Career", href: "#career", index: "03" },
  { label: "Highlights", href: "#highlights", index: "04" },
  { label: "Work", href: "#work", index: "05" },
  { label: "Interests", href: "#personal", index: "06" },
  { label: "Gallery", href: "#gallery", index: "07" },
  { label: "Projects", href: "#projects", index: "08" },
  { label: "Contact", href: "#contact", index: "09" },
];

export type ImageAsset = {
  src: string;
  alt: string;
};

export const IMAGES = {
  heroVisual: {
    src: "/images/myimages/image2.png",
    alt: "Bhavya Wade, editorial portrait",
  },
  aboutPortrait: {
    src: "/images/myimages/image3.webp",
    alt: "Portrait of Bhavya Wade",
  },
  aboutAccent: {
    src: "/images/myimages/image.webp",
    alt: "Close portrait of Bhavya Wade",
  },
} satisfies Record<string, ImageAsset>;

export type Build = {
  number: string;
  title: string;
  stat: string;
  detail: string;
  image: ImageAsset;
  tone: "dark" | "light" | "gold";
  href: string;
};

export const BUILDS: Build[] = [
  {
    number: "01",
    title: "SocietyAI",
    stat: "AI · RAG · GENERATIVE UI",
    detail:
      "Residential operations with an AI assistant, maintenance workflows, financial summaries and resident data in one system.",
    image: {
      src: "/images/project-societyai.webp",
      alt: "SocietyAI dashboard interface",
    },
    tone: "dark",
    href: "https://aiscoietyproject-roan.vercel.app/",
  },
  {
    number: "02",
    title: "VedaMilan",
    stat: "VEDIC ASTROLOGY · AI · FULL-STACK",
    detail:
      "Kundli calculations, compatibility, planetary insight and Vimshottari Dasha — built as a modern product.",
    image: {
      src: "/images/project-vedamilan.webp",
      alt: "VedaMilan application interface",
    },
    tone: "gold",
    href: "https://vedamilan-lihn.vercel.app/",
  },
  {
    number: "03",
    title: "UI Time Machine",
    stat: "HISTORY → COMPARISON → INSIGHT",
    detail:
      "Enter a URL, compare snapshots and understand how a website changed over time — with AI-assisted design analysis.",
    image: {
      src: "/images/project-uitimemachine.webp",
      alt: "UI Time Machine interface",
    },
    tone: "light",
    href: "#projects",
  },
  {
    number: "04",
    title: "ShipLink",
    stat: "REACT · NODE · SOCKET.IO",
    detail: "Loads, bids, chat and payments in one real-time logistics workspace.",
    image: {
      src: "/images/project-shiplink.webp",
      alt: "ShipLink logistics platform interface",
    },
    tone: "dark",
    href: "https://shiplink.onrender.com/",
  },
  {
    number: "05",
    title: "FinVue",
    stat: "REACT · TYPESCRIPT · CHART.JS",
    detail: "A portfolio dashboard that turns market noise into a readable signal.",
    image: {
      src: "/images/project-finvue.webp",
      alt: "FinVue portfolio dashboard interface",
    },
    tone: "gold",
    href: "https://finvue-portfolio-dash.vercel.app/",
  },
];

export type Stat = {
  value: string;
  suffix?: string;
  label: string;
  note: string;
};

export const STATS: Stat[] = [
  {
    value: "2+",
    label: "Years in the build",
    note: "Intern to frontend developer",
  },
  {
    value: "10",
    label: "Live projects",
    note: "AI, full-stack and product work",
  },
  {
    value: "3",
    label: "Internships",
    note: "AI/ML · IoT · Networks",
  },
  {
    value: "3,016",
    label: "LinkedIn followers",
    note: "500+ connections",
  },
];

export const ABOUT_PARAGRAPHS = [
  "I'm a frontend / full-stack developer focused on shipping useful web products — clear component architecture, honest feedback states, and interfaces that stay fast and readable.",
  "I work primarily in React, Next.js and TypeScript, and I enjoy applying AI where it solves a real user problem.",
  "Currently at Scogo Networks in Mumbai, building scalable React and Next.js products with performance, accessibility and CI/CD discipline.",
  "An MBA in Systems and a B.Tech in AI & Data Science let me move comfortably between engineering, product and business conversations — with a bias for shipping.",
];

export const EDUCATION = [
  {
    year: "Aug 2025 – May 2026",
    degree: "MBA (Systems) — University of Mumbai (MU)",
    score: "Grade 8.4",
  },
  {
    year: "Nov 2022 – May 2025",
    degree: "B.Tech Artificial Intelligence & Data Science — University of Mumbai (MU)",
    score: "Grade 8.4",
  },
  {
    year: "Sep 2019 – Jul 2022",
    degree: "Diploma Computer Engineering — VIVA Institute of Technology",
    score: "83%",
  },
];

export const SKILLS = [
  { label: "Languages & markup", items: ["HTML5", "CSS3", "JavaScript", "TypeScript"] },
  {
    label: "Frontend",
    items: ["React", "Next.js", "TypeScript", "Tailwind", "ShadCN", "Redux Toolkit", "Zustand", "Context API"],
  },
  {
    label: "Backend & realtime",
    items: ["Node.js", "Express", "REST APIs", "MongoDB", "Mongoose", "PostgreSQL", "Socket.io"],
  },
  { label: "Libraries & integration", items: ["Axios", "Framer Motion", "Framer", "Figma", "JWT"] },
  {
    label: "Tools & deployment",
    items: ["Git", "GitHub", "Vercel", "Netlify", "Docker", "Firebase", "Postman", "Jira", "Slack", "Linux", "Chrome DevTools"],
  },
  { label: "Security & payments", items: ["OWASP / App sec", "WCAG 2.1", "Stripe"] },
];

export type GalleryItem = ImageAsset & {
  caption: string;
  meta: string;
};

export const GALLERY: GalleryItem[] = [
  {
    src: "/images/myimages/image1.webp",
    alt: "Bhavya Wade, cinematic portrait",
    caption: "In flow",
    meta: "Frame / 01",
  },
  {
    src: "/images/myimages/image2.webp",
    alt: "Bhavya Wade, editorial portrait",
    caption: "Off the clock",
    meta: "Frame / 02",
  },
  {
    src: "/images/myimages/image3.webp",
    alt: "Bhavya Wade, studio portrait",
    caption: "The builder",
    meta: "Frame / 03",
  },
  {
    src: "/images/myimages/image.webp",
    alt: "Bhavya Wade, close portrait",
    caption: "Up close",
    meta: "Frame / 04",
  },
];

export type Project = {
  name: string;
  category: string;
  description: string;
  features?: string[];
  image: ImageAsset;
  href: string;
};

export const PROJECTS: Project[] = [
  {
    name: "SocietyAI",
    category: "AI · Full-stack · SaaS · Oct 2026",
    description:
      "Residential operations with an AI assistant, maintenance workflows, financial summaries and resident data in one system.",
    features: ["AI resident assistant", "Maintenance", "Financial summaries", "Payment history", "RAG · Generative UI"],
    image: {
      src: "/images/project-societyai.webp",
      alt: "SocietyAI dashboard interface",
    },
    href: "https://aiscoietyproject-roan.vercel.app/",
  },
  {
    name: "VedaMilan",
    category: "AI · Full-stack SaaS · 2026",
    description:
      "Kundli calculations, compatibility and AI-guided insight — a modern product for Vedic astrology and matchmaking.",
    features: ["Kundli", "Compatibility", "Planetary calculations", "Vimshottari Dasha", "AI insights"],
    image: {
      src: "/images/project-vedamilan.webp",
      alt: "VedaMilan application interface",
    },
    href: "https://vedamilan-lihn.vercel.app/",
  },
  {
    name: "UI Time Machine",
    category: "AI · Design analysis · 2026",
    description:
      "Enter a URL, compare snapshots and understand how a website changed over time — with AI-assisted design analysis.",
    features: ["History", "Snapshot comparison", "Design analysis", "AI-assisted insight"],
    image: {
      src: "/images/project-uitimemachine.webp",
      alt: "UI Time Machine interface",
    },
    href: "#projects",
  },
  {
    name: "ShipLink",
    category: "Full-stack · Logistics · Apr 2025",
    description:
      "Shippers and carriers needed one place to post loads, bid, chat, and pay — without fragmented tools.",
    image: {
      src: "/images/project-shiplink.webp",
      alt: "ShipLink logistics platform interface",
    },
    href: "https://shiplink.onrender.com/",
  },
  {
    name: "TailTenders",
    category: "AI · Fashion · Feb 2025",
    description: "Users wanted outfit recommendations without browsing endless fashion catalogs manually.",
    image: {
      src: "/images/project-tailtenders.webp",
      alt: "TailTenders recommendation interface",
    },
    href: "https://trialtailtender-xiab-one.vercel.app/",
  },
  {
    name: "Footify",
    category: "E-commerce · React · Apr 2025",
    description: "A footwear storefront needed fast catalog browsing and checkout-ready UI on mobile.",
    image: {
      src: "/images/project-footify.webp",
      alt: "Footify storefront interface",
    },
    href: "https://footify-commerce-133cddb3-j686.vercel.app/",
  },
  {
    name: "The Hidden Astrologer",
    category: "Next.js · Tarot · Mar 2026",
    description: "Tarot and astrology services needed an immersive landing that converts visitors.",
    image: {
      src: "/images/project-hidden-astrologer.webp",
      alt: "The Hidden Astrologer landing page",
    },
    href: "https://thehiddenastrologer.vercel.app/",
  },
  {
    name: "FinVue",
    category: "Finance · Dashboard · Apr 2025",
    description: "Retail investors needed a clear view of holdings and performance without spreadsheet overhead.",
    image: {
      src: "/images/project-finvue.webp",
      alt: "FinVue portfolio dashboard interface",
    },
    href: "https://finvue-portfolio-dash.vercel.app/",
  },
  {
    name: "Job Portal",
    category: "MERN · Careers · Dec 2021",
    description: "Job seekers and recruiters lacked a single MERN workflow for posting, applying, and tracking.",
    image: {
      src: "/images/project-jobportal.webp",
      alt: "Job Portal interface",
    },
    href: "https://mernjobportal-2-1cwi.onrender.com/",
  },
  {
    name: "CodeBuddy",
    category: "Social · Full-stack · Aug 2022",
    description: "Developers wanted lightweight social profiles with posts and live messaging in one app.",
    image: {
      src: "/images/project-codebuddy.webp",
      alt: "CodeBuddy social interface",
    },
    href: "https://codebuddy-gamma.vercel.app/",
  },
  {
    name: "Subscription Sentinel",
    category: "Dashboard · Product · Mar 2026",
    description:
      "Track recurring subscriptions, renewal dates and underused services — with spending overview, waste detection and smart recommendations.",
    image: {
      src: "/images/project-subscription-sentinel.webp",
      alt: "Subscription Sentinel dashboard concept",
    },
    href: "https://www.linkedin.com/posts/bhavya-wade_webdevelopment-frontenddevelopment-uiux-activity-7442067825797525504-y8e5",
  },
];

export const PROFILE_HEADLINE =
  "Software Engineer · Full-Stack Developer (MERN) · React · Next.js · TypeScript · AI & Data Science";

export type Highlight = {
  year: string;
  category: string;
  title: string;
  detail: string;
  href?: string;
};

export const HIGHLIGHTS: Highlight[] = [
  {
    year: "2026",
    category: "Recognition",
    title: "1st place · VCET VNPS Hackathon",
    detail: "First place for a full-stack build — ideas ship better under pressure.",
  },
  {
    year: "2025",
    category: "Career",
    title: "PPO at Scogo Networks",
    detail: "Converted a frontend internship into a full-time role by owning enterprise UI work.",
  },
  {
    year: "2026",
    category: "Product",
    title: "Subscription Sentinel",
    detail: "Renewal tracking, usage insights, spend overview, waste detection and smart recommendations.",
    href: "https://www.linkedin.com/posts/bhavya-wade_webdevelopment-frontenddevelopment-uiux-activity-7442067825797525504-y8e5",
  },
  {
    year: "2026",
    category: "Community",
    title: "3K+ on LinkedIn",
    detail: "Sharing builds, frontend craft and practical AI — 3,016 followers and 500 connections.",
    href: "https://www.linkedin.com/in/bhavya-wade/",
  },
];

export const SOCIALS = [
  { label: "GitHub", href: "https://github.com/bhavya681" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/bhavya-wade/" },
  { label: "X / Twitter", href: "https://x.com/wade_bhavy55123" },
  { label: "Instagram", href: "https://www.instagram.com/bhavya_wade" },
];

export const CONTACT_EMAIL = "bhavyawade2@gmail.com";
export const CONTACT_LOCATION = "Mumbai, Maharashtra, India";

