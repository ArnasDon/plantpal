"use client";
import { CldImage } from "next-cloudinary";
import Image from "next/image";

type PlantImageProps = {
  src?: string | null;
  fallbackSrc?: string;
  alt?: string;
  width?: number;
  height?: number;
  className?: string;
};

const PlantImage = ({
  src,
  fallbackSrc = "/images/plant-default.png",
  alt = "Plant",
  width = 160,
  height = 200,
  className,
}: PlantImageProps) => {
  return src ? (
    <CldImage
      src={src}
      alt={alt}
      width={width}
      height={height}
      removeBackground
      className={className}
    />
  ) : (
    <Image
      src={fallbackSrc}
      alt={alt}
      width={width}
      height={height}
      className={className}
    />
  );
};

export default PlantImage;
