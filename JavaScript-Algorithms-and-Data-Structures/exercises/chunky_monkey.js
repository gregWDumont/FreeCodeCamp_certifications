// Solution 1

function chunkArrayInGroups(arr, size) {
    let result = []; 
    for (let i = 0; i < arr.length; i += size){
        result.push(arr.slice(i, i + size));
        }
      return result;
    }
  
  
  chunkArrayInGroups(["a", "b", "c", "d"], 2);

// Solution 2

function chunkArrayInGroups(arr, size) {
    let temp = [];
    let result = [];
  
    for (let a = 0; a < arr.length; a++) {
      if (a % size !== size - 1) temp.push(arr[a]);
      else {
        temp.push(arr[a]);
        result.push(temp);
        temp = [];
      }
    }
  
    if (temp.length !== 0) result.push(temp);
    return result;
  }

// Solution 3 

function chunkArrayInGroups(arr, size) {
    let newArr = [];
    let i = 0;
  
    while (i < arr.length) {
      newArr.push(arr.slice(i, i + size));
      i += size;
    }
    return newArr;
  }
  chunkArrayInGroups(["a", "b", "c", "d"], 2);

// Solution 4 

function chunkArrayInGroups(arr, size) {
    let newArr = [];
    while (arr.length > 0) {
      newArr.push(arr.splice(0, size));
    }
    return newArr;
  }

// Solution 5

function chunkArrayInGroups(arr, size) {
    if (arr.length <= size) {
      return [arr];
    } else {
      return [arr.slice(0, size)].concat(
        chunkArrayInGroups(arr.slice(size), size)
      );
    }
  }