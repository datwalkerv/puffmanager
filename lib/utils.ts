import { clsx, type ClassValue } from "clsx";
import { toast } from "sonner";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const copyToClipboard = (value: string) => {
  navigator.clipboard.writeText(value);
  toast.success(`Copied id: ${value}!`);
};
