import { load } from "cheerio";

import {
  parseHtml as parseSeaside,
  url as seasideUrl,
} from "./restaurants/seaside";
import { parseHtml as parseHops, url as hopsUrl } from "./restaurants/hops";
import {
  parseHtml as parseSchnitzelplatz,
  url as schnitzelplatzUrl,
} from "./restaurants/schnitzelplatz";
import { Restaurant } from "./types";
import {
  fetchMeals,
  parseResponse as parseBangkok,
  url as bangkokUrl,
} from "./restaurants/bangkok";
import prettyMilliseconds from "pretty-ms";

const fetchHTML = async (url: string) => {
  const start = Date.now();
  const response = await fetch(url);
  const content = await response.text();
  console.log(
    response.status,
    response.statusText,
    url,
    prettyMilliseconds(Date.now() - start)
  );
  return load(content);
};

const fetchSeaside = async () => parseSeaside(await fetchHTML(seasideUrl));
const fetchHops = async () => parseHops(await fetchHTML(hopsUrl));
const fetchSchnitzelplatz = async () =>
  parseSchnitzelplatz(await fetchHTML(schnitzelplatzUrl));
const fetchBangkok = async () => parseBangkok(await fetchMeals());

const getRestaurant = (
  name: string,
  url: string,
  fetcher: () => Promise<Restaurant>
): RestaurantParams => ({
  name,
  url,
  fetcher,
});

export interface RestaurantParams {
  name: string;
  url: string;
  fetcher: () => Promise<Restaurant>;
}

const allRestaurants: RestaurantParams[] = [
  getRestaurant("Hops", hopsUrl, fetchHops),
  getRestaurant("Seaside", seasideUrl, fetchSeaside),
  getRestaurant(
    "Schnitzelplatz Lagerhuset",
    schnitzelplatzUrl,
    fetchSchnitzelplatz
  ),
  getRestaurant("Bangkok Kitchen", bangkokUrl, fetchBangkok),
];

const fetchAll = (): Promise<Restaurant[]> =>
  Promise.all(
    allRestaurants.map(async ({ name, url, fetcher }) => {
      try {
        const { days } = await fetcher();

        return {
          name,
          url,
          days,
        };
      } catch (e) {
        console.log("Error fetching", name, e);

        return {
          name,
          url,
          days: [],
        };
      }
    })
  );

let prev: null | Restaurant[] = null;
export const fetchAllCached = async () => {
  if (!prev) {
    prev = await fetchAll();
  }
  return prev;
};
