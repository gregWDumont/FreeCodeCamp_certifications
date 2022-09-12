function telephoneCheck(str) {
    let result = true;
    const phoneRegex = /(\d{3}-?\s?\d{3}-?\s?\d{4}\s?)?(x\d{4})?/;
    const phoneRegexAlt = /(\(\d{3}-?\)\s?\d{3}-?\s?\d{4}\s?)?(x\d{4})?/;
    if (result = str.match(phoneRegex) || result = str.match(phoneRegexAlt)) {
        return result
    }
  }
  
  telephoneCheck("555-555-5555");

/* 

The following are examples of valid formats for US numbers:

    555-555-5555
    (555)555-5555
    (555) 555-5555
    555 555 5555
    5555555555
    1 555 555 5555

*/