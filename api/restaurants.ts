import { NowRequest, NowResponse } from "@now/node";
import { fetchAll } from "../lib/lunch-fetcher/fetch-restaurants";

export default async (req: NowRequest, res: NowResponse) => {
  const restaurants = await fetchAll();

  res.setHeader("Cache-Control", "s-maxage=3600, stale-while-revalidate");

  res.json({ restaurants, lastUpdated: new Date().toISOString() });
};
