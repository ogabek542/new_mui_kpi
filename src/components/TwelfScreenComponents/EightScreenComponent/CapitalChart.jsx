import React from 'react';
import { Line } from 'react-chartjs-2';
import { Box, Card, CardContent } from '@mui/material';

const CapitalChart = () => {
  const data = {
    labels: ['2020', '2021', '2022', '2023','2024'],
    datasets: [
      {
        label: 'Bank Capital',
        data: [150, 200, 80, 220,220],
        fill: true,
        backgroundColor: 'rgba(153, 102, 255, 0.2)',
        borderColor: 'rgba(153, 102, 255, 1)',
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false, // Allows the chart to take 100% height of its container
    plugins: {
      legend: {
        position: 'top',
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
          <Line data={data} options={options} style={{ height: '100%' }} />
        </Box>
      </CardContent>
    </Card>
  );
};

export default CapitalChart;
