
const images = [
  { src: "images/photo1.jpg", rows: 4, cols: 4 },
  { src: "images/photo2.jpg", rows: 9, cols: 9 },
  { src: "images/image3.jpg", rows: 4, cols: 4 },
  { src: "images/image4.jpg", rows: 8, cols: 8 },
  { src: "images/image5.jpg", rows: 5, cols: 5 },
  { src: "images/image6.jpg", rows: 3, cols: 3 },
  { src: "images/image7.jpg", rows: 4, cols: 4 }
];

let currentImageIndex = 0;
let locked = false;

function createGrid(imageData) {
  const container = document.getElementById("grid-container");
  container.innerHTML = "";
  container.style.gridTemplateRows = `repeat(${imageData.rows}, 1fr)`;
  container.style.gridTemplateColumns = `repeat(${imageData.cols}, 1fr)`;

  for (let r = 0; r < imageData.rows; r++) {
    for (let c = 0; c < imageData.cols; c++) {
      const cell = document.createElement("div");
      cell.className = "grid-cell";

      const img = document.createElement("img");
      img.src = imageData.src;
      img.style.objectFit = "cover";
      img.style.width = `${imageData.cols * 100}%`;
      img.style.height = `${imageData.rows * 100}%`;
      img.style.transform = `translate(-${(100 / imageData.cols) * c}%, -${(100 / imageData.rows) * r}%)`;

      const mask = document.createElement("div");
      mask.className = "mask";
      mask.style.display = "block";

      cell.appendChild(img);
      cell.appendChild(mask);

      cell.addEventListener("click", () => {
        if (!locked) {
          mask.style.display = mask.style.display === "none" ? "block" : "none";
          updateHiddenCount();
        }
      });

      container.appendChild(cell);
    }
  }
  updateTitle();
  updateHiddenCount();
}

function updateTitle() {
  document.getElementById("title").textContent = `第${currentImageIndex + 1}問目`;
}

function applyGrid() {
  const imageData = images[currentImageIndex];
  createGrid(imageData);
}

function hideAll() {
  document.querySelectorAll(".mask").forEach(m => m.style.display = "block");
  updateHiddenCount();
}

function showAll() {
  document.querySelectorAll(".mask").forEach(m => m.style.display = "none");
  updateHiddenCount();
}

function toggleLock() {
  locked = !locked;
}

function nextImage() {
  currentImageIndex = (currentImageIndex + 1) % images.length;
  applyGrid();
}

function updateHiddenCount() {
  const masks = document.querySelectorAll(".mask");
  let count = 0;
  masks.forEach(m => {
    if (m.style.display !== "none") count++;
  });
  document.getElementById("hidden-count").textContent = count;
}

window.onload = () => {
  applyGrid();
};
