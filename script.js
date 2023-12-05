let clearButton = document.querySelector('#button-clear');
let dotButton = document.querySelector('#button-decimal');
let equalButton = document.querySelector('#button-eq');
let numberButtons = document.querySelectorAll('#container-numbers button');
let operatorButtons = document.querySelectorAll('#container-operators button');
let displayText = document.querySelector('#text-display');

let operand1;
let operand2;
let operatorType;
let operatorPressed = false;
let result;

// Create event listener for the clear button
clearButton.addEventListener('click', clear_all);

// Create event listeners for the number buttons
for (let numberButton of Array.from(numberButtons)) {
    // The '.' button will have its own listener, so ignore
    if (numberButton.textContent != '.') {
        numberButton.addEventListener('click', () => {
            // If we just stored a result and a number button is pressed,
            // treat it like we just hit the clear button before proceeding
            if (result) clear_all();

            // Grab the existing text in the display
            let prevText = displayText.textContent;
    
            // If the existing text is 0 (default), make sure we clear it out
            // before populating
            if (prevText === "0") prevText = '';
    
            // Populate the display with the updated text based on whether
            // the last press was an operator
            if (!operatorPressed) {
                displayText.textContent = prevText + numberButton.textContent;
            }
            else {
                displayText.textContent = numberButton.textContent;
                operatorPressed = false;
            }
        })
    }
}

// Create event listener for the '.' button
dotButton.addEventListener('click', () => {
    // If we just stored a result and the '.' button is pressed, treat it 
    // like we just hit the clear button before proceeding
    if (result) clear_all();

    // If there is already a '.' in the current display and the last button
    // pressed was not an operator, disable the button
    if (displayText.textContent.includes('.') && !operatorPressed) {
        dotButton.disabled = true;
    }
    // Else, if the last button pressed was an operator, clear the screen
    // and start with a leading zero before the '.'
    else if (operatorPressed) {
        displayText.textContent = '0.';
        operatorPressed = false;
    }
    // Else, add the '.' to the existing display text
    else {
        let prevText = displayText.textContent;
        displayText.textContent = prevText + '.';
    }
})

// Create event listeners for the operator buttons
for (let operatorButton of Array.from(operatorButtons)) {
    // '=' will have its own function, so ignore
    if (operatorButton.textContent != '=') {
        operatorButton.addEventListener('click', () => {
            // If we just stored a result and an operator button is pressed,
            // make result the new operand1 and clear out operand2, 
            // operatorType, and result before proceeding.
            if (result) {
                operand1 = result;
                operand2 = undefined;
                operatorType = undefined;
                result = undefined;
            }

            // Allow the use of '.' again
            dotButton.disabled = false;

            // If we've already stored operand1 + operatorType and another
            // number has been pressed prior to inputting another operator,
            // grab operand2 from the text and operate on the values as if 
            // '=' had been pressed. Display the result and set it as the new
            // operand1. Finally, make operand2 undefined.
            if (operand1 != undefined && operatorType != undefined && !operatorPressed) {
                operand2 = Number(displayText.textContent);
                // If operand1 is 'NaN', do not perform any operations and keep
                // displaying 'NaN' until we clear.
                if (operand1 != 'NaN') {
                    operand1 = operate(operand1, operand2, operatorType);
                }
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

            console.log({operand1}); // TROUBLESHOOT

        })
    }
}

// Create event listener for the '=' button
equalButton.addEventListener('click', () => {
    // Store current display text as second operand
    operand2 = Number(displayText.textContent);
    console.log({operand2}); // TROUBLESHOOT

    // Perform arithmetic function only if we've stored both operands
    // and an operator. Else, do nothing.
    if (operand1 != undefined && operand2 != undefined && operatorType) {
        // If operand1 stores 'NaN', keep displaying it
        if (operand1 === 'NaN') {
            result = 'NaN';
        }
        else {
            result = operate(operand1, operand2, operatorType);
        }

        // Display the result to the screen
        displayText.textContent = result;

        console.log({result}); // TROUBLESHOOT
    }
} );

// Event listeners which allow us to use keyboard keys for input
// These just trigger a click on the respective button, which triggers
// its defined event listener
document.addEventListener('keydown', (event) => {
    let numRegex = /[0-9]/;
    if (numRegex.test(event.key)) {
        document.getElementById(`button-${event.key}`).click();
    }
    if (event.key === '.') document.getElementById('button-decimal').click();
    if (event.key === 'Backspace') {
        document.getElementById('button-clear').click();
    }
    if (event.key === '=' || event.key === "Enter") {
        document.getElementById('button-eq').click();
    }
    if (event.key === '+') {
        document.getElementById('button-add').click();
    }
    if (event.key === '-') {
        document.getElementById('button-sub').click();
    }
    if (event.key === '*') {
        document.getElementById('button-mult').click();
    }
    if (event.key === '/') {
        document.getElementById('button-div').click();
    }
})

// Main operator function
function operate(operand1, operand2, operatorType) {
    let result;
    switch(operatorType) {
        case '+': 
            result = add(operand1, operand2);
            break
        case '-':
            result = subtract(operand1, operand2);
            break
        case 'x':
            result = multiply(operand1, operand2);
            break
        case '÷':
            result = divide(operand1, operand2);
            break
    }
    // Round to 10 decimal places
    // Add epsilon to avoid mid-value rounding errors due to binary
    // representation of certain values causing a round-down.
    let n = 10000000000;
    return Math.round((result + Number.EPSILON) * n) / n;
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
    // Handle divide by zero 
    if (operand2 === 0) {
        dotButton.disabled = true;
        return "NaN"
    }
    else {
        return operand1 / operand2
    }  
}

// Clears all variables out
function clear_all() {
    displayText.textContent = '0';
    operand1 = undefined;
    operand2 = undefined;
    operatorType = undefined;
    operatorPressed = false;
    result = undefined;
    dotButton.disabled = false;
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

