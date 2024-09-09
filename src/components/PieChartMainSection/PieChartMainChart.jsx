import React from 'react';
import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { Box, Card, CardContent } from '@mui/material';

// Register the necessary components for Chart.js
ChartJS.register(ArcElement, Tooltip, Legend);

const PieChartMainChart = () => {
  const data = {
    labels: ['Blue', 'Purple',],
    datasets: [
      {
        label: 'My Pie Chart',
        data: [12, 19,], // Example data
        backgroundColor: [
          'rgba(54, 162, 235, 0.6)', // Blue
          'rgba(2, 13, 158, 1)', // Purple
        ],
        borderColor: [
          'rgba(255, 255, 255, 1)', // Blue
          'rgba(255, 255, 255, 1)', // Purple
        ],
        borderWidth: 3,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false, // This ensures the chart will fill the container's height
    plugins: {
        legend: {
            display: false, // Hide the legend
          },
    
      tooltip: {
        callbacks: {
          label: (tooltipItem) => {
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

export default PieChartMainChart;



