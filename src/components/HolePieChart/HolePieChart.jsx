import React, { useRef, useEffect } from 'react';
import { Doughnut } from 'react-chartjs-2'; // Changed from Pie to Doughnut
import { Box, Card, CardContent } from '@mui/material';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';
// LANGUAGE SECTION //
import i18n from "i18next";
import { useTranslation } from "react-i18next";

ChartJS.register(ArcElement, Tooltip, Legend);

const HolePieChart = ({ holeData }) => {
  const chartRef = useRef(null);
  const { t } = useTranslation();

  // No conversion, use the raw data from the API directly
  const data = {
    labels: [
      t('obligationCrediteLine'), // Translate each label
      t('clientsDeposits'),
      t('bankDeposits'),
      t('othersText')
    ],
    datasets: [
      {
        label: '',
        data: holeData, // Use raw data directly
        backgroundColor: [
          'rgba(2, 13, 158, 1)',    // Blue
          'rgba(54, 162, 235, 0.6)', // Purple
          'rgba(76, 0, 153, 0.7)',   // Dark Violet
          'rgba(144, 238, 144, 1)',  // Light Green
        ],
        borderColor: [
          'rgba(255, 255, 255, 1)',  // White border
          'rgba(255, 255, 255, 1)',  
          'rgba(255, 255, 255, 1)',  
          'rgba(255, 255, 255, 1)',  
        ],
        borderWidth: 3, // Define the width of borders
        cutout: '50%', // This creates the doughnut effect by cutting out the middle
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false, // Hide the legend for a clean look
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem) => `${tooltipItem.raw}%`, // Show the percentage in tooltip
        },
      },
    },
    animation: {
      onComplete: () => {
        const chartInstance = chartRef.current;
        if (chartInstance && chartInstance.ctx) {
          const ctx = chartInstance.ctx;
          const dataset = chartInstance.data.datasets[0];
          const meta = chartInstance.getDatasetMeta(0);

          meta.data.forEach((element, index) => {
            const { x, y } = element.tooltipPosition();
            const value = dataset.data[index];
            const padding = 4;
            const borderRadius = 6;

            ctx.save();
            ctx.font = 'bold 14px sans-serif';
            ctx.textBaseline = 'middle';
            ctx.textAlign = 'center';

            const text = `${value}%`;
            const textWidth = ctx.measureText(text).width;
            const textHeight = 14;

            const rectX = x - textWidth / 2 - padding;
            const rectY = y - textHeight / 2 - padding;
            const rectWidth = textWidth + padding * 2;
            const rectHeight = textHeight + padding * 2;

            ctx.fillStyle = 'white';
            ctx.beginPath();
            ctx.moveTo(rectX + borderRadius, rectY);
            ctx.arcTo(rectX + rectWidth, rectY, rectX + rectWidth, rectY + rectHeight, borderRadius);
            ctx.arcTo(rectX + rectWidth, rectY + rectHeight, rectX, rectY + rectHeight, borderRadius);
            ctx.arcTo(rectX, rectY + rectHeight, rectX, rectY, borderRadius);
            ctx.arcTo(rectX, rectY, rectX + rectWidth, rectY, borderRadius);
            ctx.closePath();
            ctx.fill();

            ctx.fillStyle = dataset.backgroundColor[index];
            ctx.fillText(text, x, y);

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
          <Doughnut ref={chartRef} data={data} options={options} />
        </Box>
      </CardContent>
    </Card>
  );
};

export default HolePieChart;
