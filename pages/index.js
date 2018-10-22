import React from "react";
import { fetchAll } from "../fetch-restaurants";

export default class extends React.Component {
  static async getInitialProps() {
    const restaurants = await fetchAll();
    console.log(restaurants);
    return { restaurants };
  }

  render() {
    console.log(this.props);
    const { restaurants } = this.props;

    return (
      <div>
        {restaurants.map(({ days, name }) => (
          <React.Fragment key={name}>
            <h2>{name}</h2>
            <div>
              {days.map(({ wday, items }) => (
                <React.Fragment key={wday}>
                  <strong>{wday}</strong>
                  {items.map(({ name, title }) => (
                    <div key={name}>
                      {title ? title + ":" : null} {name}
                    </div>
                  ))}
                </React.Fragment>
              ))}
            </div>
          </React.Fragment>
        ))}
      </div>
    );
  }
}
