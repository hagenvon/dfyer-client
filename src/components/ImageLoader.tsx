import { Image, LoadingOverlay } from "@mantine/core";
import React, { useEffect, useState } from "react";

export function ImageLoader({
  src,
  width,
}: {
  src: string;
  width: string | number;
}) {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(false);
  }, [src]);

  const onLoad = () => {
    setIsLoaded(true);
  };

  return (
    <>
      {(!isLoaded || !src) && (
        <div
          style={{
            width: width,
            position: "relative",
            backgroundColor: "gray",
            paddingBottom: "100%",
            zIndex: 1,
          }}
        >
          <LoadingOverlay visible={true} />
        </div>
      )}
      <Image
        src={src}
        alt=""
        width={"100%"}
        onLoad={onLoad}
        style={{ display: isLoaded ? "block" : "none" }}
      />
    </>
  );
}
