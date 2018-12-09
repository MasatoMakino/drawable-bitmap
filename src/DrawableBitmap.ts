import Bitmap = createjs.Bitmap;
import MouseEvent = createjs.MouseEvent;
import Shape = createjs.Shape;
import Point = createjs.Point;

export class DrawableBitmap extends Bitmap {
  private option?: DrawingOption;
  private isDrawing: boolean = false;
  private points: Map<number, Point>;
  /**
   * コンストラクタ
   * @param {number} w
   * @param {number} h
   */
  constructor(w: number, h: number) {
    super(document.createElement("canvas"));
    this.canvas.width = w;
    this.canvas.height = h;
    this.points = new Map<number, Point>();
    this.clear();
    this.initHitArea();
  }

  private initHitArea(): void {
    const area = new Shape();
    area.graphics
      .beginFill("#000")
      .drawRect(-this.regX, -this.regY, this.canvas.width, this.canvas.height)
      .endFill();
    this.hitArea = area;
  }
  /**
   * 描画状態を画像から復元する
   * @param {string} url
   */
  public restoreImage(url: string): void {}

  public changeMode(option: DrawingOption): void {
    this.option = option;
  }

  /**
   * ユーザーによるMouse / Touchでの描画操作を開始する。
   */
  public startDrawing(option: DrawingOption): void {
    this.changeMode(option);

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

  private onStartStroke = (e: MouseEvent) => {
    this.points.set(e.pointerID, new Point(e.localX, e.localY));
  };

  private onStroke = (e: MouseEvent) => {

    const point = this.points.get(e.pointerID);
    if (point == null) return;

    const ctx = this.ctx;

    switch (this.option.mode) {
      case DrawingMode.pen:
        ctx.globalCompositeOperation = "source-over";
        ctx.strokeStyle = this.option.color;
        break;
      case DrawingMode.eraser:
        ctx.globalCompositeOperation = "destination-out";
        break;
    }
    ctx.lineWidth = this.option.width;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";

    ctx.beginPath();
    ctx.moveTo(point.x, point.y);
    ctx.lineTo(e.localX, e.localY);
    ctx.closePath();
    ctx.stroke();

    this.points.set(e.pointerID, new Point(e.localX, e.localY));
  };

  private onFinishStroke = (e: MouseEvent) => {
    this.points.delete(e.pointerID);
  };

  /**
   * 画像をクリアする。全ての画素はrgba( 0, 0, 0, 0.0)となる。
   */
  public clear(): void {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    //現在描画中のストロークを中断させる。
    this.points.clear();
    this.ctx.beginPath();
  }

  private get canvas(): HTMLCanvasElement {
    return this.image as HTMLCanvasElement;
  }

  private get ctx() {
    return this.canvas.getContext("2d");
  }
}

export enum DrawingMode {
  pen = "pen",
  eraser = "eraser"
}

export class DrawingOption {
  mode: DrawingMode;
  color?: string;
  width?: number;
}
