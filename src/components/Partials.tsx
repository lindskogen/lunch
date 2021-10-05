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

export const DateFooter = ({ lastUpdated }: { lastUpdated: string }) => (
  <div className="pt2 ma4">
    <small className="mid-gray">
      Uppdaterat{" "}
      {new Date(lastUpdated).toLocaleDateString("sv-SE", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      })}
    </small>
  </div>
);
