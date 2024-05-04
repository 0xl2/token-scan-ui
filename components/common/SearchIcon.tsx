import Image from "next/image";

export const SearchIcon = () => {
  return (
    <Image
      alt="icon"
      loading="lazy"
      width="20"
      height="20"
      decoding="async"
      data-nimg="1"
      className="opacity-80"
      src="./search.svg"
    />
  );
};
