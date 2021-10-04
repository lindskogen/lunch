import * as React from "react";
import { getWeekday } from "../lib/lunch-fetcher/lib/utils";
import { Restaurant } from "../lib/lunch-fetcher/types";
import { RestaurantView } from "./Restaurant";

interface MainProps {
  restaurants: Restaurant[];
  lastUpdated: string;
  showToday: boolean;
}

export const Main: React.VFC<MainProps> = ({
  showToday,
  restaurants,
  lastUpdated,
}) => {
  const weekDayToday = getWeekday(new Date());
  const onlyShowToday = !!(showToday && weekDayToday);

  return (
    <main className="sans-serif">
      {onlyShowToday ? (
        <a
          href="/week"
          className="mr2 db blue no-underline underline-hover pa4"
        >
          Visa veckans meny
        </a>
      ) : (
        <a href="/" className="mr2 db blue no-underline underline-hover pa4">
          Visa endast dagens meny
        </a>
      )}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(640px, 1fr))",
        }}
      >
        {restaurants.map((res, index) => (
          <RestaurantView
            key={res.name}
            index={index}
            restaurant={res}
            showSingleDay={onlyShowToday}
            weekDayToday={weekDayToday}
          />
        ))}
      </div>

      <div className="pt2 ma4 ">
        <small className="mid-gray">
          Uppdaterat{" "}
          {new Date(lastUpdated).toLocaleDateString("sv-SE", {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
          })}
        </small>
      </div>
    </main>
  );
};
