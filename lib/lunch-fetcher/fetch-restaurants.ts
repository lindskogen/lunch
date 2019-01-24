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

const fetchHTML = (url: string) =>
  fetch(url)
    .then(r => r.text())
    .then(r => cheerio.load(r));

export const fetchAll = async (): Promise<Restaurant[]> => {
  const hops = fetchHTML(hopsUrl).then(parseHops);
  const seaside = fetchHTML(seasideUrl).then(parseSeaside);
  const schnitzelplatz = fetchHTML(schnitzelplatzUrl).then(parseSchnitzelplatz);
  return await Promise.all([hops, seaside, schnitzelplatz]);
};
