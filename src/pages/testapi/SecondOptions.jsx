
const setSelectedSecondMap = {
    // NBU//
    1: [{ }],
    // Toshkent shahri //
    2: [
      { title: "Bosh ofis" },
      { title: "Abusaxiy BXO" },
      { title: "Atlas NBU BXO" },
      { title: "G‘alaba BXO" },
      { title: "Mirobod plaza BXO" },
      { title: "Navro‘z BXO" },
      { title: "Texnopark BXO" },
      { title: "Xumo BXO" },
      { title: "Shayxontohur BXO" },
      { title: "Yangi Sergeli BXO" },
      { title: "Akademiya BXM" },
      { title: "Bektemir BXM" },
      { title: "Bosh amaliyot BXM" },
      { title: "Markaziy amaliyot BXM" },
      { title: "Mirzo-Ulug‘bek BXM" },
      { title: "Olmazor BXM" },
      { title: "Sayohat BXM" },
      { title: "Sebzor amaliyot BXM" },
      { title: "Sergeli BXM" },
      { title: "Uchtepa BXM" },
      { title: "Yunusobod BXM" },
      { title: "Yakkasaroy BXM" },
      { title: "Yangiobod BXM" },
      { title: "Yashnobod BXM" },
    ],
    // Andijon viloyati //
    3: [
      { title: "Andijon amaliyot BXM" },
      { title: "Asaka BXM" },
      { title: "Izboskan BXO" },
      { title: "Qo‘rg‘ontepa BXO" },
      { title: "Marhamat BXM" },
      { title: "Paxtaobod BXO" },
      { title: "Shaxrixon BXO" },
    ],
    // Buxoro viloyati //
    4: [
      { title: "Ark BXO" },
      { title: "Buxoro amaliyot BXM" },
      { title: "Buxoro shahar BXO" },
      { title: "Vobkent BXO" },
      { title: "G‘ijduvon BXM" },
      { title: "Kogon BXM" },
      { title: "Qorako‘l BXM" },
      { title: "Qorovulbozor BXO" },
      { title: "Naqshband BXO" },
      { title: "Romitan BXM" },
      { title: "Shofirkon BXO" },
    ],
    // Farg‘ona viloyati //
    5: [
      { title: "Beshariq BXM" },
      { title: "Buvayda BXO" },
      { title: "Quva BXM" },
      { title: "Quvasoy BXO" },
      { title: "Qo‘qon BXM" },
      { title: "Rishton BXM" },
      { title: "Farg‘ona amaliyot BXM" },
      { title: "Marg‘ilon BXO" },
    ],
    // Jizzax viloyati //
    6: [
      { title: "Jizzax amaliyot BXM" },
      { title: "Industrial BXM" },
      { title: "Mirzacho‘l BXM" },
      { title: "Paxtakor BXO" },
    ],
    // Namangan viloyati //
    7: [
      { title: "Kosonsoy BXO" },
      { title: "Namangan amaliyot BXM" },
      { title: "Turaqo‘rg‘on BXO" },
      { title: "Uychi BXM" },
      { title: "Uchqo‘rg‘on BXM" },
      { title: "Chortoq BXM" },
      { title: "Chust BXO" },
    ],
    // Navoiy viloyati //
    8: [
      { title: "Zarafshon BXM" },
      { title: "Qiziltepa BXM" },
      { title: "Malikrabod BXM" },
      { title: "Navoiy amaliyot BXM" },
      { title: "Nurota BXO" },
      { title: "Uchquduq BXM" },
    ],
    // Qashqadaryo viloyati //
    9: [
      { title: "G‘uzor BXO" },
      { title: "Qarshi amaliyot BXM" },
      { title: "Muborak BXO" },
      { title: "Shahrisabz BXM" },
      { title: "Yanginishon BXO" },
    ],
    // Samarqand viloyati //
    10: [
      { title: "Bulung‘ur BXO" },
      { title: "Jomboy BXM" },
      { title: "Zarafshon BXO" },
      { title: "Kattaqo‘rg‘on BXO" },
      { title: "Qorasuv BXO" },
      { title: "Nurobod BXO" },
      { title: "Payariq BXO" },
      { title: "Pastdarg‘om BXM" },
      { title: "Registon BXM" },
      { title: "Samarqand amaliyot BXM" },
      { title: "Urgut BXM" },
    ],
    // Sirdaryo viloyati //
    11: [
      { title: "Guliston amaliyot BXM" },
      { title: "Oqoltin BXO" },
    ],
    // Surxondaryo viloyati //
    12: [
      { title: "Denov BXM" },
      { title: "Qumqo‘rg‘on BXM" },
      { title: "Termiz amaliyot BXM" },
      { title: "Jarqo‘rg‘on BXO" },
      { title: "Sherobod BXO" },
    ],
    // Toshkent viloyati //
    13: [
      { title: "Angren BXM" },
      { title: "Bekobod BXM" },
      { title: "G‘azalkent BXO" },
      { title: "Nurafshon amaliyot BXM" },
      { title: "Olmaliq BXO" },
      { title: "Toshkent shahar BXO" },
      { title: "Chirchiq BXO" },
      { title: "Yangiyo‘l BXM" },
    ],
    // Xorazm viloyati //
    14: [
      { title: "Gurlan BXO" },
      { title: "Karvon BXO" },
      { title: "Xazoras BXM" },
      { title: "Xiva BXO" },
      { title: "Xonqa BXM" },
      { title: "Xorazm amaliyot BXM" },
      { title: "Shovot BXM" },
      { title: "Yangiariq BXO" },
      { title: "Qo‘shkupir BXM" },
    ],
    // Qoraqalpog‘iston Respublikasi //
    15: [
      { title: "Qo‘ng‘irot BXM" },
      { title: "Mang‘it BXO" },
      { title: "Nukus amaliyot BXM" },
      { title: "To‘rtko‘l BXM" },
      { title: "Xo‘jayli BXO" },
      { title: "Chimboy BXO" },
    ],
    16: [{ title: "Mirobod" }],
  };

  export default  setSelectedSecondMap


  
