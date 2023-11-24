let clearButton = document.querySelector('#button-clear');
let displayText = document.querySelector('#text-display');
let numberButtons = document.querySelectorAll('#container-numbers button');
let operatorButtons = document.querySelectorAll('#container-operators button');
let equalButton = document.querySelector('#button-eq');


let operand1;
let operand2;
let operatorType;
let operatorPressed = false;
let result;

// Create event listener for the clear button
clearButton.addEventListener('click', () => {
    displayText.textContent = '0';
    operand1 = undefined;
    operand2 = undefined;
    operatorType = undefined;
    operatorPressed = false;
    result = undefined;
});

// Create event listeners for the number buttons
for (let numberButton of Array.from(numberButtons)) {
    numberButton.addEventListener('click', () => {
        // Grab the existing text in the display
        let prevText = displayText.textContent;

        // If the existing text is 0 (default), make sure we clear it out
        // before populating
        if (prevText === "0") prevText = '';

        // Populate the display with the updated text based on whether
        // an operator has been pressed
        if (!operatorPressed) {
            displayText.textContent = prevText + numberButton.textContent;
        }
        else {
            displayText.textContent = numberButton.textContent;
            operatorPressed = false;
        }

        // If a '.' exists in the updated text and we have not input an
        // operator yet, disable the button. Else, keep it enabled.
        let dotButton = document.querySelector('#button-decimal');
        if (displayText.textContent.includes('.') && !operatorType) {
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
            // Store the operator type and signal the button has been pressed
            operatorType = operatorButton.textContent;
            operatorPressed = true;

            // Inputting an operator means we are done inputting the 
            // first operand, so store it
            operand1 = Number(displayText.textContent);
            console.log(operand1); // TROUBLESHOOT

        })
    }
}

// Create event listener for the '=' button
equalButton.addEventListener('click', () => {
    // Store current display text as second operand
    operand2 = Number(displayText.textContent);
    console.log(operand2); // TROUBLESHOOT

    // Perform arithmetic function only if we've stored both operands
    // and an operator. Else, do nothing.
    if (operand1 && operand2 && operatorType) {
        switch(operatorType) {
            case '+': 
                result = add(operand1, operand2);
                break;
            case '-':
                result = subtract(operand1, operand2);
                break;
            case 'x':
                result = multiply(operand1, operand2);
                break;
            case '÷':
                result = divide(operand1, operand2);
                break;
        }

        // Display the result to the screen
        displayText.textContent = result;
    }

} );







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

