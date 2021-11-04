const display = document.querySelector('.display');

const numbersBtn = document.querySelectorAll('[data-number]');
const operatorsBtn = document.querySelectorAll('[data-operator]');
const utilsBtn = document.querySelectorAll('[data-util]');

const currentValue = document.querySelector('.current-value');
const previousValue = document.querySelector('.previous-number');
const previousOperator = document.querySelector('.previous-operator');

// Fonctions qui geres les operations
const handleSoustraction = (a, b) => +a - +b;
const handleAddition = (a, b) => +a + +b;
const handleMultiplication = (a, b) => +a * +b;
const handleDivision = (a, b) => +a / +b;

const handleResult = (operator, a, b) => {
    switch (operator) {
        case '+':
            return handleAddition(a, b);
        case '-':
            return handleSoustraction(a, b);
        case '*':
            return handleMultiplication(a, b);
        case '/':
            return handleDivision(a, b);
    }
};

const handleSplitCalc = (string) => {
    return string
        .trim()
        .split(/([*+/\-)(])|([0-9.]+|.)/)
        .filter((v) => !!v);
};

numbersBtn.forEach((el) => {
    el.addEventListener('click', () => {
        const number = el.dataset.number;
        if (previousValue.innerHTML) {
            currentValue.innerHTML = '';
            // previousValue.innerHTML = '';
        }
        currentValue.innerHTML += number;
    });
});

operatorsBtn.forEach((el) => {
    el.addEventListener('click', () => {
        const operator = el.dataset.operator;

        previousValue.innerHTML = currentValue.innerHTML;
        previousOperator.innerHTML = operator;
    });
});

utilsBtn.forEach((el) => {
    el.addEventListener('click', () => {
        const util = el.dataset.util;
        const innerHTML = display.innerHTML;

        switch (util) {
            case 'del':
                currentValue.innerHTML = currentValue.innerHTML.substring(
                    0,
                    currentValue.innerHTML.length - 1
                );
                break;
            case 'reset':
                currentValue.innerHTML = '';
                previousValue.innerHTML = '';
                previousOperator.innerHTML = '';
                break;
            case '=':
                currentValue.innerHTML =
                    handleResult(
                        previousOperator.innerHTML,
                        currentValue.innerHTML,
                        previousValue.innerHTML
                    ) || '';
                break;
        }
    });
});
