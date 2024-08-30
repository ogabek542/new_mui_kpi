import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Box, Card, CardContent } from '@mui/material';

const LiabilitiesChart = () => {
  const data = {
    labels: ['Deposits', 'Loans', 'Bonds'],
    datasets: [
      {
        label: 'Liabilities',
        data: [300, 100, 50],
        backgroundColor: 'rgba(72, 209, 204, 0.4)', // Light teal color
        borderColor: 'rgba(72, 209, 204, 0.8)', // Darker teal border color
        borderWidth: 3, // Thin border for visual separation
      },
    ],
  };

  const options = {
    indexAxis: 'y', // Makes the bar chart horizontal
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        beginAtZero: true,
      },
    },
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
    },
  };

  return (
    <Card sx={{ height: '100%', width: '100%', bgcolor: 'transparent', border: 'none' }} elevation={0}>
      <CardContent sx={{ height: '100%', bgcolor: 'transparent', border: 'none' }}>
        <Box sx={{ width: '100%', height: '100%', bgcolor: 'transparent', border: 'none' }}>
          <Bar data={data} options={options} />
        </Box>
      </CardContent>
    </Card>
  );
};

export default LiabilitiesChart;
