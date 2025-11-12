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