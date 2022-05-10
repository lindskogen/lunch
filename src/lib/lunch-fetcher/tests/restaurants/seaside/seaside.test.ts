import * as cheerio from "cheerio";
import { parseHtml } from "../../../restaurants/seaside";

import { mock as mock1 } from "./mock1";
import { mock as mock2 } from "./mock2";

describe("seaside", () => {
  describe("when provided with mock 1", () => {
    const result = parseHtml(cheerio.load(mock1));
    it("should work", () => {
      expect(result).toMatchSnapshot();
    });

    it("should have 3 foods per day", () => {
      result.days.forEach((day) => {
        expect(day.items).toHaveLength(3);
      });
    });

    it("should parse 5 days", () => {
      expect(result.days).toHaveLength(5);
    });

    it("should remove colon from title and name", () => {
      result.days.forEach((day) => {
        day.items.forEach((item) => {
          expect(item.title).not.toMatch(/:/);
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
  describe("when provided with mock 2", () => {
    const result = parseHtml(cheerio.load(mock2));
    it("should work", () => {
      expect(result).toMatchSnapshot();
    });

    it("should have 6 foods per day", () => {
      result.days.forEach((day) => {
        expect(day.items).toHaveLength(6);
      });
    });

    it("should parse 5 days", () => {
      expect(result.days).toHaveLength(5);
    });

    it("should remove colon from title and name", () => {
      result.days.forEach((day) => {
        day.items.forEach((item) => {
          expect(item.title).not.toMatch(/:/);
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
