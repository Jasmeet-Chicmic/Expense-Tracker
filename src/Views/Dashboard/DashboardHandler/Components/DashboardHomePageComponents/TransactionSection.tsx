const TransactionSection = () => {
  // Create an array of 20 dummy elements
  const transactions = Array.from(
    { length: 20 },
    (_, index) => `Element ${index + 1}`
  );

  return (
    <div className="flex-1 bg-[#1F2A38] text-xl font-bold rounded-lg p-4 flex flex-col">
      {/* Header Section */}
      <div className="h-16">Recent Transactions</div>

      {/* Scrollable Section */}
      <div className="flex-1 flex flex-col overflow-y-auto space-y-4 hide-scrollbar">
        {transactions.map((transaction, index) => (
          <div key={index} className="h-24 bg-gray-700 p-2">
            {transaction}   
          </div>
        ))}
      </div>
    </div>
  );
};

export default TransactionSection;
