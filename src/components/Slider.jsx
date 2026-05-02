import { useEffect, useState } from "react";

const slides = [
  "/images/slider1.jpeg",
  "/images/slider2.jpeg",
  "/images/b2.jpeg",
  "/images/b1.jpeg"
];

function Slider() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-60 md:h-80 w-full overflow-hidden rounded mb-6">

      <img
        src={slides[current]}
        className="w-full h-full object-cover"
        onError={(e) => {
          e.target.src = "/images/fallback.jpg";
        }}
      />

      <div className="absolute inset-0 bg-black/40 pointer-events-none flex flex-col justify-center items-center text-white">
        <h1 className="text-3xl md:text-4xl font-bold">D&D Fashion</h1>
        <p className="mt-2">Trendy styles at best prices</p>
      </div>

      <div className="absolute bottom-3 flex gap-2 left-1/2 -translate-x-1/2">
        {slides.map((_, i) => (
          <div
            key={i}
            className={`h-2 w-2 rounded-full ${
              current === i ? "bg-white" : "bg-gray-400"
            }`}
          />
        ))}
      </div>

    </div>
  );
}

export default Slider;