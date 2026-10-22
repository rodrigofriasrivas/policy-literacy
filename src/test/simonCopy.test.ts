import { describe, it, expect, beforeAll } from "vitest";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let api: any;
beforeAll(async () => {
  await import("../../public/simon-copy.js");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  api = (globalThis as any).EpltSimonCopy;
});

const p = (id: number, extra: Record<string, unknown> = {}) => ({
  paper_id: id, title: `Title ${id}`, authors: ["A. One"], year: 2020, journal: "JOURNALNAME", abstract: `SECRET ABSTRACT ${id}`, ...extra,
});

describe("Copy for Simon message", () => {
  it("lists each paper once as [P<id>] full title (year)", () => {
    const { text, count } = api.buildMessage([p(1059, { title: "The emergence of entrepreneurship policy", year: 2004 }), p(2), p(1059)]);
    expect(count).toBe(2);
    expect(text).toContain("[P1059] The emergence of entrepreneurship policy (2004)");
    expect(text.match(/\[P1059\]/g)).toHaveLength(1);
  });
  it("omits authors, journals and abstracts", () => {
    const { text } = api.buildMessage([p(5)]);
    expect(text).not.toContain("SECRET ABSTRACT");
    expect(text).not.toContain("JOURNALNAME");
    expect(text).not.toContain("A. One");
  });
  it("includes the safeguard instruction", () => {
    expect(api.buildMessage([p(3)]).text).toContain("do not assume access to full texts.");
  });
  it("omits year when missing instead of inventing it", () => {
    expect(api.buildMessage([{ paper_id: 9, title: "T" }]).text).toContain("[P9] T\n".trimEnd());
    expect(api.buildMessage([{ paper_id: 9, title: "T" }]).text).not.toMatch(/\[P9\] T \(/);
  });
  it("keeps long titles and 120 records untruncated", () => {
    const long = "x".repeat(400);
    const { text, count } = api.buildMessage([p(1, { title: long }), ...Array.from({ length: 119 }, (_, i) => p(i + 2))]);
    expect(count).toBe(120);
    expect(text).toContain(long);
    expect(text).toContain("[P120] Title 120 (2020)");
  });
});
