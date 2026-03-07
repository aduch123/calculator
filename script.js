function createButtons() {
    const nums = document.getElementById("numbers");
    const ops = document.getElementById("operators");

    //Numbers
    for(let i = 0; i < 12; ++i) {
        const num = document.createElement("div");
        const p = document.createElement("p");
        num.addEventListener("click", displayContent);

        num.classList = "num";
        if(i < 9) p.innerText = i + 1;
        else {
            switch(i) {
                case 9:
                    p.innerText = "Clear";
                    p.style.fontSize = "16px";
                    break;
                case 10:
                    p.innerText = 0;
                    break;
                case 11:
                    p.innerText = "⌫";
                    p.style.fontSize = "16px";
                    break;
            }
        }

        num.appendChild(p);
        nums.appendChild(num);
    }

    //operators
    for(let i = 0; i < 5; ++i) {
        let operators = ["+", "-", "×", "÷", "="];
        const op = document.createElement("div");
        const p = document.createElement("p");

        op.classList = "op";
        p.innerText = operators[i];
        op.addEventListener("click", displayContent);

        op.appendChild(p);
        ops.appendChild(op);
    }
}

createButtons();

function displayContent(event) {
    const expression = document.getElementById("expression");
    let arr = expression.innerText.split(" ");

    if(event.target.tagName == "DIV") {
        if(event.target.children[0].innerText == "Clear") {
            clear();
            return;
        }
        else if(event.target.children[0].innerText == "⌫") {
            back();
            return;
        }
        else if(event.target.children[0].innerText == "=") {
            calculate();
            return;
        }

        if(event.target.classList == "num") expression.textContent += event.target.children[0].innerText;
        else {
            if("+-÷×".includes(expression.innerText.at(-1)) || expression.textContent == "") return
            calculate("expression");
            expression.textContent += " " + event.target.children[0].innerText + " ";
        }
    } else {
        if(event.target.innerText == "Clear") {
            clear();
            return;
        }
        else if(event.target.innerText == "⌫") {
            back();
            return;
        }
        else if(event.target.innerText == "=") {
            calculate();
            return;
        }

        if(event.target.parentElement.classList == "num") expression.textContent += event.target.innerText; 
        else {
            if("+-÷×".includes(expression.innerText.at(-1)) || expression.textContent == "") return
            calculate("expression");
            expression.textContent += " " + event.target.innerText + " ";
        }
    }
}

function clear() {
    const expression = document.getElementById("expression");
    const resultP = document.getElementById("result");
    expression.innerText = "";
    resultP.innerText = "";
}

function back() {
    const expression = document.getElementById("expression");
    const resultP = document.getElementById("result");

    if(resultP.innerText != "") {
        expression.innerText = "";
        resultP.innerText = "";
        return;
    }
    let arr = expression.innerText.split(" ");
    arr.pop();
    expression.textContent = arr.join(" ");
    if("+-÷×".includes(expression.textContent.at(-1))) expression.textContent += " ";
}

function calculate(where) {
    const expression = document.getElementById("expression");
    const resultP = document.getElementById("result");
    let result = "";

    if("+-÷×".includes(expression.innerText.at(-1)) || expression.textContent == "") return
    
    
    const arr = expression.textContent.split(" ");
    if(arr.length == 1) result = expression.textContent;

    if(arr[1] == "+") result += Number(arr[0]) + Number(arr[2]);
    if(arr[1] == "-") result += Number(arr[0]) - Number(arr[2]);
    if(arr[1] == "×") result += Number(arr[0]) * Number(arr[2]);
    if(arr[1] == "÷") result += Number(arr[0]) / Number(arr[2]);

    if(where == "expression") expression.innerText = result;
    else resultP.innerText = "= " + result;
}