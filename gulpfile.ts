const { dest, parallel, series, src, watch } = require("gulp");

const doc = require("gulptask-tsdoc").get();
const server = require("gulptask-dev-server").get("./docs/demo");
const { bundleDemo, watchDemo } = require("gulptask-demo-page").get({
  externalScripts: ["//code.createjs.com/1.0.0/easeljs.min.js"],
  body: `  <canvas id="appCanvas" width="640" height="480"></canvas>
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
    </p>`
});

const copyGlob = "./demoSrc/**/*.{png,jpg,jpeg}";
const copy = () => {
  return src(copyGlob, { base: "./demoSrc/" }).pipe(dest("./docs/demo"));
};

const { tsc, tscClean, watchTsc } = require("gulptask-tsc").get();

const watchTasks = async () => {
  watchDemo();
  watchTsc();
  watch(copyGlob, copy);
};

exports.start_dev = series(watchTasks, server);
exports.build = series(tsc, copy, bundleDemo, doc);
exports.build_clean = series(tscClean, copy, bundleDemo, doc);
