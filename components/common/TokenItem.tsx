import { IToken } from "../../utils/types";

type Props = {
  token: IToken;
  clickFunc: (token: IToken) => void;
};

export const TokenItem = ({ token, clickFunc }: Props) => {
  return (
    <div
      className="flex p-2 cursor-pointer rounded-md hover:bg-slate-300"
      onClick={() => clickFunc(token)}
    >
      <img src={token.thumb} alt="thumb" />
      <span className="ml-3">
        {token.name}({token.symbol})
      </span>
    </div>
  );
};
