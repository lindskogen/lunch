import fetch from "node-fetch";
import cheerio from "cheerio";
import _ from "lodash";

import {
  url as seasideUrl,
  parseHtml as parseSeaside
} from "./restaurants/seaside";
import { url as hopsUrl, parseHtml as parseHops } from "./restaurants/hops";

const fetchHTML = url =>
  fetch(url)
    .then(r => r.text())
    .then(r => cheerio.load(r));

export const fetchAll = async () => {
  const hops = fetchHTML(hopsUrl).then(parseHops);
  const seaside = fetchHTML(seasideUrl).then(parseSeaside);
  return await Promise.all([hops, seaside]);
};
