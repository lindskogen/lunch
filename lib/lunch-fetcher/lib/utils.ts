import { WeekDay } from "../types";

export const weekdaysSV = ["måndag", "tisdag", "onsdag", "torsdag", "fredag"];
export const weekdays = [
  null,
  "måndag",
  "tisdag",
  "onsdag",
  "torsdag",
  "fredag",
  null,
];

export const isWeekday = (text: string): text is WeekDay =>
  weekdaysSV.includes(text.toLowerCase());
export const isNotNull = <T>(x: T | null): x is T => x !== null;
export const isNotZero = (x: unknown): boolean => x !== 0;
export const id = <T>(x: T): T => x;

type ArrayFn<T, U> = (v: T, i: number, list: T[]) => U;

export const filterMap = <T, U>(
  array: T[],
  mapper: ArrayFn<T, U | undefined | null>
): U[] => {
  return array.reduce<U[]>((p, c, i, a) => {
    let value = mapper(c, i, a);
    if (value != null) {
      p.push(value);
    }
    return p;
  }, []);
};

export const mapDayNameToWeekDay = (str: string): WeekDay | undefined => {
  if (str.match(/m[åa]ndag/i)) {
    return WeekDay.Monday;
  } else if (str.match(/tisdag/i)) {
    return WeekDay.Tuesday;
  } else if (str.match(/onsdag/i)) {
    return WeekDay.Wednesday;
  } else if (str.match(/torsdag/i)) {
    return WeekDay.Thursday;
  } else if (str.match(/fredag/i)) {
    return WeekDay.Friday;
  } else {
    console.log("Unmatched day name", str);
    return undefined;
  }
};

export function getWeekday(date: Date): string | null {
  isWeekday

  let dayIndex = date.getDay();

  return weekdays[dayIndex];
}
