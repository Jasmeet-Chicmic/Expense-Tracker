import { useState, useEffect } from 'react';
import Chart from 'react-apexcharts';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../../Store';

// Define the type for chart data
interface ChartData {
  series: number[];
  options: ApexCharts.ApexOptions; // ApexOptions is the type provided by ApexCharts
}

const SpendFrequency: React.FC = () => {
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
          colors: ['#ffffff', '#ffffff', '#ffffff'], // White labels on pie chart slices
        },
      },
      legend: {
        position: 'bottom',
        labels: {
          colors: ['#ffffff', '#ffffff', '#ffffff'], // White labels for the legend
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
    setChartData((prevData) => ({
      ...prevData,
      series: [expenses, income, balance], // Update the series data dynamically
    }));
  }, [expenses, income]);

  return (
    <div className="flex-1 text-xl font-bold bg-opacity-70 bg-gray-300 dark:bg-[#1F2A38] rounded-lg p-4 flex flex-col">
      <div className="h-12 text-black dark:text-white">Spend Frequency</div>
      <div className="flex-1 flex justify-center items-center">
        <Chart
          options={chartData.options}
          series={chartData.series}
          type="pie"
          width="400"
        />
      </div>
    </div>
  );
};

export default SpendFrequency;
