function convertToRoman(num) {
   
    const roman = ['M', 'CM', 'D', 'CD', 'C', 'XC', 'L', 'XL', 'X', 'IX', 'V', 'IV', 'I'];
    const numeral = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1];
    
    const romanNumeral = Object.assign(...roman.map((k, i) => ({[k]: numeral[i]})));

    let result = ""

    for (const key in romanNumeral) {
        const numberValue = romanNumeral[key];

        while (numberValue <= num) {
            num -= numberValue;
            result += key;
        }
    }

    return result;

}
   
   convertToRoman(36);