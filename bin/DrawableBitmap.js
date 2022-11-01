var Bitmap = createjs.Bitmap;
var Shape = createjs.Shape;
import { DrawableCanvas } from "./DrawableCanvas";
/**
 * DrawableCanvasをラップしたcreate.jsのディスプレイオブジェクト
 * DrawableCanvasを継承したクラスではない。
 */
export class DrawableBitmap extends Bitmap {
    /**
     * コンストラクタ
     * @param {number} w
     * @param {number} h
     */
    constructor(w, h) {
        super(document.createElement("canvas"));
        this.redirectStartStroke = (e) => {
            this.drawableCanvas.onStartStroke(DrawableBitmap.convertToDrawingEvent(e));
        };
        this.redirectFinishStroke = (e) => {
            this.drawableCanvas.onFinishStroke(DrawableBitmap.convertToDrawingEvent(e));
        };
        this.redirectStroke = (e) => {
            this.drawableCanvas.onStroke(DrawableBitmap.convertToDrawingEvent(e));
        };
        this.canvas.width = w;
        this.canvas.height = h;
        this.drawableCanvas = new DrawableCanvas(this.canvas);
        this.initHitArea();
    }
    /**
     * ユーザーによるMouse / Touchでの描画操作を開始する。
     */
    startDisplayObjectDrawing(option) {
        this.drawableCanvas.changeMode(option);
        if (this.isDrawing)
            return;
        this.isDrawing = true;
        this.addEventListener("mousedown", this.redirectStartStroke);
        this.addEventListener("pressmove", this.redirectStroke);
        this.addEventListener("pressup", this.redirectFinishStroke);
    }
    /**
     * ユーザーによるMouse / Touchでの描画操作を終了する。
     */
    finishDisplayObjectDrawing() {
        if (!this.isDrawing)
            return;
        this.isDrawing = false;
        this.removeEventListener("mousedown", this.redirectStartStroke);
        this.removeEventListener("pressmove", this.redirectStroke);
        this.removeEventListener("pressup", this.redirectFinishStroke);
    }
    static convertToDrawingEvent(e) {
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
    initHitArea() {
        const area = new Shape();
        area.graphics
            .beginFill("#000")
            .drawRect(-this.regX, -this.regY, this.canvas.width, this.canvas.height)
            .endFill();
        this.hitArea = area;
    }
    get canvas() {
        return this.image;
    }
}
export var DrawingMode;
(function (DrawingMode) {
    DrawingMode["pen"] = "pen";
    DrawingMode["eraser"] = "eraser";
})(DrawingMode || (DrawingMode = {}));
export class DrawingOption {
}
