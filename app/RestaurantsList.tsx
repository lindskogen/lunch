import React, { FC } from "react";
import { getWeekday } from "../lib/lunch-fetcher/lib/utils";
import { RestaurantView } from "./Restaurant";
import { Restaurant } from "../lib/lunch-fetcher/types";

export interface Props {
  showToday: boolean;
  restaurants: Restaurant[];
}

export const RestaurantsList: FC<Props> = ({ showToday, restaurants }) => {
  const weekDayToday = getWeekday(new Date());
  const onlyShowToday = !!(showToday && weekDayToday);

  return (
    <>
      {restaurants.map((params, index) => (
        <RestaurantView
          {...params}
          key={params.name}
          index={index}
          showSingleDay={onlyShowToday}
          weekDayToday={weekDayToday}
        />
      ))}
    </>
  );
};
