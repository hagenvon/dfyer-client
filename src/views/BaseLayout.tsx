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

export const BaseLayout: FC<{ children: ReactNode }> = ({ children }) => {
  const isUpdating = useSelector(selectIsUpdating);
  const dispatch = useDispatch();

  useEffect(() => {
    // @ts-ignore
    dispatch(fetchListings());
  }, []);

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <HeaderMiddle
        links={[
          { link: "/collection", label: "Collection" },
          { link: "/gang", label: "Gang" },
        ]}
      />
      <div>
        <ConnectionDisplay />
      </div>

      <main style={{ flexGrow: 1 }}>
        <Container>{children}</Container>
      </main>
      <FooterDefault />
      <Modal
        opened={isUpdating}
        onClose={() => dispatch(endUpdating())}
        title="Process Update"
      >
        {isUpdating && <UpdateProgress />}
      </Modal>
    </div>
  );
};
