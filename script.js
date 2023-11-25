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
            // If we've already stored operand1 + operatorType and another
            // number has been pressed prior to inputting another operator,
            // grab operand2 from the text and operate on the values as if 
            // '=' had been pressed. Display the result and set it as the new
            // operand1. Finally, make operand2 undefined.
            if (operand1 != undefined && operatorType != undefined && !operatorPressed) {
                operand2 = Number(displayText.textContent);
                operand1 = operate(operand1, operand2, operatorType)
                displayText.textContent = operand1;
                operand2 = undefined;
            }
            // If we haven't, then the first operand is just the display text.
            else {
                operand1 = Number(displayText.textContent);
            }

            // Store the current operator type and signal that the 
            // button has been pressed
            operatorType = operatorButton.textContent;
            operatorPressed = true;

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
    if (operand1 != undefined && operand2 != undefined && operatorType) {
        result = operate(operand1, operand2, operatorType);

        // Display the result to the screen
        displayText.textContent = result;
    }
} );




// Main operator function
function operate(operand1, operand2, operatorType) {
    switch(operatorType) {
        case '+': 
            return add(operand1, operand2);
        case '-':
            return subtract(operand1, operand2);
        case 'x':
            return multiply(operand1, operand2);
        case '÷':
            return divide(operand1, operand2);
    }
}

// Individual operator functions
function add(operand1, operand2) {
    return operand1 + operand2
};

function subtract(operand1, operand2) {
    return operand1 - operand2
};

function multiply(operand1, operand2) {
    return operand1 * operand2
}

function divide(operand1, operand2) {
    return operand1 / operand2
}

// TROUBLESHOOTING
// let operand1 = 5;
// let operand2 = 4;
// let addResult = add(operand1, operand2);
// let subtractResult = subtract(operand1, operand2);
// let multiplyResult = multiply(operand1, operand2);
// let divideResult = divide(operand1, operand2);
// console.log({addResult});
// console.log({subtractResult});
// console.log({multiplyResult});
// console.log({divideResult});

