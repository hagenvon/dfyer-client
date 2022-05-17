import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import {
  ConnectionProvider,
  useWallet,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import {
  GlowWalletAdapter,
  PhantomWalletAdapter,
  SlopeWalletAdapter,
  SolflareWalletAdapter,
  TorusWalletAdapter,
} from "@solana/wallet-adapter-wallets";
import { clusterApiUrl } from "@solana/web3.js";
import React, { FC, ReactNode, useEffect, useMemo } from "react";
import {
  MantineProvider,
  ColorSchemeProvider,
  ColorScheme,
} from "@mantine/core";
import { lightTheme, darkTheme } from "./theme";
import { BaseLayout } from "./views/BaseLayout";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { SingleTokenPage } from "./views/SingleTokenPage";
import { ModalsProvider } from "@mantine/modals";
import { Provider, useDispatch } from "react-redux";
import "./App.css";
import { store } from "./redux/store";
import { MultipleTokenPage } from "./views/MultipleTokenPage";
import { fetchAllMetadata } from "./redux/metadataState";
import { useLocalStorage } from "@mantine/hooks";
import { GlobalStyles } from "./components/GlobalStyles";
import { findOwnedTokens, setOwnedTokens } from "./redux/uiState";
import { CollectionPage } from "./views/CollectionPage";
import { NotificationsProvider } from "@mantine/notifications";
import { LandingPage } from "./views/LandingPage";
import { FaqPage } from "./views/FaqPage";

const App: FC = () => {
  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
    key: "infamous-color-scheme",
    defaultValue: "light",
    getInitialValueInEffect: true,
  });
  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));

  return (
    <Provider store={store}>
      <BrowserRouter>
        <ColorSchemeProvider
          colorScheme={colorScheme}
          toggleColorScheme={toggleColorScheme}
        >
          <MantineProvider
            theme={colorScheme === "dark" ? darkTheme : lightTheme}
            withGlobalStyles
          >
            <NotificationsProvider>
              <ModalsProvider>
                <Context>
                  <Content />
                </Context>
              </ModalsProvider>
            </NotificationsProvider>
            <GlobalStyles />
          </MantineProvider>
        </ColorSchemeProvider>
      </BrowserRouter>
    </Provider>
  );
};
export default App;

const Context: FC<{ children: ReactNode }> = ({ children }) => {
  // The network can be set to 'devnet', 'testnet', or 'mainnet-beta'.
  const network = WalletAdapterNetwork.Mainnet;

  // You can also provide a custom RPC endpoint.
  const endpoint = useMemo(() => clusterApiUrl(network), [network]);

  // @solana/wallet-adapter-wallets includes all the adapters but supports tree shaking and lazy loading --
  // Only the wallets you configure here will be compiled into your application, and only the dependencies
  // of wallets that your users connect to will be loaded.
  const wallets = useMemo(
    () => [
      new PhantomWalletAdapter(),
      new GlowWalletAdapter(),
      new SlopeWalletAdapter(),
      new SolflareWalletAdapter({ network }),
      new TorusWalletAdapter(),
    ],
    [network]
  );

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>{children}</WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
};

const Content: FC = () => {
  const { connected, publicKey } = useWallet();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!connected) {
      dispatch(setOwnedTokens([]));
    } else {
      // @ts-ignore
      dispatch(findOwnedTokens(publicKey));
    }
  }, [connected, dispatch, publicKey]);

  useEffect(() => {
    // @ts-ignore
    dispatch(fetchAllMetadata());
  }, []);

  return (
    <BaseLayout>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/gang" element={<MultipleTokenPage />} />
        <Route path="/thug/:token" element={<SingleTokenPage />} />
        <Route path="/collection" element={<CollectionPage />} />
        <Route path="/faq" element={<FaqPage />} />
      </Routes>
    </BaseLayout>
  );
};