// filials section //
// const setSelectedSecondMap = {
//   // NBU//
//   1: [{ title: "Respublika" }],
//   // Toshkent shahri //
//   2: [
//     { title: "Bosh ofis" },
//     { title: "Abusaxiy BXO" },
//     { title: "Atlas NBU BXO" },
//     { title: "G‘alaba BXO" },
//     { title: "Mirobod plaza BXO" },
//     { title: "Navro‘z BXO" },
//     { title: "Texnopark BXO" },
//     { title: "Xumo BXO" },
//     { title: "Shayxontohur BXO" },
//     { title: "Yangi Sergeli BXO" },
//     { title: "Akademiya BXM" },
//     { title: "Bektemir BXM" },
//     { title: "Bosh amaliyot BXM" },
//     { title: "Markaziy amaliyot BXM" },
//     { title: "Mirzo-Ulug‘bek BXM" },
//     { title: "Olmazor BXM" },
//     { title: "Sayohat BXM" },
//     { title: "Sebzor amaliyot BXM" },
//     { title: "Sergeli BXM" },
//     { title: "Uchtepa BXM" },
//     { title: "Yunusobod BXM" },
//     { title: "Yakkasaroy BXM" },
//     { title: "Yangiobod BXM" },
//     { title: "Yashnobod BXM" },
//   ],
//   // Andijon viloyati //
//   3: [
//     { title: "Andijon amaliyot BXM" },
//     { title: "Asaka BXM" },
//     { title: "Izboskan BXO" },
//     { title: "Qo‘rg‘ontepa BXO" },
//     { title: "Marhamat BXM" },
//     { title: "Paxtaobod BXO" },
//     { title: "Shaxrixon BXO" },
//   ],
//   // Buxoro viloyati //
//   4: [
//     { title: "Ark BXO" },
//     { title: "Buxoro amaliyot BXM" },
//     { title: "Buxoro shahar BXO" },
//     { title: "Vobkent BXO" },
//     { title: "G‘ijduvon BXM" },
//     { title: "Kogon BXM" },
//     { title: "Qorako‘l BXM" },
//     { title: "Qorovulbozor BXO" },
//     { title: "Naqshband BXO" },
//     { title: "Romitan BXM" },
//     { title: "Shofirkon BXO" },
//   ],
//   // Farg‘ona viloyati //
//   5: [
//     { title: "Beshariq BXM" },
//     { title: "Buvayda BXO" },
//     { title: "Quva BXM" },
//     { title: "Quvasoy BXO" },
//     { title: "Qo‘qon BXM" },
//     { title: "Rishton BXM" },
//     { title: "Farg‘ona amaliyot BXM" },
//     { title: "Marg‘ilon BXO" },
//   ],
//   // Jizzax viloyati //
//   6: [
//     { title: "Jizzax amaliyot BXM" },
//     { title: "Industrial BXM" },
//     { title: "Mirzacho‘l BXM" },
//     { title: "Paxtakor BXO" },
//   ],
//   // Namangan viloyati //
//   7: [
//     { title: "Kosonsoy BXO" },
//     { title: "Namangan amaliyot BXM" },
//     { title: "Turaqo‘rg‘on BXO" },
//     { title: "Uychi BXM" },
//     { title: "Uchqo‘rg‘on BXM" },
//     { title: "Chortoq BXM" },
//     { title: "Chust BXO" },
//   ],
//   // Navoiy viloyati //
//   8: [
//     { title: "Zarafshon BXM" },
//     { title: "Qiziltepa BXM" },
//     { title: "Malikrabod BXM" },
//     { title: "Navoiy amaliyot BXM" },
//     { title: "Nurota BXO" },
//     { title: "Uchquduq BXM" },
//   ],
//   // Qashqadaryo viloyati //
//   9: [
//     { title: "G‘uzor BXO" },
//     { title: "Qarshi amaliyot BXM" },
//     { title: "Muborak BXO" },
//     { title: "Shahrisabz BXM" },
//     { title: "Yanginishon BXO" },
//   ],
//   // Samarqand viloyati //
//   10: [
//     { title: "Bulung‘ur BXO" },
//     { title: "Jomboy BXM" },
//     { title: "Zarafshon BXO" },
//     { title: "Kattaqo‘rg‘on BXO" },
//     { title: "Qorasuv BXO" },
//     { title: "Nurobod BXO" },
//     { title: "Payariq BXO" },
//     { title: "Pastdarg‘om BXM" },
//     { title: "Registon BXM" },
//     { title: "Samarqand amaliyot BXM" },
//     { title: "Urgut BXM" },
//   ],
//   // Sirdaryo viloyati //
//   11: [
//     { title: "Guliston amaliyot BXM" },
//     { title: "Oqoltin BXO" },
//   ],
//   // Surxondaryo viloyati //
//   12: [
//     { title: "Denov BXM" },
//     { title: "Qumqo‘rg‘on BXM" },
//     { title: "Termiz amaliyot BXM" },
//     { title: "Jarqo‘rg‘on BXO" },
//     { title: "Sherobod BXO" },
//   ],
//   // Toshkent viloyati //
//   13: [
//     { title: "Angren BXM" },
//     { title: "Bekobod BXM" },
//     { title: "G‘azalkent BXO" },
//     { title: "Nurafshon amaliyot BXM" },
//     { title: "Olmaliq BXO" },
//     { title: "Toshkent shahar BXO" },
//     { title: "Chirchiq BXO" },
//     { title: "Yangiyo‘l BXM" },
//   ],
//   // Xorazm viloyati //
//   14: [
//     { title: "Gurlan BXO" },
//     { title: "Karvon BXO" },
//     { title: "Xazoras BXM" },
//     { title: "Xiva BXO" },
//     { title: "Xonqa BXM" },
//     { title: "Xorazm amaliyot BXM" },
//     { title: "Shovot BXM" },
//     { title: "Yangiariq BXO" },
//     { title: "Qo‘shkupir BXM" },
//   ],
//   // Qoraqalpog‘iston Respublikasi //
//   15: [
//     { title: "Qo‘ng‘irot BXM" },
//     { title: "Mang‘it BXO" },
//     { title: "Nukus amaliyot BXM" },
//     { title: "To‘rtko‘l BXM" },
//     { title: "Xo‘jayli BXO" },
//     { title: "Chimboy BXO" },
//   ],
//   16: [{ title: "Mirobod" }],
// };