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
        let operators = ["+", "-", "×", "/", "="];
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
        if(event.target.classList == "num") expression.textContent += event.target.children[0].innerText;
        else expression.textContent += " " + event.target.children[0].innerText + " ";
    } else {
        if(event.target.parentElement.classList == "num") expression.textContent += event.target.innerText; 
        else expression.textContent += " " + event.target.innerText + " "; 
    }
}