import React from "react";

export const Loading = () => (
  <div style={{ width: '100vw', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid"
      width="100"
      height="100"
      viewBox="0 0 100 100"
    >
      <circle
        cx="50"
        cy="50"
        r="35"
        fill="none"
        stroke="#000"
        strokeDasharray="164.93361431346415 56.97787143782138"
        strokeWidth="10"
        transform="rotate(256.186 50 50)"
      >
        <animateTransform
          attributeName="transform"
          begin="0s"
          calcMode="linear"
          dur="1s"
          keyTimes="0;1"
          repeatCount="indefinite"
          type="rotate"
          values="0 50 50;360 50 50"
        ></animateTransform>
      </circle>
    </svg>
  </div>
);
