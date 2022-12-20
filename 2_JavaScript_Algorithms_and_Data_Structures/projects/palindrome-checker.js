function palindrome(str) {
    const cleanString = str.toUpperCase().match(/[A-Z0-9]/g);

    if (cleanString.join('') === cleanString.reverse().join('')) {
      return true;
    }
    else {
      return false
    };
}

palindrome("eye");