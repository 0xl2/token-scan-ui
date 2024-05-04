import { IToken } from "../../utils/types";

type Props = {
  token: IToken;
  clickFunc: (token: IToken) => void;
};

export const TokenItem = ({ token, clickFunc }: Props) => {
  return (
    <div className="p-2 cursor-pointer rounded-md hover:bg-slate-300" onClick={() => clickFunc(token)}>
      {token.name}({token.symbol})
    </div>
  );
};
