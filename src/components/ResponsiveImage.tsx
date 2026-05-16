import type { ImgHTMLAttributes } from "react";
import type { ResponsiveAsset } from "@/lib/media";

type ResponsiveImageProps = Omit<
  ImgHTMLAttributes<HTMLImageElement>,
  "src" | "srcSet" | "sizes" | "width" | "height" | "alt"
> & {
  image: ResponsiveAsset;
  sizes: string;
  pictureClassName?: string;
  imgClassName?: string;
  alt?: string;
};

export default function ResponsiveImage({
  image,
  sizes,
  pictureClassName,
  imgClassName,
  alt,
  ...imgProps
}: ResponsiveImageProps) {
  return (
    <picture className={pictureClassName}>
      <source type="image/webp" srcSet={image.webpSrcSet} sizes={sizes} />
      <img
        {...imgProps}
        src={image.src}
        srcSet={image.srcSet}
        sizes={sizes}
        width={image.width}
        height={image.height}
        alt={alt ?? image.alt}
        className={imgClassName}
      />
    </picture>
  );
}
