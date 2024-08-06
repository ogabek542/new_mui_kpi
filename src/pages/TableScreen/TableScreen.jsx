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



/* 30 Процентные доходы по счетам в других банках

2

40 Процентные доходы по ценным бумагам для купли и продажи

3

80 Процентные доходы по кредитам к получению

4

90 Процентные доходы по кредитам, находящимся

5

В процессе судебного разбирательства

6

110 Другие процентные доходы

7

120 Процентные доходы по сделкам РЕПО с ценными бумагани

8

140 Всего Процентных доходов

9

160 Процентные расходы по депозитам

10

170 Процентные расходы по счетам к оплате в ЦБРУ 180 Процентные расходы по счетам к оплате в другие банки

11

12

200 Процентные расходы по кредитам к оплате

13 210 Процентные расходы по выпущенным ценным бумагам

14

230 Другие процентные расходы

15

240 Всего Процентных расходов

16

250 Чистый Процентный доход

17

260 */