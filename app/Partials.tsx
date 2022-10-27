import React from "react";
import { getWeekday } from "../lib/lunch-fetcher/lib/utils";
import Link from "next/link";

export const TopLink = ({ showToday }: { showToday: boolean }) => {
  const weekDayToday = getWeekday(new Date());
  const onlyShowToday = !!(showToday && weekDayToday);

  if (onlyShowToday) {
    return (
      <Link
        href="/week"
        className="mr2 db blue no-underline underline-hover pa4"
      >
        Visa veckans meny
      </Link>
    );
  } else {
    return (
      <Link href="/" className="mr2 db blue no-underline underline-hover pa4">
        Visa endast dagens meny
      </Link>
    );
  }
};
