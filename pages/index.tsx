import * as React from "react";
import "isomorphic-unfetch";
import { Suspense } from "react";
import Head from "../head";
import { Main } from "../components/Main";
import useSWR from "swr";
import { Restaurant } from "../lib/lunch-fetcher/types";
import { ErrorBoundary } from "../components/ErrorBoundary";
import { Loading } from "../components/Loading";

const fetcher = (url: string) => fetch(url).then(r => r.json());

const App = () => {
  const { data: restaurants } = useSWR<Restaurant[]>("/api/restaurants", {
    fetcher
  });

  if (!restaurants) {
    return <Loading />;
  }

  return <Main restaurants={restaurants!} />;
};

export default () => (
  <ErrorBoundary>
    <Head />
    <App />
  </ErrorBoundary>
);
