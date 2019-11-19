import * as React from "react";
import "isomorphic-unfetch";
import Head from "../head";
import { Main } from "../components/Main";
import useSWR from "swr";
import { Restaurant } from "../lib/lunch-fetcher/types";
import { Loading } from "../components/Loading";

const fetcher = (url: string) => fetch(url).then(r => r.json());

const RESTAURANTS_URL = "/api/restaurants";

export default () => {
  const { data: restaurants } = useSWR<Restaurant[]>(RESTAURANTS_URL, fetcher);

  return (
    <>
      <Head />
      {restaurants ? <Main restaurants={restaurants} /> : <Loading />}
    </>
  );
};
