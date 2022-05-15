import { FC, useEffect } from "react";
import { useSolBalance } from "../hooks/useSolBalance";
import { useMintBalance } from "../hooks/useMintBalance";
import { useWallet } from "@solana/wallet-adapter-react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { fetchMintBalance, fetchSolBalance } from "../redux/uiState";
import { butterPubKey } from "../constants/constants";
import { fetchClaims } from "../redux/claimState";
import { createStyles, Group } from "@mantine/core";

const useStyle = createStyles((theme) => {
  return {
    box: {
      height: "36px",
      padding: "0px 12px",
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[6]
          : theme.colors.gray[2],
      display: "flex",
      alignItems: "center",
      fontSize: "14px",
    },
  };
});

export const Balance: FC = () => {
  const { connected, publicKey } = useWallet();
  const { classes } = useStyle();
  const dispatch = useDispatch();
  const balance = useSelector((state: RootState) => state.ui.solBalance);
  const butterBalance = useSelector(
    (state: RootState) => state.ui.butterBalance
  );

  useEffect(() => {
    if (publicKey) {
      // @ts-ignore
      dispatch(fetchSolBalance(publicKey));

      dispatch(
        // @ts-ignore
        fetchMintBalance({ mint: butterPubKey, fromPublicKey: publicKey })
      );

      // TODO: Move to dedicated Component
      dispatch(
        // @ts-ignore
        fetchClaims(publicKey)
      );
    }
  }, [publicKey]);

  if (!connected) {
    return <span>Please connect your wallet.</span>;
  }

  return (
    <Group>
      <div className={classes.box}>{balance.toFixed(4)} SOL</div>
      <div className={classes.box}>{butterBalance} BUTTER</div>
    </Group>
  );
};
