import * as React from "react";
import { fetchAll } from "../lib/lunch-fetcher/fetch-restaurants";
import { weekdays } from "../lib/lunch-fetcher/lib/utils";
import Head from "../head";
import { Restaurant } from "../components/Restaurant";

const getWeekday = (date: Date): string | null => {
  const dayIndex = date.getDay();

  return weekdays[dayIndex];
};

interface Props {
  restaurants: Restaurant[];
}

interface State {
  showToday: boolean;
}

export default class extends React.Component<Props, State> {
  state: State = {
    showToday: true
  };

  static async getInitialProps() {
    const restaurants = await fetchAll();
    console.log(restaurants);
    return { restaurants };
  }

  toggleShowToday = () => {
    this.setState(({ showToday }) => ({ showToday: !showToday }));
  };

  render() {
    const { restaurants } = this.props;
    const { showToday } = this.state;
    const weekDayToday = getWeekday(new Date());
    const onlyShowToday = !!(showToday && weekDayToday);

    return (
      <>
        <Head />
        <main className="sans-serif ma2">
          {weekDayToday && (
            <button onClick={this.toggleShowToday}>
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
      </>
    );
  }
}
