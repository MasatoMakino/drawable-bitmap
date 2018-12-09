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

  /**
   * 描画状態を画像から復元する
   * @param {string} url
   */
  public restoreImage(url: string): void {}

  /**
   * 描画モードを更新する。
   * 描画モードオプションは指定のある値だけが利用され、未指定のものは現状値が引き継がれる。
   * @param {DrawingOption} option
   */
  public changeMode(option: DrawingOption): void {
    this.option = option;

    const ctx = this.ctx;
    if (this.option.color == null) {
      this.option.color = ctx.strokeStyle as string;
    }
    if (this.option.width == null) {
      this.option.width = ctx.lineWidth;
    }
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

  /**
   * ストローク処理が開始された際の処理。
   * ストローク座標を記録する。
   * @param {createjs.MouseEvent} e
   */
  private onStartStroke = (e: MouseEvent) => {
    this.points.set(e.pointerID, new Point(e.localX, e.localY));
  };

  /**
   * ストローク中の処理
   * @param {createjs.MouseEvent} e
   */
  private onStroke = (e: MouseEvent) => {
    const point = this.points.get(e.pointerID);
    if (point == null) return;

    this.updateStrokeStyle();

    const ctx = this.ctx;
    ctx.beginPath();
    ctx.moveTo(point.x, point.y);
    ctx.lineTo(e.localX, e.localY);
    ctx.closePath();
    ctx.stroke();

    this.points.set(e.pointerID, new Point(e.localX, e.localY));
  };

  /**
   * 2dコンテクストのストロークスタイルを更新する。
   * onStroke関数の内部処理。
   */
  private updateStrokeStyle(): void {
    const ctx = this.ctx;
    switch (this.option.mode) {
      case DrawingMode.pen:
        ctx.globalCompositeOperation = "source-over";
        break;
      case DrawingMode.eraser:
        ctx.globalCompositeOperation = "destination-out";
        break;
    }
    ctx.strokeStyle = this.option.color;
    ctx.lineWidth = this.option.width;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
  }

  /**
   * ストロークが終了した際の処理。
   * 座標マップから座標値を削除する。
   * @param {createjs.MouseEvent} e
   */
  private onFinishStroke = (e: MouseEvent) => {
    this.points.delete(e.pointerID);
  };

  /**
   * 画像をクリアする。全ての画素はrgba(0, 0, 0, 0.0)となる。
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
