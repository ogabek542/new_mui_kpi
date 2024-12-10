const newtableData = {
    choosedfirstYear: "2023",  // user Tanlagan Kichik(oldingi) yil  //
    choosedsecondYear: "2024", // user tanlagan katta(keyingi) yil       //
    filialsName:["Respublika","Andijon","ARK BXM"],
    newMonths: [ // user tomonidan tanlangan oylar ro'yxati massivga to'plab jo'natiladi //
      "January", // faqat yanvar oyi tanlangani uchun bu yerda faqat yanvar oyi nomi mavjud //
    ],
    data: [ // 561 - raqamli qator uchun tuzilhan object 561-raqamli xisob kitob qatori malumotlari shakillantirilgan malumotlar saqlanadi//
      {
        id: "1", // 561 chi qator uchun tanlangan id  (xar bir qator uchun shakllantiriladi ) // 
        name: "561", // 561 qator uchun yuboriladian nom  //
        months: { // oylar ro'yxati user tomonidan newMonths massiviga to'plangan oylar asosida shakillantiriladi  //
        January: { newfirstYear: "52995",newsecondYear: "89379",differencePercentage: "18",differenceAmount: "3647" },// xar bitta oy uchun o'zining qiymatlari shakllantiriladi, newfirstYear: 200,=> bu tanlangan kichik yil qiymati , newsecondYear: 104,=> bu user tomonidan katta yil qiymati joylanadi, differencePercentage: "18",=> tanlangan kichikj va katta yillar orasidagi farq foiz qiymat chiqarish uchun   //
        },
        firstYearTotalSum: "52995",  // ==> kichik yilning to'liq summalari yi'gindisi , Agarda user tomonidan yillar tanlansa yig'indi tanlangan oylar soniga qarab o'zgaradi //
        secondYearTotalSum: "89379",// ==> katta yilning to'liq summalari yi'gindisi , Agarda user tomonidan yillar tanlansa yig'indi tanlangan oylar soniga qarab o'zgaradi //
        percentageSeparateTotal:"18", // ==> tanlangan katta va kichik yillarning to'liq summalari orasidagi foiz farq (o'zaro yillar orasida ) //
        amountSeparateTotal: "3647", // ==> tanlangan katta va kichik yillarning to'liq summalari orasidagi miqdor(mln so'm) farq (o'zaro yillar orasida ) //
        subRows: [
          {
            id: "1.1",
            name: "Заработная плата",
            months: {
            January:{ newfirstYear:"28514",newsecondYear: "69046",differencePercentage:"35",differenceAmount:"40532"},// newfirstYear: 200,=> bu tanlangan kichik yil qiymati , newsecondYear: 104,=> bu user tomonidan katta yil qiymati joylanadi, differencePercentage: "18",=> tanlangan kichikj va katta yillar orasidagi farq foiz qiymat chiqarish uchun   //
            },
            firstYearTotalSum:"28514",
            secondYearTotalSum:"69046",
            percentageSeparateTotal: "35",
            amountSeparateTotal: "40532",
            subRows: [
              {
                id: " 1.1.1",
                name: "Выплата районного коэффициента",
                months: {
                January: { newfirstYear: "125",newsecondYear:"176",differencePercentage:"18",differenceAmount:"51" },// newfirstYear: 125,=> bu tanlangan kichik yil qiymati , newsecondYear: 176,=> bu user tomonidan katta yil qiymati joylanadi, differencePercentage: "18",=> tanlangan kichikj va katta yillar orasidagi farq foiz qiymat chiqarish uchun   //
                },
                firstYearTotalSum: "125",
                secondYearTotalSum: "176",
                percentageSeparateTotal: "18",
                amountSeparateTotal: "51",
                
              },
              {
                id: "1.1.1",
                name: "Гособязанность/Харбий мажбурият",
                months: {
                January:{newfirstYear:"17",newsecondYear:"18",differencePercentage:"4.5",differenceAmount:"1" },// newfirstYear: 200,=> bu tanlangan kichik yil qiymati , newsecondYear: 104,=> bu user tomonidan katta yil qiymati joylanadi, differencePercentage: "18",=> tanlangan kichikj va katta yillar orasidagi farq foiz qiymat chiqarish uchun   //
                },
                firstYearTotalSum: "17",
                secondYearTotalSum: "18",
                percentageSeparateTotal: "4.5",
                amountSeparateTotal: "1",
              },
              {
                id: " 1.1.1",
                name: "ИСН,ИОР и другие надбавки",
                months: {
                January: {newfirstYear:"-", newsecondYear:"15524",differencePercentage:"-", differenceAmount:"-" },// newfirstYear: 200,=> bu tanlangan kichik yil qiymati , newsecondYear: 104,=> bu user tomonidan katta yil qiymati joylanadi, differencePercentage: "18",=> tanlangan kichikj va katta yillar orasidagi farq foiz qiymat chiqarish uchun   //
                },
                firstYearTotalSum: "-",
                secondYearTotalSum: "15524",
                percentageSeparateTotal: "-",
                amountSeparateTotal: "-",
              },
              {
                id: " 1.1.1",
                name: "Оклад по штатному расписанию",
                months: {
                January: {newfirstYear:"9065",newsecondYear:"23111", differencePercentage: "205", differenceAmount: "13046" },// newfirstYear: 200,=> bu tanlangan kichik yil qiymati , newsecondYear: 104,=> bu user tomonidan katta yil qiymati joylanadi, differencePercentage: "18",=> tanlangan kichikj va katta yillar orasidagi farq foiz qiymat chiqarish uchun   //
                },
                firstYearTotalSum: "9065",
                secondYearTotalSum: "23111",
                percentageSeparateTotal: "205",
                amountSeparateTotal: "13046",
              },
            ],
          },
          {
            id: "1.1",
            name: "Льготы для сотрудников",
            months: {
            January: {newfirstYear:"11189",newsecondYear:"1122",differencePercentage:"-90",differenceAmount:"10067"},// newfirstYear: 11189,=> bu tanlangan kichik yil qiymati , newsecondYear: 1122,=> bu user tomonidan katta yil qiymati joylanadi, differencePercentage: "-90",=> tanlangan kichikj va katta yillar orasidagi farq foiz qiymat chiqarish uchun   //
            },
            firstYearTotalSum: "11189",
            secondYearTotalSum: "1122",
            percentageSeparateTotal: "-90",
            amountSeparateTotal: "10067",
            subRows: [
              {
                id: " 1.1.1",
                name: "202:Единовременные премии (другие)",
                months: {
                January: { newfirstYear: "5",newsecondYear:"-",differencePercentage:"-",differenceAmount:"-" },// newfirstYear: 125,=> bu tanlangan kichik yil qiymati , newsecondYear: 176,=> bu user tomonidan katta yil qiymati joylanadi, differencePercentage: "-",=> tanlangan kichikj va katta yillar orasidagi farq foiz qiymat chiqarish uchun   //
                },
                firstYearTotalSum: "5",
                secondYearTotalSum: "-",
                percentageSeparateTotal: "-",
                amountSeparateTotal: "-",
              },
              {
                id: " 1.1.1",
                name: "402:Recruit Exps:banking§402:Оплата контрактов на обучение§402:Ta'lim uchun shar",
                months: {
                January:{newfirstYear:"-",newsecondYear:"-",differencePercentage:"-",differenceAmount:"-"},// newfirstYear: 200,=> bu tanlangan kichik yil qiymati , newsecondYear: 104,=> bu user tomonidan katta yil qiymati joylanadi, differencePercentage: "18",=> tanlangan kichikj va katta yillar orasidagi farq foiz qiymat chiqarish uchun   //
                },
                firstYearTotalSum: "-",
                secondYearTotalSum: "-",
                percentageSeparateTotal: "-",
                amountSeparateTotal: "-",
              },
              {
                id: " 1.1.1",
                name: "403:ОплОбучЦентрПовышКвал НБУ",
                months: {
                  January:{newfirstYear:"-",newsecondYear:"-",differencePercentage:"-",differenceAmount:"-"},// newfirstYear: 200,=> bu tanlangan kichik yil qiymati , newsecondYear: 104,=> bu user tomonidan katta yil qiymati joylanadi, differencePercentage: "18",=> tanlangan kichikj va katta yillar orasidagi farq foiz qiymat chiqarish uchun   //
                  },
                  firstYearTotalSum: "-",
                  secondYearTotalSum: "-",
                  percentageSeparateTotal: "-",
                  amountSeparateTotal: "-",
              },
              {
                id: " 1.1.1",
                name: "403:ОплОбучЦентрПовышКвал НБУ§403:ОплОбучЦентрПовышКвал НБУ",
                months: {
                  January:{newfirstYear:"-",newsecondYear:"-",differencePercentage:"-",differenceAmount:"-"},// newfirstYear: 200,=> bu tanlangan kichik yil qiymati , newsecondYear: 104,=> bu user tomonidan katta yil qiymati joylanadi, differencePercentage: "18",=> tanlangan kichikj va katta yillar orasidagi farq foiz qiymat chiqarish uchun   //
                  },
                  firstYearTotalSum: "-",
                  secondYearTotalSum: "-",
                  percentageSeparateTotal: "-",
                  amountSeparateTotal: "-",
              },
            ],
          },

        ],
      },
      // Add more rows as needed //
    ],
    totalData:[
      {
      name: "Grand Total", // to'liq yig'indi nomi xardoim birxil "Grand Total" //
      months: {
        January: {
          newfirstMonth:"92797", // ==>  tanlangan kichik yilning 1-oydagi qiymatlari to'liq yig'indisi //
          newsecondMonth:"145250", // ==>  tanlangan katta yilning 1-oydagi qiymatlari to'liq yig'indisi //
          differencePercentageTotalMonth: "162", // ==> 1-oydagi  tanlangan katta va kichik yilning o'zaro nisbatidan olingan foiz  //
          differenceAmountTotalMonth: "52453", // ==> 1-oydagi  tanlangan katta va kichik yilning o'zaro ayirmasidan olingan summa   //
        },
      },
      firstYearTotalMonthSum: "92797", // ==> 1-yilning(kichik yil) barcha oylardagi qiymatlari yig'indisi summa //
      secondYearTotalMonthSum: "145250", // ==> 2-yilning(katta yil) barcha oylardagi qiymatlari yig'indisi summa //
      percentageSeparateTotalMonth: "162",// ==> 1-yilning(kichik yil)  va 2-yilning(katta yil) barcha oylardagi qiymatlari nisbati foiz qiymatda //
      amountSeparateTotalMonth: "52453", // ==> 1-yilning(kichik yil)  va 2-yilning(katta yil) barcha oylardagi qiymatlari ayirmasi summa qiymatda //
    }
    ],
  };

