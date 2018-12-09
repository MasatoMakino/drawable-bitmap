import { DrawableBitmap, DrawingMode } from "../../bin/DrawableBitmap";

let stage;
let bitmap;

const onDomContentsLoaded = () => {
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
  startDrawing();
};

const testBitmap = () => {
  bitmap = new DrawableBitmap(640, 480);
  stage.addChild(bitmap);
};

const startDrawing = () => {
  bitmap.startDrawing({
    mode: DrawingMode.pen,
    color: "#F0F",
    width: 1.0
  });
};

const startEraser = () => {
  bitmap.startDrawing({
    mode: DrawingMode.eraser,
    width: 8.0
  });
};

document.addEventListener("keydown", e => {
  console.log(e.key);
  switch (e.key) {
    case "e":
      startEraser();
      break;
    case "d":
      startDrawing();
      break;
    case "c":
      bitmap.clear();
      break;
  }
});

/**
 * DOMContentLoaded以降に初期化処理を実行する
 */
if (document.readyState !== "loading") {
  onDomContentsLoaded();
} else {
  document.addEventListener("DOMContentLoaded", onDomContentsLoaded);
}
