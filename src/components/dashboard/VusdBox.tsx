import { useSelector } from "react-redux";
import { RootState } from "@/utils/store/store";
import { PieChart } from "./PieChart";
import CollateralTable from "./CollateralTable";

export default function VusdBox() {
  const dusdSupplyInfo = useSelector((state: RootState) => state.dusdSupplyInfo);
  const positions = useSelector((state: RootState) => state.positions);

  const data = [
    { id: "Avalanche", value: dusdSupplyInfo.totalSupply, color: "#ef4142" },
    { id: "Viction", value: dusdSupplyInfo.victionSupply, color: "#f8f6d7" },
  ];

  return (
    <div className="flex flex-row justify-center items-center mx-auto mb-3 w-4/5 h-1/2">
      <div className="w-full bg-white shadow-lg overflow-hidden sm:rounded-lg p-6 m-3">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">Protocol Overview</h3>
        </div>
        <div className="flex flex-row justify-between border-t border-gray-200">
          <div className="flex flex-col px-4 py-5 sm:gap-4 sm:px-6">
            <p className="text-l font-medium">Total Stablecoin Minted by Chains</p>
            <PieChart data={data} />
          </div>
          <div className="flex flex-col px-10 py-5 sm:gap-4 sm:px-6 w-full">
            <p className="text-l font-medium">Total Collateral Position</p>
            <CollateralTable positions={positions} />
          </div>
        </div>
      </div>
    </div>
  )
}