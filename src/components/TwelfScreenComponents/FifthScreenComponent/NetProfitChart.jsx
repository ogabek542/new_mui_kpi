import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Box, Card, CardContent } from '@mui/material';

const NetProfitChart = () => {
  const data = {
    labels: ['Net Profit', 'Expenses'],
    datasets: [
      {
        data: [150, 100],
        backgroundColor: ['rgba(75, 192, 192, 0.4)', 'rgba(255, 99, 132, 0.4)'], // Lighter colors
        borderColor: ['rgba(75, 192, 192, 1)', 'rgba(255, 99, 132, 1)'], // Darker border colors
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
          <Doughnut data={data} options={options} />
        </Box>
      </CardContent>
    </Card>
  );
};

export default NetProfitChart;
