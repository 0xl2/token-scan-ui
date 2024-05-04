import { useAddress } from "@thirdweb-dev/react";

import { ScanView } from "./ScanView";

export const TokenScan = () => {
  const walletAddr = useAddress();

  return (
    <div className="container mx-auto pt-5">
      {walletAddr && walletAddr.length > 0 ? (
        <ScanView />
      ) : (
        <div>Please connect wallet</div>
      )}
    </div>
  );
};
