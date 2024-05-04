import { useAddress } from "@thirdweb-dev/react";

import { ScanView } from "./ScanView";
import { WalletConnectModal } from "../common/WalletConnectModal";

export const TokenScan = () => {
  const walletAddr = useAddress();

  return (
    <div className="container mx-auto pt-5">
      {walletAddr && walletAddr.length > 0 ? (
        <ScanView />
      ) : (
        <WalletConnectModal />
      )}
    </div>
  );
};
