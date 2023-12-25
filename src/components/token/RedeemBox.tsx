export default function RedeemBox() {
  return (
    <div className="bg-gray-100 rounded-lg text-gray-500 text-sm font-medium h-[120px] leading-5 p-4 relative mb-3">
      <h2 className="text-sm font-medium text-gray-500">Redeem underlying asset with</h2>
      <div className="flex flex-row justify-between">
        <input className="h-full" type="number" placeholder="0.00" />
      </div>
    </div>
  )
}