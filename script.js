const display = document.getElementById("display");
const buttons = document.querySelectorAll (".btn");

let currentInput = "0";
let previousInput = "";
let operator = null;
let shouldResetDisplay = false;

display.value = currentInput;

buttons.forEach(button => {
    button.addEventListener("click" ,() => {
        const value = button.getAttribute("data-value");
        handleButtonClick(value);
    });
});

function updateDisplay() {
    display.value = currentInput;
    console.log("Affichage mise à jour" , currentInput);
    
}

function isNumber(value) {
    return /^\d$/.test(value);
}

function isOperator(value) {
    return ["+" , "-" , "*" , "/"].includes(value);
}

function handleEqual() {
    if (operator === null || shouldResetDisplay) {
        return;
    }

    const prev = parseFloat(previousInput);
    const current = parseFloat(currentInput);

    if ( isNaN(prev) || isNaN(current)) {
        alert("Erreur : chiffres invalides");
        return;
    } 

    let result;

    switch (operator) {
        case "+":
            result = prev + current;
            break;
        case "-":
            result = prev - current;
            break;
        case "*":
            result = prev * current;
            break;
        case "/":
            if (current === 0) {
                alert("Erreur : Division par zéro !");
                handleClear();
                return;
            }
            result = prev / current;
            break;
        default: 
            return;
    }

    currentInput = result.toString();
    operator = null;
    previousInput ="";
    shouldResetDisplay = true;

    updateDisplay();

    console.log("calcul demandé");
}

function handleClear() {
    currentInput = "0";
    previousInput = "";
    operator = null;
    shouldResetDisplay = false;
    updateDisplay();
}

function handleClearEntry() {
    currentInput = "0";
    updateDisplay();
}

function handleBackspace() {
    if (currentInput.length > 1) {
        currentInput = currentInput.slice(0, -1);
    } else {
        currentInput ="0";
    }
    updateDisplay();
}

function handleDecimal() {
    if (shouldResetDisplay) {
        currentInput = "0.";
        shouldResetDisplay = false;
    } else if (! currentInput.includes(".")) {
        currentInput += ".";
        }
    updateDisplay();

}

function handleOperator(op) {
    previousInput = currentInput;
    operator = op;
    shouldResetDisplay = true;
}

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

    updateDisplay();
}