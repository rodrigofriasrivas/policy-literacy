import { beforeEach, describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const source = readFileSync(resolve(__dirname, "../../public/reading-list.js"), "utf8");
type RL = {
  add(id: number): boolean; remove(id: number): boolean; toggle(id: number): boolean;
  has(id: number): boolean; count(): number; list(): { id: number; savedAt: number }[];
  status(): string; canSave(): boolean;
};
const KEY = "eplt-reading-list";
const boot = (): RL => {
  new Function(source)();
  return (window as unknown as { EpltReadingList: RL }).EpltReadingList;
};

describe("reading list storage contract", () => {
  beforeEach(() => localStorage.clear());

  it("saves with version 1 and deduplicates by paper id", () => {
    const rl = boot();
    rl.add(1618); rl.add(1618); rl.add(2);
    const stored = JSON.parse(localStorage.getItem(KEY)!);
    expect(stored.version).toBe(1);
    expect(stored.items.map((i: { id: number }) => i.id)).toEqual([1618, 2]);
    expect(rl.count()).toBe(2);
  });

  it("keeps the original savedAt when a saved paper is saved again", () => {
    localStorage.setItem(KEY, JSON.stringify({ version: 1, items: [{ id: 5, savedAt: 1000 }] }));
    const rl = boot();
    rl.add(5);
    expect(rl.list()).toEqual([{ id: 5, savedAt: 1000 }]);
  });

  it("lists newest saved first", () => {
    localStorage.setItem(KEY, JSON.stringify({ version: 1, items: [{ id: 1, savedAt: 10 }, { id: 2, savedAt: 30 }, { id: 3, savedAt: 20 }] }));
    expect(boot().list().map((i) => i.id)).toEqual([2, 3, 1]);
  });

  it("removes a paper", () => {
    const rl = boot();
    rl.add(7); rl.toggle(7);
    expect(rl.has(7)).toBe(false);
  });

  it.each([["not json{", "unreadable"], [JSON.stringify({ version: 2, items: [] }), "unsupported"], [JSON.stringify({ version: 1, items: "x" }), "unreadable"]])(
    "never overwrites malformed or unsupported data (%s)",
    (raw, status) => {
      localStorage.setItem(KEY, raw);
      const rl = boot();
      expect(rl.status()).toBe(status);
      expect(rl.add(1618)).toBe(false);
      rl.remove(1618);
      expect(localStorage.getItem(KEY)).toBe(raw);
    },
  );
});

describe("reading list bulk removal", () => {
  beforeEach(() => localStorage.clear());
  it("removes only the selected papers in one write", () => {
    const rl = boot() as RL & { removeMany(ids: number[]): boolean };
    rl.add(1); rl.add(2); rl.add(3);
    rl.removeMany([1, 3]);
    expect(JSON.parse(localStorage.getItem(KEY)!).items.map((i: { id: number }) => i.id)).toEqual([2]);
  });
  it("clear all empties the list but keeps version 1", () => {
    const rl = boot() as RL & { clear(): boolean };
    rl.add(1); rl.add(2);
    rl.clear();
    expect(JSON.parse(localStorage.getItem(KEY)!)).toEqual({ version: 1, items: [] });
  });
  it("clear all never overwrites unreadable data", () => {
    localStorage.setItem(KEY, "not json{");
    const rl = boot() as RL & { clear(): boolean };
    expect(rl.clear()).toBe(false);
    expect(localStorage.getItem(KEY)).toBe("not json{");
  });
});
