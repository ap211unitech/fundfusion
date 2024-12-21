"use client";

import classNames from "classnames";
import Image from "next/image";
import { useState } from "react";

type TImageComponent = {
  width?: number;
  height?: number;
  src: string;
  alt?: string;
  style?: object;
  className?: string;
  fill?: boolean;
};

export const ImageComponent = ({
  style,
  width,
  height,
  src = "",
  alt = "",
  className = "",
  fill = false,
}: TImageComponent) => {
  const [loading, setLoading] = useState(true);

  const onImageLoad = () => {
    setLoading(false);
  };
  return (
    <>
      {loading && (
        <div
          className={classNames(
            "scale-95 animate-pulse rounded-xl bg-gray-300 dark:bg-gray-700",
          )}
          style={{
            width: fill ? "100%" : width,
            height: fill ? "100%" : height,
          }}
        />
      )}
      <Image
        onLoad={onImageLoad}
        src={src}
        width={width}
        height={height}
        alt={alt}
        className={classNames("object-cover", className)}
        fill={fill}
        style={{ opacity: loading ? 0 : 100, ...style }}
      />
    </>
  );
};
