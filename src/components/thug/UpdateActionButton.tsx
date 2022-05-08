import { useWallet } from "@solana/wallet-adapter-react";
import { getConnection } from "../../helper/getConnection";
import { createTransaction } from "../../helper/createTransaction";
import { getUpdateState, updateTrait } from "../../api/updateTrait";
import { projectPubKey } from "../../constants/constants";
import { ITraitUpdate } from "../../models/ITraitUpdate";
import { Button, Modal } from "@mantine/core";
import React, { useState } from "react";
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
import { IUpdateState } from "../../models/IUpdateState";
import { sleep } from "../../helper/sleep";
import { ProgressStepper } from "../stepper/Stepper";
import { showNotification } from "@mantine/notifications";
import { RootState } from "../../redux/store";

interface UpdateActionButtonProps {
  token: string;
  update: ITraitUpdate;
}

export function UpdateActionButton({ update, token }: UpdateActionButtonProps) {
  const { publicKey, sendTransaction } = useWallet();
  const modals = useModals();
  const connection = getConnection();
  const dispatch = useDispatch();

  const onConfirm = async () => {
    if (!publicKey) {
      return;
    }

    try {
      const tx = await createTransaction(
        publicKey,
        projectPubKey,
        update.butterPrize || 30,
        update.solPrize || 1
      );
      const signature = await sendTransaction(tx, connection);

      console.log("transaction send: ", signature);

      const transactionCreated = await updateTrait({
        fromKey: publicKey.toBase58(),
        update: update,
        token: token,
        signature: signature,
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

      //
      // fetchBalance();
      // fetchButterBalance();
    } catch (error) {
      console.log("TX failed", error);
    }
  };

  const openConfirmModal = () =>
    modals.openConfirmModal({
      title: "Please confirm your action",
      children: <UpdateConfirmDialog update={update} token={token} />,
      labels: { confirm: "Yeah, let's do this!", cancel: "Nah, it'll be fine" },
      onCancel: () => console.log("Cancel"),
      onConfirm: onConfirm,
    });

  return (
    <Button size={"xs"} variant="outline" onClick={openConfirmModal} ml={8}>
      Update
    </Button>
  );
}
