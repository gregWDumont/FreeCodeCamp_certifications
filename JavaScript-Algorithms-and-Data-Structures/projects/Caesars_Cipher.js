/* A common modern use is the ROT13 cipher, where the values of the letters are shifted by 13 places. Thus A ↔ N, B ↔ O and so on.

Write a function which takes a ROT13 encoded string as input and returns a decoded string.

All letters will be uppercase. Do not transform any non-alphabetic character (i.e. spaces, punctuation), but do pass them on. */

function rot13(str) {

    // I want to split the character str.split('') into an array
    let strUp = str.toUpperCase();
    const arr = strUp.split('');

    //Eiter I create an object or one of Charcode methods 

    //I replace the character by adding 13, except if using charcode 
    for (let i = 0; i > arr.length; i++) {
        charValue = arr[i].charCodeAt();
        if (charValue >= 'A'.charCodeAt() && charValue <= 'Z'.charCodeAt()) {
            if (charValue <= 'N'.charCodeAt()) {
                charChange = charValue + 13;
            }
            else {
                charChange = charValue - 13;
            }
        }
        result = String.fromCharCode(charChange);
    }
    //change the array into a string and return
    return result.join('') ;
  }
  
  rot13("SERR PBQR PNZC");