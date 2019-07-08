import * as React from "react";
import { Restaurant, RestaurantDayMenu } from "../lib/lunch-fetcher/types";

interface Props {
  restaurant: Restaurant;
  showSingleDay: boolean;
  weekDayToday: string | null;
}

const Meal = ({ title, name }: { title?: string; name: string }) => (
  <>
    <div className="f6 b">{title}</div>
    <div className="ml0 mb2">{name}</div>
  </>
);

const renderDay = ({ wday, items }: RestaurantDayMenu) => (
  <React.Fragment key={wday}>
    <h4 className="f6 fw6">{wday}</h4>
    <div className="lh-title">
      {items.map(({ name, title }) => (
        <Meal key={name} name={name} title={title} />
      ))}
    </div>
  </React.Fragment>
);

export const RestaurantView: React.FC<Props> = ({
  restaurant: { days, name, url },
  showSingleDay,
  weekDayToday
}) => {
  const weekDayToRender =
    showSingleDay &&
    days.find(({ wday }) => wday.toLowerCase() === weekDayToday);

  return (
    <div>
      <a
        href={url}
        rel="noopener noreferrer"
        target="_blank"
        className="link black hover-blue"
      >
        <h2 className="ma0 mt1 dib underline pr3 pv3">{name}</h2>
      </a>
      {weekDayToRender ? renderDay(weekDayToRender) : days.map(renderDay)}
    </div>
  );
};
