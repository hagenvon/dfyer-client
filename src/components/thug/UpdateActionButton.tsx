import { useWallet } from "@solana/wallet-adapter-react";
import { getConnection } from "../../helper/getConnection";
import { createTransaction } from "../../helper/createTransaction";
import { getUpdateState, updateTrait } from "../../api/updateTrait";
import { projectPubKey } from "../../constants/constants";
import { ITraitUpdate } from "../../models/ITraitUpdate";
import { Button } from "@mantine/core";
import React from "react";
import { useModals } from "@mantine/modals";
import { useDispatch } from "react-redux";
import { startActiveTransaction, startUpdating } from "../../redux/uiState";
import { UpdateConfirmDialog } from "./UpdateConfirmDialog";
import {
  showUpdateModal,
  updateUpdateEntity,
} from "../../redux/updateHistoryState";

interface UpdateActionButtonProps {
  token: string;
  update: ITraitUpdate;
  disabled: boolean;
}

export function UpdateActionButton({
  update,
  token,
  disabled,
}: UpdateActionButtonProps) {
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
        type: "CUSTOMIZE",
      });

      dispatch(
        updateUpdateEntity({
          state: transactionCreated,
          signature,
          token,
          type: "CUSTOMIZE",
          fromPublicKey: publicKey.toBase58(),
          updatedAt: new Date().toISOString(),
          traitUpdates: update,
          updateSignature: "",
        })
      );
      dispatch(showUpdateModal(signature));
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
    <Button
      size={"xs"}
      variant="outline"
      onClick={openConfirmModal}
      ml={8}
      disabled={disabled}
    >
      Update
    </Button>
  );
}
