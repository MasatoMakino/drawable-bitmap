import { DrawingOption } from "./index.js";
export declare class DrawableCanvas {
    canvas: HTMLCanvasElement;
    private option?;
    private isDrawing;
    private points;
    constructor(canvas: HTMLCanvasElement);
    clear(): void;
    /**
     * ストローク中の処理
     */
    onStroke: (e: DrawingEvent) => void;
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
     */
    onStartStroke: (e: DrawingEvent) => void;
    /**
     * ストロークが終了した際の処理。
     * 座標マップから座標値を削除する。
     * @param {PointerEvent} e
     */
    onFinishStroke: (e: DrawingEvent) => void;
    /**
     * 描画モードを更新する。
     * 描画モードオプションは指定のある値だけが利用され、未指定のものは現状値が引き継がれる。
     * @param {DrawingOption} option
     */
    changeMode(option: DrawingOption): void;
    /**
     * 2dコンテクストのストロークスタイルを更新する。
     * onStroke関数の内部処理。
     */
    private updateStrokeStyle;
    /**
     * 描画状態を画像から復元する。
     * 対応画像はjpegおよびpngのみ。
     * @param {string} url
     * @param {RequestMode} mode fetchのモード指定
     */
    restoreImage(url: string, mode?: RequestMode): void;
    /**
     * Fetchで取得したBlobからコンテンツタイプを確認する。
     * jpg / png ファイルの場合はtrueを返す。
     * @param blob
     * @return {boolean}
     */
    private isImageType;
    /**
     * Fetchで取得したBlobをカンバス上に描画する。
     * @param blob
     */
    private drawImage;
}
export declare class StrokePoint {
    x: number;
    y: number;
    constructor(x?: number, y?: number);
}
export interface DrawingEvent {
    pointerId: number;
    offsetX: number;
    offsetY: number;
}
//# sourceMappingURL=DrawableCanvas.d.ts.map