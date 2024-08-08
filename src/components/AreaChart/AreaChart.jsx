import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler, // Import Filler for area chart
} from 'chart.js';
import { Box, Card, CardContent } from '@mui/material';

// Register the necessary components for Chart.js
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

const AreaChart = () => {
  const data = {
    labels: ['Page A', 'Page B', 'Page C', 'Page D', 'Page E'],
    datasets: [
      {
        label: 'PV',
        data: [2400, 1398, 9800, 3908, 4800],
        backgroundColor: 'rgba(75, 192, 192, 0.4)', // Fill color
        borderColor: 'rgba(75, 192, 192, 1)', // Line color
        borderWidth: 2,
        fill: true, // Enable filling the area under the line
      },
      {
        label: 'UV', // Second dataset label
        data: [4300, 3000, 6200, 7100, 8000], // Example data for the second dataset
        backgroundColor: 'rgba(255, 99, 132, 0.4)', // Light red fill color
        borderColor: 'rgba(255, 99, 132, 1)', // Light red line color
        borderWidth: 2,
        fill: true, // Enable filling the area under the line
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false, // This ensures the chart will fill the container's height
    plugins: {
      legend: {
        display: false, // Hides the legend
      },
      title: {
        display: true,
      },
    },
    scales: {
      x: {
        beginAtZero: true,
      },
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <Card sx={{ height: '100%', width: '100%', bgcolor: 'transparent', border: 'none' }} elevation={0}>
      <CardContent sx={{ height: '100%', bgcolor: 'transparent', border: 'none' }}>
        <Box sx={{ width: '100%', height: '100%', bgcolor: 'transparent', border: 'none' }}>
          <Line data={data} options={options} />
        </Box>
      </CardContent>
    </Card>
  );
};

export default AreaChart;
