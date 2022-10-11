const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const lineWidth = document.querySelector(".line-width");
const color = document.querySelector(".color");
const colorOptions = document.querySelectorAll(".color-option");
const modeBtn = document.querySelector(".mode-btn");
const eraseAllBtn = document.querySelector(".erase-all-btn");
const eraserBtn = document.querySelector(".eraser-btn");

let isPainting = false;
let isFilling = false;
let isEraser = false;

const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 800;

canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;
ctx.lineWidth = lineWidth.value;

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

function onColorChange(event) {
    colorChange(event.target.value);
}

function onColorClick(event) {
    const colorValue = event.target.dataset.color;
    colorChange(colorValue);
    color.value = colorValue;
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

lineWidth.addEventListener("change", onLineWidthChange);
color.addEventListener("change", onColorChange);

canvas.addEventListener("mousedown", startPainting);
canvas.addEventListener("mousemove", onMouseMove);
canvas.addEventListener("mouseup", cancelPainting);
canvas.addEventListener("mouseleave", cancelPainting);
canvas.addEventListener("click", onCanvasClick);

colorOptions.forEach((color) => color.addEventListener("click", onColorClick));

modeBtn.addEventListener("click", onModeClick);
eraserBtn.addEventListener("click", onEraserClick);
eraseAllBtn.addEventListener("click", onEraseAllClick);
