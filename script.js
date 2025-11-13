const display = document.getElementById("display");
const button = document.querySelectorAll ("btn");

let currentInput = "0";
let previousInput = "";
let operator = null;
let shouldResetDisplay = false;

display.value = currentInput;

button.forEach(button => {
    button.addEventListener("click" ,() => {
        const value = button.getAttribute(`data-value`);
        handleButtonClick(value);
    });
});

function handleButtonClick(value) {
    console.log('bouton cliqué',value);
    
    if (isNumber(value)) {
        handleNumber(value);
    } else if (isOperator(value)) {
        handleOperator(value);
    } else if (value === "=") {
        handleEqual();
    } else if (value === "C") {
        handleClear();
    } else if (value === "CE") {
        handleClearEntry();
    } else if (value === "backspace") {
        handleBackspace();
    } else if (value === ".") {
        handleDecimal();
    }

    updateDisplay();
}

function handleNumber(number) {
    if (shouldResetDisplay) {
        currentInput="";
        shouldResetDisplay = false;
    }
    
    if (currentInput === "0") {
        currentInput = number;
    } else {
        currentInput += number;
    }
}