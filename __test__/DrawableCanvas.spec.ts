import { TestImage } from "./TestImage.js";
import { DrawableCanvas } from "../src/index.js";
import { describe, it, expect, vi } from "vitest";

describe("DrawableCanvas", () => {
  const pickColor = (canvas: HTMLCanvasElement, x: number, y: number) => {
    const ctx = canvas.getContext("2d");
    const pixel = ctx.getImageData(x, y, 1, 1);
    return pixel.data;
  };

  const stroke = (
    drawableCanvas: DrawableCanvas,
    x1: number,
    y1: number,
    x2: number,
    y2: number,
  ) => {
    drawableCanvas.onStartStroke({ offsetX: x1, offsetY: y1, pointerId: 0 });
    drawableCanvas.onStroke({
      offsetX: x2,
      offsetY: y2,
      pointerId: 0,
    });
    drawableCanvas.onFinishStroke({
      offsetX: x2,
      offsetY: y2,
      pointerId: 0,
    });
  };

  it("should be constructable", () => {
    const canvas = document.createElement("canvas");
    const drawableCanvas = new DrawableCanvas(canvas);
    expect(drawableCanvas).toBeTruthy();

    const defaultColor = pickColor(canvas, 0, 0);
    expect(Array.from(defaultColor)).toEqual([0, 0, 0, 0]);
  });

  it("should clear image", () => {
    const canvas = document.createElement("canvas");
    const drawableCanvas = new DrawableCanvas(canvas);

    drawableCanvas.clear();
    const color = pickColor(canvas, 0, 0);
    expect(Array.from(color)).toEqual([0, 0, 0, 0]);
  });

  it("should draw line", () => {
    const canvas = document.createElement("canvas");
    const drawableCanvas = new DrawableCanvas(canvas);
    drawableCanvas.startDrawing({ mode: "pen", color: "#ff0066", width: 8 });
    stroke(drawableCanvas, 0, 0, canvas.width, canvas.height);

    const color = pickColor(canvas, 0, 0);
    expect(Array.from(color)).toEqual([255, 0, 102, 255]);
    const color2 = pickColor(canvas, canvas.width - 1, canvas.height - 1);
    expect(Array.from(color2)).toEqual([255, 0, 102, 255]);
    const color3 = pickColor(canvas, canvas.width - 1, 0);
    expect(Array.from(color3)).toEqual([0, 0, 0, 0]);
  });

  it("should draw line with eraser", () => {
    const canvas = document.createElement("canvas");
    const drawableCanvas = new DrawableCanvas(canvas);
    drawableCanvas.startDrawing({ mode: "pen", color: "#ff0066", width: 8 });
    stroke(drawableCanvas, 0, 0, canvas.width, canvas.height);
    drawableCanvas.startDrawing({ mode: "eraser", width: 8 });
    stroke(drawableCanvas, 0, canvas.height, canvas.width, 0);

    const color = pickColor(canvas, canvas.width / 2, canvas.height / 2);
    expect(Array.from(color)).toEqual([0, 0, 0, 0]);

    const color2 = pickColor(canvas, 0, 0);
    expect(Array.from(color2)).toEqual([255, 0, 102, 255]);
  });

  it("should load image", async () => {
    const mock = vi.fn((blob) => blob.toString());
    URL.createObjectURL = mock;

    const canvas = document.createElement("canvas");
    const drawableCanvas = new DrawableCanvas(canvas);
    drawableCanvas.restoreImage(TestImage);
  });
});
