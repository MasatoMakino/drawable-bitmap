import { DrawableBitmap } from "..";

let stage;
let bitmap;

const modeSelector = 'input[name="mode"]';
const colorSelector = 'input[name="color"]';
const widthSelector = 'input[name="width"]';
const clearSelector = 'input[name="clearButton"]';

const initInput = () => {
  document.body.innerHTML =
    //language html
    `
  <canvas id="appCanvas" width="640" height="480"></canvas>
    <p>
      mode:
      <label><input type="radio" name="mode" value="pen" checked />pen</label>
      <label><input type="radio" name="mode" value="eraser" />eraser</label>
    </p>
    <p>
        color:
        <label><input type="color" name="color" value="#ff00ff" /></label>
    </p>
    <p>
        width:
        <label><input type="number" name="width" min="1" max="20" value="8" /></label>
    </p>
    <p>
        <input type="button" name="clearButton" value="Clear"/>
    </p>`;
};
const onDomContentsLoaded = () => {
  initInput();
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

  createjs.Ticker.on("tick", updateStage);
  testBitmap();
  initDrawing();
  bitmap.drawableCanvas.restoreImage("./img01.png");
};

const initInputListener = () => {
  const elm = document.querySelectorAll(modeSelector);
  elm.forEach((item) => {
    item.onchange = (e) => {
      bitmap.drawableCanvas.startDrawing({ mode: e.target.value });
    };
  });

  document.querySelector(colorSelector).onchange = (e) => {
    bitmap.drawableCanvas.startDrawing({
      color: e.target.value,
    });
  };

  document.querySelector(widthSelector).onchange = (e) => {
    bitmap.drawableCanvas.startDrawing({
      width: e.target.value,
    });
  };

  document.querySelector(clearSelector).onclick = (e) => {
    bitmap.drawableCanvas.clear();
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
    width: width,
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
