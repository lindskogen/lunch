import * as React from "react";
import { Restaurant, RestaurantDayMenu } from "../lib/lunch-fetcher/types";
import { shuffle } from "lodash-es";

interface Props extends Restaurant {
  index: number;
  showSingleDay: boolean;
  weekDayToday: string | null;
}

const backgroundColors = shuffle([
  "bg-washed-blue",
  "bg-washed-green",
  "bg-lightest-blue",
  "bg-washed-yellow",
  "bg-washed-red",
]);

const Meal = ({ title, name }: { title?: string; name: string }) => (
  <>
    <div className="f6 b">{title}</div>
    <div className="ml0 mb2">{name}</div>
  </>
);

const renderDay = (hideDay: boolean, { wday, items }: RestaurantDayMenu) => (
  <React.Fragment key={wday}>
    {!hideDay && <h4 className="f6 fw6 pb2 pt2 bb">{wday}</h4>}
    <div className="lh-title">
      {items.map(({ name, title }) => (
        <Meal key={name} name={name} title={title} />
      ))}
    </div>
  </React.Fragment>
);

export const RestaurantView = ({
  index,
  showSingleDay,
  weekDayToday,
  name,
  url,
  days,
}: Props) => {
  const weekDayToRender =
    showSingleDay &&
    days.find(({ wday }) => wday.toLowerCase() === weekDayToday);

  return (
    <div className={"pa4 " + backgroundColors[index % backgroundColors.length]}>
      <h2 className="ma0 mt0 dib pr3 pb4 tracked ttu">
        <a
          href={url}
          rel="noopener noreferrer"
          target="_blank"
          className="link black hover-navy underline-hover"
        >
          {name}
        </a>
      </h2>
      {weekDayToRender
        ? renderDay(showSingleDay, weekDayToRender)
        : days.map((day) => renderDay(showSingleDay, day))}
    </div>
  );
};
