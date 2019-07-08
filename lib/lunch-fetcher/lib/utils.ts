import { WeekDay } from "../types";

export const weekdaysSV = ["måndag", "tisdag", "onsdag", "torsdag", "fredag"];
export const weekdays = [
  null,
  "måndag",
  "tisdag",
  "onsdag",
  "torsdag",
  "fredag",
  null
];

export const isWeekday = (text: string): text is WeekDay =>
  weekdaysSV.includes(text.toLowerCase());
export const isNotNull = <T>(x: T | null): x is T => x !== null;
export const isNotZero = (x: unknown): boolean => x !== 0;
export const id = <T>(x: T): T => x;
