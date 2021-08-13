import "isomorphic-unfetch";
import * as React from "react";
import { Suspense } from "react";
import { Loading } from "../components/Loading";
import { Main } from "../components/Main";
import { NoSSR } from "../components/NoSSR";
import Head from "../head";

const IndexPage = () => {
  return (
    <>
      <Head />
      <NoSSR>
        <Suspense fallback={<Loading />}>
          <Main />
        </Suspense>
      </NoSSR>
    </>
  );
};

export default IndexPage;
