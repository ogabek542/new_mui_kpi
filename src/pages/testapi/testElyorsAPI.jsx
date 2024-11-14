const newtableData = {
    choosedfirstYear: "2023",  // user Tanlagan Kichik(oldingi) yil  //
    choosedsecondYear: "2024", // user tanlagan katta(keyingi) yil       //
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


