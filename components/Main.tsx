import * as React from "react";
import { useState } from "react";
import { weekdays } from "../lib/lunch-fetcher/lib/utils";
import { RestaurantView } from "../components/Restaurant";
import { Restaurant } from "../lib/lunch-fetcher/types";

const getWeekday = (date: Date): string | null => {
  const dayIndex = date.getDay();

  return weekdays[dayIndex];
};

interface Props {
  restaurants: Restaurant[];
}

export const Main: React.FC<Props> = ({ restaurants }) => {
  const [showToday, setShowToday] = useState(true);

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
    </main>
  );
};
