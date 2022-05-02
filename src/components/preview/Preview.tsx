import { ITrait } from "../../models/ITrait";
import { useEffect, useState } from "react";
import { preview } from "../../api/updateTrait";
import { LoadingOverlay } from "@mantine/core";

export function Preview(props: {
  token: string;
  traits: ITrait[];
  size?: number;
}) {
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
          height: _size,
          width: _size,
          position: "relative",
          backgroundColor: "gray",
        }}
      >
        <LoadingOverlay visible={true} />
      </div>
    );
  }

  return <img src={source} alt="preview" />;
}
