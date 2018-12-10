/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./docs/demo/main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./bin/DrawableBitmap.js":
/*!*******************************!*\
  !*** ./bin/DrawableBitmap.js ***!
  \*******************************/
/*! exports provided: DrawableBitmap, DrawingMode, DrawingOption */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"DrawableBitmap\", function() { return DrawableBitmap; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"DrawingMode\", function() { return DrawingMode; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"DrawingOption\", function() { return DrawingOption; });\nvar Bitmap = createjs.Bitmap;\nvar Shape = createjs.Shape;\nvar Point = createjs.Point;\nclass DrawableBitmap extends Bitmap {\n  /**\n   * コンストラクタ\n   * @param {number} w\n   * @param {number} h\n   */\n  constructor(w, h) {\n    super(document.createElement(\"canvas\"));\n    this.isDrawing = false;\n    /**\n     * ストローク処理が開始された際の処理。\n     * ストローク座標を記録する。\n     * @param {createjs.MouseEvent} e\n     */\n\n    this.onStartStroke = e => {\n      this.points.set(e.pointerID, new Point(e.localX, e.localY));\n    };\n    /**\n     * ストローク中の処理\n     * @param {createjs.MouseEvent} e\n     */\n\n\n    this.onStroke = e => {\n      const point = this.points.get(e.pointerID);\n      if (point == null) return;\n      this.updateStrokeStyle();\n      const ctx = this.ctx;\n      ctx.beginPath();\n      ctx.moveTo(point.x, point.y);\n      ctx.lineTo(e.localX, e.localY);\n      ctx.closePath();\n      ctx.stroke();\n      this.points.set(e.pointerID, new Point(e.localX, e.localY));\n    };\n    /**\n     * ストロークが終了した際の処理。\n     * 座標マップから座標値を削除する。\n     * @param {createjs.MouseEvent} e\n     */\n\n\n    this.onFinishStroke = e => {\n      this.points.delete(e.pointerID);\n    };\n\n    this.canvas.width = w;\n    this.canvas.height = h;\n    this.points = new Map();\n    this.clear();\n    this.initHitArea();\n  }\n  /**\n   * ヒットエリアを初期化する。\n   * CreateJSでは透明なピクセルはマウスイベントにヒットしないため、描画エリアの矩形を明示的にヒットエリアに指定する。\n   */\n\n\n  initHitArea() {\n    const area = new Shape();\n    area.graphics.beginFill(\"#000\").drawRect(-this.regX, -this.regY, this.canvas.width, this.canvas.height).endFill();\n    this.hitArea = area;\n  }\n  /**\n   * 描画状態を画像から復元する。\n   * 対応画像はjpegおよびpngのみ。\n   * @param {string} url\n   * @param {RequestMode} mode fetchのモード指定\n   */\n\n\n  restoreImage(url, mode = \"no-cors\") {\n    const init = {\n      method: \"GET\",\n      mode: mode\n    };\n    const myRequest = new Request(url, init);\n    fetch(myRequest).then(response => {\n      return response.blob();\n    }).then(blob => {\n      this.drawImage(blob);\n    });\n  }\n  /**\n   * Fetchで取得したBlobからコンテンツタイプを確認する。\n   * jpg / png ファイルの場合はtrueを返す。\n   * @param blob\n   * @return {boolean}\n   */\n\n\n  isImageType(blob) {\n    switch (blob.type) {\n      case \"image/jpeg\":\n      case \"image/png\":\n        return true;\n    }\n\n    return false;\n  }\n  /**\n   * Fetchで取得したBlobをカンバス上に描画する。\n   * @param blob\n   */\n\n\n  drawImage(blob) {\n    if (!this.isImageType(blob)) return;\n    this.clear();\n    const image = new Image();\n\n    image.onload = () => {\n      this.ctx.drawImage(image, 0, 0);\n    };\n\n    image.src = URL.createObjectURL(blob);\n  }\n  /**\n   * 描画モードを更新する。\n   * 描画モードオプションは指定のある値だけが利用され、未指定のものは現状値が引き継がれる。\n   * @param {DrawingOption} option\n   */\n\n\n  changeMode(option) {\n    this.option = option;\n    const ctx = this.ctx;\n\n    if (this.option.color == null) {\n      this.option.color = ctx.strokeStyle;\n    }\n\n    if (this.option.width == null) {\n      this.option.width = ctx.lineWidth;\n    }\n\n    ctx.strokeStyle = this.option.color;\n    ctx.lineWidth = this.option.width;\n  }\n  /**\n   * ユーザーによるMouse / Touchでの描画操作を開始する。\n   */\n\n\n  startDrawing(option) {\n    this.changeMode(option);\n    if (this.isDrawing) return;\n    this.isDrawing = true;\n    this.addEventListener(\"mousedown\", this.onStartStroke);\n    this.addEventListener(\"pressmove\", this.onStroke);\n    this.addEventListener(\"pressup\", this.onFinishStroke);\n  }\n  /**\n   * ユーザーによるMouse / Touchでの描画操作を終了する。\n   */\n\n\n  finishDrawing() {\n    if (!this.isDrawing) return;\n    this.isDrawing = false;\n    this.removeEventListener(\"mousedown\", this.onStartStroke);\n    this.removeEventListener(\"pressmove\", this.onStroke);\n    this.removeEventListener(\"pressup\", this.onFinishStroke);\n  }\n  /**\n   * 2dコンテクストのストロークスタイルを更新する。\n   * onStroke関数の内部処理。\n   */\n\n\n  updateStrokeStyle() {\n    const ctx = this.ctx;\n\n    switch (this.option.mode) {\n      case DrawingMode.pen:\n        ctx.globalCompositeOperation = \"source-over\";\n        break;\n\n      case DrawingMode.eraser:\n        ctx.globalCompositeOperation = \"destination-out\";\n        break;\n    }\n\n    ctx.strokeStyle = this.option.color;\n    ctx.lineWidth = this.option.width;\n    ctx.lineCap = \"round\";\n    ctx.lineJoin = \"round\";\n  }\n  /**\n   * 画像をクリアする。全ての画素はrgba(0, 0, 0, 0.0)となる。\n   */\n\n\n  clear() {\n    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height); //現在描画中のストロークを中断させる。\n\n    this.points.clear();\n    this.ctx.beginPath();\n  }\n\n  get canvas() {\n    return this.image;\n  }\n\n  get ctx() {\n    return this.canvas.getContext(\"2d\");\n  }\n\n}\nvar DrawingMode;\n\n(function (DrawingMode) {\n  DrawingMode[\"pen\"] = \"pen\";\n  DrawingMode[\"eraser\"] = \"eraser\";\n})(DrawingMode || (DrawingMode = {}));\n\nclass DrawingOption {}\n\n//# sourceURL=webpack:///./bin/DrawableBitmap.js?");

