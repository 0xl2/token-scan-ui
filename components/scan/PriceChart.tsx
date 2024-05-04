import { Chart } from "react-google-charts";

import { Loader } from "../common/Loader";
import { IToken } from "../../utils/types";
import { useTokenPrice } from "../../hooks/useTokenPrice";

type Props = {
  token: IToken;
};

export const PriceChart = ({ token }: Props) => {
  if (!token) return null;

  const { prices } = useTokenPrice(token);
  let minValue = 1e6,
    maxValue = 0;
  for (const price of prices) {
    if (minValue > price[1]) minValue = price[1];
    if (maxValue < price[1]) maxValue = price[1];
  }
  const showPrices = [["", ""]].concat(prices);

  if (showPrices.length == 0) return null;

  const options = {
    // hAxis: { titleTextStyle: { color: "#333" } },
    vAxis: { minValue: minValue, maxValue: maxValue },
    chartArea: { width: "80%", height: "70%" },
  };

  return showPrices && showPrices.length > 0 ? (
    <Chart
      chartType="AreaChart"
      width="100%"
      height="400px"
      data={showPrices}
      options={options}
    />
  ) : (
    <Loader />
  );
};
