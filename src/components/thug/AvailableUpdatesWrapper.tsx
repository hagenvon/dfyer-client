import { useAvailableUpdates } from "../../hooks/useAvailableUpdates";
import React from "react";
import { useSelector } from "react-redux";
import { useWallet } from "@solana/wallet-adapter-react";
import { selectOwnedTokens } from "../../redux/metadataSelectors";
import { AvailableUpdates } from "./AvailableUpdates";

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

  const canUpdate = true; // isTokenOwned && connected;

  const upgrades = availableUpdates.filter((it) => it.isCustomTrait);
  const customizations = availableUpdates.filter((it) => !it.isCustomTrait);

  return (
    <>
      {upgrades.length > 0 && (
        <AvailableUpdates
          label={"Available Upgrades"}
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
