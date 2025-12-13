import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

type CnInput = Parameters<typeof clsx>;

export const cn = (...inputs: CnInput) => twMerge(clsx(inputs));


