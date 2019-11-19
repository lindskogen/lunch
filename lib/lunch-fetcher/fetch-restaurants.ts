import "isomorphic-unfetch";
import * as cheerio from "cheerio";
import { parseISO, subHours, isBefore } from "date-fns";

import {
  url as seasideUrl,
  parseHtml as parseSeaside
} from "./restaurants/seaside";
import { url as hopsUrl, parseHtml as parseHops } from "./restaurants/hops";
import {
  url as schnitzelplatzUrl,
  parseHtml as parseSchnitzelplatz
} from "./restaurants/schnitzelplatz";
import { Restaurant } from "./types";
import { cacheGet, cachePut } from "../swr-cache/cache";

const getEmptyRestaurantFallback = (name: string, url: string) => (
  error: Error
) => {
  console.log(`Error fetching ${name}:`, error);
  return {
    name,
    url,
    days: []
  };
};

const fetchHTML = (url: string) =>
  fetch(url)
    .then(r => r.text())
    .then(r => cheerio.load(r));

const getAllRestaurants = (): Promise<Restaurant[]> => {
  const hops = fetchHTML(hopsUrl)
    .then(parseHops)
    .catch(getEmptyRestaurantFallback("Hops", hopsUrl));
  const seaside = fetchHTML(seasideUrl)
    .then(parseSeaside)
    .catch(getEmptyRestaurantFallback("Seaside", seasideUrl));
  const schnitzelplatz = fetchHTML(schnitzelplatzUrl)
    .then(parseSchnitzelplatz)
    .catch(
      getEmptyRestaurantFallback("Schnitzelplatz Lagerhuset", schnitzelplatzUrl)
    );

  return Promise.all([hops, seaside, schnitzelplatz]);
};

export const fetchAll = async (): Promise<Restaurant[]> => {
  const cacheObject = await cacheGet<Restaurant[]>();

  if (cacheObject) {
    if (isBefore(subHours(parseISO(cacheObject._updatedOn), 1), new Date())) {
      getAllRestaurants().then(restaurants => cachePut(restaurants));
    }
    return cacheObject.cache;
  }

  const restaurants = await getAllRestaurants();
  cachePut(restaurants);
  return restaurants;
};
