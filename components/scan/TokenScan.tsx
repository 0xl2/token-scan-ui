import { useAddress } from "@thirdweb-dev/react";
import React, { useEffect, useState } from "react";

import { Spinner } from "../common/Spinner";

export const TokenScan = () => {
  const [loading, setLoading] = useState(true);

  const walletAddr = useAddress();

  return (
    <div className="container mx-auto px-4 pt-10">
      {walletAddr && walletAddr.length > 0 ? (
        <Spinner visible={loading} />
      ) : (
        <div>Please connect wallet</div>
      )}
    </div>
  );
};
