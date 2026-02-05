import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatTopicName(topicId: number | null | undefined, topicName: string | null | undefined): string {
  if (topicId == null || !topicName) return topicName ?? "";
  return `Topic ${topicId}: ${topicName}`;
}