export default newtableData; 



// import React, { useState, useEffect } from "react";
// import {
//   Box,
//   FormControl,
//   InputLabel,
//   Select,
//   MenuItem,
//   OutlinedInput,
//   Checkbox,
//   ListItemText,
//   Button,
// } from "@mui/material";

// const AnalizeYearDashboard = () => {
//   const [selectedBranch, setSelectedBranch] = useState(""); // State for the branch filter
//   const [selectedMonths, setSelectedMonths] = useState([]); // State for months filter
//   const [selectedAccountNumbers, setSelectedAccountNumbers] = useState([]); // State for account number filter
//   const [monthsList, setMonthsList] = useState([]); // List of months based on selected branch
//   const [accountNumbers, setAccountNumbers] = useState([]); // Account numbers based on selected month
//   const [branches, setBranches] = useState([]); // List of branches (this can be populated from an API)

//   // Fetch the list of branches on mount
//   useEffect(() => {
//     // Simulate an API call to fetch branch data
//     const fetchBranches = async () => {
//       const response = await fetch("/api/branches"); // Replace with your actual API endpoint
//       const data = await response.json();
//       setBranches(data);
//     };
//     fetchBranches();
//   }, []);

//   // Fetch months based on the selected branch
//   useEffect(() => {
//     const fetchMonths = async () => {
//       if (selectedBranch) {
//         const response = await fetch(`/api/branches/${selectedBranch}/months`);
//         const data = await response.json();
//         setMonthsList(data);
//       }
//     };
//     fetchMonths();
//   }, [selectedBranch]);

