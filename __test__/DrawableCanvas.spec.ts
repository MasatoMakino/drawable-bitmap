import { describe, expect, it, vi } from "vitest";
import { DrawableCanvas } from "../src/index.js";
import { TestGIFImage, TestImage } from "./TestImage.js";
import { getPointerEvent } from "@masatomakino/fake-mouse-event";

describe("DrawableCanvas", () => {
  const pickColor = (canvas: HTMLCanvasElement, x: number, y: number) => {
    const ctx = canvas.getContext("2d");
    const pixel = ctx?.getImageData(x, y, 1, 1);
    return pixel?.data as Uint8ClampedArray;
  };

  const stroke = (
    drawableCanvas: DrawableCanvas,
    x1: number,
    y1: number,
    x2: number,
    y2: number,
  ) => {
    const e = getPointerEvent("pointerdown", {
      offsetX: x1,
      offsetY: y1,
      pointerId: 0,
    });
    drawableCanvas.canvas.dispatchEvent(e);
    drawableCanvas.canvas.dispatchEvent(
      getPointerEvent("pointermove", {
        offsetX: x2,
        offsetY: y2,
        pointerId: 0,
      }),
    );
    drawableCanvas.canvas.dispatchEvent(
      getPointerEvent("pointerup", { offsetX: x2, offsetY: y2, pointerId: 0 }),
    );
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

    drawableCanvas.finishDrawing();
  });

  it("should draw line with eraser", () => {
    const canvas = document.createElement("canvas");
    const drawableCanvas = new DrawableCanvas(canvas);
    drawableCanvas.startDrawing({ mode: "pen", color: "#ff0066", width: 8 });
    stroke(drawableCanvas, 0, 0, canvas.width, canvas.height);
    drawableCanvas.startDrawing({ mode: "eraser", width: 8 });
    stroke(drawableCanvas, 0, canvas.height, canvas.width, 0);

    expect(
      Array.from(pickColor(canvas, canvas.width / 2, canvas.height / 2)),
    ).toEqual([0, 0, 0, 0]);
    expect(Array.from(pickColor(canvas, 0, 0))).toEqual([255, 0, 102, 255]);
  });

  it("should load image", async () => {
    URL.createObjectURL = vi.fn((blob) => {
      return TestImage;
    });

    const canvas = document.createElement("canvas");
    const drawableCanvas = new DrawableCanvas(canvas);
    await drawableCanvas.restoreImage(TestImage);

    expect(Array.from(pickColor(canvas, 0, 0))).toEqual([191, 191, 191, 255]);
    expect(Array.from(pickColor(canvas, 5, 0))).toEqual([255, 255, 255, 255]);
    expect(Array.from(pickColor(canvas, 5, 5))).toEqual([191, 191, 191, 255]);

    vi.restoreAllMocks();
  });

  it("should load image without support type", async () => {
    URL.createObjectURL = vi.fn((blob) => {
      return TestGIFImage;
    });

    const canvas = document.createElement("canvas");
    const drawableCanvas = new DrawableCanvas(canvas);
    await drawableCanvas.restoreImage(TestGIFImage);

    expect(Array.from(pickColor(canvas, 0, 0))).toEqual([0, 0, 0, 0]);
    vi.restoreAllMocks();
  });

  it("load image with Invalid url", async () => {
    const canvas = document.createElement("canvas");
    const drawableCanvas = new DrawableCanvas(canvas);
    expect(
      drawableCanvas.restoreImage("https://example.com/not_exist.png"),
    ).rejects.toThrowError();
  });
});
