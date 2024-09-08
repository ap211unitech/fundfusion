import moment from "moment";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const daysLeft = (timestamp: number) => {
  const eventdate = moment(timestamp * 1000);
  const todaysdate = moment();
  return eventdate.diff(todaysdate, "days");
};
