export type NavItem = {
  label: string;
  href: string;
  index: string;
};

export const NAV_ITEMS: NavItem[] = [
  { label: "Home", href: "#home", index: "01" },
  { label: "About", href: "#about", index: "02" },
  { label: "Career", href: "#career", index: "03" },
  { label: "Work", href: "#work", index: "04" },
  { label: "Personal", href: "#personal", index: "05" },
  { label: "Gallery", href: "#gallery", index: "06" },
  { label: "Projects", href: "#projects", index: "07" },
  { label: "Contact", href: "#contact", index: "08" },
];

export type ImageAsset = {
  src: string;
  alt: string;
};

export const IMAGES = {
  heroPortrait: {
    src: "/images/hero-portrait.webp",
    alt: "Bhavya Wade in a dark cinematic editorial frame",
  },
  heroEditorial: {
    src: "/images/contact-portrait.webp",
    alt: "Editorial portrait of Bhavya Wade against night architecture",
  },
  aboutPortrait: {
    src: "/images/about-portrait.webp",
    alt: "Bhavya Wade in a moody studio portrait",
  },
  aboutSecondary: {
    src: "/images/about-secondary.webp",
    alt: "Circuit board detail under cool light",
  },
  careerMain: {
    src: "/images/career-main.webp",
    alt: "Dark workstation with multiple code screens",
  },
  careerDetail: {
    src: "/images/career-detail.webp",
    alt: "Brutalist concrete architecture in warm light",
  },
  personalFeature: {
    src: "/images/personal-bhavya.webp",
    alt: "Bhavya Wade in a dark editorial crop",
  },
  portrait: {
    src: "/images/portrait-bhavya.png",
    alt: "Portrait of Bhavya Wade",
  },
} satisfies Record<string, ImageAsset>;

export type Build = {
  number: string;
  title: string;
  stat: string;
  detail: string;
  image: ImageAsset;
  tone: "dark" | "light" | "gold";
};

export const BUILDS: Build[] = [
  {
    number: "01",
    title: "SocietyAI",
    stat: "NEXT.JS · LANGCHAIN · GEMINI",
    detail: "Residential operations with an AI assistant, maintenance workflows and resident data in one system.",
    image: {
      src: "/images/project-societyai.webp",
      alt: "SocietyAI dashboard interface",
    },
    tone: "dark",
  },
  {
    number: "02",
    title: "VedaMilan",
    stat: "VEDIC ASTROLOGY · AI · FULL-STACK",
    detail: "Kundli calculations, compatibility and AI-guided insight, built as a modern product.",
    image: {
      src: "/images/project-vedamilan.webp",
      alt: "VedaMilan application interface",
    },
    tone: "gold",
  },
  {
    number: "03",
    title: "UI Time Machine",
    stat: "HISTORY → COMPARISON → INSIGHT",
    detail: "Enter a URL, compare snapshots and understand how a website changed over time.",
    image: {
      src: "/images/project-uitimemachine.webp",
      alt: "UI Time Machine timeline preview",
    },
    tone: "dark",
  },
  {
    number: "04",
    title: "ShipLink",
    stat: "REACT · NODE · SOCKET.IO",
    detail: "A real-time logistics workspace for loads, bids, chat and payments.",
    image: {
      src: "/images/project-shiplink.webp",
      alt: "ShipLink logistics platform interface",
    },
    tone: "light",
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
    tone: "dark",
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
    label: "Years building",
    note: "Frontend · full-stack · AI",
  },
  {
    value: "10+",
    label: "Projects shipped",
    note: "Products, tools and experiments",
  },
  {
    value: "2",
    label: "Roles at Scogo",
    note: "Intern to Frontend Developer",
  },
  {
    value: "3",
    label: "Core disciplines",
    note: "Frontend · AI · Product",
  },
];

export type PersonalStory = {
  tag: string;
  title: string;
  text: string;
  image: ImageAsset;
  shape: "tall" | "wide" | "square";
};

export const PERSONAL: PersonalStory[] = [
  {
    tag: "Build log",
    title: "The second job",
    text: "Ideas don't wait for permission. They get built, tested and shipped.",
    image: {
      src: "/images/personal-side.webp",
      alt: "Moody desk lamp and dark workspace",
    },
    shape: "tall",
  },
  {
    tag: "Obsession",
    title: "Machines that reason",
    text: "RAG, agents, tools and the messy engineering behind useful AI.",
    image: {
      src: "/images/personal-ai.webp",
      alt: "Earth from orbit with deep space behind it",
    },
    shape: "wide",
  },
  {
    tag: "Craft",
    title: "Pixels with intent",
    text: "Interfaces should feel exact, fast and unmistakably alive.",
    image: {
      src: "/images/personal-frontend.webp",
      alt: "Minimal dark desk with laptop and keyboard",
    },
    shape: "square",
  },
  {
    tag: "Favourite fighter",
    title: "Tony Ferguson",
    text: "Unorthodox, relentless, never predictable — the energy I try to bring to every build.",
    image: {
      src: "/images/tony-portrait.webp",
      alt: "Tony Ferguson in a dark editorial portrait",
    },
    shape: "tall",
  },
];

