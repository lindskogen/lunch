import "isomorphic-unfetch";
import * as cheerio from "cheerio";

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

const fetchHTML = (url: string) =>
  fetch(url)
    .then(r => r.text())
    .then(r => cheerio.load(r));

export const fetchAll = async (): Promise<Restaurant[]> => {
  const hops = fetchHTML(hopsUrl)
    .then(parseHops)
    .catch(error => {
      console.log("Error fetching Hops:", error);
      return {
        name: "Hops",
        url: hopsUrl,
        days: []
      };
    });
  const seaside = fetchHTML(seasideUrl)
    .then(parseSeaside)
    .catch(error => {
      console.log("Error fetching Seaside:", error);
      return {
        name: "Seaside",
        url: seasideUrl,
        days: []
      };
    });
  const schnitzelplatz = fetchHTML(schnitzelplatzUrl)
    .then(parseSchnitzelplatz)
    .catch(error => {
      console.log("Error fetching Schnitzelplatz Lagerhuset:", error);
      return {
        name: "Schnitzelplatz Lagerhuset",
        url: schnitzelplatzUrl,
        days: []
      };
    });
  return await Promise.all([hops, seaside, schnitzelplatz]);
};
