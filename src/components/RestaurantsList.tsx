import React from "react";
import { getWeekday } from "../lib/lunch-fetcher/lib/utils";
import { Restaurant } from "../lib/lunch-fetcher/types";
import { RestaurantView } from "./Restaurant";

export interface Props {
  restaurants: Restaurant[];
  showToday: boolean;
}

export const RestaurantsList: React.VFC<Props> = ({
  restaurants,
  showToday,
}) => {
  const weekDayToday = getWeekday(new Date());
  const onlyShowToday = !!(showToday && weekDayToday);

  return (
    <>
      {restaurants.map((res, index) => (
        <RestaurantView
          key={res.name}
          index={index}
          restaurant={res}
          showSingleDay={onlyShowToday}
          weekDayToday={weekDayToday}
        />
      ))}
    </>
  );
};