export type GalleryItem = ImageAsset & {
  caption: string;
  meta: string;
};

export const GALLERY: GalleryItem[] = [
  {
    src: "/images/portrait-bhavya.png",
    alt: "Portrait of Bhavya Wade",
    caption: "Bhavya Wade",
    meta: "Portrait / 01",
  },
  {
    src: "/images/project-societyai.webp",
    alt: "SocietyAI dashboard interface",
    caption: "SocietyAI",
    meta: "Product / 02",
  },
  {
    src: "/images/gallery-city.webp",
    alt: "Dark city street at night",
    caption: "After hours",
    meta: "City / 03",
  },
  {
    src: "/images/gallery-keyboard.webp",
    alt: "Backlit keyboard in a dark room",
    caption: "Input",
    meta: "Setup / 04",
  },
  {
    src: "/images/tony-action.webp",
    alt: "Tony Ferguson, Bhavya's favourite MMA fighter",
    caption: "Tony Ferguson",
    meta: "Influence / 05",
  },
  {
    src: "/images/gallery-garage.webp",
    alt: "Graffiti-covered concrete pillars in a dim garage",
    caption: "Concrete",
    meta: "Architecture / 06",
  },
  {
    src: "/images/about-secondary.webp",
    alt: "Circuit board detail",
    caption: "Signal",
    meta: "Technology / 07",
  },
  {
    src: "/images/project-vedamilan.webp",
    alt: "VedaMilan application interface",
    caption: "VedaMilan",
    meta: "Product / 08",
  },
  {
    src: "/images/gallery-coding.webp",
    alt: "Code on a screen late at night",
    caption: "Late build",
    meta: "Studio / 09",
  },
  {
    src: "/images/gallery-building.webp",
    alt: "Modern building exterior at night",
    caption: "Night geometry",
    meta: "Architecture / 10",
  },
  {
    src: "/images/project-shiplink.webp",
    alt: "ShipLink logistics platform interface",
    caption: "ShipLink",
    meta: "Product / 11",
  },
  {
    src: "/images/personal-ai.webp",
    alt: "Earth seen from orbit",
    caption: "Orbit",
    meta: "Future / 12",
  },
];

export type Project = {
  name: string;
  category: string;
  description: string;
  image: ImageAsset;
  href: string;
};

export const PROJECTS: Project[] = [
  {
    name: "SocietyAI",
    category: "AI · Full-stack · SaaS",
    description:
      "Residential management with an AI assistant, maintenance workflows, payments and resident data in one system.",
    image: {
      src: "/images/project-societyai.webp",
      alt: "SocietyAI dashboard interface",
    },
    href: "https://aiscoietyproject-roan.vercel.app/",
  },
  {
    name: "VedaMilan",
    category: "AI · Vedic astrology",
    description:
      "Kundli calculations, compatibility and AI-guided insight — domain logic with a modern interface.",
    image: {
      src: "/images/project-vedamilan.webp",
      alt: "VedaMilan application interface",
    },
    href: "https://vedamilan-lihn.vercel.app/",
  },
  {
    name: "UI Time Machine",
    category: "AI · Web history",
    description:
      "Historical snapshots, visual comparison and evidence-first analysis of how websites evolved.",
    image: {
      src: "/images/project-uitimemachine.webp",
      alt: "UI Time Machine timeline preview",
    },
    href: "https://uitimemachine.vercel.app/",
  },
  {
    name: "ShipLink",
    category: "Full-stack · Logistics",
    description: "A real-time marketplace for loads, bids, chat and payments.",
    image: {
      src: "/images/project-shiplink.webp",
      alt: "ShipLink logistics platform interface",
    },
    href: "https://shiplink.onrender.com/",
  },
  {
    name: "TailTenders",
    category: "AI · Fashion",
    description: "Outfit recommendations without the endless scrolling.",
    image: {
      src: "/images/project-tailtenders.webp",
      alt: "TailTenders recommendation interface",
    },
    href: "https://trialtailtender-xiab-one.vercel.app/",
  },
  {
    name: "FinVue",
    category: "React · Finance",
    description: "A clear view of holdings and performance without spreadsheet overhead.",
    image: {
      src: "/images/project-finvue.webp",
      alt: "FinVue portfolio dashboard interface",
    },
    href: "https://finvue-portfolio-dash.vercel.app/",
  },
];

export const SOCIALS = [
  { label: "GitHub", href: "https://github.com/bhavya681" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/bhavya-wade/" },
  { label: "Portfolio", href: "https://www.bhavyawade.dev" },
  { label: "X / Twitter", href: "https://x.com/wade_bhavy55123" },
];

export const CONTACT_EMAIL = "bhavyawade2@gmail.com";

export const IMAGE_CREDITS = {
  label: "Tony Ferguson imagery: Newaza Apparel / CC BY 3.0",
  href: "https://commons.wikimedia.org/wiki/File:Tony_Ferguson_MMA_2.png",
};
