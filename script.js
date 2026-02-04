const resultEl = document.getElementById('passwordResult');
const lengthEl = document.getElementById('length');
const numbersEl = document.getElementById('numbers');
const symbolsEl = document.getElementById('symbols');
const generateBtn = document.getElementById('generateBtn');
const copyBtn = document.getElementById('copyBtn');

const randomFunc = {
    lower: () => String.fromCharCode(Math.floor(Math.random() * 26) + 97),
    upper: () => String.fromCharCode(Math.floor(Math.random() * 26) + 65),
    number: () => String.fromCharCode(Math.floor(Math.random() * 10) + 48),
    symbol: () => "!@#$%^&*(){}[]<>/.".split('')[Math.floor(Math.random() * 20)]
};

generateBtn.addEventListener('click', () => {
    const length = +lengthEl.value; // "+" converts string to number
    const hasNum = numbersEl.checked;
    const hasSym = symbolsEl.checked;

    resultEl.value = generatePassword(length, hasNum, hasSym);
});

function generatePassword(length, number, symbol) {
    let generatedPassword = '';
    const typesCount = 1 + number + symbol; // Always include letters
    const typesArr = [{ lower: true }, { upper: true }, { number }, { symbol }]
        .filter(item => Object.values(item)[0]);

    if (typesCount === 0) return '';

    for (let i = 0; i < length; i += typesCount) {
        typesArr.forEach(type => {
            const funcName = Object.keys(type)[0];
            generatedPassword += randomFunc[funcName]();
        });
    }

    // Slice it to the exact length and return
    return generatedPassword.slice(0, length);
}

// Bonus: Copy to Clipboard functionality
copyBtn.addEventListener('click', () => {
    const password = resultEl.value;
    if (!password) return;

    navigator.clipboard.writeText(password);
    alert('Password copied to clipboard!');
});
