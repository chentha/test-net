// Function to calculate (base^exp) % modulus efficiently using the square and multiply algorithm
function modPow(base, exp, modulus) {
  let result = 1;
  base = base % modulus;

  while (exp > 0) {
    if (exp % 2 === 1) {
      result = (result * base) % modulus;
    }
    exp = Math.floor(exp / 2);
    base = (base * base) % modulus;
  }

  return result;
}

// Function to calculate the modular inverse using the extended Euclidean algorithm
function modInverse(a, m) {
  let m0 = m;
  let x0 = 0;
  let x1 = 1;

  if (m === 1) return 1;

  while (a > 1) {
    let q = Math.floor(a / m);
    let t = m;

    m = a % m;
    a = t;
    t = x0;
    x0 = x1 - q * x0;
    x1 = t;
  }

  if (x1 < 0) x1 += m0;

  return x1;
}

// RSA Encryption
function encrypt() {
  const message = document.getElementById('message').value;
  const p = parseInt(document.getElementById('pValue').value);
  const q = parseInt(document.getElementById('qValue').value);
  const e = parseInt(document.getElementById('eValue').value);
  const n = p * q;

  let encryptedMessage = '';

  for (let i = 0; i < message.length; i++) {
    const charCode = message.charCodeAt(i);
    const encryptedCharCode = modPow(charCode, e, n);
    encryptedMessage += encryptedCharCode + ' ';
  }

  document.getElementById('encryptedMessage').textContent = encryptedMessage.trim();
  document.getElementById('nValue').textContent = n;
}

// RSA Decryption
function decrypt() {
  const encryptedMessage = document.getElementById('encryptedMessage').textContent.trim();
  const p = parseInt(document.getElementById('pValue').value);
  const q = parseInt(document.getElementById('qValue').value);
  const e = parseInt(document.getElementById('eValue').value);
  const n = p * q;
  const phiN = (p - 1) * (q - 1);
  const d = modInverse(e, phiN);

  let decryptedMessage = '';

  const encryptedCharCodes = encryptedMessage.split(' ').filter(code => code !== '');
  for (const encryptedCharCode of encryptedCharCodes) {
    const charCode = modPow(parseInt(encryptedCharCode), d, n);
    decryptedMessage += String.fromCharCode(charCode);
  }

  document.getElementById('decryptedMessage').textContent = decryptedMessage;
}



// Function to clear the input and output fields
function clean() {
  document.getElementById('message').value = '';
  document.getElementById('nValue').textContent = '';
  document.getElementById('encryptedMessage').textContent = '';
  document.getElementById('decryptedMessage').textContent = '';
}
