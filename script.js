const DEFAULT_COLOR = "#b6b6b6";
const DEFAULT_MODE = "color";
const DEFAULT_SIZE = 16;

let currentColor = DEFAULT_COLOR;
let currentMode = DEFAULT_MODE;
let currentSize = DEFAULT_SIZE;

let sketchGrid = document.querySelector(".sketch-grid");
const colorPicker = document.getElementById("fav-color");
const rainbowBtn = document.getElementById("rainbowBtn");
const eraser = document.getElementById("knob-eraser");

colorPicker.oninput = (e) => {
  setCurrentColor(e.target.value);
  setCurrentMode("color");
};
rainbowBtn.onclick = () => setCurrentMode("rainbow");
eraser.onclick = () => setCurrentMode("eraser");

let mouseDown = false;
document.body.onmousedown = () => (mouseDown = true);
document.body.onmouseup = () => (mouseDown = false);

const reloadGrid = () => {
  clearGrid();
  setupGrid(currentSize);
};

const clearGrid = () => {
  sketchGrid.innerHTML = "";
};

const gridClean = () => {
  setupGrid(1);
};

const setCurrentColor = (newColor) => {
  currentColor = newColor;
};

const setCurrentMode = (newMode) => {
  activateButton(newMode);
  currentMode = newMode;
};

const setupGrid = (quantity) => {
  clearGrid();
  for (let i = 0; i < quantity * quantity; i++) {
    const sketchElement = document.createElement("div");
    sketchGrid.style = `grid-template-columns: repeat(${quantity}, auto); grid-template-rows: repeat(${quantity}, auto);`;
    sketchElement.id = `board-tile-${i}`;
    sketchElement.classList.add("board-tile");
    sketchElement.addEventListener("mouseover", changeColor);
    sketchElement.addEventListener("mousedown", changeColor);
    sketchGrid.appendChild(sketchElement);
  }
};

const changeColor = (e) => {
  const rgbToHex = (r, g, b) => {
    return "#" + ((1 << 24) | (r << 16) | (g << 8) | b).toString(16).slice(1);
  };

  if (e.type === "mouseover" && !mouseDown) return;
  if (currentMode === "rainbow") {
    const randomR = Math.floor(Math.random() * 256);
    const randomG = Math.floor(Math.random() * 256);
    const randomB = Math.floor(Math.random() * 256);
    e.target.style.backgroundColor = `rgb(${randomR}, ${randomG}, ${randomB})`;
    colorPicker.value = `${rgbToHex(randomR, randomG, randomB)}`;
  } else if (currentMode === "color") {
    e.target.style.backgroundColor = currentColor;
  } else if (currentMode === "eraser") {
    e.target.style.backgroundColor = "#f2f2f2";
  }
};

const activateButton = (newMode) => {
  if (currentMode === "rainbow") {
    rainbowBtn.classList.remove("active");
  } else if (currentMode === "color") {
    colorPicker.classList.remove("active");
  } else if (currentMode === "eraser") {
    eraser.classList.remove("active");
  }

  if (newMode === "rainbow") {
    rainbowBtn.classList.add("active");
  } else if (newMode === "color") {
    colorPicker.classList.add("active");
  } else if (newMode === "eraser") {
    eraser.classList.add("active");
  }
};

window.onload = () => {
  setupGrid(DEFAULT_SIZE);
  activateButton(DEFAULT_MODE);
};
