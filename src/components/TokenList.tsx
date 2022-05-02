import React, { FC } from "react";
import { Center, Grid, Text } from "@mantine/core";
import { TokenCard } from "./TokenCard";
import { useSelector } from "react-redux";
import { selectOwnedTokens } from "../redux/metadataSelectors";
import { useWallet } from "@solana/wallet-adapter-react";

export interface TokenListProps {}

export const TokenList: FC<TokenListProps> = () => {
  const { connected } = useWallet();
  const tokens = useSelector(selectOwnedTokens);

  if (!tokens.length) {
    return (
      <Center my={45}>
        <Text>
          {connected
            ? "Looks like you don't own any thugs."
            : "Please connect with your wallet."}
        </Text>
      </Center>
    );
  }

  return (
    <Grid>
      {tokens.map((token) => {
        return (
          <Grid.Col xs={6} sm={4} key={token}>
            <TokenCard token={token} />
          </Grid.Col>
        );
      })}
    </Grid>
  );
};
