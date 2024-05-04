import _ from "lodash";
import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

import {
  COINMARKETCAP_URL,
  DEXSCREENER_URL,
  COINMARKETCAP_LIST_URL,
  ETHEREUM,
} from "../../utils/const";

import { IToken } from "../../utils/types";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    let { token } = req.query;
    token = token ? token.toString().toLowerCase() : "";

    if (token && token.length > 1) {
      try {
        const [cmResp, dsResp] = await Promise.all([
          axios.post(`${COINMARKETCAP_URL}`, {
            keyword: token,
            scene: "community",
            limit: 10,
          }),
          await axios.get(`${DEXSCREENER_URL}search?q=${token}`),
        ]);

        const suggesstions = _.get(cmResp, "data.data.suggestions");

        let tokenArr: IToken[] = [];
        let tokenAddrList: string[] = [];
        for (const suggesstion of suggesstions) {
          if (suggesstion.type == "token") {
            // tokenArr = suggesstion.tokens;
            const tokenIds = suggesstion.tokens
              .map((sToken: any) => sToken.id)
              .toString();
            const listResp = await axios.get(
              `${COINMARKETCAP_LIST_URL}?ids=${tokenIds}`
            );
            let listItems = _.get(listResp, "data.data.cryptoCurrencyList");
            listItems = listItems.filter(
              (item: any) => item.platform && item.platform.slug == ETHEREUM
            );

            tokenArr = listItems.map((item: any) => {
              return {
                name: item.name,
                symbol: item.symbol,
                address: _.get(item, "platform.token_address"),
              };
            });
            break;
          }
        }

        let dsPairs = _.get(dsResp, "data.pairs");
        dsPairs = dsPairs.filter((item: any) => item.chainId == ETHEREUM);
        for (const dsPair of dsPairs) {
          for (const tokenKey of ["baseToken", "quoteToken"]) {
            const keyTokenInfo = _.get(dsPair, tokenKey);
            const keyTokenAddr = _.get(keyTokenInfo, "address").toLowerCase();
            if (
              keyTokenAddr.indexOf(token) >= 0 &&
              tokenAddrList.indexOf(keyTokenAddr) < 0
            ) {
              tokenAddrList.push(keyTokenAddr);
              tokenArr.push({
                name: _.get(keyTokenInfo, "name"),
                symbol: _.get(keyTokenInfo, "symbol"),
                address: keyTokenAddr,
              });
              break;
            }
          }
        }
        res.status(200).send(tokenArr);
      } catch (e) {
        console.log(e);
        res.status(500).send("Server Error");
      }
    } else {
      res.status(500).send("Invalid search key");
    }
  }
}
