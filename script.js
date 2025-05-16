const images = [
  { name: "image1.jpg", rows: 4, cols: 4 },
  { name: "image2.jpg", rows: 9, cols: 9 },
  { name: "image3.jpg", rows: 4, cols: 4 },
  { name: "image4.jpg", rows: 8, cols: 8 },
  { name: "image5.jpg", rows: 5, cols: 5 },
  { name: "image6.jpg", rows: 3, cols: 3 },
  { name: "image7.jpg", rows: 4, cols: 4 },
];

let current = 0;
let locked = false;

function createGrid(imageInfo) {
  const container = document.getElementById("image-container");
  container.innerHTML = "";

  const img = new Image();
  img.src = "images/" + imageInfo.name;
  img.onload = () => {
    const { rows, cols } = imageInfo;
    const width = img.width / cols;
    const height = img.height / rows;

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const piece = document.createElement("div");
        piece.style.width = width + "px";
        piece.style.height = height + "px";
        piece.style.backgroundImage = `url(images/${imageInfo.name})`;
        piece.style.backgroundPosition = `-${c * width}px -${r * height}px`;
        piece.className = "piece";
        piece.onclick = () => {
          if (!locked) piece.style.opacity = piece.style.opacity === "0" ? "1" : "0";
        };
        container.appendChild(piece);
      }
    }

    document.querySelector("header").textContent =
      current === 5 ? " ンクリドル" : "インクリドル";
    document.getElementById("hide-message").textContent =
      current === 5 ? " した箇所が隠れます" : "おした箇所が隠れます";
  };
}

document.getElementById("hide-all").onclick = () => {
  document.querySelectorAll(".piece").forEach(p => p.style.opacity = "0");
};
document.getElementById("reveal-all").onclick = () => {
  document.querySelectorAll(".piece").forEach(p => p.style.opacity = "1");
};
document.getElementById("lock-toggle").onclick = () => {
  locked = !locked;
};

createGrid(images[current]);