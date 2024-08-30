import React, { useEffect, useRef } from 'react';
import { Bar } from 'react-chartjs-2';
import { useContext  } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import NoteContext from '../context/expenses/NoteContext';

// Register the necessary components with Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const MonthlyExpensesChart =  (props) => {
  const a = useContext(NoteContext);
  useEffect(() => {
    a.fetchUserData();
  }, []);

  // Reference to store the chart instance
  const chartRef = useRef(null);
  const expenses = a.expenses
 

  // Preparing the data for the chart
  const data = {
    labels: Object.keys(expenses),
    datasets: [
      {
        label: 'Monthly Expenses',
        data: Object.values(expenses),
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0',
          '#9966FF',
        ],
        borderColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0',
          '#9966FF',
        ],
        borderWidth: 1,
      },
    ],
  };

  // Configuring chart options
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  // Effect hook to destroy chart on component unmount
  useEffect(() => {
    // Cleanup function to destroy chart instance on unmount
    return () => {
      if (chartRef.current) {
        // eslint-disable-next-line
        chartRef.current.destroy();
      }
    };
  }, []);

 

  return (
    <div className='container bg-dark text-white' style={{ height: '400px', width: '400px' }}>
      {/* Attach the ref to the Bar component */}
      <Bar ref={chartRef} data={data} options={options} />
    </div>
  );
};

export default MonthlyExpensesChart;
