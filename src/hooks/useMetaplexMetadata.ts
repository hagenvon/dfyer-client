import { useState, useEffect } from "react";
import { PublicKey } from "@solana/web3.js";
import { IMetaData } from "../models/IMetaData";
import { useSelector } from "react-redux";
import { getMetadataByToken } from "../redux/metadataSelectors";
import { RootState } from "../redux/store";
import { getMetadata } from "../api/metadata.api";

export function useMetaplexMetadata(token: PublicKey) {
  const [metadata, setMetadata] = useState<IMetaData>();
  const metadataInStore = useSelector((state: RootState) =>
    getMetadataByToken(state, token.toString())
  );

  useEffect(() => {
    if (!metadataInStore) {
      const fetchMetadata = async () => {
        console.log("fetch metaplex md");
        try {
          const { metadata } = await getMetadata(token.toString());
          setMetadata(metadata);
        } catch (e) {
          console.log("unable to fetch metadata of ", token, e);
        }
      };
      fetchMetadata();
    }
  }, []);

  return metadataInStore?.metadata || metadata;
}
