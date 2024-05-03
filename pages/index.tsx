import { PageHeader } from "../components/main/PageHeader";
import { TokenScan } from "../components/scan/TokenScan";

function list() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-800 to-rose-500">
      <PageHeader />

      <TokenScan />
    </div>
  );
}

export default list;
