export type FeatureItem = {
  id: string;
  image: {
    src: string;
  };
};

export const features: FeatureItem[] = [
  {
    id: "production-engineering",
    image: {
      src: "/images/our-work/production-engineering.png",
    },
  },
  {
    id: "human-centered-ux",
    image: {
      src: "/images/our-work/ui-ux.png",
    },
  },
  {
    id: "performance-first",
    image: {
      src: "/images/our-work/performance.png",
    },
  },
];


