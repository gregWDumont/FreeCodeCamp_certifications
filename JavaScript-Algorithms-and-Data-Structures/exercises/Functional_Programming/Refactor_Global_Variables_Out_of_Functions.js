// The global variable
const bookList = ["The Hound of the Baskervilles", "On The Electrodynamics of Moving Bodies", "Philosophiæ Naturalis Principia Mathematica", "Disquisitiones Arithmeticae"];

// Change code below this line
function add(arr, bookName) {
  let bookListChanged = [...arr];
  bookListChanged.push(bookName);
  return bookListChanged;
  
  // Change code above this line
}

// Change code below this line
function remove(arr, bookName) {
  let bookListChanged = [...arr];
  if (bookListChanged.indexOf(bookName) >= 0) {

    bookListChanged.splice(bookListChanged.indexOf(bookName), 1);
    return bookListChanged;

    // Change code above this line
    }
}