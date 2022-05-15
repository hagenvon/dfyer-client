import React from "react";
import { ImageLoader } from "../ImageLoader";

interface FullWidthImageProps {
  src: string;
}

export function SectionImage({ src }: FullWidthImageProps) {
  return <ImageLoader src={src} width={"100%"} />;
}
