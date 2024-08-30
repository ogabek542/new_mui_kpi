const newAllData = [
    {
      name: "НБУ",
      sana: [
        {
          date: "28.08.2024", 
          nointerestIncome: {
            planData: [1901089,76412,715558,690117],// Бес % Доходы ni planini qiymati ketma ketlik asoasida : "Комиссионные доходы","Прибыль в иностранной валюте","Прибыль и дивиденды от инвестиций","Другие беспроцентные доходы", // 
            factData: [1299604,7815,459361,366345],//  Бес % Доходы ni fakitini qiymati yuqorda planda berilgan nomlar  ketma ketligi asoasida // 
          },
      
        },
        {
          date: "29.08.2024",
         
          nointerestIncome: {
            planData: [1301089,6412,175558,200117],
            factData: [1499604,8015,189361,266345],
          },
        },
        {
          date:"30.08.2024",
          nointerestIncome: {
            planData: [1801089,7197412,555558,990117],
            factData: [1999604,1238015,809361,816345],
          },
        },
      ]
    },
  
  ];
  
  export default newAllData;
  