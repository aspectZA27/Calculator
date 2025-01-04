const calculator = document.querySelector(".calculator");
const keys = calculator.querySelector(".buttons");
const display = calculator.querySelector(".display");

// Define the calculate function first
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

// Add the event listener after the calculate function
keys.addEventListener("click", e => {
    if (e.target.matches("button")) {
        const key = e.target;
        const action = key.dataset.action;
        const keyContent = key.textContent;
        const displayedNum = display.textContent;
        const previousKeyType = calculator.dataset.previousKeyType;

        if (!action) {
            if (
                displayedNum === "0" || 
                previousKeyType === "operator" || 
                previousKeyType === "calculate"
            ) {
                display.textContent = keyContent;
            } else {
                display.textContent = displayedNum + keyContent;
            }
            calculator.dataset.previousKeyType = "number";
        }

        if (
            action === "add" ||
            action === "subtract" ||
            action === "multiply" ||
            action === "divide"
        ) {
            key.classList.add("is-depressed");

            if (previousKeyType !== "operator") {
                calculator.dataset.firstValue = displayedNum;
            }

            calculator.dataset.operator = action;
            calculator.dataset.previousKeyType = "operator";
        }

        if (action === "decimal") {
            if (!displayedNum.includes(".")) {
                display.textContent = displayedNum + ".";
            } else if (
                previousKeyType === "operator" || 
                previousKeyType === "calculate"
            ) {
                display.textContent = "0.";
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

            if (firstValue && operator && previousKeyType !== "operator") {
                const result = calculate(firstValue, operator, secondValue);

                display.textContent = result;
                calculator.dataset.firstValue = result;
                calculator.dataset.operator = "";
            }

            calculator.dataset.previousKeyType = "calculate";
        }

        Array.from(key.parentNode.children).forEach(k => k.classList.remove("is-depressed"));
    }
});
