import React, { useState } from "react";

import { TokenInfo } from "./TokenInfo";
import { PriceChart } from "./PriceChart";
import { SearchModal } from "./SearchModal";

import { IToken } from "../../utils/types";
import { SearchIcon } from "../common/SearchIcon";

export const ScanView = () => {
  const [open, setOpen] = useState(false);
  const [token, setToken] = useState<IToken | null>(null);

  // // this is only for testing
  // const [token, setToken] = useState<IToken | null>({
  //   name: "usdt",
  //   symbol: "USDT",
  //   address: "0xdac17f958d2ee523a2206206994597c13d831ec7",
  //   id: "tether",
  //   thumb: "https://google.com",
  // });

  return (
    <div className="rounded overflow-hidden shadow-lg bg-white px-6 py-4">
      <div className="group flex w-[350px] max-h-[44px] flex-row items-center rounded-xl border border-gray/10 px-2 transition-all duration-300 ease-in-out bg-gray-300">
        <SearchIcon />
        <input
          type="text"
          maxLength={100}
          placeholder="Search"
          className="w-full border-0 placeholder:text-gray-500 focus:ring-0 bg-gray-300"
          value={token?.symbol}
          onClick={() => setOpen(true)}
          onChange={() => {}}
        />
      </div>

      <SearchModal open={open} setOpen={setOpen} setToken={setToken} />

      {/* token info */}
      {token && <TokenInfo token={token} />}

      {/* Token price chart */}
      {token && <PriceChart token={token} />}
    </div>
  );
};
