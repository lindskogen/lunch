import * as React from "react";
import { fetchAll } from "../lib/lunch-fetcher/fetch-restaurants";
import Head from "../head";
import { Main } from "../components/Main";
import { Restaurant } from "../lib/lunch-fetcher/types";

interface Props {
  restaurants: Restaurant[];
}

export default class extends React.Component<Props> {
  static async getInitialProps() {
    const restaurants = await fetchAll();
    console.log(restaurants);
    return { restaurants };
  }

  render() {
    return (
      <>
        <Head />
        <Main {...this.props} />
      </>
    );
  }
}
