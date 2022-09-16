// Solution 1

function largestOfFour(arr) {
    let result = [];
    for (let i = 0; i < arr.length; i++) {
      let largestArr = arr[i][0];
      for (let j = 0; j < arr[i].length; j++) {
        if (arr[i][j] > largestArr){
        largestArr = arr[i][j];
        }
      }
    result[i] = largestArr;
    }
    return result;
  }
  
  largestOfFour([[4, 5, 1, 3], [13, 27, 18, 26], [32, 35, 37, 39], [1000, 1001, 857, 1]]);

// Solution 2

function largestOfFour(arr) {
    return arr.map(function(group) {
      return group.reduce(function(prev, current) {
        return current > prev ? current : prev;
      });
    });
  }

// Solution 3

function largestOfFour(arr) {
    return arr.map(Function.apply.bind(Math.max, null));
  }

// Solution 4

function largestOfFour(arr, finalArr = []) {
    return !arr.length
      ? finalArr
      : largestOfFour(arr.slice(1), finalArr.concat(Math.max(...arr[0])))
  }