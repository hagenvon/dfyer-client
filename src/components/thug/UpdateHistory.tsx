import { Table } from "@mantine/core";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import {
  fetchUpdateHistoryPerToken,
  selectAllUpdateEntities,
} from "../../redux/updateHistoryState";
import { useEffect } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { UpdateItem } from "./UpdateItem";
import { TraitItem } from "./TraitItem";
import { InlineProgress } from "../stepper/InlineProgress";
import {
  selectIncompleteUpdatesPerToken,
  selectAllUpdateEntitiesPerToken,
} from "../../redux/updateHistorySelectors";

export function UpdateHistory({ token }: { token: string }) {
  // const { publicKey } = useWallet();
  const dispatch = useDispatch<AppDispatch>();
  const updateHistory = useSelector((state: RootState) =>
    selectAllUpdateEntitiesPerToken(state, token)
  );

  useEffect(() => {
    if (token) {
      dispatch(fetchUpdateHistoryPerToken(token));
    }
  }, [token]);

  const rows = updateHistory.map((element) => (
    <tr key={element.signature}>
      <td>{new Date(element.updatedAt).toLocaleDateString()}</td>
      <td>
        <TraitItem trait={element.traitUpdates} />
      </td>
      <td>
        <InlineProgress updateHistoryItem={element} />
      </td>
    </tr>
  ));

  return (
    <Table>
      <thead>
        <tr>
          <th>Date</th>
          <th>Update</th>
          <th></th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </Table>
  );
}
