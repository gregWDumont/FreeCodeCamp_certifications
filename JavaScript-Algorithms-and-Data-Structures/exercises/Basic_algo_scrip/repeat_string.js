// Solution 1

function repeatStringNumTimes(str, num) {
    let result = "";
    if (num < 0) {
      return result;
    }
    for (let i = 0; i < num; i++) {
      result += str;
    }
    return result
  }
  
  repeatStringNumTimes("abc", 3);

// Solution 2

function repeatStringNumTimes(str, num) {
    if (num < 1) {
      return "";
    } else {
      return str + repeatStringNumTimes(str, num - 1);
    }
  }

// Solution 3

function repeatStringNumTimes(str, num) {
    return num > 0 ? str + repeatStringNumTimes(str, num - 1) : '';
  }