//   // Fetch account numbers based on selected month(s)
//   useEffect(() => {
//     const fetchAccountNumbers = async () => {
//       if (selectedMonths.length > 0) {
//         const response = await fetch(`/api/branches/${selectedBranch}/accounts`, {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({ months: selectedMonths }),
//         });
//         const data = await response.json();
//         setAccountNumbers(data);
//       }
//     };
//     fetchAccountNumbers();
//   }, [selectedMonths, selectedBranch]);

//   const handleChangeBranch = (event) => {
//     setSelectedBranch(event.target.value);
//     setSelectedMonths([]); // Reset months and account numbers on branch change
//     setAccountNumbers([]);
//   };

//   const handleChangeMonth = (event) => {
//     setSelectedMonths(event.target.value);
//   };

//   const handleChangeAccount = (event) => {
//     setSelectedAccountNumbers(event.target.value);
//   };

//   // Function to send selected filter data to the backend
//   const handleSubmit = async () => {
//     const selectedData = {
//       branch: selectedBranch,
//       months: selectedMonths,
//       accountNumbers: selectedAccountNumbers,
//     };
//     // Make the API request with the selected filters
//     const response = await fetch("/api/filter-data", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(selectedData),
//     });
//     const data = await response.json();
//     console.log(data); // Handle the data response accordingly
//   };

