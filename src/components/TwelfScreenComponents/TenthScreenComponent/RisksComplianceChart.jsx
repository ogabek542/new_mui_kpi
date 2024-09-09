import React from 'react';
import { Radar } from 'react-chartjs-2';
import { Box, Card, CardContent } from '@mui/material';

const PerformanceRadarChart = () => {
  const data = {
    labels: ['Communication', 'Technical Skills', 'Problem Solving',"to'rt","besh"],
    datasets: [
      {
        label: 'Employee A',
        data: [34987,7381,57955,10937,3837],
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        pointBackgroundColor: 'rgba(75, 192, 192, 1)',
        pointBorderColor: '#fff',
      },
      {
        label: 'Employee B',
        data: [35917,10327,56494,10700,3873],
        backgroundColor: 'rgba(144, 238, 144, 0.4)',
        borderColor: 'rgba(144, 238, 144, 1)',
        pointBackgroundColor: 'rgba(144, 238, 144, 1)',
        pointBorderColor: '#fff',
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      r: {
        angleLines: {
          display: true,
        },
        suggestedMin: 0,
        suggestedMax: 100,
      },
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
          <Radar data={data} options={options} style={{ height: '100%' }} />
        </Box>
      </CardContent>
    </Card>
  );
};

export default PerformanceRadarChart;
