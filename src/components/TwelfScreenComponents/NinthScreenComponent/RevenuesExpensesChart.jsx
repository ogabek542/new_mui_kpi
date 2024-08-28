import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Box, Card, CardContent } from '@mui/material';

const RevenuesExpensesChart = () => {
  // Chart data
  const data = {
    labels: ['Q1', 'Q2', 'Q3', 'Q4'],
    datasets: [
      {
        label: 'Revenues',
        data: [100, 150, 200, 250],
        backgroundColor: 'rgba(75, 192, 192, 0.4)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 2,
      },
      {
        label: 'Expenses',
        data: [80, 120, 160, 210],
        backgroundColor: 'rgba(144, 238, 144, 0.4)',
        borderColor: 'rgba(144, 238, 144, 1)',
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: { stacked: true },
      y: { stacked: true },
    },
    plugins: {
      legend: {
        position: 'top',
      },
    },
  };

  return (
    <Card
      sx={{
        height: '100%',
        width: '100%',
        bgcolor: 'transparent',
        border: 'none',
        padding: '0px',
      }}
      elevation={0}
    >
      <CardContent sx={{ height: '100%', bgcolor: 'transparent', border: 'none', padding: '0px' }}>
        <Box
          sx={{
            width: '100%',
            height: '100%',
            bgcolor: 'transparent',
            border: 'none',
          }}
        >
          <Bar data={data} options={options} style={{ height: '100%' }} />
        </Box>
      </CardContent>
    </Card>
  );
};

export default RevenuesExpensesChart;
