const symbols = document.querySelectorAll(".symbol");
const symbolsContent = document.querySelectorAll(".symbol h1");
const display = document.getElementById("display-text");
const ansDisplay = document.getElementById("ans-text");

let displayTextArr = [];
let beforeValue = 0;
let isEqualClicked = false;
let isReseted = false;

// Everything start from clicking the button
for (let i = 0; i < symbols.length; i++) {
  symbols[i].addEventListener("click", () => {
    switch (symbolsContent[i].textContent) {
      case "C":
        console.log("It is reset button");
        displayTextArr.length = 0;
        display.textContent = 0;
        ansDisplay.textContent = "";
        beforeValue = 0;
        console.log(displayTextArr);
        break;
      case "=":
        console.log("It is equal button");
        console.log(displayTextArr);
        //1. when user click = button, will compile all the letter inside displayTextArr at that moment
        // if click the = button, the last index in arr is symbol, will not compile
        if (checkIfConsectiveSymbol(displayTextArr)) {
          return;
        } else {
          outputArrText(displayTextArr);
        }
        break;
      case "/":
      case "*":
      case "-":
      case "+":
        //if consective input 2 symbol, will not function
        if (checkIfConsectiveSymbol(displayTextArr)) {
          return;
        } else {
          // if user want to continue compile, use the previous value display, and push into displayTextArr
          // use previous total value to display
          if (isEqualClicked) {
            displayTextArr = [beforeValue];
            beforeValue = 0;
            isEqualClicked = false;
          }
          //if user click any number button, after showing the 1st ans, all will reset
          if(isReseted){
            beforeValue = 0;
            iseReseted = false;
          }
          displayTextArr.push(symbolsContent[i].textContent);
        }
        ansDisplay.textContent = "";
        break;
      case ".":
      case "%":
        if (checkIfConsectiveSymbol(displayTextArr)) {
          return;
        } else {
          displayTextArr.push(symbolsContent[i].textContent);
          display.textContent = showArrText(displayTextArr);
        }
        break;
      case "0":
      case "1":
      case "2":
      case "3":
      case "4":
      case "5":
      case "6":
      case "7":
      case "8":
      case "9":
        displayTextArr.push(symbolsContent[i].textContent);
        display.textContent = showArrText(displayTextArr);
        //after clicked equal button, then click any number digit, will reset
        if (ansDisplay.textContent === "Ans") {
          isReseted = true;
          isEqualClicked = false;
          displayTextArr.length = 0;
          ansDisplay.textContent = "";
          displayTextArr.push(symbolsContent[i].textContent);
          display.textContent = showArrText(displayTextArr);
        }
        break;
    }

    console.log(displayTextArr, i);
  });
}

function showArrText(arr) {
  let text = "";
  for (let i = 0; i < arr.length; i++) {
    text += arr[i];
  }
  return text;
}

// can not input %% at the same time
function checkIfConsectiveSymbol(arr) {
  // only for the consective symbol
  // if same symbol, will not push into the arr
  if (
    arr[arr.length - 1] === "%" ||
    arr[arr.length - 1] === "/" ||
    arr[arr.length - 1] === "*" ||
    arr[arr.length - 1] === "-" ||
    arr[arr.length - 1] === "+" ||
    arr[arr.length - 1] === "."
  ) {
    return true;
  }
  return false;
}

