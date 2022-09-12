function telephoneCheck(str) {
    let result;
    const phoneRegex = /(\d{3}-?\s?\d{3}-?\s?\d{4}\s?)?(x\d{4})?/;
    if (result = str.match(phoneRegex)) {
        return true
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