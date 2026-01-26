// === NAVIGATION MOBILE TOGGLE ===
const navToggle = document.getElementById('navToggle');
const navLinks = document.querySelector('.nav-links');

if (navToggle) {
    navToggle.addEventListener('click', () => {
        navLinks.classList.toggle('open');
    });

    // Close menu when a link is clicked
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('open');
        });
    });
}

// === CHANGEMENT D'ONGLETS ===
function switchTab(tab) {
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));

    if (tab === 'calc') {
        document.querySelectorAll('.tab')[0].classList.add('active');
        document.getElementById('calcView').classList.add('active');
    } else {
        document.querySelectorAll('.tab')[1].classList.add('active');
        document.getElementById('convertView').classList.add('active');
        updateConvertDisplay();
    }
}

// ========================================= //
// CALCULATRICE
// ========================================= //

let calcExpression = '0';
let calcResult = '0';
let isNewInput = true;

const calcDisplay = document.getElementById('calcDisplay');
const calcResultEl = document.getElementById('calcResult');

document.querySelectorAll('.calc-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const value = btn.dataset.value;
        const action = btn.dataset.action;

        if (action === 'clear') {
            calcExpression = '0';
            calcResult = '0';
            isNewInput = true;
        } else if (action === 'backspace') {
            if (calcExpression.length > 1) {
                calcExpression = calcExpression.slice(0, -1);
            } else {
                calcExpression = '0';
            }
            isNewInput = false;
        } else if (action === 'equals') {
            try {
                const result = eval(calcExpression.replace(/\u00d7/g, '*').replace(/\u00f7/g, '/').replace(/\u2212/g, '-'));
                calcResult = result.toString();
                calcExpression = calcResult;
                isNewInput = true;
            } catch {
                calcResult = 'Erreur';
            }
        } else if (value) {
            if (isNewInput && value !== '.' && !'+-*/('.includes(value)) {
                calcExpression = value;
                isNewInput = false;
            } else {
                if (calcExpression === '0' && value !== '.') {
                    calcExpression = value;
                } else {
                    calcExpression += value;
                }
            }

            try {
                const tempResult = eval(calcExpression.replace(/\u00d7/g, '*').replace(/\u00f7/g, '/').replace(/\u2212/g, '-'));
                calcResult = tempResult.toString();
            } catch {
                calcResult = '...';
            }
        }

        calcDisplay.textContent = calcExpression;
        calcResultEl.textContent = calcResult;
    });
});

// ========================================= //
// CONVERTISSEUR D'UNITÉS
// ========================================= //

const units = {
    length: {
        'm': { name: 'Mètres', factor: 1 },
        'km': { name: 'Kilomètres', factor: 1000 },
        'cm': { name: 'Centimètres', factor: 0.01 },
        'mm': { name: 'Millimètres', factor: 0.001 },
        'mi': { name: 'Miles', factor: 1609.34 },
        'yd': { name: 'Yards', factor: 0.9144 },
        'ft': { name: 'Pieds', factor: 0.3048 },
        'in': { name: 'Pouces', factor: 0.0254 }
    },
    area: {
        'm\u00b2': { name: 'Mètres carrés', factor: 1 },
        'km\u00b2': { name: 'Kilomètres carrés', factor: 1000000 },
        'ha': { name: 'Hectares', factor: 10000 },
        'cm\u00b2': { name: 'Centimètres carrés', factor: 0.0001 },
        'ft\u00b2': { name: 'Pieds carrés', factor: 0.092903 }
    },
    volume: {
        'l': { name: 'Litres', factor: 1 },
        'ml': { name: 'Millilitres', factor: 0.001 },
        'm\u00b3': { name: 'Mètres cubes', factor: 1000 },
        'gal': { name: 'Gallons US', factor: 3.78541 }
    },
    mass: {
        'kg': { name: 'Kilogrammes', factor: 1 },
        'g': { name: 'Grammes', factor: 0.001 },
        't': { name: 'Tonnes', factor: 1000 },
        'lb': { name: 'Livres', factor: 0.453592 },
        'oz': { name: 'Onces', factor: 0.0283495 }
    },
    temperature: {
        'C': { name: 'Celsius' },
        'F': { name: 'Fahrenheit' },
        'K': { name: 'Kelvin' }
    },
    speed: {
        'm/s': { name: 'Mètres/seconde', factor: 1 },
        'km/h': { name: 'Kilomètres/heure', factor: 0.277778 },
        'mph': { name: 'Miles/heure', factor: 0.44704 }
    },
    time: {
        's': { name: 'Secondes', factor: 1 },
        'min': { name: 'Minutes', factor: 60 },
        'h': { name: 'Heures', factor: 3600 },
        'd': { name: 'Jours', factor: 86400 }
    },
    data: {
        'B': { name: 'Octets', factor: 1 },
        'KB': { name: 'Kilooctets', factor: 1024 },
        'MB': { name: 'Mégaoctets', factor: 1048576 },
        'GB': { name: 'Gigaoctets', factor: 1073741824 }
    }
};

