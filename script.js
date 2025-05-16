
const images = [
  { name: "image1.jpg", rows: 4, cols: 4 },
  { name: "image2.jpg", rows: 9, cols: 9 },
  { name: "image3.jpg", rows: 4, cols: 4 },
  { name: "image4.jpg", rows: 8, cols: 8 },
  { name: "image5.jpg", rows: 5, cols: 5 },
  { name: "image6.jpg", rows: 3, cols: 3 },
  { name: "image7.jpg", rows: 4, cols: 4 },
];

let currentIndex = 0;
let locked = false;
const container = document.getElementById("image-container");
const title = document.getElementById("title");
const maskInfo = document.getElementById("mask-info");

function createGrid(image, rows, cols) {
  container.innerHTML = "";
  const img = new Image();
  img.src = "images/" + image;
  img.onload = () => {
    const width = img.width / cols;
    const height = img.height / rows;
    container.style.position = "relative";
    container.style.width = img.width + "px";
    container.style.height = img.height + "px";
    container.appendChild(img);
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const mask = document.createElement("div");
        mask.style.position = "absolute";
        mask.style.left = c * width + "px";
        mask.style.top = r * height + "px";
        mask.style.width = width + "px";
        mask.style.height = height + "px";
        mask.style.background = "black";
        mask.style.opacity = 0.7;
        mask.style.boxSizing = "border-box";
        mask.style.border = "1px solid #444";
        mask.addEventListener("click", () => {
          if (!locked) mask.style.display = "none";
        });
        container.appendChild(mask);
      }
    }
  };
}

function resetMask() {
  createGrid(images[currentIndex].name, images[currentIndex].rows, images[currentIndex].cols);
}

function showAll() {
  const masks = container.querySelectorAll("div");
  masks.forEach(m => m.style.display = "none");
}

function toggleLock() {
  locked = !locked;
}

function updateTitleAndText() {
  if (currentIndex === 5) {
    title.textContent = "ンクリドル";
    maskInfo.textContent = " した箇所が隠れます";
  } else {
    title.textContent = "インクリドル";
    maskInfo.textContent = "おした箇所が隠れます";
  }
}

function init() {
  updateTitleAndText();
  resetMask();
}

init();