//   return (
//     <Box sx={{ display: "flex", flexDirection: "column", gap: "20px" }}>
//       {/* Branch Selector */}
//       <FormControl size="small" fullWidth>
//         <InputLabel id="branch-label">Branch</InputLabel>
//         <Select
//           labelId="branch-label"
//           id="branch-selector"
//           value={selectedBranch}
//           onChange={handleChangeBranch}
//           input={<OutlinedInput label="Branch" />}
//         >
//           {branches.map((branch) => (
//             <MenuItem key={branch.id} value={branch.id}>
//               {branch.name}
//             </MenuItem>
//           ))}
//         </Select>
//       </FormControl>

//       {/* Month Selector */}
//       <FormControl size="small" fullWidth>
//         <InputLabel id="month-label">Month</InputLabel>
//         <Select
//           labelId="month-label"
//           id="month-selector"
//           multiple
//           value={selectedMonths}
//           onChange={handleChangeMonth}
//           input={<OutlinedInput label="Month" />}
//           renderValue={(selected) => selected.join(", ")}
//         >
//           {monthsList.map((month) => (
//             <MenuItem key={month.id} value={month.id}>
//               <Checkbox checked={selectedMonths.includes(month.id)} />
//               <ListItemText primary={month.name} />
//             </MenuItem>
//           ))}
//         </Select>
//       </FormControl>

//       {/* Account Number Selector */}
//       <FormControl size="small" fullWidth>
//         <InputLabel id="account-label">Account Number</InputLabel>
//         <Select
//           labelId="account-label"
//           id="account-selector"
//           multiple
//           value={selectedAccountNumbers}
//           onChange={handleChangeAccount}
//           input={<OutlinedInput label="Account Number" />}
//           renderValue={(selected) => selected.join(", ")}
//         >
//           {accountNumbers.map((account) => (
//             <MenuItem key={account.id} value={account.id}>
//               <Checkbox checked={selectedAccountNumbers.includes(account.id)} />
//               <ListItemText primary={account.number} />
//             </MenuItem>
//           ))}
//         </Select>
//       </FormControl>

