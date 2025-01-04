const calculator = document.querySelector(".calculator");
const keys = calculator.querySelector(".buttons");
const display = calculator.querySelector(".display");

const calculate = (n1, operator, n2) => {
    let result = "";
    if (operator === "add") {
        result = parseFloat(n1) + parseFloat(n2);
    } else if (operator === "subtract") {
        result = parseFloat(n1) - parseFloat(n2);
    } else if (operator === "multiply") {
        result = parseFloat(n1) * parseFloat(n2);
    } else if (operator === "divide") {
        result = parseFloat(n1) / parseFloat(n2);
    }
    return result;
};

keys.addEventListener("click", e => {
    if (e.target.matches("button")) {
        const key = e.target;
        const action = key.dataset.action;
        const keyContent = key.textContent;
        const displayedNum = display.textContent;
        const previousKeyType = calculator.dataset.previousKeyType;

        if (!action) {
            if (displayedNum === "0" || 
                previousKeyType === "operator" ||
                previousKeyType === "calculate") {
                display.textContent = keyContent;
            } else {
                display.textContent = displayedNum + keyContent;
            }
        }

        if (
            action === "add" ||
            action === "subtract" ||
            action === "multiply" ||
            action === "divide" ||
            action === "decimal" ||
            action === "clear" ||
            action === "calculate"
        ) {
            key.classList.add("is-depressed");

            if (action !== "calculate") {  // Don't overwrite operator with "calculate"
                calculator.dataset.previousKeyType = "operator";
                calculator.dataset.firstValue = displayedNum;
                calculator.dataset.operator = action; // Set operator when operator button is clicked
            }
        }

        if (action === "decimal") {
            if (!displayedNum.includes(".")) {
                display.textContent = displayedNum + ".";
            } else if (
                previousKeyType === 'operator' ||
                previousKeyType === 'calculate'
            ) {
                display.textContent = "0";
            }
            calculator.dataset.previousKeyType = "decimal";
        }

        if (action === "clear") {
            if (key.textContent === "AC") {
                calculator.dataset.firstValue = "";
                calculator.dataset.operator = "";
                calculator.dataset.previousKeyType = "";
                calculator.dataset.modValue = "";
            }
            display.textContent = "0";
            key.textContent = "AC";
            calculator.dataset.previousKeyType = "clear";
        }

        if (action === "calculate") {
            const firstValue = calculator.dataset.firstValue;
            const operator = calculator.dataset.operator;
            const secondValue = displayedNum;

            console.log("First Value:", firstValue);  // Debug log
            console.log("Operator:", operator);      // Debug log
            console.log("Second Value:", secondValue); // Debug log

            if (firstValue && operator && secondValue) {
                const result = calculate(firstValue, operator, secondValue);
                console.log("Result:", result);  // Debug log

                display.textContent = result;
                calculator.dataset.firstValue = result;  // Store the result as firstValue for further operations
                calculator.dataset.operator = ""; // Reset operator after calculation
            }

            calculator.dataset.previousKeyType = "calculate"; // Set previous key type as 'calculate'
        }

        // Reset the "is-depressed" state after the button is clicked
        Array.from(key.parentNode.children).forEach(k => k.classList.remove("is-depressed"));
    }
});
