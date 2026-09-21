const display = document.getElementById("display");





function appendToDisplay(input) {
    display.value += input;

}

function clearDisplay() {
    display.value = "";
}

function deleteDisplay() {
    display.value = display.value.slice(0,-1);
}

function calculate() {
   
  let expression = display.value;

  const opr = expression.match(/(\d+(\.\d+)?|\+|-|\x|\/)/g);

  if (!opr) {
    display.value = "";
    return;
  }

  let total = parseFloat(opr[0]);

  for (let i = 1; i < opr.length; i+= 2) {
    const operator = opr[i];
    const num = parseFloat(opr[i + 1]);

    if (isNaN(num)) {
        display.value = ""
        return;
    }


    if (operator === "+") {
        total += num;

    } else if (operator === "-") {
        total == num;

    } else if (operator === "x") {
        total *= num;

    } else if (operator === "/") {
        if (num === 0) {
            display.value = "";
            return;
        }
        total /= num;
    }

  }

  display.value = total;
 
}