// after "=" button clicked
function outputArrText(arr) {
  console.log("----");
  console.log("outputArrText function works");

  let str = "";
  let i = 0;

  for (let i = 0; i < arr.length; i++) {
    str += arr[i];
  }

  function convertToNumOrSymbol(arr) {
    let newArr = [];
    let numStr = "";

    // ["2","3","+","3","5","-","3","5"] -> [23, "+", 35, "-", 35]
    arr.map((item, index) => {
      if (!isNaN(parseFloat(item)) || item === ".") {
        numStr += item;
      } else {
        // 1. when i = index of symbol, push the saved numStr intro arr
        // 2. empty the numStr
        // 3. push the symbol into arr
        newArr.push(parseFloat(numStr)); //push the "2.5" into newArr
        numStr = "";
        newArr.push(item); //push "+" into newArr
      }
      // need to push the last numStr to arr
      if (index === arr.length - 1) {
        console.log("Execute this?");
        newArr.push(parseFloat(numStr));
      }

      console.log(numStr);
    });
    //[2.5, "+", 3]
    return newArr;
  }

  let newArr = convertToNumOrSymbol(arr);
  console.log(newArr);

  multipleOrDivideFirst(newArr, "*", "/");

  function multipleOrDivideFirst(originalArr, multipleSymbol, divideSymbol) {
    // 先乘除後
    // newArr = [32, "+", 64, "*", 50]
    // -> [64, "*", 50, "+", 32]
    let multipleFirstArr = [];
    let divideFirstArr = [];
    let tempItem = "temp";
    let tempIndex = 0;
    let tempAns = 0;
    // 將* 同 / 既野execute 完再放番入oringial Arr
    // 直至original arr 得番 + 同 -
    while (
      originalArr.indexOf(multipleSymbol) !== -1 ||
      originalArr.indexOf(divideSymbol) !== -1
    ) {
      if (
        originalArr.indexOf(multipleSymbol) !== -1 &&
        originalArr.indexOf(multipleSymbol) > originalArr.indexOf(divideSymbol)
      ) {
        //   //if  (newArr.indexOf("*") = 2, then splice(1,3) -> from index 1 to index 3
        let multipleIndex = originalArr.indexOf(multipleSymbol);
        //   // take the multiple stuff out, and add the tempItem to newArr；
        multipleFirstArr = originalArr.splice(multipleIndex - 1, 3, tempItem);
        // multipleFirstArr = [5,'*', 6];
        tempAns = checkSymbolType(
          multipleSymbol,
          multipleFirstArr[0],
          multipleFirstArr[2]
        );
        tempIndex = originalArr.indexOf("temp");
        originalArr[tempIndex] = tempAns;
        tempItem = "temp";
        multipleFirstArr.length = 0;
      } else if (
        originalArr.indexOf(divideSymbol) !== -1 &&
        originalArr.indexOf(divideSymbol) > originalArr.indexOf(multipleSymbol)
      ) {
        let divideIndex = originalArr.indexOf(divideSymbol);
        divideFirstArr = originalArr.splice(divideIndex - 1, 3, tempItem);
        tempAns = checkSymbolType(
          divideSymbol,
          divideFirstArr[0],
          divideFirstArr[2]
        );
        tempIndex = originalArr.indexOf("temp");
        originalArr[tempIndex] = tempAns;
        tempItem = "temp";
        divideFirstArr.length = 0;
      }
      //solved only have *, but not * and /
    }
    return originalArr;
  }
  // Compile the result
  // newArr = [32, "+", 64, "-", 50]
  // 1. accum = 96
  // 2. accum = 96-50 = 46
  let accum = newArr[0];
  while (i < newArr.length) {
    let item = newArr[i];
    // 1. if is symbol (solved)
    // 2. only can solve 個位數, 雙位, 三位數 (solved)
    // 3. 先乘除後加減 (未solve)
    if (isNaN(item)) {
      console.log(`run when i = ${i}`);
      accum = checkSymbolType(item, accum, newArr[i + 1]);
    }
    console.log(accum, i);
    i++;
  }
  console.log(accum);
  displayAns(accum);
  console.log(`str = ${str}`);
  beforeValue = accum;
  console.log(`beforeValue = ${beforeValue}`);
  isEqualClicked = true;
  // console.log(`symbolIndexInStr = ${symbolIndexInStr}`);
}

function displayAns(str) {
  ansDisplay.textContent = "Ans";
  display.textContent = str;
}

function checkSymbolType(symbol, prev, next) {
  switch (symbol) {
    case "*":
      return prev * next;
      break;
    case "+":
      return prev + next;
      break;
    case "-":
      return prev - next;
      break;
    case "/":
      return prev / next;
      break;
  }
}
