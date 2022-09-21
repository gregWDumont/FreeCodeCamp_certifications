// Solution 1

function confirmEnding(str, target) {
  
    return str.slice(str.length - target.length) === target;
  }
  
  confirmEnding("He has to give me a new name", "name");

// Solution 2

function confirmEnding(str, target) {
  
    let re = new RegExp(target + "$", "i");
  
    return re.test(str);
  }
  
  console.log(confirmEnding("Bastian", "n"));


// Solution 3

function confirmEnding(str, target) {
    return str.slice(-target.length) === target
  }
  
  confirmEnding("Bastian", "n");