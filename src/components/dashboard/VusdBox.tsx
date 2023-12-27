import { useSelector } from "react-redux";
import { RootState } from "@/utils/store/store";
import { PieChart } from "./PieChart";

export default function VusdBox() {
  const dusdSupplyInfo = useSelector((state: RootState) => state.dusdSupplyInfo);

  const data = [
    { id: "Arbitrum", value: dusdSupplyInfo.totalSupply - dusdSupplyInfo.victionSupply, color: "#2d623b" },
    { id: "Viction", value: dusdSupplyInfo.victionSupply, color: "#bbf7d0" },
  ];

  return (
    <div className="flex flex-col justify-center items-center mx-auto mb-3 w-1/2 h-1/2">
      <div className="bg-white shadow-lg overflow-hidden sm:rounded-lg p-6 m-3">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">DUSD Overview</h3>
        </div>
        <div className="border-t border-gray-200">

          <div className="flex flex-col px-4 py-5 sm:gap-4 sm:px-6">
            <p className="text-sm font-medium text-gray-500">Total Stablecoin Minted by Chains</p>
            <PieChart data={data} />  
          </div>
            
        </div>
      </div>
    </div>
  )
}