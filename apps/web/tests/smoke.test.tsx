import { describe, expect, it } from "vitest";
import { formatPercent } from "@/lib/utils";

describe("formatPercent", () => {
  it("rounds percentages for display", () => {
    expect(formatPercent(82.4)).toBe("82%");
  });
});
