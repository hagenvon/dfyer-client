import React, { useEffect } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { getConnection } from "../../helper/getConnection";
import { createTransaction } from "../../helper/createTransaction";
import { updateTrait } from "../../api/updateTrait";
import { projectPubKey } from "../../constants/constants";
import { ITraitUpdate } from "../../models/ITraitUpdate";
import { Button, useMantineTheme } from "@mantine/core";
import { useModals } from "@mantine/modals";
import { useDispatch, useSelector } from "react-redux";
import { startActiveTransaction, startUpdating } from "../../redux/uiState";
import { UpdateConfirmDialog } from "./UpdateConfirmDialog";
import { Flame } from "tabler-icons-react";
import {
  fetchBurnUpdate,
  selectBurnUpdate,
  selectIsEditionsInitialized,
} from "../../redux/editionState";
import { AppDispatch } from "../../redux/store";
import { selectButterBalance, selectSolBalance } from "../../redux/uiSelectors";
import { IUpdateState } from "../../models/IUpdateState";
import {
  showUpdateModal,
  updateUpdateEntity,
} from "../../redux/updateHistoryState";

interface UpdateActionButtonProps {
  token: string;
  update: ITraitUpdate;
}

export function BurnActionButton({ update, token }: UpdateActionButtonProps) {
  const { publicKey, sendTransaction } = useWallet();
  const modals = useModals();
  const connection = getConnection();
  const dispatch = useDispatch<AppDispatch>();
  const theme = useMantineTheme();

  const isEditionsInitialized = useSelector(selectIsEditionsInitialized);
  const burnUpdate = useSelector(selectBurnUpdate);

  const butterBalance = useSelector(selectButterBalance);
  const solBalance = useSelector(selectSolBalance);

  const canAffordBurning =
    burnUpdate &&
    butterBalance >= burnUpdate.butterPrize &&
    solBalance > burnUpdate.solPrize;

  useEffect(() => {
    if (!burnUpdate || !isEditionsInitialized) {
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
        updateUpdateEntity({
          state: transactionCreated,
          signature,
          token,
          type: "BURN",
          fromPublicKey: publicKey.toBase58(),
          updatedAt: new Date().toISOString(),
          traitUpdates: burnUpdate,
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
      title: "Burn your Infamous Bird?",
      children: burnUpdate && (
        <UpdateConfirmDialog update={burnUpdate} token={token} />
      ),
      labels: { confirm: "LFG!!!", cancel: "Can't stand the heat." },
      onCancel: () => console.log("Cancel"),
      onConfirm: onConfirm,
      confirmProps: {
        disabled: !canAffordBurning,
      },
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
