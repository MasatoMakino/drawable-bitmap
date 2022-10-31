import Bitmap = createjs.Bitmap;
import Shape = createjs.Shape;
import { DrawableCanvas, DrawingEvent } from "./DrawableCanvas";
import MouseEvent = createjs.MouseEvent;

/**
 * DrawableCanvasをラップしたcreate.jsのディスプレイオブジェクト
 * DrawableCanvasを継承したクラスではない。
 */
export class DrawableBitmap extends Bitmap {
  public drawableCanvas: DrawableCanvas;
  private isDrawing: boolean;

  /**
   * コンストラクタ
   * @param {number} w
   * @param {number} h
   */
  constructor(w: number, h: number) {
    super(document.createElement("canvas"));
    this.canvas.width = w;
    this.canvas.height = h;
    this.drawableCanvas = new DrawableCanvas(this.canvas);
    this.initHitArea();
  }

  /**
   * ユーザーによるMouse / Touchでの描画操作を開始する。
   */
  public startDrawing(option: DrawingOption): void {
    this.drawableCanvas.changeMode(option);
    if (this.isDrawing) return;
    this.isDrawing = true;

    this.addEventListener("mousedown", this.onStartStroke);
    this.addEventListener("pressmove", this.onStroke);
    this.addEventListener("pressup", this.onFinishStroke);
  }
  /**
   * ユーザーによるMouse / Touchでの描画操作を終了する。
   */
  public finishDrawing(): void {
    if (!this.isDrawing) return;
    this.isDrawing = false;

    this.removeEventListener("mousedown", this.onStartStroke);
    this.removeEventListener("pressmove", this.onStroke);
    this.removeEventListener("pressup", this.onFinishStroke);
  }

  public onStartStroke = (e) => {
    console.log(e);
    this.drawableCanvas.onStartStroke(DrawableBitmap.convertToDrawingEvent(e));
  };

  public onFinishStroke = (e) => {
    this.drawableCanvas.onFinishStroke(DrawableBitmap.convertToDrawingEvent(e));
  };

  public onStroke = (e) => {
    this.drawableCanvas.onStroke(DrawableBitmap.convertToDrawingEvent(e));
  };

  private static convertToDrawingEvent(e: MouseEvent): DrawingEvent {
    return {
      pointerId: e.pointerID,
      offsetX: e.localX,
      offsetY: e.localY,
    };
  }

  /**
   * ヒットエリアを初期化する。
   * CreateJSでは透明なピクセルはマウスイベントにヒットしないため、描画エリアの矩形を明示的にヒットエリアに指定する。
   */
  private initHitArea(): void {
    const area = new Shape();
    area.graphics
      .beginFill("#000")
      .drawRect(-this.regX, -this.regY, this.canvas.width, this.canvas.height)
      .endFill();
    this.hitArea = area;
  }

  private get canvas(): HTMLCanvasElement {
    return this.image as HTMLCanvasElement;
  }
}

export enum DrawingMode {
  pen = "pen",
  eraser = "eraser",
}

export class DrawingOption {
  mode: DrawingMode;
  color?: string;
  width?: number;
}
