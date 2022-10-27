import { DateFooter } from "./DateFooter";
import "./style.css";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export default function RootLayout({ children }: Props) {
  const lastUpdated = new Date().toISOString();

  return (
    <html>
      <head>
        <link
          rel="stylesheet"
          href="https://unpkg.com/tachyons@4/css/tachyons.min.css"
        />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <title>Stena Lunch</title>
      </head>
      <body>
        <main className={"sans-serif"}>
          {children}
          <DateFooter lastUpdated={lastUpdated} />
        </main>
      </body>
    </html>
  );
}
