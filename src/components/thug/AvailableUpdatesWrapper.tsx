import { useAvailableUpdates } from "../../hooks/useAvailableUpdates";
import React from "react";
import { useSelector } from "react-redux";
import { useWallet } from "@solana/wallet-adapter-react";
import { selectOwnedTokens } from "../../redux/metadataSelectors";
import { AvailableUpdates } from "./AvailableUpdates";
const sortBy = require("lodash.sortby");

interface AvailableUpdatesWrapperProps {
  token: string;
}

export function AvailableUpdatesWrapper({
  token,
}: AvailableUpdatesWrapperProps) {
  const { connected } = useWallet();
  const { availableUpdates, isFetching } = useAvailableUpdates(token);
  const ownedTokens = useSelector(selectOwnedTokens);
  const isTokenOwned = ownedTokens.includes(token);

  const canUpdate = isTokenOwned && connected;

  const availableUpdatesSorted = sortBy(availableUpdates, [
    "trait_type",
    "value",
  ]);

  const upgrades = availableUpdates.filter((it) => it.isCustomTrait);
  const customizations = availableUpdates.filter((it) => !it.isCustomTrait);

  return (
    <>
      {upgrades.length > 0 && (
        <AvailableUpdates
          label={"Available Updates"}
          token={token}
          availableTraits={upgrades}
          canUpdate={canUpdate}
          isFetching={isFetching}
        />
      )}
      <AvailableUpdates
        label={"Available Customization"}
        token={token}
        availableTraits={customizations}
        canUpdate={canUpdate}
        isFetching={isFetching}
      />
    </>
  );
}
