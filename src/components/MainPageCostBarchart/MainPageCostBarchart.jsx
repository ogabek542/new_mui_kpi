import React, { useRef, useEffect } from 'react';
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
import i18n from "i18next";
import { useTranslation } from "react-i18next";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const MainPageCostBarchart = ({percentageCost,nopercentageCost}) => {
    const chartRef = useRef(null);
    const {t} = useTranslation();

    const data = {
        labels: [''], // Labels for the x-axis
        datasets: [
            {
                label: t('percentageCostText'),
                data: [percentageCost], // Data for Purple bars
                backgroundColor: 'rgba(54, 162, 235, 0.6)', // Light purple color
                borderColor: 'rgba(54, 100, 200, 0.6)', // Proportional darker purple border
                borderWidth: 2,
                borderRadius: { topLeft: 10, topRight: 10 }, // Add border-radius to top corners
            },
            {
                label: t('nopercentageCostText'), // Changing label to reflect the green color
                data: [nopercentageCost], // Data for Green bars
                backgroundColor: 'rgba(144, 238, 144, 1)', // Light green color
                borderColor: 'rgba(60, 179, 113, 0.7)', // Darker green border
                borderWidth: 3,
                borderRadius: { topLeft: 10, topRight: 10 }, // Add border-radius to top corners
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            x: {
                stacked: false, // Enable stacking on the x-axis
                display: false, // Hide x-axis
            },
            y: {
                stacked: false, // Enable stacking on the y-axis
                beginAtZero: true,
                display: false, // Hide y-axis
            },
        },
        plugins: {
            legend: {
                display: false, // Hide the legend
            },
            tooltip: {
                callbacks: {
                    label: (tooltipItem) => `${tooltipItem.dataset.label}: ${tooltipItem.raw}%`,
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
                            const padding = 6; // Padding around the text
                            const fontSize = 14;
                            const borderRadius = 5; // Border radius for the background

                            // Set font properties
                            ctx.save();
                            ctx.font = `bold ${fontSize}px sans-serif`;
                            ctx.textBaseline = 'middle';
                            ctx.textAlign = 'center';

                            const text = `${value}%`;
                            const textWidth = ctx.measureText(text).width;
                            const textHeight = fontSize;

                            const textX = element.x;
                            const textY = element.y + (element.height -20); // Position text inside the bar

                            // Draw rounded background for the text
                            ctx.fillStyle = 'white';
                            ctx.beginPath();
                            ctx.moveTo(textX - textWidth / 2 - padding + borderRadius, textY - textHeight / 2 - padding);
                            ctx.arcTo(textX + textWidth / 2 + padding, textY - textHeight / 2 - padding, textX + textWidth / 2 + padding, textY + textHeight / 2 + padding, borderRadius);
                            ctx.arcTo(textX + textWidth / 2 + padding, textY + textHeight / 2 + padding, textX - textWidth / 2 - padding, textY + textHeight / 2 + padding, borderRadius);
                            ctx.arcTo(textX - textWidth / 2 - padding, textY + textHeight / 2 + padding, textX - textWidth / 2 - padding, textY - textHeight / 2 - padding, borderRadius);
                            ctx.arcTo(textX - textWidth / 2 - padding, textY - textHeight / 2 - padding, textX + textWidth / 2 + padding, textY - textHeight / 2 - padding, borderRadius);
                            ctx.closePath();
                            ctx.fill();

                            // Draw the text itself
                            ctx.fillStyle = dataset.backgroundColor;
                            ctx.fillText(text, textX, textY);

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
                <Box sx={{ width: '100%', height: '100%', bgcolor: 'transparent', border: 'none' }}>
                    <Bar ref={chartRef} data={data} options={options} />
                </Box>
            </CardContent>
        </Card>
    );
};

export default MainPageCostBarchart;

