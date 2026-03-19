import { Category } from "../backend.d";

export const SAMPLE_SERVICES = [
  {
    id: BigInt(1),
    title: "Logo Design",
    icon: "✦",
    description:
      "Crafting unique, memorable logos that define your brand identity and leave a lasting impression.",
  },
  {
    id: BigInt(2),
    title: "Brand Identity",
    icon: "◈",
    description:
      "Comprehensive branding packages from strategy to complete visual systems that tell your story.",
  },
  {
    id: BigInt(3),
    title: "Print Design",
    icon: "▣",
    description:
      "Stunning print materials — brochures, packaging, business cards, and everything in between.",
  },
  {
    id: BigInt(4),
    title: "Digital Graphics",
    icon: "⬡",
    description:
      "Eye-catching social media, web graphics, and digital campaigns that drive engagement.",
  },
  {
    id: BigInt(5),
    title: "UI/UX Design",
    icon: "◎",
    description:
      "Intuitive user interfaces and delightful user experiences that convert and retain users.",
  },
  {
    id: BigInt(6),
    title: "Motion Graphics",
    icon: "◉",
    description:
      "Dynamic animations and motion content for video, social media, and interactive web.",
  },
];

export const SAMPLE_TEAM = [
  {
    id: "maya-chen",
    name: "Maya Chen",
    role: "Creative Director",
    bio: "With 12 years of experience leading creative teams, Maya shapes the artistic vision that drives every project we deliver.",
    imageUrl: "/assets/generated/team-maya-chen.dim_400x400.jpg",
  },
  {
    id: "marco-rivera",
    name: "Marco Rivera",
    role: "Senior Graphic Designer",
    bio: "Marco's mastery of typography and visual hierarchy has helped over 200 brands craft identities that truly resonate.",
    imageUrl: "/assets/generated/team-marco-rivera.dim_400x400.jpg",
  },
  {
    id: "priya-sharma",
    name: "Priya Sharma",
    role: "UI/UX Lead",
    bio: "Priya bridges design and technology, creating digital experiences that are both beautiful and effortlessly usable.",
    imageUrl: "/assets/generated/team-priya-sharma.dim_400x400.jpg",
  },
  {
    id: "james-wright",
    name: "James Wright",
    role: "Brand Strategist",
    bio: "James translates complex business goals into compelling brand narratives and visual communication strategies.",
    imageUrl: "/assets/generated/team-james-wright.dim_400x400.jpg",
  },
];

export const SAMPLE_TESTIMONIALS = [
  {
    id: BigInt(1),
    name: "Sarah Mitchell",
    role: "CEO",
    company: "Bloom Organics",
    quote:
      "Studio Nova completely transformed our brand. The rebrand they delivered exceeded every expectation — we saw a 40% increase in customer recognition within three months.",
    rating: BigInt(5),
  },
  {
    id: BigInt(2),
    name: "David Park",
    role: "Marketing Director",
    company: "TechForward Inc.",
    quote:
      "Working with the Studio Nova team was an absolute pleasure. They truly understand how to translate complex ideas into stunning, impactful visual communication.",
    rating: BigInt(5),
  },
  {
    id: BigInt(3),
    name: "Camille Dubois",
    role: "Founder",
    company: "Maison Elara",
    quote:
      "From our logo to our full packaging design, every deliverable was polished and professional. They're the only design team we'll ever work with.",
    rating: BigInt(5),
  },
];

export const SAMPLE_PORTFOLIO = [
  {
    id: "p1",
    title: "Apex Athletics Logo Suite",
    category: Category.logoDesign,
    description:
      "A bold, geometric logo system for a premium sportswear brand.",
    imageUrl: "/assets/generated/portfolio-logo-design.dim_600x450.jpg",
    featured: true,
  },
  {
    id: "p2",
    title: "Bloom Organics Brand Identity",
    category: Category.branding,
    description:
      "Complete brand identity package for a natural wellness company.",
    imageUrl: "/assets/generated/portfolio-branding.dim_600x450.jpg",
    featured: true,
  },
  {
    id: "p3",
    title: "TechForward Digital Campaign",
    category: Category.digitalGraphics,
    description:
      "Multi-platform digital advertising campaign with bold visuals.",
    imageUrl: "/assets/generated/portfolio-digital-graphics.dim_600x450.jpg",
    featured: false,
  },
  {
    id: "p4",
    title: "Maison Elara Packaging",
    category: Category.printMedia,
    description: "Luxury packaging system for a premium French cosmetics line.",
    imageUrl: "/assets/generated/portfolio-print-design.dim_600x450.jpg",
    featured: true,
  },
  {
    id: "p5",
    title: "Nexus Finance App UI",
    category: Category.uiuxDesign,
    description: "Clean, intuitive mobile app UI for a fintech startup.",
    imageUrl: "/assets/generated/portfolio-uiux-design.dim_600x450.jpg",
    featured: false,
  },
  {
    id: "p6",
    title: "Kinetic Brand Launch Video",
    category: Category.motionGraphics,
    description: "Animated brand reveal and explainer video package.",
    imageUrl: "/assets/generated/portfolio-motion-graphics.dim_600x450.jpg",
    featured: false,
  },
];
