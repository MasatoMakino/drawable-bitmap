import { DrawableCanvas } from "../src/index.js";
import { describe, it, expect } from "vitest";

describe("DrawableCanvas", () => {
  it("should be constructable", () => {
    const canvas = document.createElement("canvas");
    const drawableCanvas = new DrawableCanvas(canvas);
    expect(drawableCanvas).toBeTruthy();
  });
});
