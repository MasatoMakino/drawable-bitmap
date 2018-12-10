var Bitmap = createjs.Bitmap;
var Shape = createjs.Shape;
var Point = createjs.Point;
export class DrawableBitmap extends Bitmap {
    /**
     * コンストラクタ
     * @param {number} w
     * @param {number} h
     */
    constructor(w, h) {
        super(document.createElement("canvas"));
        this.isDrawing = false;
        /**
         * ストローク処理が開始された際の処理。
         * ストローク座標を記録する。
         * @param {createjs.MouseEvent} e
         */
        this.onStartStroke = (e) => {
            this.points.set(e.pointerID, new Point(e.localX, e.localY));
        };
        /**
         * ストローク中の処理
         * @param {createjs.MouseEvent} e
         */
        this.onStroke = (e) => {
            const point = this.points.get(e.pointerID);
            if (point == null)
                return;
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
         * ストロークが終了した際の処理。
         * 座標マップから座標値を削除する。
         * @param {createjs.MouseEvent} e
         */
        this.onFinishStroke = (e) => {
            this.points.delete(e.pointerID);
        };
        this.canvas.width = w;
        this.canvas.height = h;
        this.points = new Map();
        this.clear();
        this.initHitArea();
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
    /**
     * 描画状態を画像から復元する。
     * 対応画像はjpegおよびpngのみ。
     * @param {string} url
     * @param {RequestMode} mode fetchのモード指定
     */
    restoreImage(url, mode = "no-cors") {
        const init = {
            method: "GET",
            mode: mode
        };
        const myRequest = new Request(url, init);
        fetch(myRequest)
            .then(response => {
            return response.blob();
        })
            .then(blob => {
            this.drawImage(blob);
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
        if (!this.isImageType(blob))
            return;
        this.clear();
        const image = new Image();
        image.onload = () => {
            this.ctx.drawImage(image, 0, 0);
        };
        image.src = URL.createObjectURL(blob);
    }
    /**
     * 描画モードを更新する。
     * 描画モードオプションは指定のある値だけが利用され、未指定のものは現状値が引き継がれる。
     * @param {DrawingOption} option
     */
    changeMode(option) {
        this.option = option;
        const ctx = this.ctx;
        if (this.option.color == null) {
            this.option.color = ctx.strokeStyle;
        }
        if (this.option.width == null) {
            this.option.width = ctx.lineWidth;
        }
        ctx.strokeStyle = this.option.color;
        ctx.lineWidth = this.option.width;
    }
    /**
     * ユーザーによるMouse / Touchでの描画操作を開始する。
     */
    startDrawing(option) {
        this.changeMode(option);
        if (this.isDrawing)
            return;
        this.isDrawing = true;
        this.addEventListener("mousedown", this.onStartStroke);
        this.addEventListener("pressmove", this.onStroke);
        this.addEventListener("pressup", this.onFinishStroke);
    }
    /**
     * ユーザーによるMouse / Touchでの描画操作を終了する。
     */
    finishDrawing() {
        if (!this.isDrawing)
            return;
        this.isDrawing = false;
        this.removeEventListener("mousedown", this.onStartStroke);
        this.removeEventListener("pressmove", this.onStroke);
        this.removeEventListener("pressup", this.onFinishStroke);
    }
    /**
     * 2dコンテクストのストロークスタイルを更新する。
     * onStroke関数の内部処理。
     */
    updateStrokeStyle() {
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
     * 画像をクリアする。全ての画素はrgba(0, 0, 0, 0.0)となる。
     */
    clear() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        //現在描画中のストロークを中断させる。
        this.points.clear();
        this.ctx.beginPath();
    }
    get canvas() {
        return this.image;
    }
    get ctx() {
        return this.canvas.getContext("2d");
    }
}
export var DrawingMode;
(function (DrawingMode) {
    DrawingMode["pen"] = "pen";
    DrawingMode["eraser"] = "eraser";
})(DrawingMode || (DrawingMode = {}));
export class DrawingOption {
}
