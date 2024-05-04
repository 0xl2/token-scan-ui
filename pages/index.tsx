import { PageHeader } from "../components/main/PageHeader";
import { TokenScan } from "../components/scan/TokenScan";

function list() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-300 to-sky-200">
      <PageHeader />
      <TokenScan />
    </div>
  );
}

export default list;
