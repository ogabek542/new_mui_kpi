import React from 'react';
import { Line } from 'react-chartjs-2';
import { Box, Card, CardContent } from '@mui/material';

const CurrencyIndicatorsChart = () => {
  const data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'], // Example months
    datasets: [
      {
        label: 'US Dollar (USD)',
        data: [55, 60, 58, 65, 70, 68, 75],  // Example data representing USD transaction volume over time
        borderColor: '#FF6384',
        backgroundColor: 'rgba(255, 99, 132, 0.15)', // Lighter background color for area fill
        fill: true,
      },
      {
        label: 'Euro (EUR)',
        data: [35, 40, 38, 45, 50, 48, 55],  // Example data representing EUR transaction volume over time
        borderColor: '#36A2EB',
        backgroundColor: 'rgba(54, 162, 235, 0.15)', // Lighter background color for area fill
        fill: true,
      },
      {
        label: 'British Pound (GBP)',
        data: [25, 30, 28, 32, 35, 33, 40],  // Example data representing GBP transaction volume over time
        borderColor: '#FFCE56',
        backgroundColor: 'rgba(255, 206, 86, 0.15)', // Lighter background color for area fill
        fill: true,
      },
      {
        label: 'Japanese Yen (JPY)',
        data: [15, 20, 18, 22, 25, 23, 30],  // Example data representing JPY transaction volume over time
        borderColor: '#4BC0C0',
        backgroundColor: 'rgba(75, 192, 192, 0.15)', // Lighter background color for area fill
        fill: true,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false, // Ensures the chart can expand to fill the container's height
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: 'black',
          font: {
            size: 14,
          },
        },
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            return `${tooltipItem.dataset.label}: ${tooltipItem.raw} transactions`;
          },
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          color: 'black',
          font: {
            size: 16,
          },
        },
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          color: 'black',
          font: {
            size: 16,
          },
        },
      },
    },
  };

  return (
    <Card sx={{ height: '100%', width: '100%', bgcolor: 'transparent', border: 'none', padding: '0px' }} elevation={0}>
      <CardContent sx={{ height: '100%', bgcolor: 'transparent', border: 'none', padding: '0px' }}>
        <Box sx={{ width: '100%', height: '100%', bgcolor: 'transparent', border: 'none' }}>
          <Line data={data} options={options} />
        </Box>
      </CardContent>
    </Card>
  );
};

export default CurrencyIndicatorsChart;
