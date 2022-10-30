const { dest, series, src, watch } = require("gulp");

const doc = require("gulptask-tsdoc").generateTask();
const server = require("@masatomakino/gulptask-dev-server").generateTask(
  "./docs/demo"
);
const { bundleDemo, watchDemo } =
  require("@masatomakino/gulptask-demo-page").generateTasks({
    externalScripts: ["//code.createjs.com/1.0.0/easeljs.min.js"],
  });

const copyGlob = "./demoSrc/**/*.{png,jpg,jpeg}";
const copy = () => {
  return src(copyGlob, { base: "./demoSrc/" }).pipe(dest("./docs/demo"));
};

const { tsc, watchTsc } = require("gulptask-tsc").generateTasks();

const watchTasks = async () => {
  watchDemo();
  watchTsc();
  watch(copyGlob, copy);
};

exports.start_dev = series(watchTasks, server);
exports.build = series(tsc, copy, bundleDemo, doc);
