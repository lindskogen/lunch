import React from "react";
import Image from "next/image";

export const Loading = () => (
  <div
    style={{
      width: "100vw",
      height: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    }}
  >
    <Image src="/small-loading.svg" alt="Loading" />
  </div>
);
