import { useState, useEffect } from 'react';
import Chart from 'react-apexcharts';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../../Store';
import { motion } from 'framer-motion';

// Define the type for chart data
interface ChartData {
  series: number[];
  options: ApexCharts.ApexOptions; // ApexOptions is the type provided by ApexCharts
}

const SpendFrequency: React.FC = () => {
  const [isDataAvailable, setIsDataAvailable] = useState(true);
  const expenses: number = useSelector(
    (state: RootState) => state.user.expenses
  ) as number;
  const income: number = useSelector(
    (state: RootState) => state.user.income
  ) as number;
  const balance: number = useSelector(
    (state: RootState) => state.user.balance
  ) as number;
  const [chartData, setChartData] = useState<ChartData>({
    series: [55, 45, 55], // Initial static data for three categories
    options: {
      chart: {
        type: 'pie',
      },
      labels: ['Expenses', 'Income', 'Balance'], // Customize your category names
      colors: ['#FF4560', '#00E396', '#666666'], // Colors for each category
      dataLabels: {
        style: {
          fontSize: '16px',
          fontWeight: 'bold',
          colors: ['#ffffff'], // White labels on pie chart slices
        },
      },
      legend: {
        position: 'bottom',
        labels: {
          colors: ['#4B5563', '#4B5563', '#4B5563'], // White labels for the legend
        },
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 300,
            },
            legend: {
              position: 'bottom',
              labels: {
                colors: ['#ffffff'], // White labels for the legend on smaller screens
              },
            },
          },
        },
      ],
    },
  });

  // Simulate fetching dynamic data
  useEffect(() => {
    if (expenses === 0 && income === 0 && balance === 0) {
      setIsDataAvailable(false);
      return;
    }
    if (expenses >= 0 && income >= 0 && balance >= 0) {
      setIsDataAvailable(true);
      setChartData((prevData) => ({
        ...prevData,
        series: [expenses, income, balance], // Update the series data dynamically
      }));
    } else {
      setIsDataAvailable(false);
    }
  }, [expenses, income]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex-1 text-xl font-bold bg-opacity-70 bg-gray-300 dark:bg-[#1F2A38] rounded-lg p-4 flex flex-col"
    >
      <div className="h-12 text-black dark:text-white">Spend Frequency</div>
      <div className="flex-1 flex justify-center items-center">
        {isDataAvailable ? (
          <Chart
            options={chartData.options}
            series={chartData.series}
            type="pie"
            width="400"
          />
        ) : (
          <h1>No data available</h1>
        )}
      </div>
    </motion.div>
  );
};

export default SpendFrequency;
