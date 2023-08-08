import React, { useMemo } from "react";
// import { ConnectionProvider, WalletProvider } from "@solana/wallet-adapter-react";
// import { PhantomWallerAdapter} from "@solana/wallet-adapter-wallets";
// import { PostProvider } from "src/components/PostProvider";
import { Router } from "../routes/Routes";

const App = () => {
  // const endpoint = "https://twilight-newest-pallet.solana-devnet.discover.quiknode.pro/04fcd150a1a621e8501fc924a4041b53d6f24a14/";
  // const wallets = useMemo(() => [
  //   new PhantomWallerAdapter(),
  // ],
  // []
  // );

  return (
      <>
        {/* <ConnectionProvider endpoint={endpoint}> */}
        {/* <WalletProvider wallets={wallets} autoConnect> */}
        
        <Router />
        
        {/* </WalletProvider>
        </ConnectionProvider> */}
      </>
  );
}

export default App;
