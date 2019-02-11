import * as React from "react";
import { useState } from "react";
import { weekdays } from "../lib/lunch-fetcher/lib/utils";
import { Restaurant } from "../components/Restaurant";

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
        <button onClick={() => setShowToday(show => !show)}>
          {showToday ? "Visa hela veckans meny" : "Visa idag"}
        </button>
      )}
      {restaurants.map(res => (
        <Restaurant
          key={res.name}
          restaurant={res}
          showSingleDay={onlyShowToday}
          weekDayToday={weekDayToday}
        />
      ))}
    </main>
  );
};