/***/ }),

/***/ "./docs/demo/main.js":
/*!***************************!*\
  !*** ./docs/demo/main.js ***!
  \***************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _bin_DrawableBitmap__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../bin/DrawableBitmap */ \"./bin/DrawableBitmap.js\");\n\nlet stage;\nlet bitmap;\nconst modeSelector = 'input[name=\"mode\"]';\nconst colorSelector = 'input[name=\"color\"]';\nconst widthSelector = 'input[name=\"width\"]';\nconst clearSelector = 'input[name=\"clearButton\"]';\n\nconst onDomContentsLoaded = () => {\n  initInputListener(); //ステージ更新処理\n\n  const updateStage = () => {\n    stage.update();\n  }; //stageの初期化\n\n\n  const canvas = document.getElementById(\"appCanvas\");\n  stage = new createjs.Stage(canvas);\n  stage.enableMouseOver();\n  createjs.Touch.enable(stage);\n  console.log(stage._mouseOverIntervalID);\n  createjs.Ticker.on(\"tick\", updateStage);\n  testBitmap();\n  initDrawing();\n  bitmap.restoreImage(\"./img01.png\");\n};\n\nconst initInputListener = () => {\n  const elm = document.querySelectorAll(modeSelector);\n  elm.forEach(item => {\n    item.onchange = e => {\n      bitmap.startDrawing({\n        mode: e.target.value\n      });\n    };\n  });\n\n  document.querySelector(colorSelector).onchange = e => {\n    bitmap.startDrawing({\n      color: e.target.value\n    });\n  };\n\n  document.querySelector(widthSelector).onchange = e => {\n    bitmap.startDrawing({\n      width: e.target.value\n    });\n  };\n\n  document.querySelector(clearSelector).onclick = e => {\n    bitmap.clear();\n  };\n};\n\nconst testBitmap = () => {\n  bitmap = new _bin_DrawableBitmap__WEBPACK_IMPORTED_MODULE_0__[\"DrawableBitmap\"](640, 480);\n  stage.addChild(bitmap);\n};\n\nconst initDrawing = () => {\n  const mode = document.querySelector(modeSelector + \":checked\").value;\n  const color = document.querySelector(colorSelector).value;\n  const width = document.querySelector(widthSelector).value;\n  bitmap.startDrawing({\n    mode: mode,\n    color: color,\n    width: width\n  });\n};\n/**\n * DOMContentLoaded以降に初期化処理を実行する\n */\n\n\nif (document.readyState !== \"loading\") {\n  onDomContentsLoaded();\n} else {\n  document.addEventListener(\"DOMContentLoaded\", onDomContentsLoaded);\n}\n\n//# sourceURL=webpack:///./docs/demo/main.js?");

/***/ })

/******/ });