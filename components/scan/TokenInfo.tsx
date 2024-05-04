import { utils } from "ethers";
import { useContract, useContractRead, useAddress } from "@thirdweb-dev/react";

import { IToken } from "../../utils/types";

type Props = {
  token: IToken;
};

export const TokenInfo = ({ token }: Props) => {
  if (!token) return null;

  const address = useAddress();
  const { contract } = useContract(token.address);
  const { data: tokenDecimal, isLoading: decimalLoading } = useContractRead(
    contract,
    "decimals",
    []
  );
  const { data: tokenBalance, isLoading: balanceLoading } = useContractRead(
    contract,
    "balanceOf",
    [address]
  );

  return (
    <div className="font-bold text-xl m-2">
      {token.name} Balance:{" "}
      {decimalLoading || balanceLoading
        ? ""
        : utils.formatUnits(tokenBalance, tokenDecimal) +
          "(" +
          token.symbol +
          ")"}
    </div>
  );
};
