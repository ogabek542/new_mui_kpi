const newAllData = [
    {
      name: "НБУ",
      sana: [
        {
          date: "27.08.2024", 
          cleanProfit: {
            netProfitData:"1916547",// Чистая прибыль(млрд сум) ni qiymati million so'mda //
            netPercentageData:"108",// Чистая прибыль(млрд сум) ni plani va faktini nisbati man qiyamt kutib olib % qilib chiqaraman  butun son holida//
          },
          cleanPercentageIncome: {
            netSoftProfitData:"1761024",// чистый % доход (млрд сум) qiymati  //
            netSoftPercentageData:"113",// чистый % доход (млрд сум) ni plani va fakitini nisbati man % qilib chiqaraman //
          },
          cleanNoPercentageIncome: {
            netSoftNoProfitData:"2610299",// чистый Бес % доход (млрд сум) qiymati  //
            netSoftNoPercentageData:"33",// чистый Бес % доход (млрд сум) ninig plan va faktlari nisbati  man % qilib chiqaraman   //
          },
          cirProfir:{
            cirPercentageDate:"86", // CIR ni qimati keladi man % da chiqaraman  //
          },
          nointerestIncome: {
            planData: [1901089,76412,715558,690117],// Бес % Доходы ni planini qiymati ketma ketlik asoasida : "Комиссионные доходы","Прибыль в иностранной валюте","Прибыль и дивиденды от инвестиций","Другие беспроцентные доходы", // 
            factData: [1299604,7815,459361,366345],//  Бес % Доходы ni fakitini qiymati yuqorda planda berilgan nomlar  ketma ketligi asoasida // 
          },
          interestIncome: {
            planData: [881177,5647736,5251365,2502926,],// % Доходы ni plan qiymati ushbu ketma ketlik asosida qiymat yuboriladi  "К оплате в другие банки","По кредитам","По ценным бумагам","Другие % доходы",//
            factData: [336824,3009770,8905725,2427040], // % Доходы ni fakt qiymati yuqoridagi ketma ketlik asosida qiymat yuboriladi //
          },
          interestCost: {
            planData: [8976382,230660,7557191,1209854,970290,],// % расходы ni planini qiymati quyidagi ketmaketlik asosida qiymatlar yuboriladi : "По депозитам","По счетам к оплате в другие банки","По кредитам к оплате","По выпущенным ценным бумагам","Другие", // 
            factData: [4580649,84289,9685404,567511,472347,], // % расходы ni faktini qiymati yuqoridagidagi ketmaketlik asosida qiymatlar yuboriladi // 
          },
          nointerestCost: {
            planData: [297771,144568,258768],// Бес % расходы ni planini qiymati quyidagi nomlar ketma ketligi asosida qiymat kutib olinadi : "Комиссионные расходы","Убытки в иностранной валюте","Другие беспроцентные расходы", //
            factData: [516880,134915,127860],// Бес % расходы ni fakitini qiymati yuqoridagi nomlar ketma ketligi asosida qiymat kutib olinadi // 
          },
          operatingExpenses:{
            planData: [629562,978336,753059,136106,79323,75484,406405,], //  операционные расходы ni qiymatlari qatiy nomlar ketma ketligi asosida qiymatlar kutib olinadi :"Расходы на сотрудников","Аренда и содержание","Транспортные расходы","Административные расходы","Репрезентация и благотворительность","Расходы на износ","Другие операционные расходы",//
          },
          reserveData:{
            planData: [32166868, 99133530,70640587],// резервы ni planini qiymati quyidagi nomlar ketma ketligi asosida kutib olinadi: "Оценка убытков","Возмещение ранее созданных резервов","Досоздание резервов в текущем году", //
            factData: [51643070, 72171076,81688024],// резервы ni faktini qiymati yuqoridagi nomlar ketma ketligi asosida kutib olinadi   //
          },
        },
        {
          date: "28.08.2024",
          cleanProfit: {
            netProfitData:"1716547",
            netPercentageData:"73",
          },
          cleanPercentageIncome: {
            netSoftProfitData:"1881024",
            netSoftPercentageData:"13",
          },
          cleanNoPercentageIncome: {
            netSoftNoProfitData:"2490299",
            netSoftNoPercentageData:"29",
          },
          cirProfir:{
            cirPercentageDate:"56",
          },
          nointerestIncome: {
            planData: [1301089,6412,175558,200117],
            factData: [1499604,8015,189361,266345],
          },
          interestIncome: {
            planData: [481177,2647736,251365,2502926,],
            factData: [336824,3009770,505725,2427040],
          },
          interestCost: {
            planData: [1376382,260660,8657191,2509854,970290,],
            factData: [1580649,45289,4985404,177511,472347,],
          },
          nointerestCost: {
            planData: [297771,144568,258768],
            factData: [416880,134915,287860],
          },
          operatingExpenses:{
            planData: [419562,978336,263059,136106,68323,75484,206405,],
          },
          reserveData:{
            planData: [32166868, 99133530,70640587],
            factData: [51643070, 72171076,81688024],
          },
        },
        {
          date: "29.08.2024",
          cleanProfit: {
            netProfitData:"1616547",
            netPercentageData:"63",
          },
          cleanPercentageIncome: {
            netSoftProfitData:"1881024",
            netSoftPercentageData:"48",
          },
          cleanNoPercentageIncome: {
            netSoftNoProfitData:"2890299",
            netSoftNoPercentageData:"75",
          },
          cirProfir:{
            cirPercentageDate:"91",
          },
          nointerestIncome: {
            planData: [1801089,7197412,555558,990117],
            factData: [1999604,1238015,809361,816345],
          },
          interestIncome: {
            planData: [561177,6547736,7481365,3402926,],
            factData: [426824,3809770,995725,3827040],
          },
          interestCost: {
            planData: [4376382,260660,8657191,2509854,970290,],
            factData: [2080649,48289,5685404,257511,372347,],
          },
          nointerestCost: {
            planData: [317771,244568,358768],
            factData: [516880,234915,387860],
          },
          operatingExpenses:{
            planData: [529562,868336,893059,236106,85323,45484,326405,],
          },
          reserveData:{
            planData: [63166868, 79133530,68930594],
            factData: [71643070, 81171076,52361066],
          },
        },
      ]
    },
    {
      name: "Миробод бўлими",
      sana: [
        {
          date: "15.08.2024",
          cleanProfit: {
            netProfitData:"1916547",
            netPercentageData:"58",
          },
          cleanPercentageIncome: {
            netSoftProfitData:"1761024",
            netSoftPercentageData:"113",
          },
          cleanNoPercentageIncome: {
            netSoftNoProfitData:"2610299",
            netSoftNoPercentageData:"33",
          },
          cirProfir:{
            cirData:"4140812",
            cirPercentageDate:"86",
          },
          nointerestIncome: {
            labelsData: ["Комиссионные доходы", "Прибыль в иностранной валюте", "Прибыль и дивиденды от инвестиций", "Другие беспроцентные доходы"],
            planData: [1901089,76412,715558,690117],
            factData: [1299604,7815,459361,366345],
          },
          interestIncome: {
            labelsData: ["Депозитам","Счетам к оплате в ЦБРУ","Счетам к оплате в другие банки","Кредитам к оплате","Выпущенным ценным бумагам","Другие процентные доходы",],
            planData: [1558417,7812,481177,2647736,251365,2502926,],
            factData: [2281082,10079,336824,3009770,505725,2427040],
          },
          interestCost: {
            labelsData: ['Процентные расходы по депозитам', 'Процентные расходы по счетам к оплате в другие банки', 'Процентные расходы по кредитам к оплате', 'Процентные расходы по выпущенным ценным бумагам','Другие процентные расходы'],
            planData: [8976382,230660,7557191,1209854,970290,],
            factData: [4580649,84289,9685404,567511,472347,],
          },
          nointerestCost: {
            labelsData: ["Комиссионные расходы", "Прибыль в иностранной валюте", "Прибыль и дивиденды от инвестиций", "Другие беспроцентные расходы"],
            planData: [297771,315555,144568,258768],
            factData: [516880,368988,134915,127860],
          },
          operatingExpenses:{
            labelsData: [ 'Расходы на сотрудников','Аренда и содержание','Транспортные расходы','Административные расходы','Репрезентация и благотворительность','Расходы на износ','Другие операционные расходы',],
            planData: [629562,978336,753059,136106,79323,75484,406405,],
          },
          reserveData:{
            labelsData: [ "Оценка убитков","Возмещение ранее созданных резервов"],
            planData: [58166868, 88133530],
            factData: [48643070, 52171076],
          },
        },
        {
          date: "16.08.2024",
          cleanProfit: {
            netProfitData:"1716547",
            netPercentageData:"73",
          },
          cleanPercentageIncome: {
            netSoftProfitData:"1881024",
            netSoftPercentageData:"13",
          },
          cleanNoPercentageIncome: {
            netSoftNoProfitData:"2490299",
            netSoftNoPercentageData:"29",
          },
          cirProfir:{
            cirData:"3130812",
            cirPercentageDate:"56",
          },
          nointerestIncome: {
            labelsData: ["Комиссионные доходы", "Прибыль в иностранной валюте", "Прибыль и дивиденды от инвестиций", "Другие беспроцентные доходы"],
            planData: [1301089,6412,175558,200117],
            factData: [1499604,8015,189361,266345],
          },
          interestIncome: {
            labelsData: ["Депозитам","Счетам к оплате в ЦБРУ","Счетам к оплате в другие банки","Кредитам к оплате","Выпущенным ценным бумагам","Другие процентные доходы",],
            planData: [1558417,7812,481177,2647736,251365,2502926,],
            factData: [2281082,10079,336824,3009770,505725,2427040],
          },
          interestCost: {
            labelsData: ['Процентные расходы по депозитам', 'Процентные расходы по счетам к оплате в другие банки', 'Процентные расходы по кредитам к оплате', 'Процентные расходы по выпущенным ценным бумагам','Другие процентные расходы'],
            planData: [1376382,260660,8657191,2509854,970290,],
            factData: [1580649,45289,4985404,177511,472347,],
          },
          nointerestCost: {
            labelsData: ["Комиссионные расходы", "Прибыль в иностранной валюте", "Прибыль и дивиденды от инвестиций", "Другие беспроцентные расходы"],
            planData: [297771,315555,144568,258768],
            factData: [416880,362888,134915,287860],
          },
          operatingExpenses:{
            labelsData: [ 'Расходы на сотрудников','Аренда и содержание','Транспортные расходы','Административные расходы','Репрезентация и благотворительность','Расходы на износ','Другие операционные расходы',],
            planData: [419562,978336,263059,136106,68323,75484,206405,],
          },
          reserveData:{
            labelsData: [ "Оценка убитков","Возмещение ранее созданных резервов"],
            planData: [32166868, 99133530],
            factData: [51643070, 72171076],
          },
        },
        {
          date: "17.08.2024",
          cleanProfit: {
            netProfitData:"1616547",
            netPercentageData:"63",
          },
          cleanPercentageIncome: {
            netSoftProfitData:"1881024",
            netSoftPercentageData:"48",
          },
          cleanNoPercentageIncome: {
            netSoftNoProfitData:"2890299",
            netSoftNoPercentageData:"75",
          },
          cirProfir:{
            cirData:"2120812",
            cirPercentageDate:"91",
          },
          nointerestIncome: {
            labelsData: ["Комиссионные доходы", "Прибыль в иностранной валюте", "Прибыль и дивиденды от инвестиций", "Другие беспроцентные доходы"],
            planData: [1089,7412,1285558,190117],
            factData: [1999604,38015,809361,216345],
          },
          interestIncome: {
            labelsData: ["Депозитам","Счетам к оплате в ЦБРУ","Счетам к оплате в другие банки","Кредитам к оплате","Выпущенным ценным бумагам","Другие процентные доходы",],
            planData: [4458417,77812,561177,4147736,281365,3402926,],
            factData: [2081082,15079,426824,1009770,595725,3827040],
          },
          interestCost: {
            labelsData: ['Процентные расходы по депозитам', 'Процентные расходы по счетам к оплате в другие банки', 'Процентные расходы по кредитам к оплате', 'Процентные расходы по выпущенным ценным бумагам','Другие процентные расходы'],
            planData: [1376382,260660,8657191,2509854,970290,],
            factData: [2080649,48289,5685404,257511,372347,],
          },
          nointerestCost: {
            labelsData: ["Комиссионные расходы", "Прибыль в иностранной валюте", "Прибыль и дивиденды от инвестиций", "Другие беспроцентные расходы"],
            planData: [317771,305555,244568,358768],
            factData: [516880,392888,234915,387860],
          },
          operatingExpenses:{
            labelsData: [ 'Расходы на сотрудников','Аренда и содержание','Транспортные расходы','Административные расходы','Репрезентация и благотворительность','Расходы на износ','Другие операционные расходы',],
            planData: [529562,868336,893059,236106,85323,45484,326405,],
          },
          reserveData:{
            labelsData: [ "Оценка убитков","Возмещение ранее созданных резервов"],
            planData: [63166868, 79133530],
            factData: [71643070, 81171076],
          },
        },
      ]
    },
    {
      name: "Абусахий БХО",
      // Add relevant data or structure here
    }
  ];
  
  export default newAllData;
  