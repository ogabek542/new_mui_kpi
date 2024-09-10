import React, { useRef } from 'react';
import { Bar } from 'react-chartjs-2';
import { Box, Card, CardContent } from '@mui/material';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const LiabilitiesChart = () => {
  const chartRef = useRef(null);

  const data = {
    labels: ['ROE', 'CIR', 'COR'], // Labels for the y-axis
    datasets: [
      {
        label: 'Liabilities',
        data: [125, 21, 100], // Data for the bars
        backgroundColor: 'rgba(72, 209, 204, 0.9)', // Light teal color
        borderColor: 'rgba(0, 174, 239, 1)',
        borderWidth: 2, // Thin border for visual separation
        borderRadius: 30, // Applies border-radius to all corners
        borderSkipped: false,
        barThickness: 40, // Adjust the height of the bars (shorter bar height)s
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
        grid: {
          display: false, // Hide x-axis grid lines
        },
        ticks: {
          display: false, // Hide x-axis ticks
        },
      },
      y: {
        grid: {
          display: false, // Hide y-axis grid lines
        },
        ticks: {
          display: false, // Show y-axis labels (ROE, CIR, COR)
        },
      },
    },
    plugins: {
      legend: {
        display: false, // Hide the legend
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem) => `${tooltipItem.dataset.label}: ${tooltipItem.raw}`,
        },
      },
    },
    animation: {
      onComplete: () => {
        const chartInstance = chartRef.current;
        if (chartInstance) {
          const ctx = chartInstance.ctx;
          chartInstance.data.datasets.forEach((dataset, datasetIndex) => {
            const meta = chartInstance.getDatasetMeta(datasetIndex);
            meta.data.forEach((element, index) => {
              const value = dataset.data[index];
              const fontSize = 14; // Font size for the text
              
              // Set font properties
              ctx.save();
              ctx.font = `bold ${fontSize}px sans-serif`; // Set font to bold
              ctx.textBaseline = 'middle';
              ctx.textAlign = 'center'; // Center-align text inside the bar
    
              // Calculate text position and dimensions
              const text = `${value}%`; // Add '%' symbol to the value
              const textX = element.x - element.width / 4; // Horizontally center the text inside the bar
              const textY = element.y - element.height / 30; // Vertically center the text inside the bar
    
              // Draw the text itself (no background)
              ctx.fillStyle = 'white'; // Text color set to white
              ctx.fillText(text, textX, textY); // Add the '%' symbol to the value
    
              ctx.restore();
            });
          });
        }
      },
    },
  };

  return (
    <Card sx={{ height: '100%', width: '100%', bgcolor: 'transparent', border: 'none' }} elevation={0}>
      <CardContent sx={{ height: '100%', bgcolor: 'transparent', border: 'none' }}>
        <Box sx={{ width: '100%', height: '100%', bgcolor: 'transparen', border: 'none' }}>
          <Bar ref={chartRef} data={data} options={options} />
        </Box>
      </CardContent>
    </Card>
  );
};

export default LiabilitiesChart;
