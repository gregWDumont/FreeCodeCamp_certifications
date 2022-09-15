function telephoneCheck(str) {
    const phoneRegex = /^1? ?(( ?\d{3}[- ]*)|(\( ?\d{3}[- ]*\) *))\d{3}[- ]?\d{4}$/;
        return phoneRegex.test(str)
  }
  
  telephoneCheck("555-555-5555");
