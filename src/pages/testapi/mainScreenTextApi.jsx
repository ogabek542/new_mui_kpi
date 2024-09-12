const testMainAPI = [
    {
        calenDate:"12.09.2024",
        bankAssets:{               // BANK AKTIVLARI //
            totalActive:"896321", // serverdan olinadi //
            totalActivePercentage:"48", // bir kun oldingi  bankAssets ning totalActive qiymatlari nisbatidan kelib chiqadigan qiymat foiz shaklida ko'rsatiladi butun son holida olinadi //
            creditsActive:"59932858", // kredit qiymatlari mlrd sum //
            depositActive:"48784915", // deposit qiymatlari mlrd sum //
            investmentActive:"745826", // investitiya qiymati mlrd sum //
            othersActive:"4589632", // boshqa qiymatlar yig'indi asosida keltirib chiqrailadi mlrd sum //
            pieChartDatas:["71","31","9","12"] 
            //1-qiymat kreditni nisbat foizi totalActive bilan nisbati creditsActive  //
            //2-qiymat depozitni nisbat foizi totalActive bilan nisbati depositActive  //
            //3-qiymat investitsiylarni nisbat foizi totalActive bilan nisbati investmentActive  //
            //4-qiymat boshqalarni nisbat foizi totalActive bilan nisbati othersActive  //
        },
        bankObligations:{           // BANK MAJBURIYATLARI //
            totalObligations:"147859", // totalObligations serverdan olinadi //
            totalObligationsPercentage:"105", // totalObligations va bir kun oldingi totalObligations larning nisbatidan kelib chiqadigan foiz //
            creditLines:"369852", // kredit liniyalri raqamli malumot mlrd so'm //
            clientsDeposits:"288941", // mijozlar depozitlari raqamli malumot mlrd so'm //
            banksDeposits:"288941", //banklar depozitlari raqamli malumot mlrd so'm //
            othersObligations:"288941", // boshqa obligatsiya malumotlari yig'indi asosida chiqadi malumot mlrd so'm //
            doughtnutData:["48","31","9","12"] 
            // 1- kredit liniya malumotlari bilan creditLines, totalObligations ninig nisbati  //
            // 2- mijozlar depozitlari  malumotlari bilan clientsDeposits ,totalObligations ninig nisbati  //
            // 3- bank depozitlari malumotlari bilan banksDeposits, totalObligations ninig nisbati  //
            // 4- boshqa obligatsiya malumotlari bilan othersObligations ,totalObligations ninig nisbati  //
        },
        bankCapitals:{           // BANK KAPITALI //
            totalCapitals:"258968", // totalCapitals serverdan olinadi //
            totalCapitalsPercentage:"133", // bugungi totalCapitals va bir kun oldingi totalCapitals lar nisbatidan kelib chiqadi //
            charterCapital:"369852", // ustav kapitali raqamli malumot mlrd so'm //
            reserveFund:"235896", // zaxira fondi raqamli malumot mlrd so'm //
            retainedEarnings:"435899", // taqsimlangan foyda raqamli malumot mlrd so'm //
            charterCapitalLine:"88", // ustav kapitalini charterCapital, totalCapitals ga nisbati butun son foiz qiymat chiqarish uchun //
            reserveFundLine:"4",// zaxira fondi reserveFund , totalCapitals ga nisbati butun son foiz qiymat chiqarish uchun //
            retainedEarningsLine:"8",// taqsimlangan foyda retainedEarnings, totalCapitals ga nisbati butun son foiz qiymat chiqarish uchun //
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
            percentageIncome:"264955", // foizli daromad raqamli malumot mlrd so'm //
            nopercentageIncome:"346726",// foizsiz daromad raqamli malumot mlrd so'm //
            percentageIncomePercentage:"100",  // totalIncomes bilan percentageIncome ning o'zaro nisbatidan kelib chiqadi //
            nopercentageIncomePercentage:"115", // totalIncomes bilan nopercentageIncome ning o'zaro nisbatidan kelib chiqadi //
        },
        bankExpenses:{          // BANK XARAJATLARI // 
            totalExpenses:"159873", // serverdan olinadi  //
            totalExpensesPercentage:"56", // bugungu totalExpenses va bir kun oldingi totalExpenses larning nisbatidan kelib chiqadi //
            percentageCost:"264857",  // foizli xarajatlar raqamli malumot mlrd so'm //
            nopercentageCost:"962486", // foizsiz xarajatlar raqamli malumot mlrd so'm //
            percentageCostPercentage:"110", // totalExpenses bilan percentageCost ning o'zaro nisbatidan kelib chiqadi //
            nopercentageCostPercentage:"85", // totalExpenses bilan nopercentageCost ning o'zaro nisbatidan kelib chiqadi //
        },
    },
    {
        calenDate:"13.09.2024",
        bankAssets:{               // BANK AKTIVLARI //
            totalActive:"896321", // serverdan olinadi //
            totalActivePercentage:"48", // bir kun oldingi  bankAssets ning totalActive qiymatlari nisbatidan kelib chiqadigan qiymat foiz shaklida ko'rsatiladi butun son holida olinadi //
            creditsActive:"59932858", // kredit qiymatlari mlrd sum //
            depositActive:"48784915", // deposit qiymatlari mlrd sum //
            investmentActive:"745826", // investitiya qiymati mlrd sum //
            othersActive:"4589632", // boshqa qiymatlar yig'indi asosida keltirib chiqrailadi mlrd sum //
            pieChartDatas:["71","31","9","12"] 
            //1-qiymat kreditni nisbat foizi totalActive bilan nisbati creditsActive  //
            //2-qiymat depozitni nisbat foizi totalActive bilan nisbati depositActive  //
            //3-qiymat investitsiylarni nisbat foizi totalActive bilan nisbati investmentActive  //
            //4-qiymat boshqalarni nisbat foizi totalActive bilan nisbati othersActive  //
        },
        bankObligations:{           // BANK MAJBURIYATLARI //
            totalObligations:"14785", // totalObligations serverdan olinadi //
            totalObligationsPercentage:"105", // totalObligations va bir kun oldingi totalObligations larning nisbatidan kelib chiqadigan foiz //
            creditLines:"369852", // kredit liniyalri raqamli malumot mlrd so'm //
            clientsDeposits:"288941", // mijozlar depozitlari raqamli malumot mlrd so'm //
            banksDeposits:"288941", //banklar depozitlari raqamli malumot mlrd so'm //
            othersObligations:"288941", // boshqa obligatsiya malumotlari yig'indi asosida chiqadi malumot mlrd so'm //
            doughtnutData:["48","31","9","12"] 
            // 1- kredit liniya malumotlari bilan creditLines, totalObligations ninig nisbati  //
            // 2- mijozlar depozitlari  malumotlari bilan clientsDeposits ,totalObligations ninig nisbati  //
            // 3- bank depozitlari malumotlari bilan banksDeposits, totalObligations ninig nisbati  //
            // 4- boshqa obligatsiya malumotlari bilan othersObligations ,totalObligations ninig nisbati  //
        },
        bankCapitals:{           // BANK KAPITALI //
            totalCapitals:"25896", // totalCapitals serverdan olinadi //
            totalCapitalsPercentage:"133", // bugungi totalCapitals va bir kun oldingi totalCapitals lar nisbatidan kelib chiqadi //
            charterCapital:"369852", // ustav kapitali raqamli malumot mlrd so'm //
            reserveFund:"23589", // zaxira fondi raqamli malumot mlrd so'm //
            retainedEarnings:"43589", // taqsimlangan foyda raqamli malumot mlrd so'm //
            charterCapitalLine:"12", // ustav kapitalini charterCapital, totalCapitals ga nisbati butun son foiz qiymat chiqarish uchun //
            reserveFundLine:"45",// zaxira fondi reserveFund , totalCapitals ga nisbati butun son foiz qiymat chiqarish uchun //
            retainedEarningsLine:"43",// taqsimlangan foyda retainedEarnings, totalCapitals ga nisbati butun son foiz qiymat chiqarish uchun //
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
            percentageIncome:"26495", // foizli daromad raqamli malumot mlrd so'm //
            nopercentageIncome:"34672",// foizsiz daromad raqamli malumot mlrd so'm //
            percentageIncomePercentage:"100",  // totalIncomes bilan percentageIncome ning o'zaro nisbatidan kelib chiqadi //
            nopercentageIncomePercentage:"115", // totalIncomes bilan nopercentageIncome ning o'zaro nisbatidan kelib chiqadi //
        },
        bankExpenses:{          // BANK XARAJATLARI // 
            totalExpenses:"159873", // serverdan olinadi  //
            totalExpensesPercentage:"56", // bugungu totalExpenses va bir kun oldingi totalExpenses larning nisbatidan kelib chiqadi //
            percentageCost:"26485",  // foizli xarajatlar raqamli malumot mlrd so'm //
            nopercentageCost:"96248", // foizsiz xarajatlar raqamli malumot mlrd so'm //
            percentageCostPercentage:"110", // totalExpenses bilan percentageCost ning o'zaro nisbatidan kelib chiqadi //
            nopercentageCostPercentage:"85", // totalExpenses bilan nopercentageCost ning o'zaro nisbatidan kelib chiqadi //
        },
    },
    {
        calenDate:"14.09.2024",
        bankAssets:{               // BANK AKTIVLARI //
            totalActive:"896321", // serverdan olinadi //
            totalActivePercentage:"48", // bir kun oldingi  bankAssets ning totalActive qiymatlari nisbatidan kelib chiqadigan qiymat foiz shaklida ko'rsatiladi butun son holida olinadi //
            creditsActive:"59932858", // kredit qiymatlari mlrd sum //
            depositActive:"48784915", // deposit qiymatlari mlrd sum //
            investmentActive:"745826", // investitiya qiymati mlrd sum //
            othersActive:"4589632", // boshqa qiymatlar yig'indi asosida keltirib chiqrailadi mlrd sum //
            pieChartDatas:["71","31","9","12"] 
            //1-qiymat kreditni nisbat foizi totalActive bilan nisbati creditsActive  //
            //2-qiymat depozitni nisbat foizi totalActive bilan nisbati depositActive  //
            //3-qiymat investitsiylarni nisbat foizi totalActive bilan nisbati investmentActive  //
            //4-qiymat boshqalarni nisbat foizi totalActive bilan nisbati othersActive  //
        },
        bankObligations:{           // BANK MAJBURIYATLARI //
            totalObligations:"14785", // totalObligations serverdan olinadi //
            totalObligationsPercentage:"105", // totalObligations va bir kun oldingi totalObligations larning nisbatidan kelib chiqadigan foiz //
            creditLines:"369852", // kredit liniyalri raqamli malumot mlrd so'm //
            clientsDeposits:"288941", // mijozlar depozitlari raqamli malumot mlrd so'm //
            banksDeposits:"288941", //banklar depozitlari raqamli malumot mlrd so'm //
            othersObligations:"288941", // boshqa obligatsiya malumotlari yig'indi asosida chiqadi malumot mlrd so'm //
            doughtnutData:["48","31","9","12"] 
            // 1- kredit liniya malumotlari bilan creditLines, totalObligations ninig nisbati  //
            // 2- mijozlar depozitlari  malumotlari bilan clientsDeposits ,totalObligations ninig nisbati  //
            // 3- bank depozitlari malumotlari bilan banksDeposits, totalObligations ninig nisbati  //
            // 4- boshqa obligatsiya malumotlari bilan othersObligations ,totalObligations ninig nisbati  //
        },
        bankCapitals:{           // BANK KAPITALI //
            totalCapitals:"25896", // totalCapitals serverdan olinadi //
            totalCapitalsPercentage:"133", // bugungi totalCapitals va bir kun oldingi totalCapitals lar nisbatidan kelib chiqadi //
            charterCapital:"369852", // ustav kapitali raqamli malumot mlrd so'm //
            reserveFund:"23589", // zaxira fondi raqamli malumot mlrd so'm //
            retainedEarnings:"43589", // taqsimlangan foyda raqamli malumot mlrd so'm //
            charterCapitalLine:"12", // ustav kapitalini charterCapital, totalCapitals ga nisbati butun son foiz qiymat chiqarish uchun //
            reserveFundLine:"45",// zaxira fondi reserveFund , totalCapitals ga nisbati butun son foiz qiymat chiqarish uchun //
            retainedEarningsLine:"43",// taqsimlangan foyda retainedEarnings, totalCapitals ga nisbati butun son foiz qiymat chiqarish uchun //
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
            percentageIncome:"26495", // foizli daromad raqamli malumot mlrd so'm //
            nopercentageIncome:"34672",// foizsiz daromad raqamli malumot mlrd so'm //
            percentageIncomePercentage:"100",  // totalIncomes bilan percentageIncome ning o'zaro nisbatidan kelib chiqadi //
            nopercentageIncomePercentage:"115", // totalIncomes bilan nopercentageIncome ning o'zaro nisbatidan kelib chiqadi //
        },
        bankExpenses:{          // BANK XARAJATLARI // 
            totalExpenses:"159873", // serverdan olinadi  //
            totalExpensesPercentage:"56", // bugungu totalExpenses va bir kun oldingi totalExpenses larning nisbatidan kelib chiqadi //
            percentageCost:"26485",  // foizli xarajatlar raqamli malumot mlrd so'm //
            nopercentageCost:"96248", // foizsiz xarajatlar raqamli malumot mlrd so'm //
            percentageCostPercentage:"110", // totalExpenses bilan percentageCost ning o'zaro nisbatidan kelib chiqadi //
            nopercentageCostPercentage:"85", // totalExpenses bilan nopercentageCost ning o'zaro nisbatidan kelib chiqadi //
        },
    },
    {
        calenDate:"15.09.2024",
        bankAssets:{               // BANK AKTIVLARI //
            totalActive:"896321", // serverdan olinadi //
            totalActivePercentage:"48", // bir kun oldingi  bankAssets ning totalActive qiymatlari nisbatidan kelib chiqadigan qiymat foiz shaklida ko'rsatiladi butun son holida olinadi //
            creditsActive:"59932858", // kredit qiymatlari mlrd sum //
            depositActive:"48784915", // deposit qiymatlari mlrd sum //
            investmentActive:"745826", // investitiya qiymati mlrd sum //
            othersActive:"4589632", // boshqa qiymatlar yig'indi asosida keltirib chiqrailadi mlrd sum //
            pieChartDatas:["71","31","9","12"] 
            //1-qiymat kreditni nisbat foizi totalActive bilan nisbati creditsActive  //
            //2-qiymat depozitni nisbat foizi totalActive bilan nisbati depositActive  //
            //3-qiymat investitsiylarni nisbat foizi totalActive bilan nisbati investmentActive  //
            //4-qiymat boshqalarni nisbat foizi totalActive bilan nisbati othersActive  //
        },
        bankObligations:{           // BANK MAJBURIYATLARI //
            totalObligations:"14785", // totalObligations serverdan olinadi //
            totalObligationsPercentage:"105", // totalObligations va bir kun oldingi totalObligations larning nisbatidan kelib chiqadigan foiz //
            creditLines:"369852", // kredit liniyalri raqamli malumot mlrd so'm //
            clientsDeposits:"288941", // mijozlar depozitlari raqamli malumot mlrd so'm //
            banksDeposits:"288941", //banklar depozitlari raqamli malumot mlrd so'm //
            othersObligations:"288941", // boshqa obligatsiya malumotlari yig'indi asosida chiqadi malumot mlrd so'm //
            doughtnutData:["48","31","9","12"] 
            // 1- kredit liniya malumotlari bilan creditLines, totalObligations ninig nisbati  //
            // 2- mijozlar depozitlari  malumotlari bilan clientsDeposits ,totalObligations ninig nisbati  //
            // 3- bank depozitlari malumotlari bilan banksDeposits, totalObligations ninig nisbati  //
            // 4- boshqa obligatsiya malumotlari bilan othersObligations ,totalObligations ninig nisbati  //
        },
        bankCapitals:{           // BANK KAPITALI //
            totalCapitals:"25896", // totalCapitals serverdan olinadi //
            totalCapitalsPercentage:"133", // bugungi totalCapitals va bir kun oldingi totalCapitals lar nisbatidan kelib chiqadi //
            charterCapital:"369852", // ustav kapitali raqamli malumot mlrd so'm //
            reserveFund:"23589", // zaxira fondi raqamli malumot mlrd so'm //
            retainedEarnings:"43589", // taqsimlangan foyda raqamli malumot mlrd so'm //
            charterCapitalLine:"12", // ustav kapitalini charterCapital, totalCapitals ga nisbati butun son foiz qiymat chiqarish uchun //
            reserveFundLine:"45",// zaxira fondi reserveFund , totalCapitals ga nisbati butun son foiz qiymat chiqarish uchun //
            retainedEarningsLine:"43",// taqsimlangan foyda retainedEarnings, totalCapitals ga nisbati butun son foiz qiymat chiqarish uchun //
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
            percentageIncome:"26495", // foizli daromad raqamli malumot mlrd so'm //
            nopercentageIncome:"34672",// foizsiz daromad raqamli malumot mlrd so'm //
            percentageIncomePercentage:"100",  // totalIncomes bilan percentageIncome ning o'zaro nisbatidan kelib chiqadi //
            nopercentageIncomePercentage:"115", // totalIncomes bilan nopercentageIncome ning o'zaro nisbatidan kelib chiqadi //
        },
        bankExpenses:{          // BANK XARAJATLARI // 
            totalExpenses:"159873", // serverdan olinadi  //
            totalExpensesPercentage:"56", // bugungu totalExpenses va bir kun oldingi totalExpenses larning nisbatidan kelib chiqadi //
            percentageCost:"26485",  // foizli xarajatlar raqamli malumot mlrd so'm //
            nopercentageCost:"96248", // foizsiz xarajatlar raqamli malumot mlrd so'm //
            percentageCostPercentage:"110", // totalExpenses bilan percentageCost ning o'zaro nisbatidan kelib chiqadi //
            nopercentageCostPercentage:"85", // totalExpenses bilan nopercentageCost ning o'zaro nisbatidan kelib chiqadi //
        },
    },
];

export default testMainAPI;