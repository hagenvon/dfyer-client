import { HeaderMiddle } from "../components/header/Header";
import React, { FC, ReactNode, useEffect } from "react";
import { Container, Modal } from "@mantine/core";
import { ConnectionDisplay } from "../components/header/ConnectionDisplay";
import { FooterDefault } from "../components/footer/Footer";
import { endUpdating } from "../redux/uiState";
import { UpdateProgress } from "../components/stepper/UpdateProgress";
import { useDispatch, useSelector } from "react-redux";
import { selectIsUpdating } from "../redux/metadataSelectors";
import { fetchListings } from "../redux/listingsState";
import { AppDispatch, RootState } from "../redux/store";
import { hideUpdateModal } from "../redux/updateHistoryState";

export const BaseLayout: FC<{ children: ReactNode }> = ({ children }) => {
  const updateSignature = useSelector(
    (state: RootState) => state.updateHistory.showUpdateInModal
  );
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchListings());
  }, []);

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <HeaderMiddle
        links={[
          { link: "/collection", label: "Collection" },
          { link: "/gang", label: "My Gang" },
          { link: "/faq", label: "FAQ" },
        ]}
      />
      <div>
        <ConnectionDisplay />
      </div>

      <main style={{ flexGrow: 1 }}>
        <Container>{children}</Container>
      </main>
      <FooterDefault />
      {updateSignature !== "" && (
        <Modal
          opened={updateSignature !== ""}
          onClose={() => dispatch(hideUpdateModal())}
          title="Process Update"
        >
          <UpdateProgress signature={updateSignature} />
        </Modal>
      )}
    </div>
  );
};
