import * as React from "react";
import "isomorphic-unfetch";
import { Suspense } from "react";
import Head from "../head";
import { Main } from "../components/Main";
import useSWR from "swr";
import { Restaurant } from "../lib/lunch-fetcher/types";
import { ErrorBoundary } from "../components/ErrorBoundary";

const fetcher = (url: string) => fetch(url).then(r => r.json());

const App = () => {
  const { data: restaurants, isValidating, error } = useSWR<Restaurant[]>(
    "/api/restaurants",
    {
      fetcher
    }
  );

  if (isValidating || !restaurants) {
    return <div />;
  }

  return <Main restaurants={restaurants!} />;
};

export default () => (
  <ErrorBoundary>
    <Head />
    <App />
  </ErrorBoundary>
);
