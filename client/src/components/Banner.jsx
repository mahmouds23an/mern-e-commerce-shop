/* eslint-disable react-hooks/exhaustive-deps */
import img1 from "../assest/banner/img1.webp";
import img2 from "../assest/banner/img2.webp";
import img3 from "../assest/banner/img3.jpg";
import img4 from "../assest/banner/img4.jpg";
import img5 from "../assest/banner/img5.webp";
import img1Mobile from "../assest/banner/img1_mobile.jpg";
import img2Mobile from "../assest/banner/img2_mobile.webp";
import img3Mobile from "../assest/banner/img3_mobile.jpg";
import img4Mobile from "../assest/banner/img4_mobile.jpg";
import img5Mobile from "../assest/banner/img5_mobile.png";
import { useEffect, useState } from "react";
import { FaAngleLeft } from "react-icons/fa6";
import { FaAngleRight } from "react-icons/fa6";

export default function Banner() {
  const [currentImage, setCurrentImage] = useState(0);
  const desktopImages = [img1, img2, img3, img4, img5];
  const mobileImages = [
    img1Mobile,
    img2Mobile,
    img3Mobile,
    img4Mobile,
    img5Mobile,
  ];

  const nextImage = () => {
    if (desktopImages.length - 1 > currentImage) {
      setCurrentImage((prev) => prev + 1);
    }
  };

  const prevImage = () => {
    if (currentImage !== 0) {
      setCurrentImage((prev) => prev - 1);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (desktopImages.length - 1 > currentImage) {
        nextImage();
      } else {
        setCurrentImage(0);
      }
    }, 5000);
    return () => clearInterval(interval);
  }, [currentImage]);

  return (
    <div className="container mx-auto px-4 rounded-md">
      <div className="h-72 md:h-96 w-full relative">
        <div className="absolute z-10 w-full h-full md:flex items-center hidden">
          <div className="flex justify-between w-full text-2xl">
            <button
              onClick={prevImage}
              className="bg-black text-white hover:opacity-70 shadow-md rounded-full -m-7"
            >
              <FaAngleLeft />
            </button>
            <button
              onClick={nextImage}
              className="bg-black text-white hover:opacity-70 shadow-md rounded-full -m-7"
            >
              <FaAngleRight />
            </button>
          </div>
        </div>
        {/* desktop and tablets */}
        <div className="hidden md:flex h-full w-full overflow-hidden">
          {desktopImages.map((image, index) => {
            return (
              <div
                key={image}
                className="w-full h-full min-w-full min-h-full transition-all"
                style={{ transform: `translateX(-${currentImage * 100}%)` }}
              >
                <img src={image} alt="" className="w-full h-full object-contain" />
              </div>
            );
          })}
        </div>
        {/* mobiles */}
        <div className="flex h-full w-full overflow-hidden md:hidden">
          {mobileImages.map((image, index) => {
            return (
              <div
                key={image}
                className="w-full h-full min-w-full min-h-full transition-all"
                style={{ transform: `translateX(-${currentImage * 100}%)` }}
              >
                <img
                  src={image}
                  alt=""
                  className="w-full h-full object-contain"
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
