export default function Dashboard() {
  return (
    <div className="mx-auto w-4/5 bg-transparent h-4/5 p-8">
      {/* Balance Box */}
      <div className="bg-transparent  text-white text-left p-6 mb-6 rounded-lg ">
        <h2 className="text-2xl font-bold">Balance</h2>
        <p className="text-xl mt-2">$5,000</p>
      </div>

      {/* Income and Expense Container using Flexbox */}
      <div className="flex justify-between space-x-6 h-1/3">
        {/* Income Box */}
        <div className="flex-1  bg-gray-300 text-gray-600  p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-bold">Income</h3>
          <p className="text-lg mt-2">$3,000</p>
        </div>

        {/* Expense Box */}
        <div className="flex-1 bg-gray-300 text-gray-600 p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-bold">Expense</h3>
          <p className="text-lg mt-2">$2,000</p>
        </div>
      </div>
    </div>
  );
}
