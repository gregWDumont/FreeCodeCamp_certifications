// Solution 1

function bouncer(arr) {
    let newArray = [];
    for (let i = 0; i < arr.length; i++) {
      if (arr[i]) newArray.push(arr[i]);
    }
    return newArray;
  }

// Solution 2

function bouncer(arr) {
    return arr.filter(Boolean);
  }