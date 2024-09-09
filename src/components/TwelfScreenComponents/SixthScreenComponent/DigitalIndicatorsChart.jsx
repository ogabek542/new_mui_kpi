import React from 'react';
import { PolarArea } from 'react-chartjs-2';

const DigitalIndicatorsChart = () => {
  const data = {
    labels: ['Online Banking Logins', 'Mobile Banking Transactions', 'Digital Customer Support Requests',"tort","besh"],
    datasets: [
      {
        label: 'Digital Indicators',
        data: [56494,35917, 10328,10700,3873],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 1)',  // Teal
          'rgba(153, 102, 255, 1)', // Purple
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',  // Teal
          'rgba(153, 102, 255, 1)', // Purple
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
      r: {
        beginAtZero: true,
      },
    },
    plugins: {
      legend: {
        position: 'top',
      },
    },
  };

  return <PolarArea data={data} options={options} />;
};

export default DigitalIndicatorsChart;
