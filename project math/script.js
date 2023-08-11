function encrypt() {
    const inputText = document.getElementById('inputText').value;
    const shift = parseInt(document.getElementById('encryptionKey').value);
    const encryptedText = caesarCipher(inputText, shift);
    document.getElementById('output').innerHTML = `${encryptedText}`;
}

function caesarCipher(text, shift) {
    let result = '';
    for (let i = 0; i < text.length; i++) {
        let char = text[i];
        if (char.match(/[a-z]/i)) {
            const code = text.charCodeAt(i);
            if (code >= 65 && code <= 90) {
                char = String.fromCharCode(((code - 65 + shift) % 26) + 65);
            } else if (code >= 97 && code <= 122) {
                char = String.fromCharCode(((code - 97 + shift) % 26) + 97);
            }
        }
        result += char;
    }
    return result;
}
function clean() {
  document.getElementById('inputText').value = '';
  document.getElementById('encryptionKey').textContent = '';
  document.getElementById('output').textContent = '';
}