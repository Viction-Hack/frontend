import CollateralTable from "./CollateralTable"
import { useSelector } from "react-redux";
import { RootState } from "@/utils/store/store";
import { displayTwoDecimalPlaces } from "@/utils/displayTwoDecimalPlaces";

export default function UserBox() {
  const userBalance = useSelector((state: RootState) => state.userBalances);
  const positions = useSelector((state: RootState) => state.positions);
  const prices = useSelector((state: RootState) => state.tokenPrices);
  
  return (
    <div className="flex flex-col justify-center items-center mx-auto mb-3 w-1/2 h-1/2">
      <div className="bg-white shadow-lg overflow-hidden sm:rounded-lg p-6 m-3">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">Your Wallet</h3>
        </div>
        <div className="border-t border-gray-200">
          <dl>
            <div className="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-2 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">DUSD in Your Wallet</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-start-3">
                {displayTwoDecimalPlaces(userBalance.DUSD)} DUSD
              </dd>
            </div>
            <div className="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Your Collateral</dt>
            </div>
            <CollateralTable positions={positions} tokenPrices={prices} />
          </dl>
        </div>
      </div>
    </div>
  )
}