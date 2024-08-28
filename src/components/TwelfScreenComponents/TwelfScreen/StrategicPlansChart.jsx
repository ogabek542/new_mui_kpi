import React from 'react';
import { Chart as ChartJS, BarElement, LineElement, CategoryScale, LinearScale, PointElement } from 'chart.js';
import { Chart } from 'react-chartjs-2';
import { Box, Card, CardContent } from '@mui/material';

// Register necessary components for Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, LineElement, PointElement);

const StrategicPlansChart = () => {
  const data = {
    labels: ['2022', '2023', '2024'],
    datasets: [
      {
        type: 'line',
        label: 'Investment Growth',
        data: [100, 150, 200],
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.4)', // Added background color for area effect (if fill is set to true)
        fill: false, // Change to true if you want an area under the line
        tension: 0.4, // Smoothes the line
      },
      {
        type: 'bar',
        label: 'Number of Projects',
        data: [5, 10, 8],
        backgroundColor: 'rgba(153, 102, 255, 0.6)',
        borderColor: 'rgba(153, 102, 255, 1)', // Optional: Border color for bars
        borderWidth: 1, // Optional: Border width for bars
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false, // Allows the chart to use the full container size
    plugins: {
      legend: {
        position: 'top',
        labels: {
          usePointStyle: true,
          pointStyle: 'circle',
        },
      },
      tooltip: {
        mode: 'index',
        intersect: false,
        callbacks: {
          label: function (tooltipItem) {
            return `${tooltipItem.dataset.label}: ${tooltipItem.raw}`;
          },
        },
      },
    },
    scales: {
      x: {
        beginAtZero: true,
        grid: {
          display: false, // Hide grid lines on the x-axis if needed
        },
      },
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(200, 200, 200, 0.2)', // Light grid lines
        },
      },
    },
  };

  return (
    <Card sx={{ height: '100%', width: '100%', bgcolor: 'transparent', border: 'none' }} elevation={0}>
      <CardContent sx={{ height: '100%', bgcolor: 'transparent', border: 'none' }}>
        <Box sx={{ width: '100%', height: '100%', bgcolor: 'transparent', border: 'none' }}>
          <Chart type='bar' data={data} options={options} />
        </Box>
      </CardContent>
    </Card>
  );
};

export default StrategicPlansChart;
