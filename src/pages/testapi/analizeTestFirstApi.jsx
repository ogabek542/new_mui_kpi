const tableData = {
    choosedfirstYear: 2023,  // user Tanlagan Kichik(oldingi) yil  //
    choosedsecondYear: 2024, // user tanlagan katta(keyingi) yil       //
    newMonths: [   // user tomonidan tanlangan oylar ro'yxati massivga to'plab jo'natiladi //
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
    data: [
        // 561 - raqamli qator uchun tuzilhan object 561-raqamli xisob kitob qatori malumotlari shakillantirilgan malumotlar saqlanadi//
      {
        id: "1", // 561 chi qator uchun tanlangan id  (xar bir qator uchun shakllantiriladi ) // 
        name: "561", // 561 qator uchun yuboriladian nom  //
        months: { // oylar ro'yxati user tomonidan newMonths massiviga to'plangan oylar asosida shakillantiriladi  //
          January: { newfirstYear: 200, newsecondYear: 104, differencePercentage: "18", differenceAmount: "37600" }, 
          // xar bitta oy uchun o'zining qiymatlari shakllantiriladi, newfirstYear: 200,=> bu tanlangan kichik yil qiymati , newsecondYear: 104,=> bu user tomonidan katta yil qiymati joylanadi, differencePercentage: "18",=> tanlangan kichikj va katta yillar orasidagi farq foiz qiymat chiqarish uchun   //
          February: { newfirstYear: 150, newsecondYear: 140, differencePercentage: "6.67", differenceAmount: "100" },
          March: { newfirstYear: 150, newsecondYear: 140, differencePercentage: "6.67", differenceAmount: "100" },
          April: { newfirstYear: 150, newsecondYear: 140, differencePercentage: "6.67", differenceAmount: "100" },
          May: { newfirstYear: 150, newsecondYear: 140, differencePercentage: "6.67", differenceAmount: "100" },
          June: { newfirstYear: 150, newsecondYear: 140, differencePercentage: "6.67", differenceAmount: "100" },
          July: { newfirstYear: 150, newsecondYear: 140, differencePercentage: "6.67", differenceAmount: "100" },
          August: { newfirstYear: 150, secondYear: 140, differencePercentage: "6.67", differenceAmount: "100" },
          September: { newfirstYear: 150, newsecondYear: 140, differencePercentage: "6.67", differenceAmount: "100" },
          October: { newfirstYear: 150, newsecondYear: 140, differencePercentage: "6.67", differenceAmount: "100" },
          November: { newfirstYear: 150, newsecondYear: 140, differencePercentage: "6.67", differenceAmount: "100" },
          December: { newfirstYear: 150, newsecondYear: 140, differencePercentage: "6.67", differenceAmount: "100" },
        },
        firstYearTotalSum: "866,007",  // ==> kichik yilning to'liq summalari yi'gindisi , Agarda user tomonidan yillar tanlansa yig'indi tanlangan oylar soniga qarab o'zgaradi //
        secondYearTotalSum: "846,963",// ==> katta yilning to'liq summalari yi'gindisi , Agarda user tomonidan yillar tanlansa yig'indi tanlangan oylar soniga qarab o'zgaradi //
        percentageSeparateTotal: "46.6", // ==> tanlangan katta va kichik yillarning to'liq summalari orasidagi foiz farq (o'zaro yillar orasida ) //
        amountSeparateTotal: "10963", // ==> tanlangan katta va kichik yillarning to'liq summalari orasidagi miqdor(mln so'm) farq (o'zaro yillar orasida ) //
        subRows: [
          {
            id: "1.1",
            name: "Sub Row 1.1",
            months: {
                January: { newfirstYear: 200, newsecondYear: 104, differencePercentage: "18", differenceAmount: "37600" }, 
                // newfirstYear: 200,=> bu tanlangan kichik yil qiymati , newsecondYear: 104,=> bu user tomonidan katta yil qiymati joylanadi, differencePercentage: "18",=> tanlangan kichikj va katta yillar orasidagi farq foiz qiymat chiqarish uchun   //
                February: { newfirstYear: 150, newsecondYear: 140, differencePercentage: "6.67", differenceAmount: "100" },
                March: { newfirstYear: 150, newsecondYear: 140, differencePercentage: "6.67", differenceAmount: "100" },
                April: { newfirstYear: 150, newsecondYear: 140, differencePercentage: "6.67", differenceAmount: "100" },
                May: { newfirstYear: 150, newsecondYear: 140, differencePercentage: "6.67", differenceAmount: "100" },
                June: { newfirstYear: 150, newsecondYear: 140, differencePercentage: "6.67", differenceAmount: "100" },
                July: { newfirstYear: 150, newsecondYear: 140, differencePercentage: "6.67", differenceAmount: "100" },
                August: { newfirstYear: 150, secondYear: 140, differencePercentage: "6.67", differenceAmount: "100" },
                September: { newfirstYear: 150, newsecondYear: 140, differencePercentage: "6.67", differenceAmount: "100" },
                October: { newfirstYear: 150, newsecondYear: 140, differencePercentage: "6.67", differenceAmount: "100" },
                November: { newfirstYear: 150, newsecondYear: 140, differencePercentage: "6.67", differenceAmount: "100" },
                December: { newfirstYear: 150, newsecondYear: 140, differencePercentage: "6.67", differenceAmount: "100" },
            },
            firstYearTotalSum: "866,007",
            secondYearTotalSum: "846,963",
            percentageSeparateTotal: "46.6",
            amountSeparateTotal: "10963",
            subRows: [
              {
                id: " 1.1.1",
                name: "Sub Sub Row 1.1.1",
                months: {
                    January: { newfirstYear: 200, newsecondYear: 104, differencePercentage: "18", differenceAmount: "37600" }, 
                    // newfirstYear: 200,=> bu tanlangan kichik yil qiymati , newsecondYear: 104,=> bu user tomonidan katta yil qiymati joylanadi, differencePercentage: "18",=> tanlangan kichikj va katta yillar orasidagi farq foiz qiymat chiqarish uchun   //
                    February: { newfirstYear: 150, newsecondYear: 140, differencePercentage: "6.67", differenceAmount: "100" },
                    March: { newfirstYear: 150, newsecondYear: 140, differencePercentage: "6.67", differenceAmount: "100" },
                    April: { newfirstYear: 150, newsecondYear: 140, differencePercentage: "6.67", differenceAmount: "100" },
                    May: { newfirstYear: 150, newsecondYear: 140, differencePercentage: "6.67", differenceAmount: "100" },
                    June: { newfirstYear: 150, newsecondYear: 140, differencePercentage: "6.67", differenceAmount: "100" },
                    July: { newfirstYear: 150, newsecondYear: 140, differencePercentage: "6.67", differenceAmount: "100" },
                    August: { newfirstYear: 150, secondYear: 140, differencePercentage: "6.67", differenceAmount: "100" },
                    September: { newfirstYear: 150, newsecondYear: 140, differencePercentage: "6.67", differenceAmount: "100" },
                    October: { newfirstYear: 150, newsecondYear: 140, differencePercentage: "6.67", differenceAmount: "100" },
                    November: { newfirstYear: 150, newsecondYear: 140, differencePercentage: "6.67", differenceAmount: "100" },
                    December: { newfirstYear: 150, newsecondYear: 140, differencePercentage: "6.67", differenceAmount: "100" },
                },
                firstYearTotalSum: "866,007",
                secondYearTotalSum: "846,963",
                percentageSeparateTotal: "46.6",
                amountSeparateTotal: "10963",
                subRows: [
                  {
                    id: " 1.1.1.1",
                    name: "Sub Sub Sub Row 1.1.1",
                    months: {
                        January: { newfirstYear: 200, newsecondYear: 104, differencePercentage: "18", differenceAmount: "37600" }, 
                        // newfirstYear: 200,=> bu tanlangan kichik yil qiymati , newsecondYear: 104,=> bu user tomonidan katta yil qiymati joylanadi, differencePercentage: "18",=> tanlangan kichikj va katta yillar orasidagi farq foiz qiymat chiqarish uchun   //
                        February: { newfirstYear: 150, newsecondYear: 140, differencePercentage: "6.67", differenceAmount: "100" },
                        March: { newfirstYear: 150, newsecondYear: 140, differencePercentage: "6.67", differenceAmount: "100" },
                        April: { newfirstYear: 150, newsecondYear: 140, differencePercentage: "6.67", differenceAmount: "100" },
                        May: { newfirstYear: 150, newsecondYear: 140, differencePercentage: "6.67", differenceAmount: "100" },
                        June: { newfirstYear: 150, newsecondYear: 140, differencePercentage: "6.67", differenceAmount: "100" },
                        July: { newfirstYear: 150, newsecondYear: 140, differencePercentage: "6.67", differenceAmount: "100" },
                        August: { newfirstYear: 150, secondYear: 140, differencePercentage: "6.67", differenceAmount: "100" },
                        September: { newfirstYear: 150, newsecondYear: 140, differencePercentage: "6.67", differenceAmount: "100" },
                        October: { newfirstYear: 150, newsecondYear: 140, differencePercentage: "6.67", differenceAmount: "100" },
                        November: { newfirstYear: 150, newsecondYear: 140, differencePercentage: "6.67", differenceAmount: "100" },
                        December: { newfirstYear: 150, newsecondYear: 140, differencePercentage: "6.67", differenceAmount: "100" },
                    },
                    firstYearTotalSum: "866,007",   
                    secondYearTotalSum: "846,963",
                    percentageSeparateTotal: "46.6",
                    amountSeparateTotal: "10963",
                    subRows: [],
                  },
                ],
              },
            ],
          },
        ],
      },
      // Add more rows as needed
      {
        id: "2",
        name: "562",
        months: {
            January: { newfirstYear: 200, newsecondYear: 104, differencePercentage: "18", differenceAmount: "37600" }, 
            // newfirstYear: 200,=> bu tanlangan kichik yil qiymati , newsecondYear: 104,=> bu user tomonidan katta yil qiymati joylanadi, differencePercentage: "18",=> tanlangan kichikj va katta yillar orasidagi farq foiz qiymat chiqarish uchun   //
            February: { newfirstYear: 150, newsecondYear: 140, differencePercentage: "6.67", differenceAmount: "100" },
            March: { newfirstYear: 150, newsecondYear: 140, differencePercentage: "6.67", differenceAmount: "100" },
            April: { newfirstYear: 150, newsecondYear: 140, differencePercentage: "6.67", differenceAmount: "100" },
            May: { newfirstYear: 150, newsecondYear: 140, differencePercentage: "6.67", differenceAmount: "100" },
            June: { newfirstYear: 150, newsecondYear: 140, differencePercentage: "6.67", differenceAmount: "100" },
            July: { newfirstYear: 150, newsecondYear: 140, differencePercentage: "6.67", differenceAmount: "100" },
            August: { newfirstYear: 150, secondYear: 140, differencePercentage: "6.67", differenceAmount: "100" },
            September: { newfirstYear: 150, newsecondYear: 140, differencePercentage: "6.67", differenceAmount: "100" },
            October: { newfirstYear: 150, newsecondYear: 140, differencePercentage: "6.67", differenceAmount: "100" },
            November: { newfirstYear: 150, newsecondYear: 140, differencePercentage: "6.67", differenceAmount: "100" },
            December: { newfirstYear: 150, newsecondYear: 140, differencePercentage: "6.67", differenceAmount: "100" },
        },
        firstYearTotalSum: "866,007",
        secondYearTotalSum: "846,963",
        percentageSeparateTotal: "56.6",
        amountSeparateTotal: "20963",
        subRows: [
          {
            id: "1.1",
            name: "Sub Row 1.1",
            months: {
                January: { newfirstYear: 200, newsecondYear: 104, differencePercentage: "18", differenceAmount: "37600" }, 
                // newfirstYear: 200,=> bu tanlangan kichik yil qiymati , newsecondYear: 104,=> bu user tomonidan katta yil qiymati joylanadi, differencePercentage: "18",=> tanlangan kichikj va katta yillar orasidagi farq foiz qiymat chiqarish uchun   //
                February: { newfirstYear: 150, newsecondYear: 140, differencePercentage: "6.67", differenceAmount: "100" },
                March: { newfirstYear: 150, newsecondYear: 140, differencePercentage: "6.67", differenceAmount: "100" },
                April: { newfirstYear: 150, newsecondYear: 140, differencePercentage: "6.67", differenceAmount: "100" },
                May: { newfirstYear: 150, newsecondYear: 140, differencePercentage: "6.67", differenceAmount: "100" },
                June: { newfirstYear: 150, newsecondYear: 140, differencePercentage: "6.67", differenceAmount: "100" },
                July: { newfirstYear: 150, newsecondYear: 140, differencePercentage: "6.67", differenceAmount: "100" },
                August: { newfirstYear: 150, secondYear: 140, differencePercentage: "6.67", differenceAmount: "100" },
                September: { newfirstYear: 150, newsecondYear: 140, differencePercentage: "6.67", differenceAmount: "100" },
                October: { newfirstYear: 150, newsecondYear: 140, differencePercentage: "6.67", differenceAmount: "100" },
                November: { newfirstYear: 150, newsecondYear: 140, differencePercentage: "6.67", differenceAmount: "100" },
                December: { newfirstYear: 150, newsecondYear: 140, differencePercentage: "6.67", differenceAmount: "100" },
            },
            firstYearTotalSum: "866,007",
            secondYearTotalSum: "846,963",
            percentageSeparateTotal: "56.6",
            amountSeparateTotal: "20963",
            subRows: [
              {
                id: " 1.1.1",
                name: "Sub Sub Row 1.1.1",
                months: {
                    January: { newfirstYear: 200, newsecondYear: 104, differencePercentage: "18", differenceAmount: "37600" }, 
                    // newfirstYear: 200,=> bu tanlangan kichik yil qiymati , newsecondYear: 104,=> bu user tomonidan katta yil qiymati joylanadi, differencePercentage: "18",=> tanlangan kichikj va katta yillar orasidagi farq foiz qiymat chiqarish uchun   //
                    February: { newfirstYear: 150, newsecondYear: 140, differencePercentage: "6.67", differenceAmount: "100" },
                    March: { newfirstYear: 150, newsecondYear: 140, differencePercentage: "6.67", differenceAmount: "100" },
                    April: { newfirstYear: 150, newsecondYear: 140, differencePercentage: "6.67", differenceAmount: "100" },
                    May: { newfirstYear: 150, newsecondYear: 140, differencePercentage: "6.67", differenceAmount: "100" },
                    June: { newfirstYear: 150, newsecondYear: 140, differencePercentage: "6.67", differenceAmount: "100" },
                    July: { newfirstYear: 150, newsecondYear: 140, differencePercentage: "6.67", differenceAmount: "100" },
                    August: { newfirstYear: 150, secondYear: 140, differencePercentage: "6.67", differenceAmount: "100" },
                    September: { newfirstYear: 150, newsecondYear: 140, differencePercentage: "6.67", differenceAmount: "100" },
                    October: { newfirstYear: 150, newsecondYear: 140, differencePercentage: "6.67", differenceAmount: "100" },
                    November: { newfirstYear: 150, newsecondYear: 140, differencePercentage: "6.67", differenceAmount: "100" },
                    December: { newfirstYear: 150, newsecondYear: 140, differencePercentage: "6.67", differenceAmount: "100" },
                },
                firstYearTotalSum: "866,007",
                secondYearTotalSum: "846,963",
                percentageSeparateTotal: "56.6",
                amountSeparateTotal: "20963",
                subRows: [
                  {
                    id: " 1.1.1.1",
                    name: "Sub Sub Sub Row 1.1.1",
                    months: {
                        January: { newfirstYear: 200, newsecondYear: 104, differencePercentage: "18", differenceAmount: "37600" }, 
                        // newfirstYear: 200,=> bu tanlangan kichik yil qiymati , newsecondYear: 104,=> bu user tomonidan katta yil qiymati joylanadi, differencePercentage: "18",=> tanlangan kichikj va katta yillar orasidagi farq foiz qiymat chiqarish uchun   //
                        February: { newfirstYear: 150, newsecondYear: 140, differencePercentage: "6.67", differenceAmount: "100" },
                        March: { newfirstYear: 150, newsecondYear: 140, differencePercentage: "6.67", differenceAmount: "100" },
                        April: { newfirstYear: 150, newsecondYear: 140, differencePercentage: "6.67", differenceAmount: "100" },
                        May: { newfirstYear: 150, newsecondYear: 140, differencePercentage: "6.67", differenceAmount: "100" },
                        June: { newfirstYear: 150, newsecondYear: 140, differencePercentage: "6.67", differenceAmount: "100" },
                        July: { newfirstYear: 150, newsecondYear: 140, differencePercentage: "6.67", differenceAmount: "100" },
                        August: { newfirstYear: 150, secondYear: 140, differencePercentage: "6.67", differenceAmount: "100" },
                        September: { newfirstYear: 150, newsecondYear: 140, differencePercentage: "6.67", differenceAmount: "100" },
                        October: { newfirstYear: 150, newsecondYear: 140, differencePercentage: "6.67", differenceAmount: "100" },
                        November: { newfirstYear: 150, newsecondYear: 140, differencePercentage: "6.67", differenceAmount: "100" },
                        December: { newfirstYear: 150, newsecondYear: 140, differencePercentage: "6.67", differenceAmount: "100" },
                    },
                    firstYearTotalSum: "866,007",
                    secondYearTotalSum: "846,963",
                    percentageSeparateTotal: "56.6",
                    amountSeparateTotal: "20963",
                    subRows: [],
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        id: "3",
        name: "563",
        months: {
            January: { newfirstYear: 200, newsecondYear: 104, differencePercentage: "18", differenceAmount: "37600" }, 
            // newfirstYear: 200,=> bu tanlangan kichik yil qiymati , newsecondYear: 104,=> bu user tomonidan katta yil qiymati joylanadi, differencePercentage: "18",=> tanlangan kichikj va katta yillar orasidagi farq foiz qiymat chiqarish uchun   //
            February: { newfirstYear: 150, newsecondYear: 140, differencePercentage: "6.67", differenceAmount: "100" },
            March: { newfirstYear: 150, newsecondYear: 140, differencePercentage: "6.67", differenceAmount: "100" },
            April: { newfirstYear: 150, newsecondYear: 140, differencePercentage: "6.67", differenceAmount: "100" },
            May: { newfirstYear: 150, newsecondYear: 140, differencePercentage: "6.67", differenceAmount: "100" },
            June: { newfirstYear: 150, newsecondYear: 140, differencePercentage: "6.67", differenceAmount: "100" },
            July: { newfirstYear: 150, newsecondYear: 140, differencePercentage: "6.67", differenceAmount: "100" },
            August: { newfirstYear: 150, secondYear: 140, differencePercentage: "6.67", differenceAmount: "100" },
            September: { newfirstYear: 150, newsecondYear: 140, differencePercentage: "6.67", differenceAmount: "100" },
            October: { newfirstYear: 150, newsecondYear: 140, differencePercentage: "6.67", differenceAmount: "100" },
            November: { newfirstYear: 150, newsecondYear: 140, differencePercentage: "6.67", differenceAmount: "100" },
            December: { newfirstYear: 150, newsecondYear: 140, differencePercentage: "6.67", differenceAmount: "100" },
        },
        firstYearTotalSum: "866,007",
        secondYearTotalSum: "846,963",
        percentageSeparateTotal: "56.6",
        amountSeparateTotal: "20963",
        subRows: [
          {
            id: "1.1",
            name: "563 uchun 1.1",
            months: {
                January: { newfirstYear: 200, newsecondYear: 104, differencePercentage: "18", differenceAmount: "37600" }, 
                // newfirstYear: 200,=> bu tanlangan kichik yil qiymati , newsecondYear: 104,=> bu user tomonidan katta yil qiymati joylanadi, differencePercentage: "18",=> tanlangan kichikj va katta yillar orasidagi farq foiz qiymat chiqarish uchun   //
                February: { newfirstYear: 150, newsecondYear: 140, differencePercentage: "6.67", differenceAmount: "100" },
                March: { newfirstYear: 150, newsecondYear: 140, differencePercentage: "6.67", differenceAmount: "100" },
                April: { newfirstYear: 150, newsecondYear: 140, differencePercentage: "6.67", differenceAmount: "100" },
                May: { newfirstYear: 150, newsecondYear: 140, differencePercentage: "6.67", differenceAmount: "100" },
                June: { newfirstYear: 150, newsecondYear: 140, differencePercentage: "6.67", differenceAmount: "100" },
                July: { newfirstYear: 150, newsecondYear: 140, differencePercentage: "6.67", differenceAmount: "100" },
                August: { newfirstYear: 150, secondYear: 140, differencePercentage: "6.67", differenceAmount: "100" },
                September: { newfirstYear: 150, newsecondYear: 140, differencePercentage: "6.67", differenceAmount: "100" },
                October: { newfirstYear: 150, newsecondYear: 140, differencePercentage: "6.67", differenceAmount: "100" },
                November: { newfirstYear: 150, newsecondYear: 140, differencePercentage: "6.67", differenceAmount: "100" },
                December: { newfirstYear: 150, newsecondYear: 140, differencePercentage: "6.67", differenceAmount: "100" },
            },
            firstYearTotalSum: "866,007",
            secondYearTotalSum: "846,963",
            percentageSeparateTotal: "56.6",
            amountSeparateTotal: "20963",
            subRows: [
              {
                id: " 1.1.1",
                name: "Sub Sub Row 1.1.1",
                months: {
                    January: { newfirstYear: 200, newsecondYear: 104, differencePercentage: "18", differenceAmount: "37600" }, 
                    // newfirstYear: 200,=> bu tanlangan kichik yil qiymati , newsecondYear: 104,=> bu user tomonidan katta yil qiymati joylanadi, differencePercentage: "18",=> tanlangan kichikj va katta yillar orasidagi farq foiz qiymat chiqarish uchun   //
                    February: { newfirstYear: 150, newsecondYear: 140, differencePercentage: "6.67", differenceAmount: "100" },
                    March: { newfirstYear: 150, newsecondYear: 140, differencePercentage: "6.67", differenceAmount: "100" },
                    April: { newfirstYear: 150, newsecondYear: 140, differencePercentage: "6.67", differenceAmount: "100" },
                    May: { newfirstYear: 150, newsecondYear: 140, differencePercentage: "6.67", differenceAmount: "100" },
                    June: { newfirstYear: 150, newsecondYear: 140, differencePercentage: "6.67", differenceAmount: "100" },
                    July: { newfirstYear: 150, newsecondYear: 140, differencePercentage: "6.67", differenceAmount: "100" },
                    August: { newfirstYear: 150, secondYear: 140, differencePercentage: "6.67", differenceAmount: "100" },
                    September: { newfirstYear: 150, newsecondYear: 140, differencePercentage: "6.67", differenceAmount: "100" },
                    October: { newfirstYear: 150, newsecondYear: 140, differencePercentage: "6.67", differenceAmount: "100" },
                    November: { newfirstYear: 150, newsecondYear: 140, differencePercentage: "6.67", differenceAmount: "100" },
                    December: { newfirstYear: 150, newsecondYear: 140, differencePercentage: "6.67", differenceAmount: "100" },
                },
                firstYearTotalSum: "866,007",
                secondYearTotalSum: "846,963",
                percentageSeparateTotal: "56.6",
                amountSeparateTotal: "20963",
                subRows: [
                  {
                    id: " 1.1.1.1",
                    name: "Sub Sub Sub Row 1.1.1",
                    months: {
                        January: { newfirstYear: 200, newsecondYear: 104, differencePercentage: "18", differenceAmount: "37600" }, 
                        // newfirstYear: 200,=> bu tanlangan kichik yil qiymati , newsecondYear: 104,=> bu user tomonidan katta yil qiymati joylanadi, differencePercentage: "18",=> tanlangan kichikj va katta yillar orasidagi farq foiz qiymat chiqarish uchun   //
                        February: { newfirstYear: 150, newsecondYear: 140, differencePercentage: "6.67", differenceAmount: "100" },
                        March: { newfirstYear: 150, newsecondYear: 140, differencePercentage: "6.67", differenceAmount: "100" },
                        April: { newfirstYear: 150, newsecondYear: 140, differencePercentage: "6.67", differenceAmount: "100" },
                        May: { newfirstYear: 150, newsecondYear: 140, differencePercentage: "6.67", differenceAmount: "100" },
                        June: { newfirstYear: 150, newsecondYear: 140, differencePercentage: "6.67", differenceAmount: "100" },
                        July: { newfirstYear: 150, newsecondYear: 140, differencePercentage: "6.67", differenceAmount: "100" },
                        August: { newfirstYear: 150, secondYear: 140, differencePercentage: "6.67", differenceAmount: "100" },
                        September: { newfirstYear: 150, newsecondYear: 140, differencePercentage: "6.67", differenceAmount: "100" },
                        October: { newfirstYear: 150, newsecondYear: 140, differencePercentage: "6.67", differenceAmount: "100" },
                        November: { newfirstYear: 150, newsecondYear: 140, differencePercentage: "6.67", differenceAmount: "100" },
                        December: { newfirstYear: 150, newsecondYear: 140, differencePercentage: "6.67", differenceAmount: "100" },
                    },
                    firstYearTotalSum: "866,007",
                    secondYearTotalSum: "846,963",
                    percentageSeparateTotal: "56.6",
                    amountSeparateTotal: "20963",
                    subRows: [],
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
    totalData:[
      {
      name: "Grand Total", // to'liq yig'indi nomi xardoim birxil "Grand Total" //
      months: {
        January: {
          newfirstMonth: 400000000, // ==>  tanlangan kichik yilning 1-oydagi qiymatlari to'liq yig'indisi //
          newsecondMonth: 104, // ==>  tanlangan katta yilning 1-oydagi qiymatlari to'liq yig'indisi //
          differencePercentageTotalMonth: "18", // ==> 1-oydagi  tanlangan katta va kichik yilning o'zaro nisbatidan olingan foiz  //
          differenceAmountTotalMonth: "37600", // ==> 1-oydagi  tanlangan katta va kichik yilning o'zaro ayirmasidan olingan summa   //
        },
        February: {
          newfirstMonth: 150,// ==>  tanlangan kichik yilning 2-oydagi qiymatlari to'liq yig'indisi //
          newsecondMonth: 140, // ==>  tanlangan katta yilning 2-oydagi qiymatlari to'liq yig'indisi //
          differencePercentageTotalMonth: "6.67", // ==> 2-oydagi  tanlangan katta va kichik yilning o'zaro nisbatidan olingan foiz  //
          differenceAmountTotalMonth: "100", // ==> 2-oydagi  tanlangan katta va kichik yilning o'zaro ayirmasidan olingan summa   //
        },
        March: {
          newfirstMonth: 150, // ==>  tanlangan kichik yilning 3-oydagi qiymatlari to'liq yig'indisi //
          newsecondMonth: 140, // ==>  tanlangan katta yilning 3-oydagi qiymatlari to'liq yig'indisi //
          differencePercentageTotalMonth: "6.67", // ==> 3-oydagi  tanlangan katta va kichik yilning o'zaro nisbatidan olingan foiz  //
          differenceAmountTotalMonth: "100", // ==> 3-oydagi  tanlangan katta va kichik yilning o'zaro ayirmasidan olingan summa   //
        },
        April: {
          newfirstMonth: 150,
          newsecondMonth: 140,
          differencePercentageTotalMonth: "6.67",
          differenceAmountTotalMonth: "100",
        },
        May: {
          newfirstMonth: 150,
          newsecondMonth: 140,
          differencePercentageTotalMonth: "6.67",
          differenceAmountTotalMonth: "100",
        },
        June: {
          newfirstMonth: 150,
          newsecondMonth: 140,
          differencePercentageTotalMonth: "6.67",
          differenceAmountTotalMonth: "100",
        },
        July: {
          newfirstMonth: 150,
          newsecondMonth: 140,
          differencePercentageTotalMonth: "6.67",
          differenceAmountTotalMonth: "100",
        },
        August: {
          newfirstMonth: 150,
          newsecondMonth: 140,
          differencePercentageTotalMonth: "6.67",
          differenceAmountTotalMonth: "100",
        },
        September: {
          newfirstMonth: 150,
          newsecondMonth: 140,
          differencePercentageTotalMonth: "6.67",
          differenceAmountTotalMonth: "100",
        },
        October: {
          newfirstMonth: 150,
          newsecondMonth: 140,
          differencePercentageTotalMonth: "6.67",
          differenceAmountTotalMonth: "100",
        },
        November: {
          newfirstMonth: 150,
          newsecondMonth: 140,
          differencePercentageTotalMonth: "6.67",
          differenceAmountTotalMonth: "100",
        },
        December: {
          newfirstMonth: 150,
          newsecondMonth: 140,
          differencePercentageTotalMonth: "6.67",
          differenceAmountTotalMonth: "100",
        },
      },
      firstYearTotalMonthSum: "866,007", // ==> 1-yilning(kichik yil) barcha oylardagi qiymatlari yig'indisi summa //
      secondYearTotalMonthSum: "846,963", // ==> 2-yilning(katta yil) barcha oylardagi qiymatlari yig'indisi summa //
      percentageSeparateTotalMonth: "46.6",// ==> 1-yilning(kichik yil)  va 2-yilning(katta yil) barcha oylardagi qiymatlari nisbati foiz qiymatda //
      amountSeparateTotalMonth: "10963", // ==> 1-yilning(kichik yil)  va 2-yilning(katta yil) barcha oylardagi qiymatlari ayirmasi summa qiymatda //
    }
    ],
  };

