import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Box, Card, CardContent } from '@mui/material';

const LoanPortfolioChart = () => {
  const data = {
    labels: ['Personal Loans', 'Mortgage Loans', 'Auto Loans'],
    datasets: [
      {
        data: [100, 200, 150],
        backgroundColor: ['rgba(144, 238, 144, 0.4)', 'rgba(54, 162, 235, 0.4)', 'rgba(255, 206, 86, 0.4)'], // Light green, light blue, light yellow
        borderColor: ['rgba(144, 238, 144, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)'], // Darker green, blue, yellow
        borderWidth: 1, // Width of the borders
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            return `${tooltipItem.label}: ${tooltipItem.raw}`;
          },
        },
      },
    },
  };

  return (
    <Card sx={{ height: '100%', width: '100%', bgcolor: 'transparent', border: 'none' }} elevation={0}>
      <CardContent sx={{ height: '100%', bgcolor: 'transparent', border: 'none' }}>
        <Box sx={{ width: '100%', height: '100%', bgcolor: 'transparent', border: 'none' }}>
          <Pie data={data} options={options} />
        </Box>
      </CardContent>
    </Card>
  );
};

export default LoanPortfolioChart;
