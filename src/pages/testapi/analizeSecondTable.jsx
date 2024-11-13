const secondtableData = {
    choosedfirstYear: 2023,  // user Tanlagan Kichik(oldingi) yil  //
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
          January: { plan: 375, fackt: 104, difference_Plan_Percentage: "18", difference_Plan_Amount: "37600" }, 
          // xar bitta oy uchun o'zining qiymatlari shakllantiriladi, plan: 200,=> bu tanlangan kichik yil qiymati , fackt: 104,=> bu user tomonidan katta yil qiymati joylanadi, difference_Plan_Percentage: "18",=> tanlangan kichikj va katta yillar orasidagi farq foiz qiymat chiqarish uchun   //
          February: { plan: 550, fackt: 140, difference_Plan_Percentage: "6.67", difference_Plan_Amount: "100" },
          March: { plan: 250, fackt: 140, difference_Plan_Percentage: "6.67", difference_Plan_Amount: "100" },
          April: { plan: 850, fackt: 140, difference_Plan_Percentage: "6.67", difference_Plan_Amount: "100" },
          May: { plan: 150, fackt: 140, difference_Plan_Percentage: "6.67", difference_Plan_Amount: "100" },
          June: { plan: 150, fackt: 140, difference_Plan_Percentage: "6.67", difference_Plan_Amount: "100" },
          July: { plan: 150, fackt: 140, difference_Plan_Percentage: "6.67", difference_Plan_Amount: "100" },
          August: { plan: 150, secondYear: 140, difference_Plan_Percentage: "6.67", difference_Plan_Amount: "100" },
          September: { plan: 150, fackt: 140, difference_Plan_Percentage: "6.67", difference_Plan_Amount: "100" },
          October: { plan: 150, fackt: 140, difference_Plan_Percentage: "6.67", difference_Plan_Amount: "100" },
          November: { plan: 150, fackt: 140, difference_Plan_Percentage: "6.67", difference_Plan_Amount: "100" },
          December: { plan: 150, fackt: 140, difference_Plan_Percentage: "6.67", difference_Plan_Amount: "100" },
        },
        plan_TotalSum: "866,007",  // ==> kichik yilning to'liq summalari yi'gindisi , Agarda user tomonidan yillar tanlansa yig'indi tanlangan oylar soniga qarab o'zgaradi //
        fackt_TotalSum: "846,963",// ==> katta yilning to'liq summalari yi'gindisi , Agarda user tomonidan yillar tanlansa yig'indi tanlangan oylar soniga qarab o'zgaradi //
        percentageSeparateTotal: "46.6", // ==> tanlangan katta va kichik yillarning to'liq summalari orasidagi foiz farq (o'zaro yillar orasida ) //
        amountSeparateTotal: "10963", // ==> tanlangan katta va kichik yillarning to'liq summalari orasidagi miqdor(mln so'm) farq (o'zaro yillar orasida ) //
        subRows: [
          {
            id: "1.1",
            name: "Sub Row 1.1",
            months: {
                January: { plan: 200, fackt: 104, difference_Plan_Percentage: "18", difference_Plan_Amount: "37600" }, 
                // plan: 200,=> bu tanlangan kichik yil qiymati , fackt: 104,=> bu user tomonidan katta yil qiymati joylanadi, difference_Plan_Percentage: "18",=> tanlangan kichikj va katta yillar orasidagi farq foiz qiymat chiqarish uchun   //
                February: { plan: 150, fackt: 140, difference_Plan_Percentage: "6.67", difference_Plan_Amount: "100" },
                March: { plan: 150, fackt: 140, difference_Plan_Percentage: "6.67", difference_Plan_Amount: "100" },
                April: { plan: 150, fackt: 140, difference_Plan_Percentage: "6.67", difference_Plan_Amount: "100" },
                May: { plan: 150, fackt: 140, difference_Plan_Percentage: "6.67", difference_Plan_Amount: "100" },
                June: { plan: 150, fackt: 140, difference_Plan_Percentage: "6.67", difference_Plan_Amount: "100" },
                July: { plan: 150, fackt: 140, difference_Plan_Percentage: "6.67", difference_Plan_Amount: "100" },
                August: { plan: 150, secondYear: 140, difference_Plan_Percentage: "6.67", difference_Plan_Amount: "100" },
                September: { plan: 150, fackt: 140, difference_Plan_Percentage: "6.67", difference_Plan_Amount: "100" },
                October: { plan: 150, fackt: 140, difference_Plan_Percentage: "6.67", difference_Plan_Amount: "100" },
                November: { plan: 150, fackt: 140, difference_Plan_Percentage: "6.67", difference_Plan_Amount: "100" },
                December: { plan: 150, fackt: 140, difference_Plan_Percentage: "6.67", difference_Plan_Amount: "100" },
            },
            plan_TotalSum: "866,007",
            fackt_TotalSum: "846,963",
            percentageSeparateTotal: "46.6",
            amountSeparateTotal: "10963",
            subRows: [
              {
                id: " 1.1.1",
                name: "Sub Sub Row 1.1.1",
                months: {
                    January: { plan: 200, fackt: 104, difference_Plan_Percentage: "18", difference_Plan_Amount: "37600" }, 
                    // plan: 200,=> bu tanlangan kichik yil qiymati , fackt: 104,=> bu user tomonidan katta yil qiymati joylanadi, difference_Plan_Percentage: "18",=> tanlangan kichikj va katta yillar orasidagi farq foiz qiymat chiqarish uchun   //
                    February: { plan: 150, fackt: 140, difference_Plan_Percentage: "6.67", difference_Plan_Amount: "100" },
                    March: { plan: 150, fackt: 140, difference_Plan_Percentage: "6.67", difference_Plan_Amount: "100" },
                    April: { plan: 150, fackt: 140, difference_Plan_Percentage: "6.67", difference_Plan_Amount: "100" },
                    May: { plan: 150, fackt: 140, difference_Plan_Percentage: "6.67", difference_Plan_Amount: "100" },
                    June: { plan: 150, fackt: 140, difference_Plan_Percentage: "6.67", difference_Plan_Amount: "100" },
                    July: { plan: 150, fackt: 140, difference_Plan_Percentage: "6.67", difference_Plan_Amount: "100" },
                    August: { plan: 150, secondYear: 140, difference_Plan_Percentage: "6.67", difference_Plan_Amount: "100" },
                    September: { plan: 150, fackt: 140, difference_Plan_Percentage: "6.67", difference_Plan_Amount: "100" },
                    October: { plan: 150, fackt: 140, difference_Plan_Percentage: "6.67", difference_Plan_Amount: "100" },
                    November: { plan: 150, fackt: 140, difference_Plan_Percentage: "6.67", difference_Plan_Amount: "100" },
                    December: { plan: 150, fackt: 140, difference_Plan_Percentage: "6.67", difference_Plan_Amount: "100" },
                },
                plan_TotalSum: "866,007",
                fackt_TotalSum: "846,963",
                percentageSeparateTotal: "46.6",
                amountSeparateTotal: "10963",
                subRows: [
                {
                    id: " 1.1.1.1",
                    name: "Sub Sub Sub Row 1.1.1",
                    months: {
                        January: { plan: 200, fackt: 104, difference_Plan_Percentage: "18", difference_Plan_Amount: "37600" }, 
                        // plan: 200,=> bu tanlangan kichik yil qiymati , fackt: 104,=> bu user tomonidan katta yil qiymati joylanadi, difference_Plan_Percentage: "18",=> tanlangan kichikj va katta yillar orasidagi farq foiz qiymat chiqarish uchun   //
                        February: { plan: 150, fackt: 140, difference_Plan_Percentage: "6.67", difference_Plan_Amount: "100" },
                        March: { plan: 150, fackt: 140, difference_Plan_Percentage: "6.67", difference_Plan_Amount: "100" },
                        April: { plan: 150, fackt: 140, difference_Plan_Percentage: "6.67", difference_Plan_Amount: "100" },
                        May: { plan: 150, fackt: 140, difference_Plan_Percentage: "6.67", difference_Plan_Amount: "100" },
                        June: { plan: 150, fackt: 140, difference_Plan_Percentage: "6.67", difference_Plan_Amount: "100" },
                        July: { plan: 150, fackt: 140, difference_Plan_Percentage: "6.67", difference_Plan_Amount: "100" },
                        August: { plan: 150, secondYear: 140, difference_Plan_Percentage: "6.67", difference_Plan_Amount: "100" },
                        September: { plan: 150, fackt: 140, difference_Plan_Percentage: "6.67", difference_Plan_Amount: "100" },
                        October: { plan: 150, fackt: 140, difference_Plan_Percentage: "6.67", difference_Plan_Amount: "100" },
                        November: { plan: 150, fackt: 140, difference_Plan_Percentage: "6.67", difference_Plan_Amount: "100" },
                        December: { plan: 150, fackt: 140, difference_Plan_Percentage: "6.67", difference_Plan_Amount: "100" },
                    },
                    plan_TotalSum: "866,007",   
                    fackt_TotalSum: "846,963",
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
            January: { plan: 500, fackt: 104, difference_Plan_Percentage: "18", difference_Plan_Amount: "37600" }, 
            // plan: 200,=> bu tanlangan kichik yil qiymati , fackt: 104,=> bu user tomonidan katta yil qiymati joylanadi, difference_Plan_Percentage: "18",=> tanlangan kichikj va katta yillar orasidagi farq foiz qiymat chiqarish uchun   //
            February: { plan: 4256, fackt: 140, difference_Plan_Percentage: "6.67", difference_Plan_Amount: "100" },
            March: { plan: 960, fackt: 140, difference_Plan_Percentage: "6.67", difference_Plan_Amount: "100" },
            April: { plan: 150, fackt: 140, difference_Plan_Percentage: "6.67", difference_Plan_Amount: "100" },
            May: { plan: 150, fackt: 140, difference_Plan_Percentage: "6.67", difference_Plan_Amount: "100" },
            June: { plan: 150, fackt: 140, difference_Plan_Percentage: "6.67", difference_Plan_Amount: "100" },
            July: { plan: 150, fackt: 140, difference_Plan_Percentage: "6.67", difference_Plan_Amount: "100" },
            August: { plan: 150, secondYear: 140, difference_Plan_Percentage: "6.67", difference_Plan_Amount: "100" },
            September: { plan: 150, fackt: 140, difference_Plan_Percentage: "6.67", difference_Plan_Amount: "100" },
            October: { plan: 150, fackt: 140, difference_Plan_Percentage: "6.67", difference_Plan_Amount: "100" },
            November: { plan: 150, fackt: 140, difference_Plan_Percentage: "6.67", difference_Plan_Amount: "100" },
            December: { plan: 150, fackt: 140, difference_Plan_Percentage: "6.67", difference_Plan_Amount: "100" },
        },
        plan_TotalSum: "866,007",
        fackt_TotalSum: "846,963",
        percentageSeparateTotal: "56.6",
        amountSeparateTotal: "20963",
        subRows: [
        {
            id: "1.1",
            name: "Sub Row 1.1",
            months: {
                January: { plan: 200, fackt: 104, difference_Plan_Percentage: "18", difference_Plan_Amount: "37600" }, 
                // plan: 200,=> bu tanlangan kichik yil qiymati , fackt: 104,=> bu user tomonidan katta yil qiymati joylanadi, difference_Plan_Percentage: "18",=> tanlangan kichikj va katta yillar orasidagi farq foiz qiymat chiqarish uchun   //
                February: { plan: 150, fackt: 140, difference_Plan_Percentage: "6.67", difference_Plan_Amount: "100" },
                March: { plan: 150, fackt: 140, difference_Plan_Percentage: "6.67", difference_Plan_Amount: "100" },
                April: { plan: 150, fackt: 140, difference_Plan_Percentage: "6.67", difference_Plan_Amount: "100" },
                May: { plan: 150, fackt: 140, difference_Plan_Percentage: "6.67", difference_Plan_Amount: "100" },
                June: { plan: 150, fackt: 140, difference_Plan_Percentage: "6.67", difference_Plan_Amount: "100" },
                July: { plan: 150, fackt: 140, difference_Plan_Percentage: "6.67", difference_Plan_Amount: "100" },
                August: { plan: 150, secondYear: 140, difference_Plan_Percentage: "6.67", difference_Plan_Amount: "100" },
                September: { plan: 150, fackt: 140, difference_Plan_Percentage: "6.67", difference_Plan_Amount: "100" },
                October: { plan: 150, fackt: 140, difference_Plan_Percentage: "6.67", difference_Plan_Amount: "100" },
                November: { plan: 150, fackt: 140, difference_Plan_Percentage: "6.67", difference_Plan_Amount: "100" },
                December: { plan: 150, fackt: 140, difference_Plan_Percentage: "6.67", difference_Plan_Amount: "100" },
            },
            plan_TotalSum: "866,007",
            fackt_TotalSum: "846,963",
            percentageSeparateTotal: "56.6",
            amountSeparateTotal: "20963",
            subRows: [
            {
                id: " 1.1.1",
                name: "Sub Sub Row 1.1.1",
                months: {
                    January: { plan: 200, fackt: 104, difference_Plan_Percentage: "18", difference_Plan_Amount: "37600" }, 
                    // plan: 200,=> bu tanlangan kichik yil qiymati , fackt: 104,=> bu user tomonidan katta yil qiymati joylanadi, difference_Plan_Percentage: "18",=> tanlangan kichikj va katta yillar orasidagi farq foiz qiymat chiqarish uchun   //
                    February: { plan: 150, fackt: 140, difference_Plan_Percentage: "6.67", difference_Plan_Amount: "100" },
                    March: { plan: 150, fackt: 140, difference_Plan_Percentage: "6.67", difference_Plan_Amount: "100" },
                    April: { plan: 150, fackt: 140, difference_Plan_Percentage: "6.67", difference_Plan_Amount: "100" },
                    May: { plan: 150, fackt: 140, difference_Plan_Percentage: "6.67", difference_Plan_Amount: "100" },
                    June: { plan: 150, fackt: 140, difference_Plan_Percentage: "6.67", difference_Plan_Amount: "100" },
                    July: { plan: 150, fackt: 140, difference_Plan_Percentage: "6.67", difference_Plan_Amount: "100" },
                    August: { plan: 150, secondYear: 140, difference_Plan_Percentage: "6.67", difference_Plan_Amount: "100" },
                    September: { plan: 150, fackt: 140, difference_Plan_Percentage: "6.67", difference_Plan_Amount: "100" },
                    October: { plan: 150, fackt: 140, difference_Plan_Percentage: "6.67", difference_Plan_Amount: "100" },
                    November: { plan: 150, fackt: 140, difference_Plan_Percentage: "6.67", difference_Plan_Amount: "100" },
                    December: { plan: 150, fackt: 140, difference_Plan_Percentage: "6.67", difference_Plan_Amount: "100" },
                },
                plan_TotalSum: "866,007",
                fackt_TotalSum: "846,963",
                percentageSeparateTotal: "56.6",
                amountSeparateTotal: "20963",
                subRows: [
                {
                    id: " 1.1.1.1",
                    name: "Sub Sub Sub Row 1.1.1",
                    months: {
                        January: { plan: 200, fackt: 104, difference_Plan_Percentage: "18", difference_Plan_Amount: "37600" }, 
                        // plan: 200,=> bu tanlangan kichik yil qiymati , fackt: 104,=> bu user tomonidan katta yil qiymati joylanadi, difference_Plan_Percentage: "18",=> tanlangan kichikj va katta yillar orasidagi farq foiz qiymat chiqarish uchun   //
                        February: { plan: 150, fackt: 140, difference_Plan_Percentage: "6.67", difference_Plan_Amount: "100" },
                        March: { plan: 150, fackt: 140, difference_Plan_Percentage: "6.67", difference_Plan_Amount: "100" },
                        April: { plan: 150, fackt: 140, difference_Plan_Percentage: "6.67", difference_Plan_Amount: "100" },
                        May: { plan: 150, fackt: 140, difference_Plan_Percentage: "6.67", difference_Plan_Amount: "100" },
                        June: { plan: 150, fackt: 140, difference_Plan_Percentage: "6.67", difference_Plan_Amount: "100" },
                        July: { plan: 150, fackt: 140, difference_Plan_Percentage: "6.67", difference_Plan_Amount: "100" },
                        August: { plan: 150, secondYear: 140, difference_Plan_Percentage: "6.67", difference_Plan_Amount: "100" },
                        September: { plan: 150, fackt: 140, difference_Plan_Percentage: "6.67", difference_Plan_Amount: "100" },
                        October: { plan: 150, fackt: 140, difference_Plan_Percentage: "6.67", difference_Plan_Amount: "100" },
                        November: { plan: 150, fackt: 140, difference_Plan_Percentage: "6.67", difference_Plan_Amount: "100" },
                        December: { plan: 150, fackt: 140, difference_Plan_Percentage: "6.67", difference_Plan_Amount: "100" },
                    },
                    plan_TotalSum: "866,007",
                    fackt_TotalSum: "846,963",
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
            January: { plan: 8250, fackt: 104, difference_Plan_Percentage: "18", difference_Plan_Amount: "37600" }, 
            // plan: 200,=> bu tanlangan kichik yil qiymati , fackt: 104,=> bu user tomonidan katta yil qiymati joylanadi, difference_Plan_Percentage: "18",=> tanlangan kichikj va katta yillar orasidagi farq foiz qiymat chiqarish uchun   //
            February: { plan: 150, fackt: 140, difference_Plan_Percentage: "6.67", difference_Plan_Amount: "100" },
            March: { plan: 150, fackt: 140, difference_Plan_Percentage: "6.67", difference_Plan_Amount: "100" },
            April: { plan: 150, fackt: 140, difference_Plan_Percentage: "6.67", difference_Plan_Amount: "100" },
            May: { plan: 150, fackt: 140, difference_Plan_Percentage: "6.67", difference_Plan_Amount: "100" },
            June: { plan: 150, fackt: 140, difference_Plan_Percentage: "6.67", difference_Plan_Amount: "100" },
            July: { plan: 150, fackt: 140, difference_Plan_Percentage: "6.67", difference_Plan_Amount: "100" },
            August: { plan: 150, secondYear: 140, difference_Plan_Percentage: "6.67", difference_Plan_Amount: "100" },
            September: { plan: 150, fackt: 140, difference_Plan_Percentage: "6.67", difference_Plan_Amount: "100" },
            October: { plan: 150, fackt: 140, difference_Plan_Percentage: "6.67", difference_Plan_Amount: "100" },
            November: { plan: 150, fackt: 140, difference_Plan_Percentage: "6.67", difference_Plan_Amount: "100" },
            December: { plan: 150, fackt: 140, difference_Plan_Percentage: "6.67", difference_Plan_Amount: "100" },
        },
        plan_TotalSum: "866,007",
        fackt_TotalSum: "846,963",
        percentageSeparateTotal: "56.6",
        amountSeparateTotal: "20963",
        subRows: [
        {
            id: "1.1",
            name: "563 uchun 1.1",
            months: {
                January: { plan: 200, fackt: 104, difference_Plan_Percentage: "18", difference_Plan_Amount: "37600" }, 
                // plan: 200,=> bu tanlangan kichik yil qiymati , fackt: 104,=> bu user tomonidan katta yil qiymati joylanadi, difference_Plan_Percentage: "18",=> tanlangan kichikj va katta yillar orasidagi farq foiz qiymat chiqarish uchun   //
                February: { plan: 150, fackt: 140, difference_Plan_Percentage: "6.67", difference_Plan_Amount: "100" },
                March: { plan: 150, fackt: 140, difference_Plan_Percentage: "6.67", difference_Plan_Amount: "100" },
                April: { plan: 150, fackt: 140, difference_Plan_Percentage: "6.67", difference_Plan_Amount: "100" },
                May: { plan: 150, fackt: 140, difference_Plan_Percentage: "6.67", difference_Plan_Amount: "100" },
                June: { plan: 150, fackt: 140, difference_Plan_Percentage: "6.67", difference_Plan_Amount: "100" },
                July: { plan: 150, fackt: 140, difference_Plan_Percentage: "6.67", difference_Plan_Amount: "100" },
                August: { plan: 150, secondYear: 140, difference_Plan_Percentage: "6.67", difference_Plan_Amount: "100" },
                September: { plan: 150, fackt: 140, difference_Plan_Percentage: "6.67", difference_Plan_Amount: "100" },
                October: { plan: 150, fackt: 140, difference_Plan_Percentage: "6.67", difference_Plan_Amount: "100" },
                November: { plan: 150, fackt: 140, difference_Plan_Percentage: "6.67", difference_Plan_Amount: "100" },
                December: { plan: 150, fackt: 140, difference_Plan_Percentage: "6.67", difference_Plan_Amount: "100" },
            },
            plan_TotalSum: "866,007",
            fackt_TotalSum: "846,963",
            percentageSeparateTotal: "56.6",
            amountSeparateTotal: "20963",
            subRows: [
              {
                id: " 1.1.1",
                name: "Sub Sub Row 1.1.1",
                months: {
                    January: { plan: 200, fackt: 104, difference_Plan_Percentage: "18", difference_Plan_Amount: "37600" }, 
                    // plan: 200,=> bu tanlangan kichik yil qiymati , fackt: 104,=> bu user tomonidan katta yil qiymati joylanadi, difference_Plan_Percentage: "18",=> tanlangan kichikj va katta yillar orasidagi farq foiz qiymat chiqarish uchun   //
                    February: { plan: 150, fackt: 140, difference_Plan_Percentage: "6.67", difference_Plan_Amount: "100" },
                    March: { plan: 150, fackt: 140, difference_Plan_Percentage: "6.67", difference_Plan_Amount: "100" },
                    April: { plan: 150, fackt: 140, difference_Plan_Percentage: "6.67", difference_Plan_Amount: "100" },
                    May: { plan: 150, fackt: 140, difference_Plan_Percentage: "6.67", difference_Plan_Amount: "100" },
                    June: { plan: 150, fackt: 140, difference_Plan_Percentage: "6.67", difference_Plan_Amount: "100" },
                    July: { plan: 150, fackt: 140, difference_Plan_Percentage: "6.67", difference_Plan_Amount: "100" },
                    August: { plan: 150, secondYear: 140, difference_Plan_Percentage: "6.67", difference_Plan_Amount: "100" },
                    September: { plan: 150, fackt: 140, difference_Plan_Percentage: "6.67", difference_Plan_Amount: "100" },
                    October: { plan: 150, fackt: 140, difference_Plan_Percentage: "6.67", difference_Plan_Amount: "100" },
                    November: { plan: 150, fackt: 140, difference_Plan_Percentage: "6.67", difference_Plan_Amount: "100" },
                    December: { plan: 150, fackt: 140, difference_Plan_Percentage: "6.67", difference_Plan_Amount: "100" },
                },
                plan_TotalSum: "866,007",
                fackt_TotalSum: "846,963",
                percentageSeparateTotal: "56.6",
                amountSeparateTotal: "20963",
                subRows: [
                  {
                    id: " 1.1.1.1",
                    name: "Sub Sub Sub Row 1.1.1",
                    months: {
                        January: { plan: 200, fackt: 104, difference_Plan_Percentage: "18", difference_Plan_Amount: "37600" }, 
                        // plan: 200,=> bu tanlangan kichik yil qiymati , fackt: 104,=> bu user tomonidan katta yil qiymati joylanadi, difference_Plan_Percentage: "18",=> tanlangan kichikj va katta yillar orasidagi farq foiz qiymat chiqarish uchun   //
                        February: { plan: 150, fackt: 140, difference_Plan_Percentage: "6.67", difference_Plan_Amount: "100" },
                        March: { plan: 150, fackt: 140, difference_Plan_Percentage: "6.67", difference_Plan_Amount: "100" },
                        April: { plan: 150, fackt: 140, difference_Plan_Percentage: "6.67", difference_Plan_Amount: "100" },
                        May: { plan: 150, fackt: 140, difference_Plan_Percentage: "6.67", difference_Plan_Amount: "100" },
                        June: { plan: 150, fackt: 140, difference_Plan_Percentage: "6.67", difference_Plan_Amount: "100" },
                        July: { plan: 150, fackt: 140, difference_Plan_Percentage: "6.67", difference_Plan_Amount: "100" },
                        August: { plan: 150, secondYear: 140, difference_Plan_Percentage: "6.67", difference_Plan_Amount: "100" },
                        September: { plan: 150, fackt: 140, difference_Plan_Percentage: "6.67", difference_Plan_Amount: "100" },
                        October: { plan: 150, fackt: 140, difference_Plan_Percentage: "6.67", difference_Plan_Amount: "100" },
                        November: { plan: 150, fackt: 140, difference_Plan_Percentage: "6.67", difference_Plan_Amount: "100" },
                        December: { plan: 150, fackt: 140, difference_Plan_Percentage: "6.67", difference_Plan_Amount: "100" },
                    },
                    plan_TotalSum: "866,007",
                    fackt_TotalSum: "846,963",
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
          newfirstMonth: 700000000, // ==>  tanlangan kichik yilning 1-oydagi qiymatlari to'liq yig'indisi //
          newsecondMonth: 104, // ==>  tanlangan katta yilning 1-oydagi qiymatlari to'liq yig'indisi //
          difference_Plan_PercentageTotalMonth: "18", // ==> 1-oydagi  tanlangan katta va kichik yilning o'zaro nisbatidan olingan foiz  //
          difference_Plan_AmountTotalMonth: "37600", // ==> 1-oydagi  tanlangan katta va kichik yilning o'zaro ayirmasidan olingan summa   //
        },
        February: {
          newfirstMonth: 150,// ==>  tanlangan kichik yilning 2-oydagi qiymatlari to'liq yig'indisi //
          newsecondMonth: 140, // ==>  tanlangan katta yilning 2-oydagi qiymatlari to'liq yig'indisi //
          difference_Plan_PercentageTotalMonth: "6.67", // ==> 2-oydagi  tanlangan katta va kichik yilning o'zaro nisbatidan olingan foiz  //
          difference_Plan_AmountTotalMonth: "100", // ==> 2-oydagi  tanlangan katta va kichik yilning o'zaro ayirmasidan olingan summa   //
        },
        March: {
          newfirstMonth: 150, // ==>  tanlangan kichik yilning 3-oydagi qiymatlari to'liq yig'indisi //
          newsecondMonth: 140, // ==>  tanlangan katta yilning 3-oydagi qiymatlari to'liq yig'indisi //
          difference_Plan_PercentageTotalMonth: "6.67", // ==> 3-oydagi  tanlangan katta va kichik yilning o'zaro nisbatidan olingan foiz  //
          difference_Plan_AmountTotalMonth: "100", // ==> 3-oydagi  tanlangan katta va kichik yilning o'zaro ayirmasidan olingan summa   //
        },
        April: {
          newfirstMonth: 150,
          newsecondMonth: 140,
          difference_Plan_PercentageTotalMonth: "6.67",
          difference_Plan_AmountTotalMonth: "100",
        },
        May: {
          newfirstMonth: 150,
          newsecondMonth: 140,
          difference_Plan_PercentageTotalMonth: "6.67",
          difference_Plan_AmountTotalMonth: "100",
        },
        June: {
          newfirstMonth: 150,
          newsecondMonth: 140,
          difference_Plan_PercentageTotalMonth: "6.67",
          difference_Plan_AmountTotalMonth: "100",
        },
        July: {
          newfirstMonth: 150,
          newsecondMonth: 140,
          difference_Plan_PercentageTotalMonth: "6.67",
          difference_Plan_AmountTotalMonth: "100",
        },
        August: {
          newfirstMonth: 150,
          newsecondMonth: 140,
          difference_Plan_PercentageTotalMonth: "6.67",
          difference_Plan_AmountTotalMonth: "100",
        },
        September: {
          newfirstMonth: 150,
          newsecondMonth: 140,
          difference_Plan_PercentageTotalMonth: "6.67",
          difference_Plan_AmountTotalMonth: "100",
        },
        October: {
          newfirstMonth: 150,
          newsecondMonth: 140,
          difference_Plan_PercentageTotalMonth: "6.67",
          difference_Plan_AmountTotalMonth: "100",
        },
        November: {
          newfirstMonth: 150,
          newsecondMonth: 140,
          difference_Plan_PercentageTotalMonth: "6.67",
          difference_Plan_AmountTotalMonth: "100",
        },
        December: {
          newfirstMonth: 150,
          newsecondMonth: 140,
          difference_Plan_PercentageTotalMonth: "6.67",
          difference_Plan_AmountTotalMonth: "100",
        },
      },
      firstYearTotalMonthSum: "866,007", // ==> 1-yilning(kichik yil) barcha oylardagi qiymatlari yig'indisi summa //
      secondYearTotalMonthSum: "846,963", // ==> 2-yilning(katta yil) barcha oylardagi qiymatlari yig'indisi summa //
      percentageSeparateTotalMonth: "46.6",// ==> 1-yilning(kichik yil)  va 2-yilning(katta yil) barcha oylardagi qiymatlari nisbati foiz qiymatda //
      amountSeparateTotalMonth: "10963", // ==> 1-yilning(kichik yil)  va 2-yilning(katta yil) barcha oylardagi qiymatlari ayirmasi summa qiymatda //
    }
    ],
  };

export default secondtableData;