// Solution 1

const squareList = arr => {
    // Only change code below this line
    return arr
    .filter(item => item > 0 && item % parseInt(item) === 0)
    .map(item => item * item)
    // Only change code above this line
  };
  
  const squaredIntegers = squareList([-3, 4.8, 5, 3, -3.2]);
  console.log(squaredIntegers);

// Solution 2

const squareList = arr => {
    return arr.reduce((sqrIntegers, num) => {
      return Number.isInteger(num) && num > 0
        ? sqrIntegers.concat(num * num)
        : sqrIntegers;
    }, []);
  };