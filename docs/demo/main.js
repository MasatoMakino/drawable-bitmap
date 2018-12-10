import { DrawableBitmap, DrawingMode } from "../../bin/DrawableBitmap";

let stage;
let bitmap;

const modeSelector = 'input[name="mode"]';
const colorSelector = 'input[name="color"]';
const widthSelector = 'input[name="width"]';
const clearSelector = 'input[name="clearButton"]';

const onDomContentsLoaded = () => {
  initInputListener();

  //ステージ更新処理
  const updateStage = () => {
    stage.update();
  };

  //stageの初期化
  const canvas = document.getElementById("appCanvas");
  stage = new createjs.Stage(canvas);
  stage.enableMouseOver();
  createjs.Touch.enable(stage);
  console.log(stage._mouseOverIntervalID);

  createjs.Ticker.on("tick", updateStage);
  testBitmap();
  initDrawing();

  bitmap.restoreImage("./img02.jpg");
};

const initInputListener = () => {
  const elm = document.querySelectorAll(modeSelector);
  elm.forEach(item => {
    item.onchange = e => {
      bitmap.startDrawing({ mode: e.target.value });
    };
  });

  document.querySelector(colorSelector).onchange = e => {
    bitmap.startDrawing({
      color: e.target.value
    });
  };

  document.querySelector(widthSelector).onchange = e => {
    bitmap.startDrawing({
      width: e.target.value
    });
  };

  document.querySelector(clearSelector).onclick = e => {
    bitmap.clear();
  };
};

const testBitmap = () => {
  bitmap = new DrawableBitmap(640, 480);
  stage.addChild(bitmap);
};

const initDrawing = () => {
  const mode = document.querySelector(modeSelector + ":checked").value;
  const color = document.querySelector(colorSelector).value;
  const width = document.querySelector(widthSelector).value;
  bitmap.startDrawing({
    mode: mode,
    color: color,
    width: width
  });
};

/**
 * DOMContentLoaded以降に初期化処理を実行する
 */
if (document.readyState !== "loading") {
  onDomContentsLoaded();
} else {
  document.addEventListener("DOMContentLoaded", onDomContentsLoaded);
}
