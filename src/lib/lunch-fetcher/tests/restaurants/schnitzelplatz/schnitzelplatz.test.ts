import * as cheerio from "cheerio";
import { parseHtml } from "../../../restaurants/schnitzelplatz";

import { mock as mock1 } from "./mock1";

describe("schnitzelplatz", () => {
  describe("when provided with mock 1", () => {
    const result = parseHtml(cheerio.load(mock1));
    it("should work", () => {
      expect(result).toMatchSnapshot();
    });

    it("should have 4 foods per day", () => {
      result.days.forEach((day) => {
        expect(day.items).toHaveLength(4);
      });
    });

    it("should parse 5 days", () => {
      expect(result.days).toHaveLength(5);
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
