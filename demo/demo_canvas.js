(()=>{"use strict";class e{constructor(e){this.canvas=e,this.isDrawing=!1,this.onStroke=e=>{const n=this.points.get(e.pointerId);if(null==n)return;this.updateStrokeStyle();const o=this.canvas.getContext("2d");o.beginPath(),o.moveTo(n.x,n.y),o.lineTo(e.offsetX,e.offsetY),o.closePath(),o.stroke(),this.points.set(e.pointerId,new t(e.offsetX,e.offsetY))},this.onStartStroke=e=>{this.points.set(e.pointerId,new t(e.offsetX,e.offsetY))},this.onFinishStroke=e=>{this.points.delete(e.pointerId)},this.option=new o,this.points=new Map,this.clear()}clear(){const e=this.canvas.getContext("2d");e.clearRect(0,0,this.canvas.width,this.canvas.height),this.points.clear(),e.beginPath()}startDrawing(e){this.changeMode(e),this.isDrawing||(this.isDrawing=!0,this.canvas.addEventListener("pointerdown",this.onStartStroke),this.canvas.addEventListener("pointermove",this.onStroke),this.canvas.addEventListener("pointerup",this.onFinishStroke))}finishDrawing(){this.isDrawing&&(this.isDrawing=!1,this.canvas.removeEventListener("pointerdown",this.onStartStroke),this.canvas.removeEventListener("pointermove",this.onStroke),this.canvas.removeEventListener("pointerup",this.onFinishStroke))}changeMode(e){var t,n;const o=this.canvas.getContext("2d");this.option.mode=e.mode,this.option.color=null!==(t=e.color)&&void 0!==t?t:o.strokeStyle,this.option.width=null!==(n=e.width)&&void 0!==n?n:o.lineWidth,this.updateStrokeStyle()}updateStrokeStyle(){const e=this.canvas.getContext("2d");switch(this.option.mode){case n.pen:e.globalCompositeOperation="source-over";break;case n.eraser:e.globalCompositeOperation="destination-out"}e.strokeStyle=this.option.color,e.lineWidth=this.option.width,e.lineCap="round",e.lineJoin="round"}restoreImage(e,t="no-cors"){const n=new Request(e,{method:"GET",mode:t});fetch(n).then((e=>e.blob())).then((e=>{this.drawImage(e)}))}isImageType(e){switch(e.type){case"image/jpeg":case"image/png":return!0}return!1}drawImage(e){if(!this.isImageType(e))return;const t=this.canvas.getContext("2d");this.clear();const n=new Image;n.onload=()=>{t.drawImage(n,0,0)},n.src=URL.createObjectURL(e)}}class t{constructor(e=0,t=0){this.x=e,this.y=t}}var n;createjs.Bitmap,createjs.Shape,function(e){e.pen="pen",e.eraser="eraser"}(n||(n={}));class o{}let i;const a='input[name="mode"]',s='input[name="color"]',r='input[name="width"]',c=()=>{document.body.innerHTML='\n  <canvas id="appCanvas" width="640" height="480"></canvas>\n    <p>\n      mode:\n      <label><input type="radio" name="mode" value="pen" checked />pen</label>\n      <label><input type="radio" name="mode" value="eraser" />eraser</label>\n    </p>\n    <p>\n        color:\n        <label><input type="color" name="color" value="#ff00ff" /></label>\n    </p>\n    <p>\n        width:\n        <label><input type="number" name="width" min="1" max="20" value="8" /></label>\n    </p>\n    <p>\n        <input type="button" name="clearButton" value="Clear"/>\n    </p>',h();const t=document.getElementById("appCanvas");i=new e(t),l(),i.restoreImage("./img01.png")},h=()=>{document.querySelectorAll(a).forEach((e=>{e.onchange=e=>{i.startDrawing({mode:e.target.value})}})),document.querySelector(s).onchange=e=>{i.startDrawing({color:e.target.value})},document.querySelector(r).onchange=e=>{i.startDrawing({width:e.target.value})},document.querySelector('input[name="clearButton"]').onclick=e=>{i.clear()}},l=()=>{const e=document.querySelector(a+":checked").value,t=document.querySelector(s).value,n=document.querySelector(r).value;i.startDrawing({mode:e,color:t,width:n})};"loading"!==document.readyState?c():document.addEventListener("DOMContentLoaded",c)})();