const categoryEl = document.getElementById('category');
const fromUnitEl = document.getElementById('fromUnit');
const toUnitEl = document.getElementById('toUnit');
const swapBtn = document.getElementById('swapBtn');
const convertValueEl = document.getElementById('convertValue');
const resultDisplayEl = document.getElementById('resultDisplay');

let history = [];

function updateUnits() {
    const category = categoryEl.value;
    const categoryUnits = units[category];

    fromUnitEl.innerHTML = '';
    toUnitEl.innerHTML = '';

    Object.entries(categoryUnits).forEach(([key, data]) => {
        const option1 = new Option(`${data.name} (${key})`, key);
        const option2 = new Option(`${data.name} (${key})`, key);
        fromUnitEl.add(option1);
        toUnitEl.add(option2);
    });

    if (toUnitEl.options.length > 1) {
        toUnitEl.selectedIndex = 1;
    }

    convert();
}

function convert() {
    const value = parseFloat(calcResult) || 0;
    const category = categoryEl.value;
    const from = fromUnitEl.value;
    const to = toUnitEl.value;

    if (category === 'temperature') {
        let celsius;
        if (from === 'C') celsius = value;
        else if (from === 'F') celsius = (value - 32) * 5/9;
        else celsius = value - 273.15;

        let result;
        if (to === 'C') result = celsius;
        else if (to === 'F') result = celsius * 9/5 + 32;
        else result = celsius + 273.15;

        resultDisplayEl.textContent = `${result.toFixed(2)} ${to}`;
    } else {
        const fromFactor = units[category][from].factor;
        const toFactor = units[category][to].factor;
        const result = (value * fromFactor) / toFactor;
        resultDisplayEl.textContent = `${result.toFixed(6)} ${to}`;
    }

    addToHistory(value, from, resultDisplayEl.textContent, category);
}

function updateConvertDisplay() {
    convertValueEl.textContent = calcResult;
    convert();
}

function addToHistory(value, from, to, category) {
    const entry = `${value} ${from} \u2192 ${to}`;
    history.unshift(entry);
    history = history.slice(0, 5);

    const historyHTML = history.map(h => `<div class="history-item">${h}</div>`).join('');
    document.getElementById('historyList').innerHTML = historyHTML || '<div style="text-align: center; color: var(--text-dim); font-size: 12px;">Aucun historique</div>';
}

swapBtn.addEventListener('click', () => {
    const temp = fromUnitEl.value;
    fromUnitEl.value = toUnitEl.value;
    toUnitEl.value = temp;
    convert();
});

categoryEl.addEventListener('change', updateUnits);
fromUnitEl.addEventListener('change', convert);
toUnitEl.addEventListener('change', convert);

updateUnits();
