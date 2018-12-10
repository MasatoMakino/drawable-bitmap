# createjs-drawable-bitmap

[![Maintainability](https://api.codeclimate.com/v1/badges/f90aab522723c812411a/maintainability)](https://codeclimate.com/github/MasatoMakino/createjs-drawable-bitmap/maintainability)
[![MIT License](http://img.shields.io/badge/license-MIT-blue.svg?style=flat)](LICENSE)

## Demo

[Demo Page](https://masatomakino.github.io/createjs-drawable-bitmap/demo/index.html)

## Getting Started

### Install

createjs-drawable-bitmap depend on [CreateJS / EaselJS](https://github.com/CreateJS/EaselJS)

```bash
npm install easeljs --save-dev
```

or load script files in html.

```html
<script src="https://code.createjs.com/1.0.0/easeljs.min.js"></script>
```

and

```bash
npm install https://github.com/MasatoMakino/createjs-drawable-bitmap.git --save-dev
```

### Import

createjs-drawable-bitmap is composed of ES6 modules and TypeScript d.ts files.

At first, import classes.

```js
import { DrawableBitmap } from "createjs-drawable-bitmap";
```

### Add bitmap

```js
let bitmap = new DrawableBitmap(640, 480);
stage.addChild(bitmap);
bitmap.startDrawing({
  mode: "pen"
});
```

[API documents](https://masatomakino.github.io/createjs-drawable-bitmap/api/index.html)

### Multi touch support

If you need multi-touch support, enable [Touch Class](https://createjs.com/docs/easeljs/classes/Touch.html).

```js
createjs.Touch.enable(stage);
```


## License

createjs-drawable-bitmap is [MIT licensed](LICENSE).