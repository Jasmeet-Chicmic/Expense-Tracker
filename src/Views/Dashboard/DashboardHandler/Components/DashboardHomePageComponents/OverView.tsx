
const OverView = () => {
  return (
    <div className=" h-1/4 text-xl font-bold bg-[#1F2A38] rounded-lg p-4 flex flex-col">
        <div className="h-1/6">
            Overview
        </div>
        <div className="flex-1 flex  justify-around items-center">
            <div>
                <div className="text-center">10000</div>
                <div className="text-gray-400 text-default text-sm text-center">Account Balance</div>
            </div>
            <div>
                <div className="text-center">10000</div>
                <div className="text-gray-400 text-default text-sm text-center">Income</div>
            </div>
            <div>
                <div className="text-center">10000</div>
                <div className="text-gray-400 text-default text-sm text-center">Expense</div>
            </div>
        </div>
    </div>
  )
}

export default OverView