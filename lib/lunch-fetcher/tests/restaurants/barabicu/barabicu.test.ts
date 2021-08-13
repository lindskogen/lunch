import * as cheerio from "cheerio";
import { mock as mock1 } from "./mock1";
import { parseHtml } from "../../../restaurants/barabicu";

describe("barabicu", () => {
  describe("when provided with mock1", () => {
    const result = parseHtml(cheerio.load(mock1));

    it("should work", () => {
      expect(result).toMatchSnapshot();
    });

    it("should parse 5 days", () => {
      expect(result.days).toHaveLength(5);
    });

    it("should parse 5 weekdays", () => {
      expect(result.days.map((d) => d.wday)).toEqual([
        "Måndag",
        "Tisdag",
        "Onsdag",
        "Torsdag",
        "Fredag",
      ]);
    });

    it("should have some items with title and name", () => {
      result.days.forEach((day) => {
        day.items.forEach((item) => {
          expect(item.name).toBeDefined();
          expect(item.title).toBeDefined();
          expect(item.title).not.toContain("SEK");
        });
      });
    });
  });
});
