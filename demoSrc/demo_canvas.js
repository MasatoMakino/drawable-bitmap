import { DrawableCanvas } from "..";

let drawableCanvas;

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

  const canvas = document.getElementById("appCanvas");
  drawableCanvas = new DrawableCanvas(canvas);
  initDrawing();

  drawableCanvas.restoreImage("./img01.png");
};

const initInputListener = () => {
  const elm = document.querySelectorAll(modeSelector);
  elm.forEach((item) => {
    item.onchange = (e) => {
      drawableCanvas.startDrawing({ mode: e.target.value });
    };
  });

  document.querySelector(colorSelector).onchange = (e) => {
    drawableCanvas.startDrawing({
      color: e.target.value,
    });
  };

  document.querySelector(widthSelector).onchange = (e) => {
    drawableCanvas.startDrawing({
      width: e.target.value,
    });
  };

  document.querySelector(clearSelector).onclick = (e) => {
    drawableCanvas.clear();
  };
};

const initDrawing = () => {
  const mode = document.querySelector(modeSelector + ":checked").value;
  const color = document.querySelector(colorSelector).value;
  const width = document.querySelector(widthSelector).value;
  drawableCanvas.startDrawing({
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