//       {/* Submit Button */}
//       <Button variant="contained" color="primary" onClick={handleSubmit}>
//         Submit
//       </Button>
//     </Box>
//   );
// };

// export default AnalizeYearDashboard;









// import React, { useState, useEffect } from 'react';
// import {
//   Container,
//   Box,
//   FormControl,
//   InputLabel,
//   Select,
//   MenuItem,
//   OutlinedInput,
//   Checkbox,
//   ListItemText,
//   Button
// } from '@mui/material';
// import { Colors } from '../../styles/theme';
// import top128Filials from '../testapi/firstOption';
// import setSelectedSecondMap from '../testapi/SecondOptions';
// import { REQUESTS } from '../../api/requests';

// const yearsList = [
//   { label: 2020 },
//   { label: 2021 },
//   { label: 2022 },
//   { label: 2023 },
//   { label: 2024 },
// ];

// const monthsList = [
//   { name: 'January', id: 1 },
//   { name: 'February', id: 2 },
//   { name: 'March', id: 3 },
//   { name: 'April', id: 4 },
//   { name: 'May', id: 5 },
//   { name: 'June', id: 6 },
//   { name: 'July', id: 7 },
//   { name: 'August', id: 8 },
//   { name: 'September', id: 9 },
//   { name: 'October', id: 10 },
//   { name: 'November', id: 11 },
//   { name: 'December', id: 12 },
// ];

// const numbersList = [
//   '561', '562', '563', '564', '565', '566', '567', '568', '569', '570',
//   '571', '572', '573', '574', '575', '576', '577', '578', '579',
// ];

// const textList = [
//   'Заработная плата', 'Служба охраны', 'Командировочные расходы', 'Почта, телефон, факс',
//   'Репрезентация', 'Расходы на износ', 'Налоги (иные, чем налоги на прибыль)',
//   '568', '569', '570', '571', '572', '573', '574', '575', '576', '577', '578', '579',
// ];

// const combinedList = numbersList.map((number, index) => ({
//   id: `${number}-${index}`,
//   number,
//   text: textList[index] || '',
// }));

// const AnalizeYearDashboard = () => {
//   const [selectedFilial, setSelectedFilial] = useState('');
//   const [selectedSubFilials, setSelectedSubFilials] = useState([]);
//   const [selectedYears, setSelectedYears] = useState([]);
//   const [selectedMonths, setSelectedMonths] = useState([]);
//   const [selectedAccountNumbers, setSelectedAccountNumbers] = useState([]);

//   // Step 1: Handle Filial Selection
//   const handleFilialChange = (event) => {
//     const filialId = event.target.value;
//     setSelectedFilial(filialId);
//     setSelectedSubFilials([]); // Reset sub-filials when filial changes
//     setSelectedYears([]); // Reset years when filial changes
//     setSelectedMonths([]); // Reset months when filial changes
//     setSelectedAccountNumbers([]); // Reset account numbers
//   };

//   // Step 2: Handle Sub-filial Selection
//   const handleSubFilialChange = (event) => {
//     const selectedSubFilials = event.target.value;
//     setSelectedSubFilials(selectedSubFilials);
//     setSelectedYears([]); // Reset years when sub-filial changes
//     setSelectedMonths([]); // Reset months when sub-filial changes
//     setSelectedAccountNumbers([]); // Reset account numbers
//   };

//   // Step 3: Handle Year Selection
//   const handleYearChange = (event) => {
//     setSelectedYears(event.target.value);
//     setSelectedMonths([]); // Reset months when year changes
//     setSelectedAccountNumbers([]); // Reset account numbers
//   };

//   // Step 4: Handle Month Selection
//   const handleMonthChange = (event) => {
//     setSelectedMonths(event.target.value);
//     setSelectedAccountNumbers([]); // Reset account numbers when months change
//   };

//   // Step 5: Handle Account Number Selection
//   const handleAccountNumberChange = (event) => {
//     setSelectedAccountNumbers(event.target.value);
//   };

