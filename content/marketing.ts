export type FloatingCardBaseItem = {
  id: number;
  src: string;
  className: string;
};

export type LogoItem = {
  label: string;
};

export type ServiceBaseItem = {
  id: string;
  image: {
    src: string;
  };
  accentClassName: string;
};

export type PricingFeature = {
  label: string;
};

export type PricingPlan = {
  title: string;
  description: string;
  price: string;
  subprice?: string;
  highlight?: string;
  features: PricingFeature[];
};

export type AiRoleItem = {
  id: number;
  className: string;
  delayMs: number;
};

export const floatingCards: FloatingCardBaseItem[] = [
  {
    id: 1,
    src: "https://cdn-pipeline-output.picsart.com/magic-flow/71f23836-d608-41a9-9ca8-68123604b0db.png?type=webp&to=min&r=1600",
    className: "top-[10%] left-[5%] rotate-[-8deg]",
  },
  {
    id: 2,
    src: "https://cdn-pipeline-output.picsart.com/magic-flow/049f3a76-461b-4e79-b056-f3c71e6c6dfa.png?type=webp&to=min&r=1600",
    className: "top-[15%] right-[8%] rotate-[12deg]",
  },
  {
    id: 3,
    src: "https://cdn-pipeline-output.picsart.com/magic-flow/14e0dc49-9e62-4d0e-850a-83a37f3dd3a8.png",
    className: "top-[45%] left-[3%] rotate-[5deg]",
  },
  {
    id: 4,
    src: "https://cdn-pipeline-output.picsart.com/magic-flow/c1af9f94-ede9-47c4-9669-a6eea01a4fc9.png",
    className: "top-[50%] right-[5%] rotate-[10deg]",
  },
  {
    id: 6,
    src: "https://cdn-pipeline-output.picsart.com/magic-flow/858fb047-51ba-4a31-9b97-74f72232a70c.png",
    className: "bottom-[8%] left-[18%] rotate-[7deg]",
  },
  {
    id: 7,
    src: "https://cdn-pipeline-output.picsart.com/magic-flow/91feb14f-78d3-4905-8184-926566036491.png",
    className: "bottom-[10%] right-[22%] rotate-[-10deg]",
  },
];

export const logos: LogoItem[] = [
  { label: "CALARTS" },
  { label: "Alibaba" },
  { label: "LACMA" },
  { label: "SCI-ARC" },
  { label: "NASA" },
  { label: "POSSIBLE" },
  { label: "Gensler" },
  { label: "DreamWorks" },
  { label: "RISD" },
  { label: "MoMA" },
  { label: "ByteDance" },
  { label: "VTProDesign" },
  { label: "Google" },
  { label: "LEXUS" },
  { label: "BOCA" },
  { label: "DeepMind" },
  { label: "Microsoft" },
];

export const services: ServiceBaseItem[] = [
  {
    id: "web-development",
    accentClassName: "from-blue-500/20 to-cyan-500/20",
    image: {
      src: "https://images.unsplash.com/photo-1557324232-b8917d3c3dcb?auto=format&fit=crop&w=1600&q=80",
    },
  },
  {
    id: "brand-identity",
    accentClassName: "from-purple-500/20 to-pink-500/20",
    image: {
      src: "https://images.unsplash.com/photo-1526498460520-4c246339dccb?auto=format&fit=crop&w=1600&q=80",
    },
  },
  {
    id: "ui-ux-design",
    accentClassName: "from-cyan-500/20 to-teal-500/20",
    image: {
      src: "https://images.unsplash.com/photo-1586717799252-bd134ad00e26?auto=format&fit=crop&w=1600&q=80",
    },
  },
  {
    id: "performance-optimization",
    accentClassName: "from-yellow-500/20 to-orange-500/20",
    image: {
      src: "https://images.unsplash.com/photo-1555099962-4199c345e5dd?auto=format&fit=crop&w=1600&q=80",
    },
  },
  {
    id: "motion-design",
    accentClassName: "from-pink-500/20 to-rose-500/20",
    image: {
      src: "https://images.unsplash.com/photo-1558655146-9f40138edfeb?auto=format&fit=crop&w=1600&q=80",
    },
  },
  {
    id: "digital-strategy",
    accentClassName: "from-indigo-500/20 to-blue-500/20",
    image: {
      src: "https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=1600&q=80",
    },
  },
];

export const pricingPlans: PricingPlan[] = [
  {
    title: "Credits",
    description:
      "Credits power generative features. Credits roll over per billing cycle and can also be purchased one-time.",
    price: "$24",
    subprice: "$30",
    highlight: "20% volume discount",
    features: [
      { label: "7,750 images" },
      { label: "130 videos" },
      { label: "110 3D models" },
      { label: "550 audio generations" },
      { label: "70 million words" },
    ],
  },
  {
    title: "Storage",
    description:
      "Cloud storage for projects and creations, accessible from anywhere, with unlimited projects.",
    price: "Free",
    features: [
      { label: "11,120 images" },
      { label: "1,000 videos" },
      { label: "7,150 3D models" },
      { label: "5,000 audio files" },
      { label: "Unlimited text and chat" },
    ],
  },
];

export const aiRoles: AiRoleItem[] = [
  { id: 1, className: "top-[35%] left-[5%]", delayMs: 0 },
  { id: 2, className: "top-[18%] left-[18%]", delayMs: 100 },
  { id: 4, className: "top-[48%] left-[20%]", delayMs: 300 },
  { id: 5, className: "bottom-[20%] left-[8%]", delayMs: 400 },
  { id: 6, className: "top-[15%] right-[15%]", delayMs: 500 },
  { id: 7, className: "top-[25%] right-[22%]", delayMs: 600 },
  { id: 8, className: "top-[35%] left-[28%]", delayMs: 700 },
  { id: 9, className: "top-[35%] right-[18%]", delayMs: 800 },
  { id: 11, className: "top-[50%] right-[10%]", delayMs: 1000 },
  { id: 12, className: "bottom-[25%] right-[18%]", delayMs: 1100 },
];


