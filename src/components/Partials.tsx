import React from "react";
import { getWeekday } from "../lib/lunch-fetcher/lib/utils";

export const TopLink = ({ showToday }: { showToday: boolean }) => {
  const weekDayToday = getWeekday(new Date());
  const onlyShowToday = !!(showToday && weekDayToday);

  if (onlyShowToday) {
    return (
      <a href="/week" className="mr2 db blue no-underline underline-hover pa4">
        Visa veckans meny
      </a>
    );
  } else {
    return (
      <a href="/" className="mr2 db blue no-underline underline-hover pa4">
        Visa endast dagens meny
      </a>
    );
  }
};
