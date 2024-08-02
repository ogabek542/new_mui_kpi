const newtextData = [
    {
      date: "01.08.2024",
      profitable_indicators: {
        roa: "21%",
        roe: "23%",
        cir: "28%",
        cor: "35%",
        npl: "15%",
        nps: "45%",
        mau: "93%",
        nim: "78%",
      },
      bank_assets: [
        {
          plan: "4000",
          fact: "2000",
        },
        {
          plan: "3000",
          fact: "1000",
        },
        {
          plan: "5000",
          fact: "2500",
        },
      ],
      bank_liabilities: [
        {
          plan: "8000",
          fact: "7000",
        },
        {
          plan: "9000",
          fact: "1700",
        },
        {
          plan: "4000",
          fact: "5500",
        },
      ],
      loan_portfolio: [
        {
          percentage: "90",
          plan: "8000",
          fact: "7000",
        },
        {
          percentage: "125",
          plan: "9000",
          fact: "4700",
        },
        {
          percentage: "140",
          plan: "4000",
          fact: "3500",
        },
      ],
      soft_income: [
        {
          plan: "8000",
          fact: "7000",
        },
        {
          plan: "6000",
          fact: "4700",
        },
        {
          plan: "11000",
          fact: "7500",
        },
      ],
      digital_indicators: {
        roa: "41%",
        roe: "83%",
        cir: "38%",
        cor: "65%",
        npl: "35%",
        nps: "95%",
        mau: "33%",
        nim: "58%",
      },
    },
    {
      date: "02.08.2024",
      profitable_indicators: {
        roa: "17%",
        roe: "73%",
        cir: "58%",
        cor: "65%",
        npl: "85%",
        nps: "25%",
        mau: "33%",
        nim: "18%",
      },
      bank_assets: [
        {
          plan: "9000",
          fact: "4000",
        },
        {
          plan: "7000",
          fact: "6000",
        },
        {
          plan: "8000",
          fact: "6500",
        },
      ],
      bank_liabilities: [
        {
          plan: "5000",
          fact: "3000",
        },
        {
          plan: "3000",
          fact: "1700",
        },
        {
          plan: "8000",
          fact: "3500",
        },
      ],
      loan_portfolio: [
        {
          percentage: "110",
          plan: "6000",
          fact: "2000",
        },
        {
          percentage: "100",
          plan: "9000",
          fact: "6500",
        },
        {
          percentage: "15",
          plan: "8000",
          fact: "7500",
        },
      ],
      soft_income: [
        {
          plan: "6000",
          fact: "5000",
        },
        {
          plan: "5000",
          fact: "4700",
        },
        {
          plan: "5000",
          fact: "4500",
        },
      ],
      digital_indicators: {
        roa: "51%",
        roe: "43%",
        cir: "98%",
        cor: "25%",
        npl: "95%",
        nps: "75%",
        mau: "83%",
        nim: "28%",
      },
    },
    {
      date: "03.08.2024",
      profitable_indicators: {
        roa: "21%",
        roe: "23%",
        cir: "28%",
        cor: "35%",
        npl: "15%",
        nps: "45%",
        mau: "93%",
        nim: "78%",
      },
      bank_assets: [
        {
          plan: "4000",
          fact: "2000",
        },
        {
          plan: "3000",
          fact: "1000",
        },
        {
          plan: "5000",
          fact: "2500",
        },
      ],
      bank_liabilities: [
        {
          plan: "8000",
          fact: "7000",
        },
        {
          plan: "9000",
          fact: "1700",
        },
        {
          plan: "4000",
          fact: "5500",
        },
      ],
      loan_portfolio: [
        {
          percentage: "90",
          plan: "8000",
          fact: "7000",
        },
        {
          percentage: "125",
          plan: "9000",
          fact: "4700",
        },
        {
          percentage: "140",
          plan: "4000",
          fact: "3500",
        },
      ],
      soft_income: [
        {
          plan: "8000",
          fact: "7000",
        },
        {
          plan: "6000",
          fact: "4700",
        },
        {
          plan: "11000",
          fact: "7500",
        },
      ],
      digital_indicators: {
        roa: "41%",
        roe: "83%",
        cir: "38%",
        cor: "65%",
        npl: "35%",
        nps: "95%",
        mau: "33%",
        nim: "58%",
      },
    },
    {
      date: "04.08.2024",
      profitable_indicators: {
        roa: "17%",
        roe: "73%",
        cir: "58%",
        cor: "65%",
        npl: "85%",
        nps: "25%",
        mau: "33%",
        nim: "18%",
      },
      bank_assets: [
        {
          plan: "9000",
          fact: "4000",
        },
        {
          plan: "7000",
          fact: "6000",
        },
        {
          plan: "8000",
          fact: "6500",
        },
      ],
      bank_liabilities: [
        {
          plan: "5000",
          fact: "3000",
        },
        {
          plan: "3000",
          fact: "1700",
        },
        {
          plan: "8000",
          fact: "3500",
        },
      ],
      loan_portfolio: [
        {
          percentage: "110",
          plan: "6000",
          fact: "2000",
        },
        {
          percentage: "100",
          plan: "9000",
          fact: "6500",
        },
        {
          percentage: "15",
          plan: "8000",
          fact: "7500",
        },
      ],
      soft_income: [
        {
          plan: "6000",
          fact: "5000",
        },
        {
          plan: "5000",
          fact: "4700",
        },
        {
          plan: "5000",
          fact: "4500",
        },
      ],
      digital_indicators: {
        roa: "51%",
        roe: "43%",
        cir: "98%",
        cor: "25%",
        npl: "95%",
        nps: "75%",
        mau: "83%",
        nim: "28%",
      },
    },
  ];
  // add 0 nuber before day date exp:date: "08.07.2024", beacuse it can make bug
  export default newtextData;