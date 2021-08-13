import * as cheerio from "cheerio";
import { parseHtml } from "../../../restaurants/hops";

import { mock as mock1 } from "./mock1";

describe("hops", () => {
  describe("when provided with mock 1", () => {
    const result = parseHtml(cheerio.load(mock1));
    it("should work", () => {
      expect(result).toMatchSnapshot();
    });

    it("should parse 5 days", () => {
      expect(result.days).toHaveLength(5);
    });

    it("should remove colon from title and name", () => {
      result.days.forEach((day) => {
        day.items.forEach((item) => {
          expect(item.name).not.toMatch(/:/);
        });
      });
    });

    it("should have no empty names", () => {
      result.days.forEach((day) => {
        day.items.forEach((item) => {
          expect(item.name).not.toHaveLength(0);
        });
      });
    });
  });
});
