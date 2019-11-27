import * as React from "react";
import { useEffect, useState } from "react";
import useSWR from "swr";
import { weekdays } from "../lib/lunch-fetcher/lib/utils";
import { Restaurant } from "../lib/lunch-fetcher/types";
import { RestaurantView } from "./Restaurant";

const getWeekday = (date: Date): string | null => {
  const dayIndex = date.getDay();

  return weekdays[dayIndex];
};

const fetcher = (url: string) => fetch(url).then(r => r.json());

const RESTAURANTS_URL = "/api/restaurants";

interface RestaurantsResponse {
  restaurants: Restaurant[];
  lastUpdated: string;
}

export const Main: React.FC = () => {
  const { data } = useSWR<RestaurantsResponse>(RESTAURANTS_URL, fetcher, {
    suspense: true
  });
  const { restaurants, lastUpdated } = data!;
  const [showToday, setShowToday] = useState(true);

  useEffect(() => {
    console.log(new Date(lastUpdated));
  }, [lastUpdated]);

  const weekDayToday = getWeekday(new Date());
  const onlyShowToday = !!(showToday && weekDayToday);

  return (
    <main className="sans-serif ma2">
      {weekDayToday && (
        <label className="flex items-center">
          <input
            className="mr2"
            type="checkbox"
            checked={showToday}
            onChange={() => setShowToday(show => !show)}
          />
          Visa endast dagens
        </label>
      )}
      {restaurants.map(res => (
        <RestaurantView
          key={res.name}
          restaurant={res}
          showSingleDay={onlyShowToday}
          weekDayToday={weekDayToday}
        />
      ))}

      <div className="pt2">
        <small className="mid-gray">
          Uppdaterat{" "}
          {new Date(lastUpdated).toLocaleDateString("sv-SE", {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit"
          })}
        </small>
      </div>
    </main>
  );
};