//   // Fetch data based on selections and send request
//   const handleSubmit = async () => {
//     const params = {
//       filial: selectedFilial,
//       subFilials: selectedSubFilials,
//       years: selectedYears,
//       months: selectedMonths,
//       accountNumbers: selectedAccountNumbers,
//     };

//     try {
//       const response = await REQUESTS.financialAnalize.getFinancialAnalize(params);
//       console.log(response.data); // Handle the response data
//     } catch (error) {
//       console.error('Error fetching data:', error);
//     }
//   };

//   // Dynamically populate the sub-filials based on the selected filial
//   const getSubFilials = (filialId) => {
//     return setSelectedSecondMap[filialId] || [];
//   };

//   return (
//     <Container maxWidth="false" disableGutters sx={{ width: '100%', bgcolor: Colors.gray_back }}>
//       <Box sx={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
//         {/* Filial Selector */}
//         <FormControl size="small" fullWidth>
//           <InputLabel>Filial</InputLabel>
//           <Select
//             value={selectedFilial}
//             onChange={handleFilialChange}
//             input={<OutlinedInput label="Filial" />}
//           >
//             {top128Filials.map((filial) => (
//               <MenuItem key={filial.id} value={filial.id}>
//                 {filial.title}
//               </MenuItem>
//             ))}
//           </Select>
//         </FormControl>

//         {/* Sub-Filial Selector */}
//         <FormControl size="small" fullWidth>
//           <InputLabel>Sub-Filial</InputLabel>
//           <Select
//             multiple
//             value={selectedSubFilials}
//             onChange={handleSubFilialChange}
//             input={<OutlinedInput label="Sub-Filial" />}
//             renderValue={(selected) => selected.join(', ')}
//           >
//             {getSubFilials(selectedFilial).map((subFilial) => (
//               <MenuItem key={subFilial.title} value={subFilial.title}>
//                 <Checkbox checked={selectedSubFilials.includes(subFilial.title)} />
//                 <ListItemText primary={subFilial.title} />
//               </MenuItem>
//             ))}
//           </Select>
//         </FormControl>

//         {/* Year Selector */}
//         <FormControl size="small" fullWidth>
//           <InputLabel>Year</InputLabel>
//           <Select
//             multiple
//             value={selectedYears}
//             onChange={handleYearChange}
//             input={<OutlinedInput label="Year" />}
//             renderValue={(selected) => selected.join(', ')}
//           >
//             {yearsList.map((year) => (
//               <MenuItem key={year.label} value={year.label}>
//                 <Checkbox checked={selectedYears.includes(year.label)} />
//                 <ListItemText primary={year.label} />
//               </MenuItem>
//             ))}
//           </Select>
//         </FormControl>

//         {/* Month Selector */}
//         <FormControl size="small" fullWidth>
//           <InputLabel>Month</InputLabel>
//           <Select
//             multiple
//             value={selectedMonths}
//             onChange={handleMonthChange}
//             input={<OutlinedInput label="Month" />}
//             renderValue={(selected) => selected.join(', ')}
//           >
//             {monthsList.map((month) => (
//               <MenuItem key={month.id} value={month.name}>
//                 <Checkbox checked={selectedMonths.includes(month.name)} />
//                 <ListItemText primary={month.name} />
//               </MenuItem>
//             ))}
//           </Select>
//         </FormControl>

//         {/* Account Number Selector */}
//         <FormControl size="small" fullWidth>
//           <InputLabel>Account Number</InputLabel>
//           <Select
//             multiple
//             value={selectedAccountNumbers}
//             onChange={handleAccountNumberChange}
//             input={<OutlinedInput label="Account Number" />}
//             renderValue={(selected) => selected.join(', ')}
//           >
//             {combinedList.map((item) => (
//               <MenuItem key={item.id} value={item.number}>
//                 <Checkbox checked={selectedAccountNumbers.includes(item.number)} />
//                 <ListItemText primary={`${item.number} - ${item.text}`} />
//               </MenuItem>
//             ))}
//           </Select>
//         </FormControl>

