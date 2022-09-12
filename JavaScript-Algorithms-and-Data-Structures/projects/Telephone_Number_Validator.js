function telephoneCheck(str) {
    const phoneRegex = /^1? ?(( ?\d{3}[- ]*)|(\( ?\d{3}[- ]*\) *))\d{3}[- ]?\d{4}$/;
        return phoneRegex.test(str)
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