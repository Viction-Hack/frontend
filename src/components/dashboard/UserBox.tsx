import { useSelector } from "react-redux";
import { RootState } from "@/utils/store/store";
import { displayTwoDecimalPlaces } from "@/utils/displayTwoDecimalPlaces";
import Faucet from "./Faucet";

export default function UserBox() {
  const userBalance = useSelector((state: RootState) => state.userBalances);

  return (
    <div className="flex flex-col justify-center items-center mx-auto mb-3 w-3/5 h-1/2">
      <div className="w-full bg-white shadow-lg overflow-hidden sm:rounded-lg p-6 m-3">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">Your Wallet</h3>
        </div>
        <div className="border-t border-gray-200">
          <dl>
            <div className="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-2 sm:px-6">
              <div className="flex flex-row">
                <img className="h-10 w-10 mr-5 rounded-full" src="/icon.svg" alt="" />
                <dt className="text-l font-medium text-gray-500 mt-2">DUSD</dt>
              </div>
              <div className="mt-2 text-l justify-center text-gray-900 sm:col-start-3">
                {displayTwoDecimalPlaces(userBalance.DUSD)} DUSD
              </div>
              <div className="flex flex-row">
                <img className="h-10 w-10 mr-5 rounded-full" src="/viction.svg" alt="" />
                <dt className="text-l font-medium text-gray-500 mt-2">VIC</dt>
              </div>
              <div className="mt-2 text-l justify-center text-gray-900 sm:col-start-3">
                {displayTwoDecimalPlaces(userBalance.VIC)} VIC
              </div>
              <div className="flex flex-row">
                <img className="h-10 w-10 mr-5 rounded-full" src="/ethereum.svg" alt="" />
                <dt className="text-l font-medium text-gray-500 mt-2">ETH</dt>
              </div>
              <div className="mt-2 text-l justify-center text-gray-900 sm:col-start-3">
                {displayTwoDecimalPlaces(userBalance.ETH)} ETH
              </div>
              <div className="flex flex-row">
                <img className="h-10 w-10 mr-5 rounded-full" src="/dai.svg" alt="" />
                <dt className="text-l font-medium text-gray-500 mt-2">DAI</dt>
              </div>
              <div className="mt-2 text-l justify-center text-gray-900 sm:col-start-3">
                {displayTwoDecimalPlaces(userBalance.DAI)} DAI
              </div>
            </div>
          </dl>
        </div>
      </div>
      <Faucet />
    </div>
  )
}