/// <reference types="easeljs" />
import Bitmap = createjs.Bitmap;
export declare class DrawableBitmap extends Bitmap {
    private option?;
    private isDrawing;
    private points;
    /**
     * コンストラクタ
     * @param {number} w
     * @param {number} h
     */
    constructor(w: number, h: number);
    /**
     * ヒットエリアを初期化する。
     * CreateJSでは透明なピクセルはマウスイベントにヒットしないため、描画エリアの矩形を明示的にヒットエリアに指定する。
     */
    private initHitArea;
    /**
     * 描画状態を画像から復元する
     * @param {string} url
     */
    restoreImage(url: string): void;
    /**
     * 描画モードを更新する。
     * 描画モードオプションは指定のある値だけが利用され、未指定のものは現状値が引き継がれる。
     * @param {DrawingOption} option
     */
    changeMode(option: DrawingOption): void;
    /**
     * ユーザーによるMouse / Touchでの描画操作を開始する。
     */
    startDrawing(option: DrawingOption): void;
    /**
     * ユーザーによるMouse / Touchでの描画操作を終了する。
     */
    finishDrawing(): void;
    /**
     * ストローク処理が開始された際の処理。
     * ストローク座標を記録する。
     * @param {createjs.MouseEvent} e
     */
    private onStartStroke;
    /**
     * ストローク中の処理
     * @param {createjs.MouseEvent} e
     */
    private onStroke;
    /**
     * 2dコンテクストのストロークスタイルを更新する。
     * onStroke関数の内部処理。
     */
    private updateStrokeStyle;
    /**
     * ストロークが終了した際の処理。
     * 座標マップから座標値を削除する。
     * @param {createjs.MouseEvent} e
     */
    private onFinishStroke;
    /**
     * 画像をクリアする。全ての画素はrgba(0, 0, 0, 0.0)となる。
     */
    clear(): void;
    private readonly canvas;
    private readonly ctx;
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