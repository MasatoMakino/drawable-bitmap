/// <reference types="easeljs" />
import Bitmap = createjs.Bitmap;
import { DrawableCanvas } from "./DrawableCanvas";
/**
 * DrawableCanvasをラップしたcreate.jsのディスプレイオブジェクト
 * DrawableCanvasを継承したクラスではない。
 */
export declare class DrawableBitmap extends Bitmap {
    drawableCanvas: DrawableCanvas;
    private isDrawing;
    /**
     * コンストラクタ
     * @param {number} w
     * @param {number} h
     */
    constructor(w: number, h: number);
    /**
     * ユーザーによるMouse / Touchでの描画操作を開始する。
     */
    startDisplayObjectDrawing(option: DrawingOption): void;
    /**
     * ユーザーによるMouse / Touchでの描画操作を終了する。
     */
    finishDisplayObjectDrawing(): void;
    private redirectStartStroke;
    private redirectFinishStroke;
    private redirectStroke;
    private static convertToDrawingEvent;
    /**
     * ヒットエリアを初期化する。
     * CreateJSでは透明なピクセルはマウスイベントにヒットしないため、描画エリアの矩形を明示的にヒットエリアに指定する。
     */
    private initHitArea;
    private get canvas();
}
export declare enum DrawingMode {
    pen = "pen",
    eraser = "eraser"
}
export declare class DrawingOption {
    mode: DrawingMode;
    color?: string;
    width?: number;
}
//# sourceMappingURL=DrawableBitmap.d.ts.map