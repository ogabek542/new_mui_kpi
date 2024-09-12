import React, { useEffect, useRef } from 'react';
import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { Box, Card, CardContent } from '@mui/material';
import i18n from "i18next";
import { useTranslation } from "react-i18next";

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChartMainChart = ({piechartData}) => {
  const chartRef = useRef(null);  // Ref for accessing chart instance
  const {t} = useTranslation()


  const data = {
    labels: [
      t('assetsCredits'), // Translate each label
      t('assetsBankDeposits'),
      t('assetsInvestments'),
      t('othersText')
    ],
    datasets: [
      {
        label: '',
        data: piechartData, // Example data
        backgroundColor: [
            'rgba(255, 99, 132, 0.8)',  // Light red color
            'rgba(144, 238, 144, 1)', // Light green color
            'rgba(54, 162, 235, 0.6)', // Blue
            'rgba(76, 0, 153, 0.7)', // Purple

        ],
        borderColor: [
            'rgba(255, 255, 255, 1)',   // Proportional darker red border
            'rgba(255, 255, 255, 1)',  // Proportional darker green border
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
            return ` ${tooltipItem.raw}%`;
          },
        },
      },
    },
    // Animation complete callback to add text on each slice
    animation: {
      onComplete: () => {
        const chartInstance = chartRef.current;
        if (chartInstance) {
          const ctx = chartInstance.ctx;
          const dataset = chartInstance.data.datasets[0]; // Access the dataset
          const meta = chartInstance.getDatasetMeta(0);   // Access meta information about the dataset
          
          meta.data.forEach((element, index) => {
            // Get the center point of each slice
            const { x, y } = element.tooltipPosition();
            const value = dataset.data[index];  // Access the value for this slice
            const padding = 4;  // Shortened padding around the text
            const borderRadius = 6; // Border-radius for rounded corners
          
            // Set font properties
            ctx.save();
            ctx.font = 'bold 14px sans-serif';
            ctx.textBaseline = 'middle';
            ctx.textAlign = 'center';
          
            // Measure the text width and height to create a background
            const text = ` ${value}%`;
            const textWidth = ctx.measureText(text).width;
            const textHeight = 14;  // Approximate height for a 14px font
          
            // Draw rounded rectangle as background
            const rectX = x - textWidth / 2 - padding;
            const rectY = y - textHeight / 2 - padding;
            const rectWidth = textWidth + padding * 2;
            const rectHeight = textHeight + padding * 2;
          
            ctx.fillStyle = 'white';  // Set background color
            ctx.beginPath();
            // Top-left corner
            ctx.moveTo(rectX + borderRadius, rectY);
            ctx.arcTo(rectX + rectWidth, rectY, rectX + rectWidth, rectY + rectHeight, borderRadius); // Top-right corner
            ctx.arcTo(rectX + rectWidth, rectY + rectHeight, rectX, rectY + rectHeight, borderRadius); // Bottom-right corner
            ctx.arcTo(rectX, rectY + rectHeight, rectX, rectY, borderRadius); // Bottom-left corner
            ctx.arcTo(rectX, rectY, rectX + rectWidth, rectY, borderRadius); // Top-left corner
            ctx.closePath();
            ctx.fill();
          
            // Set the text color to match the slice background color
            ctx.fillStyle = dataset.backgroundColor[index];  // Set text color based on slice color
            ctx.fillText(text, x, y);  // Add text inside each slice
          
            ctx.restore();
          });
          
        }
      },
    },
  };
  

  return (
    <Card sx={{ height: '100%', width: '100%', bgcolor: 'transparent', border: 'none' }} elevation={0}>
      <CardContent sx={{ height: '100%', bgcolor: 'transparent', border: 'none' }}>
        <Box sx={{ width: '100%', height: '100%', bgcolor: 'transparent', border: 'none' }}>
          <Pie ref={chartRef} data={data} options={options} />
        </Box>
      </CardContent>
    </Card>
  );
};

export default PieChartMainChart;