//         {/* Submit Button */}
//         <Button variant="contained" color="primary" onClick={handleSubmit}>
//           Submit
//         </Button>
//       </Box>
//     </Container>
//   );
// };

// export default AnalizeYearDashboard;










// import React, { useState, useEffect } from 'react';
// import {
//   Container,
//   Box,
//   FormControl,
//   InputLabel,
//   Select,
//   MenuItem,
//   OutlinedInput,
//   Checkbox,
//   ListItemText,
//   Button
// } from '@mui/material';
// import { Colors } from '../../styles/theme';
// import { REQUESTS } from '../../api/requests'; // Import your backend requests

// // Define constants for the lists
// const yearsList = [
//   { label: 2020 },
//   { label: 2021 },
//   { label: 2022 },
//   { label: 2023 },
//   { label: 2024 },
// ];

// const monthsList = [
//   { name: 'January', id: 1 },
//   { name: 'February', id: 2 },
//   { name: 'March', id: 3 },
//   { name: 'April', id: 4 },
//   { name: 'May', id: 5 },
//   { name: 'June', id: 6 },
//   { name: 'July', id: 7 },
//   { name: 'August', id: 8 },
//   { name: 'September', id: 9 },
//   { name: 'October', id: 10 },
//   { name: 'November', id: 11 },
//   { name: 'December', id: 12 },
// ];

// const AnalizeYearDashboard = () => {
//   const [selectedFilial, setSelectedFilial] = useState('');
//   const [subFilials, setSubFilials] = useState([]);
//   const [selectedSubFilials, setSelectedSubFilials] = useState([]);
//   const [selectedYears, setSelectedYears] = useState([]);
//   const [selectedMonths, setSelectedMonths] = useState([]);
//   const [accountNumbers, setAccountNumbers] = useState([]);
//   const [loading, setLoading] = useState(false);

//   // Step 1: Fetch sub-filials based on selected filial
//   const handleFilialChange = async (event) => {
//     const filialId = event.target.value;
//     setSelectedFilial(filialId);
//     setLoading(true);
//     try {
//       const response = await REQUESTS.financialAnalize.getSubFilials(filialId); // Replace with your actual API call
//       setSubFilials(response.data); // Assuming the data is returned as an array of sub-filials
//     } catch (error) {
//       console.error('Error fetching sub-filials:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Step 2: Fetch years based on selected sub-filials
//   const handleSubFilialChange = async (event) => {
//     const selectedSubFilials = event.target.value;
//     setSelectedSubFilials(selectedSubFilials);
//     setLoading(true);
//     try {
//       const response = await REQUESTS.financialAnalize.getYears(selectedSubFilials); // API to get years
//       setSelectedYears(response.data); // Assuming the response contains the years
//     } catch (error) {
//       console.error('Error fetching years:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Step 3: Fetch months based on selected year
//   const handleYearChange = async (event) => {
//     const selectedYears = event.target.value;
//     setSelectedYears(selectedYears);
//     setLoading(true);
//     try {
//       const response = await REQUESTS.financialAnalize.getMonths(selectedYears); // API to get months
//       setSelectedMonths(response.data); // Assuming the response contains the months
//     } catch (error) {
//       console.error('Error fetching months:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Step 4: Fetch account numbers based on selected months
//   const handleMonthChange = async (event) => {
//     const selectedMonths = event.target.value;
//     setSelectedMonths(selectedMonths);
//     setLoading(true);
//     try {
//       const response = await REQUESTS.financialAnalize.getAccountNumbers(selectedMonths); // API to get account numbers
//       setAccountNumbers(response.data); // Assuming the response contains the account numbers
//     } catch (error) {
//       console.error('Error fetching account numbers:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Handle account number selection
//   const handleAccountNumberChange = (event) => {
//     setAccountNumbers(event.target.value);
//   };

