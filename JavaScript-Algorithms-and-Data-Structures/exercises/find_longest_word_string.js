// Solution 1

function findLongestWordLength(str) {
    let words = str.split(" ")
    let maxLength = 0;
    for (let i = 0; i < words.length; i++) {
      if (words[i].length > maxLength) {
        maxLength = words[i].length;
      }
      return maxLength
    }
  
    return str.length;
  }
  
  findLongestWordLength("The quick brown fox jumped over the lazy dog");

// Solution 2
  function findLongestWordLength(s) {
    return s.split(' ')
      .reduce(function(longest, word) {
        return Math.max(longest, word.length)
      }, 0);
  }

// Solution 3

  function findLongestWordLength(str) {
    return Math.max(...str.split(" ").map(word => word.length));
  }

// Solution 4 

  function findLongestWordLength(str) {
    const words = str.split(" ");
  
    if (words.length == 1) {
      return words[0].length;
    }

    return Math.max(
      words[0].length,
      findLongestWordLength(words.slice(1).join(" "))
    );
  }

// Solution 5 

function findLongestWordLength(str) {
    let longestLength = 0;
    let currentLength = 0;
    
    for (let i = 0; i < str.length; i++) {
      if (str[i] === " ") {
        if (currentLength > longestLength) longestLength = currentLength;
        currentLength = 0;
      } else {
        currentLength++;
      }
    }
    if (currentLength > longestLength) {
      longestLength = currentLength;
    }
    
    return longestLength;
    }

