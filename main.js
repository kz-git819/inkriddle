
const images = [
  { src: "images_folder/image1.jpg", rows: 4, cols: 4 },
  { src: "images_folder/image2.jpg", rows: 9, cols: 9 },
  { src: "images_folder/image3.jpg", rows: 4, cols: 4 },
  { src: "images_folder/image4.jpg", rows: 8, cols: 8 },
  { src: "images_folder/image5.jpg", rows: 5, cols: 5 },
  { src: "images_folder/image6.jpg", rows: 3, cols: 3 },
  { src: "images_folder/image7.jpg", rows: 4, cols: 4 },
];

let currentIndex = 0;
let locked = false;

function createGrid(image, rows, cols) {
  const container = document.getElementById("image-container");
  container.innerHTML = "";

  const img = new Image();
  img.src = image;
  img.onload = () => {
    const width = Math.min(window.innerWidth * 0.9, img.width);
    const height = width * (img.height / img.width);
    const cellWidth = width / cols;
    const cellHeight = height / rows;

    const wrapper = document.createElement("div");
    wrapper.className = "grid";
    wrapper.style.width = width + "px";
    wrapper.style.height = height + "px";
    wrapper.style.gridTemplateRows = `repeat(${rows}, 1fr)`;
    wrapper.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const cell = document.createElement("div");
        cell.className = "grid-cell";
        cell.style.backgroundImage = `url(${image})`;
        cell.style.backgroundSize = `${width}px ${height}px`;
        cell.style.backgroundPosition = `-${c * cellWidth}px -${r * cellHeight}px`;
        cell.style.width = cellWidth + "px";
        cell.style.height = cellHeight + "px";
        cell.addEventListener("click", () => {
          if (!locked) cell.classList.toggle("revealed");
        });
        wrapper.appendChild(cell);
      }
    }
    container.appendChild(wrapper);

    // テキスト更新
    document.getElementById("title").textContent = currentIndex === 5 ? "ンクリドル" : "インクリドル";
    document.getElementById("info-text").textContent = currentIndex === 5 ? " した箇所が隠れます" : "おした箇所が隠れます";
  };
}

document.getElementById("hideAll").addEventListener("click", () => {
  document.querySelectorAll(".grid-cell").forEach(cell => cell.classList.remove("revealed"));
});
document.getElementById("showAll").addEventListener("click", () => {
  document.querySelectorAll(".grid-cell").forEach(cell => cell.classList.add("revealed"));
});
document.getElementById("toggleLock").addEventListener("click", () => {
  locked = !locked;
});

window.addEventListener("load", () => {
  const img = images[currentIndex];
  createGrid(img.src, img.rows, img.cols);
});
