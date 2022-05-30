import { ITrait } from "../../models/ITrait";
import { memo, useEffect, useState } from "react";
import { preview } from "../../api/updateTrait";
import { LoadingOverlay } from "@mantine/core";

interface PreviewProps {
  token: string;
  traits: ITrait[];
  size?: number;
}

export function WrappedPreview(props: PreviewProps) {
  const [source, setSource] = useState<string>();
  useEffect(() => {
    const run = async () => {
      const res: Blob = await preview(props);

      const url = URL.createObjectURL(res);
      setSource(url);
    };
    run();
  }, [props]);

  const _size = props.size || 240;

  if (!source) {
    return (
      <div
        style={{
          paddingBottom: "100%",
          width: "100%",
          position: "relative",
          backgroundColor: "gray",
        }}
      >
        <LoadingOverlay visible={true} />
      </div>
    );
  }

  return <img src={source} alt="preview" width={"100%"} />;
}

export const myComparison = (
  prevProps: PreviewProps,
  nextProps: PreviewProps
) => {
  return true;
};

export const Preview = memo(WrappedPreview, myComparison);
