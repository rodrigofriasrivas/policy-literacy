import { describe, it, expect, beforeAll } from "vitest";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let api: any;
beforeAll(async () => {
  await import("../../public/simon-copy.js");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  api = (globalThis as any).EpltSimonCopy;
});

const p = (id: number, extra: Record<string, unknown> = {}) => ({
  paper_id: id, title: `Title ${id}`, authors: ["A. One", "B. Two"], year: 2020, journal: "J", abstract: `SECRET ABSTRACT ${id}`, ...extra,
});

describe("Copy for Simon message", () => {
  it("counts and lists each paper exactly once", () => {
    const { text, count } = api.buildMessage([p(1), p(2), p(1)]);
    expect(count).toBe(2);
    expect(text).toContain("Number of papers: 2");
    expect(text.match(/\[P1\]/g)).toHaveLength(1);
  });
  it("never includes abstracts", () => {
    expect(api.buildMessage([p(5)]).text).not.toContain("SECRET ABSTRACT");
  });
  it("includes the limitation and suggested request verbatim", () => {
    const { text } = api.buildMessage([p(3)]);
    expect(text).toContain("This is not a full-text literature review.");
    expect(text).toContain("would require verification through further reading.");
    expect(text).toContain("not DOIs");
  });
  it("marks missing metadata as not recorded", () => {
    const { text } = api.buildMessage([{ paper_id: 9, title: "T" }]);
    expect(text).toContain("Authors: not recorded");
    expect(text).toContain("Year: not recorded | Journal: not recorded");
  });
  it("keeps all 120 records without truncation", () => {
    const { text, count } = api.buildMessage(Array.from({ length: 120 }, (_, i) => p(i + 1)));
    expect(count).toBe(120);
    expect(text).toContain("120. [P120]");
  });
});
