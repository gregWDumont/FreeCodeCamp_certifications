
function rot13(str) {

    let result = [];

    let abc = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    let key = "NOPQRSTUVWXYZABCDEFGHIJKLM"
    
    for (let char of str) {
        let index = abc.indexOf(char)
        result += index >= 0 ? key[index] : char 
        
    }
    return result
}

rot13("SERR PBQR PNZC");