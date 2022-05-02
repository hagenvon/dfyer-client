import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { createStyles } from "@mantine/core";

// import '@solana/wallet-adapter-react-ui/styles.css';
import "./connect-button.css";

const useStyles = createStyles((theme) => ({
  button: {
    "&.wallet-adapter-button": {
      color: theme.white,
      backgroundColor: theme.colors[theme.primaryColor][7],
    },
  },
}));

export function ConnectButton() {
  const { classes } = useStyles();
  return <WalletMultiButton className={classes.button} />;
}
