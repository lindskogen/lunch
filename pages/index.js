import React from "react";
import { fetchAll } from "../fetch-restaurants";
import { weekdays } from "../lib/utils";
import Head from "../head";

const getWeekday = date => {
  const dayIndex = date.getDay();

  return weekdays[dayIndex];
};

export default class extends React.Component {
  state = {
    showToday: true
  };

  static async getInitialProps() {
    const restaurants = await fetchAll();
    console.log(restaurants);
    return { restaurants };
  }

  renderDay = ({ wday, items }) => (
    <React.Fragment key={wday}>
      <h4 className="f6 fw6">{wday}</h4>
      <div key={wday} className="lh-title">
        {items.map(({ name, title }) => (
          <React.Fragment key={name}>
            <div className="f6 b">{title}</div>
            <div className="ml0 mb2">{name}</div>
          </React.Fragment>
        ))}
      </div>
    </React.Fragment>
  );

  toggleShowToday = () => {
    this.setState(({ showToday }) => ({ showToday: !showToday }));
  };

  render() {
    const { restaurants } = this.props;
    const { showToday } = this.state;
    const weekDayToday = getWeekday(new Date());
    const onlyShowToday = showToday && weekDayToday;

    return (
      <>
        <Head />
        <main className="sans-serif mt2 ml2">
          {weekDayToday && (
            <button onClick={this.toggleShowToday}>
              {showToday ? "Visa hela veckans meny" : "Visa idag"}
            </button>
          )}
          {restaurants.map(({ days, name }) => (
            <div key={name}>
              <h2>{name}</h2>
              {onlyShowToday
                ? this.renderDay(
                    days.find(({ wday }) => wday.toLowerCase() === weekDayToday)
                  )
                : days.map(this.renderDay)}
            </div>
          ))}
        </main>
      </>
    );
  }
}
