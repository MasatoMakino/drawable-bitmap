import Bitmap = createjs.Bitmap;
import MouseEvent = createjs.MouseEvent;
import Shape = createjs.Shape;

export class DrawableBitmap extends Bitmap {
  private option?: DrawingOption;
  private isDrawing: boolean = false;
  /**
   * コンストラクタ
   * @param {number} w
   * @param {number} h
   */
  constructor(w: number, h: number) {
    super(document.createElement("canvas"));
    this.canvas.width = w;
    this.canvas.height = h;
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
  public startDrawing(): void {
    if (this.isDrawing) return;
    this.isDrawing = true;

    this.addEventListener("mousedown", this.onStartStroke);
    this.addEventListener("pressmove", this.onStroke);
    this.addEventListener("pressup", this.onFinishStroke);
    console.log("start");
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

  private onStartStroke(e: MouseEvent): void {
    console.log("ID : ", e.pointerID, e.localX, e.localY);
  }

  private onStroke(e: MouseEvent): void {
    console.log("ID : ", e.pointerID, e.localX, e.localY);
  }

  private onFinishStroke(e: MouseEvent): void {
    console.log("ID : ", e.pointerID, e.localX, e.localY);
  }

  /**
   * 画像をクリアする。全ての画素はrgba( 0, 0, 0, 0.0)となる。
   */
  public clear(): void {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
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
  color?: number;
}
