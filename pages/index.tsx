import { useAddress } from "@thirdweb-dev/react";
import React, { useEffect, useState } from "react";

import { Spinner } from "../components/common/Spinner";
import { ListHeader } from "../components/list/ListHeader";

function list() {
  const [openTab, setOpenTab] = useState(1);
  const [loading, setLoading] = useState(true);

  const address = useAddress();

  const fetchData = async () => {
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [address]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-800 to-rose-500">
      <ListHeader />

      <div className="container mx-auto px-4 pt-10">
        <Spinner visible={loading} />
      </div>
    </div>
  );
}

export default list;
