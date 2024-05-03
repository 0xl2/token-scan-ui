import { Circles } from "react-loader-spinner";

type Props = {
  visible: boolean;
};

export const Spinner = ({ visible }: Props) => {
  return (
    <Circles
      height="80"
      width="80"
      color="#4fa94d"
      ariaLabel="circles-loading"
      wrapperStyle={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
      }}
      visible={visible}
    />
  );
};
