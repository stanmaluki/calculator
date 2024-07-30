let runningTotal = 0;
let buffer = "0";
let previousOperator = null;

const screen = document.querySelector('.screen');

function ButtonClick(value){
    if(isNaN(value)){
        handleSymbol(value);
    } else {
        handleNumber(value);
    }
}

function handleSymbol(symbol){
    switch(symbol){
        case 'C':
            buffer = '0';
            runningTotal = 0;
            previousOperator = null;
            break;

        case '=':
            if (previousOperator === null) {
                return;
            }
            flushOperation(parseFloat(buffer));
            previousOperator = null;
            buffer = runningTotal.toString();
            break;
            
        case '&larr;':
            if (buffer.length === 1) {
                buffer = '0';
            } else {
                buffer = buffer.slice(0, -1);
            }
            break;

        case '+':
        case '-':
        case '&times;':
        case '&divide;':
            handleMath(symbol);
            break;
    }
    updateScreen();
}

function handleMath(symbol){
    if (buffer === '0') {
        return;
    }
    const intBuffer = parseFloat(buffer);

    if (runningTotal === 0){
        runningTotal = intBuffer;
    } else {
        flushOperation(intBuffer);
    }
    previousOperator = symbol;
    buffer = '0';
}

function flushOperation(intBuffer){
    if (previousOperator === '+'){
        runningTotal += intBuffer;
    } else if (previousOperator === '-') {
        runningTotal -= intBuffer;
    } else if (previousOperator === '&times;') {
        runningTotal *= intBuffer;
    } else if (previousOperator === '&divide;') {
        runningTotal /= intBuffer;
    }
}

function handleNumber(numberString){
    if (buffer === '0'){
        buffer = numberString;
    } else {
        buffer += numberString;
    }
    updateScreen();
}

function updateScreen() {
    screen.textContent = buffer;
}

function init (){
    const buttons = document.querySelectorAll('.calc-button');
    buttons.forEach(button => {
        button.addEventListener('click', function(event){
            ButtonClick(event.target.innerHTML);
        });
    });
}

init();
