import { DrawingOption } from "./index.js";
export class DrawableCanvas {
    constructor(canvas) {
        this.canvas = canvas;
        this.isDrawing = false;
        /**
         * ストローク中の処理
         */
        this.onStroke = (e) => {
            const point = this.points.get(e.pointerId);
            if (point == null)
                return;
            this.updateStrokeStyle();
            const ctx = this.canvas.getContext("2d");
            ctx.beginPath();
            ctx.moveTo(point.x, point.y);
            ctx.lineTo(e.offsetX, e.offsetY);
            ctx.closePath();
            ctx.stroke();
            this.points.set(e.pointerId, new StrokePoint(e.offsetX, e.offsetY));
        };
        /**
         * ストローク処理が開始された際の処理。
         * ストローク座標を記録する。
         */
        this.onStartStroke = (e) => {
            this.points.set(e.pointerId, new StrokePoint(e.offsetX, e.offsetY));
        };
        /**
         * ストロークが終了した際の処理。
         * 座標マップから座標値を削除する。
         * @param {PointerEvent} e
         */
        this.onFinishStroke = (e) => {
            this.points.delete(e.pointerId);
        };
        this.option = new DrawingOption();
        this.points = new Map();
        this.clear();
    }
    clear() {
        const ctx = this.canvas.getContext("2d");
        ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        //現在描画中のストロークを中断させる。
        this.points.clear();
        ctx.beginPath();
    }
    /**
     * ユーザーによるMouse / Touchでの描画操作を開始する。
     */
    startDrawing(option) {
        this.changeMode(option);
        if (this.isDrawing)
            return;
        this.isDrawing = true;
        this.canvas.addEventListener("pointerdown", this.onStartStroke);
        this.canvas.addEventListener("pointermove", this.onStroke);
        this.canvas.addEventListener("pointerup", this.onFinishStroke);
    }
    /**
     * ユーザーによるMouse / Touchでの描画操作を終了する。
     */
    finishDrawing() {
        if (!this.isDrawing)
            return;
        this.isDrawing = false;
        this.canvas.removeEventListener("pointerdown", this.onStartStroke);
        this.canvas.removeEventListener("pointermove", this.onStroke);
        this.canvas.removeEventListener("pointerup", this.onFinishStroke);
    }
    /**
     * 描画モードを更新する。
     * 描画モードオプションは指定のある値だけが利用され、未指定のものは現状値が引き継がれる。
     * @param {DrawingOption} option
     */
    changeMode(option) {
        const ctx = this.canvas.getContext("2d");
        this.option.mode = option.mode;
        this.option.color = option.color ?? ctx.strokeStyle;
        this.option.width = option.width ?? ctx.lineWidth;
        this.updateStrokeStyle();
    }
    /**
     * 2dコンテクストのストロークスタイルを更新する。
     * onStroke関数の内部処理。
     */
    updateStrokeStyle() {
        const ctx = this.canvas.getContext("2d");
        switch (this.option.mode) {
            case "pen":
                ctx.globalCompositeOperation = "source-over";
                break;
            case "eraser":
                ctx.globalCompositeOperation = "destination-out";
                break;
        }
        ctx.strokeStyle = this.option.color;
        ctx.lineWidth = this.option.width;
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
    }
    /**
     * 描画状態を画像から復元する。
     * 対応画像はjpegおよびpngのみ。
     * @param {string} url
     * @param {RequestMode} mode fetchのモード指定
     */
    restoreImage(url, mode = "no-cors") {
        const init = {
            method: "GET",
            mode: mode,
        };
        const myRequest = new Request(url, init);
        return fetch(myRequest)
            .then((response) => {
            return response.blob();
        })
            .then((blob) => {
            return this.drawImage(blob);
        });
    }
    /**
     * Fetchで取得したBlobからコンテンツタイプを確認する。
     * jpg / png ファイルの場合はtrueを返す。
     * @param blob
     * @return {boolean}
     */
    isImageType(blob) {
        switch (blob.type) {
            case "image/jpeg":
            case "image/png":
                return true;
        }
        return false;
    }
    /**
     * Fetchで取得したBlobをカンバス上に描画する。
     * @param blob
     */
    drawImage(blob) {
        return new Promise((resolve, reject) => {
            if (!this.isImageType(blob)) {
                resolve();
            }
            const image = new Image();
            const ctx = this.canvas.getContext("2d");
            this.clear();
            image.onload = () => {
                ctx.drawImage(image, 0, 0);
                resolve();
            };
            image.onerror = () => {
                reject();
            };
            image.src = URL.createObjectURL(blob);
        });
    }
}
export class StrokePoint {
    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }
}
