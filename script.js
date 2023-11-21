let clearButton = document.querySelector('#button-clear');
let displayText = document.querySelector('#text-display');
let numberButtons = document.querySelectorAll('#container-numbers button');
let operatorButtons = document.querySelectorAll('#container-operators button');

// Used to store the two operands and operator
let operand1;
let operand2;
let operator;

// Create event listener for the clear button
clearButton.addEventListener('click', () => {
    displayText.textContent = '';
});

// Create event listeners for the number buttons
for (let numberButton of Array.from(numberButtons)) {
    numberButton.addEventListener('click', () => {
        // Grab the existing text in the display
        let prevText = displayText.textContent;

        // Populate the display with the updated text
        displayText.textContent = prevText + numberButton.textContent;

        // If a '.' exists in the updated text and we have not input an
        // operator yet, disable the button. Else, keep it enabled.
        let dotButton = document.querySelector('#button-decimal');
        if (displayText.textContent.includes('.') && !operator) {
            dotButton.disabled = true;
        }
        else {
            dotButton.disabled = false;
        }
    })
}

// Create event listeners for the operator buttons
for (let operatorButton of Array.from(operatorButtons)) {
    // '=' will have its own function, so ignore
    if (operatorButton.textContent != '=') {
        operatorButton.addEventListener('click', () => {
            // Store the operator type
            operator = operatorButton.textContent;

            // Inputting an operator means we are done inputting the 
            // first operand, so store it
            operand1 = Number(displayText.textContent);
            console.log(operand1);

        })
    }
}







// Operator functions
function add(num1, num2) {
    return num1 + num2
};

function subtract(num1, num2) {
    return num1 - num2
};

function multiply(num1, num2) {
    return num1 * num2
}

function divide(num1, num2) {
    return num1 / num2
}

// TROUBLESHOOTING
// let num1 = 5;
// let num2 = 4;
// let addResult = add(num1, num2);
// let subtractResult = subtract(num1, num2);
// let multiplyResult = multiply(num1, num2);
// let divideResult = divide(num1, num2);
// console.log({addResult});
// console.log({subtractResult});
// console.log({multiplyResult});
// console.log({divideResult});

