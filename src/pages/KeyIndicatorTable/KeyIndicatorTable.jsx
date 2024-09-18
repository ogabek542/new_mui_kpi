import React from 'react';
import { Grid, Typography, Box } from '@mui/material';
import { Colors } from '../../styles/theme'; // assuming Colors is imported from a theme

// A reusable function to insert spaces every 3 digits
const insertSpaces = (text) => {
  if (!text) return ""; // Handle empty or undefined text
  const str = text.toString();
  return str.replace(/\B(?=(\d{3})+(?!\d))/g, " "); // Add spaces every 3 digits
};

// A reusable component for displaying a grid row
const TableRow = ({ rowData, rowNumber, isGreen, isWhite, subRow }) => {
  const rowColor = isGreen ? Colors.green_tablerow_light : isWhite ? Colors.white : Colors.gray_footer;

  return (
    <Grid
      container
      sx={{
        borderBottom: `2px solid ${Colors.gray_back}`,
        borderRight: `2px solid ${Colors.gray_back}`,
        height: "auto",
        bgcolor: rowColor,
      }}
    >
      {/* Row number */}
      <Grid item xs={0.5} sx={cellStyles('center', true)}>
        <Typography sx={{ fontWeight: isGreen ? 400 : 'bold' }}>{subRow ? `${rowNumber}.${subRow}` : rowNumber}</Typography>
      </Grid>

      {/* Data Columns */}
      {rowData.map((data, index) => (
        <Grid item xs={data.width} sx={cellStyles(data.align, true)} key={index}>
          <Typography
            component="span"
            sx={{
              fontStyle: "uppercase",
              display: "flex",
              justifyContent: data.align === 'end' ? 'flex-end' : 'flex-start',
              alignItems: "center",
              width: "100%",
              px: "5px",
              fontWeight: data.bold ? 'bold' : 500,
              overflowWrap: "break-word",
              wordBreak: "break-all",
              fontSize: "14px",
            }}
          >
            {data.value}
          </Typography>
        </Grid>
      ))}
    </Grid>
  );
};

// Reusable cell styles
const cellStyles = (align = 'center', bordered = false) => ({
  display: 'flex',
  justifyContent: align === 'center' ? 'center' : `flex-${align}`,
  alignItems: 'center',
  textAlign: align,
  borderRight: bordered ? `2px solid ${Colors.gray_back}` : 'none',
  borderLeft: bordered ? `2px solid ${Colors.gray_back}` : 'none',
});

// Main component for displaying the table
const DataTable = () => {
  // Table data
  const tableData = [
    {
      rowNumber: '1',
      isGreen: false,
      rowData: [
        { value: 'Активы (нетто)', width: 2, align: 'start', bold: true },
        { value: insertSpaces(127502890.49), width: 1.1, align: 'end', bold: true },
        { value: insertSpaces(135798589.41), width: 1.1, align: 'end', bold: true },
        { value: insertSpaces(137240940.28), width: 1.1, align: 'end', bold: true },
        { value: insertSpaces(137759743.51), width: 1.1, align: 'end', bold: true },
        { value: `${insertSpaces(108.04)}%`, width: 1.7, align: 'center', bold: true },
        { value: `${insertSpaces(101.44)}%`, width: 1.7, align: 'center', bold: true },
      ],
    },
    {
      rowNumber: '2',
      isGreen: true,
      rowData: [
        { value: 'в том числе: в ин.валюте', width: 2, align: 'start', bold: false },
        { value: insertSpaces(127502890.49), width: 1.1, align: 'end', bold: false },
        { value: insertSpaces(135798589.41), width: 1.1, align: 'end', bold: false },
        { value: insertSpaces(137240940.28), width: 1.1, align: 'end', bold: false },
        { value: insertSpaces(137759743.51), width: 1.1, align: 'end', bold: false },
        { value: `${insertSpaces(108.04)}%`, width: 1.7, align: 'center', bold: false },
        { value: `${insertSpaces(101.44)}%`, width: 1.7, align: 'center', bold: false },
      ],
    },
    {
      rowNumber: '6.1',
      isWhite: true,
      rowData: [
        { value: 'Проблемные кредиты (всего) (сум+валюта)', width: 2, align: 'start', bold: true },
        { value: insertSpaces(127502890.49), width: 1.1, align: 'end', bold: true },
        { value: insertSpaces(135798589.41), width: 1.1, align: 'end', bold: true },
        { value: insertSpaces(137240940.28), width: 1.1, align: 'end', bold: true },
        { value: insertSpaces(137759743.51), width: 1.1, align: 'end', bold: true },
        { value: `${insertSpaces(108.04)}%`, width: 1.7, align: 'center', bold: true },
        { value: `${insertSpaces(101.44)}%`, width: 1.7, align: 'center', bold: true },
      ],
    },
  ];

  return (
    <>
      {tableData.map((row, index) => (
        <TableRow
          key={index}
          rowData={row.rowData}
          rowNumber={row.rowNumber}
          isGreen={row.isGreen}
          isWhite={row.isWhite}
        />
      ))}
    </>
  );
};

export default DataTable;
