/**
 *
 */

import { getMonth } from "./index";

describe("Date helper", () => {
  describe("When getMonth is called", () => {
    it("the function return janvier for 2022-01-01 as date", () => {
      const date = "2022-01-01";
      const result = getMonth(new Date(date));
      expect(result).toBe("janvier");
    });
    it("the function return juillet for 2022-07-08 as date", () => {
      const date = "2022-07-01";
      const result = getMonth(new Date(date));
      expect(result).toBe("juillet");
    });
    it("the function return undefined when invalid date is passed", () => {
      const date = "0000-000-0000";
      const result = getMonth(new Date(date));
      expect(result).toEqual(undefined);
    });
  });
});