//   // Submit the selected data
//   const handleSubmit = async () => {
//     const params = {
//       filial: selectedFilial,
//       subFilials: selectedSubFilials,
//       years: selectedYears,
//       months: selectedMonths,
//       accountNumbers: accountNumbers,
//     };

//     try {
//       const response = await REQUESTS.financialAnalize.getFinancialAnalize(params); // API call for financial analysis
//       console.log('Financial analysis data:', response.data); // Handle the response
//     } catch (error) {
//       console.error('Error submitting data:', error);
//     }
//   };

//   return (
//     <Container maxWidth="false" disableGutters sx={{ width: '100%', bgcolor: Colors.gray_back }}>
//       <Box sx={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
//         {/* Filial Selector */}
//         <FormControl size="small" fullWidth>
//           <InputLabel>Filial</InputLabel>
//           <Select
//             value={selectedFilial}
//             onChange={handleFilialChange}
//             input={<OutlinedInput label="Filial" />}
//           >
//             {/* Fetch and display filial list here */}
//             {top128Filials.map((filial) => (
//               <MenuItem key={filial.id} value={filial.id}>
//                 {filial.title}
//               </MenuItem>
//             ))}
//           </Select>
//         </FormControl>

//         {/* Sub-Filial Selector */}
//         <FormControl size="small" fullWidth>
//           <InputLabel>Sub-Filial</InputLabel>
//           <Select
//             multiple
//             value={selectedSubFilials}
//             onChange={handleSubFilialChange}
//             input={<OutlinedInput label="Sub-Filial" />}
//             renderValue={(selected) => selected.join(', ')}
//           >
//             {subFilials.map((subFilial) => (
//               <MenuItem key={subFilial.title} value={subFilial.title}>
//                 <Checkbox checked={selectedSubFilials.includes(subFilial.title)} />
//                 <ListItemText primary={subFilial.title} />
//               </MenuItem>
//             ))}
//           </Select>
//         </FormControl>

//         {/* Year Selector */}
//         <FormControl size="small" fullWidth>
//           <InputLabel>Year</InputLabel>
//           <Select
//             multiple
//             value={selectedYears}
//             onChange={handleYearChange}
//             input={<OutlinedInput label="Year" />}
//             renderValue={(selected) => selected.join(', ')}
//           >
//             {yearsList.map((year) => (
//               <MenuItem key={year.label} value={year.label}>
//                 <Checkbox checked={selectedYears.includes(year.label)} />
//                 <ListItemText primary={year.label} />
//               </MenuItem>
//             ))}
//           </Select>
//         </FormControl>

//         {/* Month Selector */}
//         <FormControl size="small" fullWidth>
//           <InputLabel>Month</InputLabel>
//           <Select
//             multiple
//             value={selectedMonths}
//             onChange={handleMonthChange}
//             input={<OutlinedInput label="Month" />}
//             renderValue={(selected) => selected.join(', ')}
//           >
//             {monthsList.map((month) => (
//               <MenuItem key={month.id} value={month.name}>
//                 <Checkbox checked={selectedMonths.includes(month.name)} />
//                 <ListItemText primary={month.name} />
//               </MenuItem>
//             ))}
//           </Select>
//         </FormControl>

//         {/* Account Number Selector */}
//         <FormControl size="small" fullWidth>
//           <InputLabel>Account Number</InputLabel>
//           <Select
//             multiple
//             value={accountNumbers}
//             onChange={handleAccountNumberChange}
//             input={<OutlinedInput label="Account Number" />}
//             renderValue={(selected) => selected.join(', ')}
//           >
//             {accountNumbers.map((account) => (
//               <MenuItem key={account} value={account}>
//                 <Checkbox checked={accountNumbers.includes(account)} />
//                 <ListItemText primary={account} />
//               </MenuItem>
//             ))}
//           </Select>
//         </FormControl>

//         {/* Submit Button */}
//         <Button variant="contained" color="primary" onClick={handleSubmit}>
//           Submit
//         </Button>
//       </Box>
//     </Container>
//   );
// };

// export default AnalizeYearDashboard;
