const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const lineWidth = document.querySelector(".line-width");
const color = document.querySelector(".color-input");
const colorOptions = document.querySelectorAll(".color-option");
const modeBtn = document.querySelector(".mode-btn");
const eraseAllBtn = document.querySelector(".erase-all-btn");
const eraserBtn = document.querySelector(".eraser-btn");
const fileInput = document.querySelector(".file-input");
const textInput = document.querySelector(".text-input");
const saveBtn = document.querySelector(".save-btn");

let isPainting = false;
let isFilling = false;
let isEraser = false;

const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 800;

canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;
ctx.lineWidth = lineWidth.value;
ctx.lineCap = "round";

function startPainting(event) {
    isPainting = true;
}

function onMouseMove(event) {
    if (isPainting) {
        ctx.lineTo(event.offsetX, event.offsetY);
        ctx.stroke();
    }
    ctx.moveTo(event.offsetX, event.offsetY);
}

function cancelPainting(event) {
    ctx.beginPath();
    isPainting = false;
}

function onLineWidthChange(event) {
    ctx.lineWidth = event.target.value;
}

function colorChange(colorValue) {
    ctx.strokeStyle = colorValue;
    ctx.fillStyle = colorValue;
}

function colorOptionsBorderReset() {
    colorOptions.forEach((item) =>
        item.classList.remove("color-option--active")
    );
}

function onColorChange(event) {
    colorChange(event.target.value);
    colorOptionsBorderReset();
}

function onColorClick(event) {
    const colorValue = event.target.dataset.color;
    colorChange(colorValue);
    color.value = colorValue;
    colorOptionsBorderReset();
    event.target.classList.add("color-option--active");
}

function onModeClick(event) {
    if (isFilling) {
        isFilling = false;
        modeBtn.innerText = "Fill";
    } else {
        isFilling = true;
        modeBtn.innerText = "Draw";
    }
}

function fillAll() {
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function onCanvasClick(event) {
    if (isFilling) {
        fillAll();
    }
}

function onEraseAllClick(event) {
    ctx.fillStyle = "white";
    fillAll();
    ctx.fillStyle = color.value;
}

function onEraserClick(event) {
    if (isEraser) {
        isEraser = false;
        eraserBtn.classList.remove("btn--active");
        ctx.strokeStyle = color.value;
    } else {
        isEraser = true;
        ctx.strokeStyle = "white";
        isFilling = false;
        modeBtn.innerText = "Fill";
        eraserBtn.classList.add("btn--active");
    }
}

function onFileChange(event) {
    const file = event.target.files[0];
    const url = URL.createObjectURL(file);
    const image = new Image();
    image.src = url;
    image.onload = function () {
        ctx.drawImage(image, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        fileInput.value = null;
    };
}

function onDoubleClick(event) {
    const text = textInput.value;
    if (text !== "") {
        ctx.save();
        ctx.lineWidth = 1;
        ctx.font = "48px Noto Sans KR"; //"48px serif";
        // ctx.strokeText(textInput.value, event.offsetX, event.offsetY);
        ctx.fillText(text, event.offsetX, event.offsetY);
        ctx.restore();
    }
}

function onSaveClick() {
    const url = canvas.toDataURL();
    const a = document.createElement("a");
    a.href = url;
    a.download = "myDrawing.png";
    a.click();
}

lineWidth.addEventListener("change", onLineWidthChange);
color.addEventListener("change", onColorChange);

canvas.addEventListener("mousedown", startPainting);
canvas.addEventListener("mousemove", onMouseMove);
canvas.addEventListener("mouseup", cancelPainting);
canvas.addEventListener("mouseleave", cancelPainting);
canvas.addEventListener("click", onCanvasClick);
canvas.addEventListener("dblclick", onDoubleClick);

colorOptions.forEach((color) => color.addEventListener("click", onColorClick));

modeBtn.addEventListener("click", onModeClick);
eraserBtn.addEventListener("click", onEraserClick);
eraseAllBtn.addEventListener("click", onEraseAllClick);
fileInput.addEventListener("change", onFileChange);
saveBtn.addEventListener("click", onSaveClick);
