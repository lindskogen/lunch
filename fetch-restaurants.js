const fetch = require("node-fetch");
const cheerio = require("cheerio");
const _ = require("lodash");

const {
  url: seasideUrl,
  parseHtml: parseSeaside
} = require("./restaurants/seaside");
const { url: hopsUrl, parseHtml: parseHops } = require("./restaurants/hops");

const fetchHTML = url =>
  fetch(url)
    .then(r => r.text())
    .then(r => cheerio.load(r));

export const fetchAll = async () => {
  const hops = fetchHTML(hopsUrl).then(parseHops);
  const seaside = fetchHTML(seasideUrl).then(parseSeaside);
  return await Promise.all([hops, seaside]);
};
