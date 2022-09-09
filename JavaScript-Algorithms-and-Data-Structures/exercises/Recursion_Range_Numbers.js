// 1st solution:

function rangeOfNumbers(startNum, endNum) {
    if (endNum < startNum) {
      return [];
    } else {
      const numbers = rangeOfNumbers(startNum, endNum - 1);
      numbers.push(endNum);
      return numbers;
    }
  }

// 2nd solution:

function rangeOfNumbers(startNum, endNum) {
    return endNum < startNum
      ? []
      : rangeOfNumbers(startNum, endNum - 1).concat(endNum);
  }  

// 3rd solution:

function rangeOfNumbers(startNum, endNum) {
    return endNum < startNum
      ? []
      : [...rangeOfNumbers(startNum, endNum - 1), endNum];
  }
  