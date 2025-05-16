import { useState } from "react";

const imageConfigs = [
  { src: "image1.jpg", rows: 4, cols: 4 },
  { src: "image2.jpg", rows: 9, cols: 9 },
  { src: "image3.jpg", rows: 4, cols: 4 },
  { src: "image4.jpg", rows: 8, cols: 8 },
  { src: "image5.jpg", rows: 5, cols: 5 },
  { src: "image6.jpg", rows: 3, cols: 3 },
  { src: "image7.jpg", rows: 4, cols: 4 },
];

export default function Home() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { src, rows, cols } = imageConfigs[currentImageIndex];
  const totalCells = rows * cols;

  const [hiddenCells, setHiddenCells] = useState(Array(totalCells).fill(false));

  const toggleCell = (index) => {
    const updated = [...hiddenCells];
    updated[index] = !updated[index];
    setHiddenCells(updated);
  };

  const nextImage = () => {
    if (currentImageIndex < imageConfigs.length - 1) {
      setCurrentImageIndex(currentImageIndex + 1);
      setHiddenCells(Array(imageConfigs[currentImageIndex + 1].rows * imageConfigs[currentImageIndex + 1].cols).fill(false));
    }
  };

  const hideAll = () => setHiddenCells(Array(totalCells).fill(true));
  const showAll = () => setHiddenCells(Array(totalCells).fill(false));

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 relative">
      <div className="relative w-[512px] h-[512px]">
        <img src={`/images_folder/${src}`} alt="quiz" className="w-full h-full object-cover" />
        <div className="absolute top-0 left-0 w-full h-full grid" style={{ gridTemplateRows: `repeat(${rows}, 1fr)`, gridTemplateColumns: `repeat(${cols}, 1fr)` }}>
          {Array.from({ length: totalCells }).map((_, i) => (
            <div
              key={i}
              onClick={() => toggleCell(i)}
              className={`border border-white ${hiddenCells[i] ? "bg-black" : "bg-transparent"} transition duration-200`}
            />
          ))}
        </div>
      </div>

      <div className="flex gap-4 mt-4">
        <button onClick={hideAll} className="px-4 py-2 bg-blue-600 text-white rounded">全て隠す</button>
        <button onClick={showAll} className="px-4 py-2 bg-green-600 text-white rounded">全て表示する</button>
        <button onClick={nextImage} className="px-4 py-2 bg-gray-800 text-white rounded">次の問題</button>
      </div>

      <div className="absolute left-4 bottom-4 text-sm text-gray-800">
        {currentImageIndex === 5 ? " した箇所が隠れる" : "おした箇所が隠れる"}
      </div>
      <div className="absolute right-4 bottom-4 text-sm text-gray-800">
        {currentImageIndex === 5 ? " までの問題を表示" : "いままでの問題を表示"}
      </div>
    </div>
  );
}