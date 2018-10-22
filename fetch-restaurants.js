const fetch = require("node-fetch");
const cheerio = require("cheerio");
const _ = require("lodash");

const { parseHtml: parseSeaside } = require("./restaurants/seaside");
const { parseHtml: parseHops } = require("./restaurants/hops");

const fetchHTML = url =>
  fetch(url)
    .then(r => r.text())
    .then(r => cheerio.load(r));

export const fetchAll = async () => {
  const hops = fetchHTML("http://www.hopsbar.se/").then(parseHops);
  const seaside = fetchHTML("http://seaside.kvartersmenyn.se/").then(
    parseSeaside
  );
  return await Promise.all([hops, seaside]);
};
