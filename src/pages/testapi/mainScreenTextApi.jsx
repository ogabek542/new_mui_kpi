const testMainAPI = [
    {
        calenDate:"08.09.2024",
        bankAssets:{               // BANK AKTIVLARI //
            totalActive:"896321", // serverdan olinadi //
            totalActivePercentage:"48", // bir kun oldingi  bankAssets ning totalActive qiymatlari nisbatidan kelib chiqadigan qiymat foiz shaklida ko'rsatiladi butun son holida olinadi //
            foreignCurrency:"425896",  // xorijiy valyutada raqamli malumot mlrd so'm //
            nationalCurrency:"357896", // milliy valyutada raqamli malumot mlrd so'm //
            foreignCurrencyPercentage:"95", // totalActive bilan foreignCurrency ning o'zaro nisbatidan kelib chiqadi //
            nationalCurrencyPercentage:"74", // totalActive bilan nationalCurrency ning o'zaro nisbatidan kelib chiqadi //
        },
        bankObligations:{           // BANK MAJBURIYATLARI //
            totalObligations:"14785", // totalObligations serverdan olinadi //
            totalObligationsPercentage:"105", // totalObligations va bir kun oldingi totalObligations larning nisbatidan kelib chiqadigan foiz //
            foreignCurrency:"54696", // xorijiy valyutada raqamli malumot mlrd so'm //
            nationalCurrency:"324896", // milliy valyutada raqamli malumot mlrd so'm //
            pieChartDatas:["52","99"] // 1-milliy valuta(totalObligations va nationalCurrency larning nisbatidan kelib chiqadi butun son ) ,2-xorijiy valyuta (totalObligations va foreignCurrency larning nisbatidan kelib chiqadi butun son ) //
        },
        bankCapitals:{           // BANK KAPITALI //
            totalCapitals:"25896", // totalCapitals serverdan olinadi //
            totalCapitalsPercentage:"133", // bugungi totalCapitals va bir kun oldingi totalCapitals lar nisbatidan kelib chiqadi //
            foreignCurrency:"369852", // xorijiy valyutada raqamli malumot mlrd so'm //
            nationalCurrency:"23589", // milliy valyutada raqamli malumot mlrd so'm //
            doughtnutCapitalData:["94","45"] // 1-milliy valuta(totalCapitals va nationalCurrency larning nisbatidan kelib chiqadi butun son ) ,2-xorijiy valyuta (totalCapitals va foreignCurrency larning nisbatidan kelib chiqadi butun son ) //
        },
        bankProfitability:{    // BANK RENTABILLIGI KO'RSATKICHLARI //
            netProfit:"147364", // serverdan olinadi //
            totalRoa:"44", // formuladan kelib chiqadi // 
            totalRoe:"81", // formuladan kelib chiqadi //
            totalCir:"69", // formuladan kelib chiqadi //
        },
        bankIncomes:{        // BANK DAROMADLARI // 
            totalIncomes:"672348", // servedan olinadi  //
            totalIncomesPercentage:"98", // bugungi totalIncomes va bir kun oldingi totalIncomes larning nisbatidan kelib chiqadi  //
            foreignCurrency:"26495", // xorijiy valyutada raqamli malumot mlrd so'm //
            nationalCurrency:"34672",// milliy valyutada raqamli malumot mlrd so'm //
            foreignCurrencyPercentage:"100",  // totalIncomes bilan foreignCurrency ning o'zaro nisbatidan kelib chiqadi //
            nationalCurrencyPercentage:"115", // totalIncomes bilan nationalCurrency ning o'zaro nisbatidan kelib chiqadi //
        },
        bankExpenses:{          // BANK XARAJATLARI // 
            totalExpenses:"159873", // serverdan olinadi  //
            totalExpensesPercentage:"56", // bugungu totalExpenses va bir kun oldingi totalExpenses larning nisbatidan kelib chiqadi //
            foreignCurrency:"26485",  // xorijiy valyutada raqamli malumot mlrd so'm //
            nationalCurrency:"96248", // milliy valyutada raqamli malumot mlrd so'm //
            foreignCurrencyPercentage:"110", // totalExpenses bilan foreignCurrency ning o'zaro nisbatidan kelib chiqadi //
            nationalCurrencyPercentage:"85", // totalExpenses bilan nationalCurrency ning o'zaro nisbatidan kelib chiqadi //
        },
    },
    {
        calenDate:"09.09.2024",
        bankAssets:{
            totalActive:"15987",
            totalActivePercentage:"68",
            foreignCurrency:"268433",
            nationalCurrency:"556987",
            foreignCurrencyPercentage:"75",
            nationalCurrencyPercentage:"104",
        },
        bankObligations:{
            totalObligations:"258746",
            totalObligationsPercentage:"35",
            foreignCurrency:"689477",
            nationalCurrency:"362478",
            pieChartDatas:["102","89"],
        },
        bankCapitals:{
            totalCapitals:"2649853",
            totalCapitalsPercentage:"113",
            foreignCurrency:"478632",
            nationalCurrency:"986423",
            doughtnutCapitalData:["84","95"],
        },
        bankProfitability:{
            netProfit:"78562",
            totalRoa:"46",
            totalRoe:"83",
            totalCir:"67",
        },
        bankIncomes:{
            totalIncomes:"24896",
            totalIncomesPercentage:"11",
            foreignCurrency:"269345",
            nationalCurrency:"147856",
            foreignCurrencyPercentage:"80",
            nationalCurrencyPercentage:"104",
        },
        bankExpenses:{
            totalExpenses:"596321",
            totalExpensesPercentage:"76",
            foreignCurrency:"265895",
            nationalCurrency:"635892",
            foreignCurrencyPercentage:"70",
            nationalCurrencyPercentage:"25",
        },
    },
    {
        calenDate:"10.09.2024",
        bankAssets:{
            totalActive:"654789",
            totalActivePercentage:"58",
            foreignCurrency:"36582",
            nationalCurrency:"147852",
            foreignCurrencyPercentage:"95",
            nationalCurrencyPercentage:"23",
        },
        bankObligations:{
            totalObligations:"47896",
            totalObligationsPercentage:"125",
            foreignCurrency:"896324",
            nationalCurrency:"362478",
            pieChartDatas:["95","99"],
        },
        bankCapitals:{
            totalCapitals:"589632",
            totalCapitalsPercentage:"13",
            foreignCurrency:"965418",
            nationalCurrency:"325489",
            doughtnutCapitalData:["108","105"],
        },
        bankProfitability:{
            netProfit:"743598",
            totalRoa:"89",
            totalRoe:"76",
            totalCir:"91",
        },
        bankIncomes:{
            totalIncomes:"589647",
            totalIncomesPercentage:"111",
            foreignCurrency:"647813",
            nationalCurrency:"158962",
            foreignCurrencyPercentage:"83",
            nationalCurrencyPercentage:"109",
        },
        bankExpenses:{
            totalExpenses:"859614",
            totalExpensesPercentage:"105",
            foreignCurrency:"6924785",
            nationalCurrency:"317786",
            foreignCurrencyPercentage:"77",
            nationalCurrencyPercentage:"86",
        },
    },
    {
        calenDate:"11.09.2024",
        bankAssets:{
            totalActive:"847536",
            totalActivePercentage:"108",
            foreignCurrency:"254878",
            nationalCurrency:"632477",
            foreignCurrencyPercentage:"75",
            nationalCurrencyPercentage:"96",
        },
        bankObligations:{
            totalObligations:"98563",
            totalObligationsPercentage:"75",
            foreignCurrency:"964128",
            nationalCurrency:"7859632",
            pieChartDatas:["58","100"],
        },
        bankCapitals:{
            totalCapitals:"9874123",
            totalCapitalsPercentage:"116",
            foreignCurrency:"4125896",
            nationalCurrency:"4126398",
            doughtnutCapitalData:["75","100"],
        },
        bankProfitability:{
            netProfit:"245896",
            totalRoa:"100",
            totalRoe:"96",
            totalCir:"35",
        },
        bankIncomes:{
            totalIncomes:"6984123",
            totalIncomesPercentage:"88",
            foreignCurrency:"3247896",
            nationalCurrency:"958741",
            foreignCurrencyPercentage:"78",
            nationalCurrencyPercentage:"115",
        },
        bankExpenses:{
            totalExpenses:"3698541",
            totalExpensesPercentage:"65",
            foreignCurrency:"26597451",
            nationalCurrency:"6874123",
            foreignCurrencyPercentage:"107",
            nationalCurrencyPercentage:"89",
        },
    },
];

export default testMainAPI;