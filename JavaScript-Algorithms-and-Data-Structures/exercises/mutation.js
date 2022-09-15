// Solution 1

function mutation(arr) {
    const newArr = arr[0].toUpperCase();
    const newSecondArr = arr[1].toUpperCase();
    for (let i = 0; i < newSecondArr.length; i++) {
      if (newArr.indexOf(newSecondArr[i]) < 0){ 
      return false;
      }
    }
    return true;
  }
  
  mutation(["hello", "hey"]);

// Solution 2

function mutation(arr) {
    return arr[1]
      .toLowerCase()
      .split("")
      .every(function(letter) {
        return arr[0].toLowerCase().indexOf(letter) !== -1;
      });
  }

// Solution 3

function mutation([ target, test ], i = 0) {
    target = target.toLowerCase();
    test = test.toLowerCase();
    return i >= test.length
      ? true
      : !target.includes(test[i])
        ? false
        : mutation([ target, test ], i + 1);
  }