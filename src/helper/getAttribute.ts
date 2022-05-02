import { IMetaData } from "../models/IMetaData";

export function getAttribute(metadata: IMetaData, traitType: string): string {
  return (
    metadata.attributes.find((it) => it.trait_type === traitType)?.value || ""
  );
}

export function getIsBurnt(metadata: IMetaData) {
  return getAttribute(metadata, "Edition").toLowerCase() === "burnt";
}
