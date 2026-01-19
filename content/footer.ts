export type FooterLink = {
  label: string;
  href: string;
};

export type FooterContact = {
  label: string;
  href: string;
};

export type FooterSocialKey = "instagram" | "linkedin";

export type FooterSocialLink = {
  key: FooterSocialKey;
  label: string;
  href: string;
};

export type FooterContactKey = "mail" | "phone" | "location";

export type FooterContactItem = {
  key: FooterContactKey;
  label: string;
  href: string;
};

export const footerQuickLinks: FooterLink[] = [
  { label: "Home", href: "/#home" },
  { label: "Services", href: "/#services" },
  { label: "Portfolio", href: "/#portfolio" },
  // { label: "Features", href: "#features" },
  // { label: "Pricing", href: "#pricing" },
  { label: "Contact", href: "/#contact" },
];

export const footerServices: FooterLink[] = [
  { label: "IT Support", href: "/#it-support" },
  { label: "Automation", href: "/#automation" },
  { label: "Marketing", href: "/#marketing" },
  { label: "Consulting", href: "/#consulting" },
  { label: "Development", href: "/#development" },
];



export const footerSocialLinks: FooterSocialLink[] = [
  { key: "instagram", label: "Instagram", href: "https://www.instagram.com/easyprocess.it" },
];

export const footerContactItems: FooterContactItem[] = [
  { key: "mail", label: "process.easy.agency@gmail.com", href: "mailto:process.easy.agency@gmail.com" },
  { key: "phone", label: "+374 93 45 47 75", href: "tel:+37493454775" },
];


