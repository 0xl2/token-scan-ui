import { useAddress, useNetworkMismatch } from "@thirdweb-dev/react";

import { ScanView } from "./ScanView";
import { WalletConnectModal } from "../common/WalletConnectModal";

export const TokenScan = () => {
  const walletAddr = useAddress();
  const isMismatched = useNetworkMismatch();

  return (
    <div className="container mx-auto pt-5">
      {walletAddr && walletAddr.length > 0 && !isMismatched ? (
        <ScanView />
      ) : (
        <WalletConnectModal />
      )}
    </div>
  );
};
