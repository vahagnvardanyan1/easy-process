export type FloatingCardBaseItem = {
  id: number;
  src: string;
  className: string;
};

export type LogoItem = {
  label: string;
  href: string;
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
    src: "https://cdn-pipeline-output.picsart.com/magic-flow/858fb047-51ba-4a31-9b97-74f72232a70c.png",
    className: "top-[10%] left-[5%] rotate-[-8deg]",
  },
  {
    id: 2,
    src: "https://cdn-pipeline-output.picsart.com/magic-flow/91feb14f-78d3-4905-8184-926566036491.png",
    className: "top-[15%] right-[8%] rotate-[12deg]",
  },
  {
    id: 3,
    src: "/images/image1.png",
    className: "top-[45%] left-[3%] rotate-[5deg]",
  },
  {
    id: 4,
    src: "/images/image2.png",
    className: "top-[50%] right-[5%] rotate-[10deg]",
  },
  {
    id: 6,
    src: "/images/image3.png",
    className: "bottom-[8%] left-[18%] rotate-[7deg]",
  },
  {
    id: 7,
    src: "/images/image4.png",
    className: "bottom-[10%] right-[22%] rotate-[-10deg]",
  },
];

export const logos: LogoItem[] = [
  { label: "Free Convert", href: "https://freeconvert.tools" },
  { label: "Hay Avto", href:"https://hayavto.am" },
  { label: "Gevorg Dabaghyan", href:'https://gevorgdabaghyan.com' },
  { label: "Back Yard Space", href:"https://backyardspace.us" },
  { label: "King Shin", href:'https://king-shin.am' },
];

export const services: ServiceBaseItem[] = [
  {
    id: "web-development",
    accentClassName: "from-blue-500/20 to-cyan-500/20",
    image: {
      src: "/images/services/web-development.png",
    },
  },
  {
    id: "ui-ux-design",
    accentClassName: "from-cyan-500/20 to-teal-500/20",
    image: {
      src: "/images/services/ui-ux.png",
    },
  },
  {
    id: "performance-optimization",
    accentClassName: "from-yellow-500/20 to-orange-500/20",
    image: {
      src: "/images/services/performance.png",
    },
  },
  {
    id: "digital-strategy",
    accentClassName: "from-indigo-500/20 to-blue-500/20",
    image: {
      src: "/images/services/strategy.png",
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


