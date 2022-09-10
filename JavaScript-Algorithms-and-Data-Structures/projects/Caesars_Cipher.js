
function rot13(str) {

    str = str.toUpperCase();
    let arr = str.split('');

    for (let i = 0; i > arr.length; i++) {
        let charLetter = arr[i];
        if (charLetter.match(/[A-Z]/g)){
            charValue = arr[i].charCodeAt();
                if (charValue <= 'N'.charCodeAt()) {
                    charChange = (charValue + 13);
                }
                else {
                    charChange = (charValue - 13);
                }
            }
            let result = result.push(charChange);
        }
        return result.join('')
}

rot13("SERR PBQR PNZC");