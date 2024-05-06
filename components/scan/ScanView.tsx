import React, { useState } from "react";

import { TokenInfo } from "./TokenInfo";
import { PriceChart } from "./PriceChart";
import { SearchModal } from "./SearchModal";

import { IToken } from "../../utils/types";
import { SearchIcon } from "../common/SearchIcon";

export const ScanView = () => {
  const [open, setOpen] = useState(false);
  const [token, setToken] = useState<IToken | null>(null);

  return (
    <div className="min-h-fit rounded shadow-lg bg-white px-6 py-4">
      <button
        onClick={() => setOpen(true)}
        className="rounded-full bg-rose-400 px-4 py-2 text-xs font-bold text-white lg:px-5 lg:py-3 lg:text-base"
      >
        Select Token
      </button>

      <SearchModal open={open} setOpen={setOpen} setToken={setToken} />

      {/* token info and price chart */}
      {token && (
        <>
          <TokenInfo token={token} />
          <PriceChart token={token} />
        </>
      )}
    </div>
  );
};
