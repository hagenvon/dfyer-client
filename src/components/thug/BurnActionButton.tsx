import react, { useEffect } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { getConnection } from "../../helper/getConnection";
import { createTransaction } from "../../helper/createTransaction";
import { updateTrait } from "../../api/updateTrait";
import { projectPubKey } from "../../constants/constants";
import { ITraitUpdate } from "../../models/ITraitUpdate";
import { Button, useMantineTheme } from "@mantine/core";
import React from "react";
import { useModals } from "@mantine/modals";
import { useSolBalance } from "../../hooks/useSolBalance";
import { useDispatch, useSelector } from "react-redux";
import {
  endUpdating,
  setActiveTransactionState,
  startActiveTransaction,
  startUpdating,
} from "../../redux/uiState";
import { useMintBalance } from "../../hooks/useMintBalance";
import { UpdateConfirmDialog } from "./UpdateConfirmDialog";
import { Flame } from "tabler-icons-react";
import {
  fetchBurnUpdate,
  selectBurnUpdate,
  selectIsEditionsInitialized,
} from "../../redux/editionState";

interface UpdateActionButtonProps {
  token: string;
  update: ITraitUpdate;
}

export function BurnActionButton({ update, token }: UpdateActionButtonProps) {
  const { publicKey, sendTransaction } = useWallet();
  const modals = useModals();
  const connection = getConnection();
  const dispatch = useDispatch();
  const theme = useMantineTheme();

  const isEditionsInitialized = useSelector(selectIsEditionsInitialized);
  const burnUpdate = useSelector(selectBurnUpdate);

  useEffect(() => {
    if (!burnUpdate || !isEditionsInitialized) {
      // @ts-ignore
      dispatch(fetchBurnUpdate());
    }
  }, []);

  const onConfirm = async () => {
    if (!publicKey || !burnUpdate) {
      return;
    }

    try {
      const tx = await createTransaction(
        publicKey,
        projectPubKey,
        burnUpdate.butterPrize || 30,
        burnUpdate.solPrize || 1
      );
      const signature = await sendTransaction(tx, connection);

      console.log("transaction send: ", signature);

      const transactionCreated = await updateTrait({
        fromKey: publicKey.toBase58(),
        update: burnUpdate,
        token: token,
        signature: signature,
        type: "BURN",
      });

      dispatch(
        startActiveTransaction({
          state: transactionCreated,
          signature,
          token,
          showSuccess: false,
        })
      );

      dispatch(startUpdating());
    } catch (error) {
      console.log("TX failed", error);
    }
  };

  const openConfirmModal = () =>
    modals.openConfirmModal({
      title: "Burn your Infamous Bird?",
      children: burnUpdate && (
        <UpdateConfirmDialog update={burnUpdate} token={token} />
      ),
      labels: { confirm: "LFG!!!", cancel: "Can't stand the heat." },
      onCancel: () => console.log("Cancel"),
      onConfirm: onConfirm,
    });

  return (
    <Button
      variant={"outline"}
      color={"orange"}
      fullWidth={true}
      onClick={openConfirmModal}
    >
      <Flame
        size={32}
        strokeWidth={1}
        color={theme.colorScheme === "dark" ? "white" : "black"}
      />
      BURN MF BURN!!
    </Button>
  );
}
