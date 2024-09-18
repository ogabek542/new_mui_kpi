import React from 'react'
import CustomTable from '../../components/Table/Table'
import { Box } from '@mui/material'

const TableScreen = () => {
    const data = [
        {
          date: "01.08.2024",
          name: "aj bosh ofis",
          fact: {
            percentage_another_bank_accounts_income: "558816",
            pecentege_valuable_securities_income: "199902",
            percentage_accounts_receivable_income: "5972336",
            percentage_court_proceedings_income: "44706",
            percentage_another_income: "1901366",
            pecentege_valuable_securities_on_repo_income: "199902",
            percentage_total_interest_income: "8497164",
          },
          plan: {},
        },
        // Add more data objects here
      ];
  return (
    <Box sx={{margin:"10px"}}>
        <CustomTable data={data} sx={{margin:"10px"}}/>
    </Box>
  )
}

export default TableScreen