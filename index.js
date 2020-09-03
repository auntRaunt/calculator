const symbols = document.querySelectorAll(".symbol");
const symbolsContent = document.querySelectorAll(".symbol h1");
const display = document.getElementById("display-text");
const ansDisplay = document.getElementById("ans-text");

let displayTextArr = [];
let beforeValue = 0;
let isEqualClicked = false;
let isReseted = false;
Number.prototype.countDecimals = function () {
  if (Math.floor(this.valueOf()) === this.valueOf()) return 0;
  return this.toString().split(".")[1].length || 0;
};

// Everything start from clicking the button
// for (let i = 0; i < symbols.length; i++) {
//   symbols[i].addEventListener("click", init(symbolsContent[i].textContent));
//   console.log(displayTextArr, i);
// }

for (let i = 0; i < symbols.length; i++) {
  symbols[i].addEventListener("click", () => {
    switch (symbolsContent[i].textContent) {
      case "C":
        console.log("It is reset button");
        isEqualClicked = false;
        isReseted = false;
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
          if (isReseted) {
            beforeValue = 0;
            isReseted = false;
          }

          displayTextArr.push(symbolsContent[i].textContent);
          //"%" after can have +/-/*/"/"
          if (displayTextArr[displayTextArr.length - 1] === "%") {
            display.textContent = showArrText(displayTextArr);
          }
        }
        ansDisplay.textContent = "";
        break;
      // need to solve "5.5.5" issue
      case ".":
        if (
          //have problem, will return true
          checkIfConsectiveSymbol(displayTextArr) ||
          checkIfSameDotsInOneNumber(displayTextArr)
        ) {
          return;
        } else {
          displayTextArr.push(symbolsContent[i].textContent);
          display.textContent = showArrText(displayTextArr);
        }
        break;
      case "%":
        if (
          displayTextArr[displayTextArr.length - 1] === "%" ||
          displayTextArr[displayTextArr.length - 1] === "."
        ) {
          return;
        } else {
          // if user want to continue compile, use the previous value display, and push into displayTextArr
          // use previous total value to display
          if (isEqualClicked) {
            displayTextArr = [beforeValue];
            beforeValue = 0;
            isEqualClicked = false;
          }
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
        if (displayTextArr[displayTextArr.length - 1] === "%") {
          displayTextArr.push("*");
        }
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

// function init(eachLetter) {
//   switch (eachLetter) {
//     case "C":
//       console.log("It is reset button");
//       isEqualClicked = false;
//       isReseted = false;
//       displayTextArr.length = 0;
//       display.textContent = 0;
//       ansDisplay.textContent = "";
//       beforeValue = 0;
//       console.log(displayTextArr);
//       break;
//     case "=":
//       console.log("It is equal button");
//       console.log(displayTextArr);
//       //1. when user click = button, will compile all the letter inside displayTextArr at that moment
//       // if click the = button, the last index in arr is symbol, will not compile
//       if (checkIfConsectiveSymbol(displayTextArr)) {
//         return;
//       } else {
//         outputArrText(displayTextArr);
//       }
//       break;
//     case "/":
//     case "*":
//     case "-":
//     case "+":
//       //if consective input 2 symbol, will not function
//       if (checkIfConsectiveSymbol(displayTextArr)) {
//         return;
//       } else {
//         // if user want to continue compile, use the previous value display, and push into displayTextArr
//         // use previous total value to display
//         if (isEqualClicked) {
//           displayTextArr = [beforeValue];
//           beforeValue = 0;
//           isEqualClicked = false;
//         }
//         //if user click any number button, after showing the 1st ans, all will reset
//         if (isReseted) {
//           beforeValue = 0;
//           iseReseted = false;
//         }

//         displayTextArr.push(eachLetter);
//         //"%" after can have +/-/*/"/"
//         if (displayTextArr[displayTextArr.length - 1] === "%") {
//           display.textContent = showArrText(displayTextArr);
//         }
//       }
//       ansDisplay.textContent = "";
//       break;
//     case ".":
//       if (checkIfConsectiveSymbol(displayTextArr)) {
//         return;
//       } else {
//         displayTextArr.push(eachLetter);
//         display.textContent = showArrText(displayTextArr);
//       }
//       break;
//     case "%":
//       if (displayTextArr[displayTextArr.length - 1] === "%") {
//         return;
//       } else {
//         displayTextArr.push(eachLetter);
//         display.textContent = showArrText(displayTextArr);
//       }
//       break;
//     case "0":
//     case "1":
//     case "2":
//     case "3":
//     case "4":
//     case "5":
//     case "6":
//     case "7":
//     case "8":
//     case "9":
//       if (displayTextArr[displayTextArr.length - 1] === "%") {
//         displayTextArr.push("*");
//       }
//       displayTextArr.push(eachLetter);
//       display.textContent = showArrText(displayTextArr);
//       //after clicked equal button, then click any number digit, will reset
//       if (ansDisplay.textContent === "Ans") {
//         isReseted = true;
//         isEqualClicked = false;
//         displayTextArr.length = 0;
//         ansDisplay.textContent = "";
//         displayTextArr.push(eachLetter);
//         display.textContent = showArrText(displayTextArr);
//       }
//       break;
//   }
// }

function showArrText(arr) {
  let text = "";
  for (let i = 0; i < arr.length; i++) {
    text += arr[i];
    if (arr.length > 11) {
      //stop to push any symbol into arr, or stop eventlistner of each button
      // for (let i = 0; i < symbols.length; i++) {
      //   symbols[i].removeEventListener("click", init);
      // }
    } else if (arr.length > 9) {
      //font size of displayAns will become smaller
      display.style.fontSize = "1.5em";
    } else {
      display.style.fontSize = "2em";
    }
  }
  return text;
}

// can not input %% at the same time
function checkIfConsectiveSymbol(arr) {
  // only for the consective symbol
  // if same symbol, will not push into the arr
  if (
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

  let convertedArr = convertToNumOrSymbol(arr);
  console.log(`convertedArr = ${convertedArr}`);

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

  //[3,"+",5,"*",2,"-","3","/",3] -> return [3, "+", 10, "-", 2, "-", 1]
  let finalArr = multipleOrDivideFirst(convertedArr, "*", "/");
  console.log(`finalArr = ${finalArr}`);

  // function finalEasyCompile(finalArr, accum){

  // }

  // finalEasyCompile(finalArr)

  // Compile the result
  // newArr = [32, "+", 64, "-", 50]
  // 1. accum = 96
  // 2. accum = 96-50 = 46
  let accum = finalArr[0];
  while (i < finalArr.length) {
    let item = finalArr[i];
    // 1. if is symbol (solved)
    // 2. only can solve 個位數, 雙位, 三位數 (solved)
    // 3. 先乘除後加減 (未solve)
    console.log(`before accum = ${accum}, i = ${i}`);
    if (isNaN(item)) {
      // for "%", [10, "%", "+", 50] -> [0.1, "+", 50]
      accum = checkSymbolType(item, accum, finalArr[i + 1]);
      console.log(`When item is not "%", accum = ${accum}`);
      console.log(`run when i = ${i}`);
    }
    console.log(`accum = ${accum}, i = ${i}`);
    i++;
  }
  if (accum.countDecimals() >= 5) {
    console.log("hi?");
    accum.toFixed(5);
  }
  console.log(accum);
  displayAns(accum);
  beforeValue = accum;

  console.log(`str = ${str}`);
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
    case "%":
      return prev / 100;
      break;
  }
}

function convertToNumOrSymbol(arr) {
  let newArr = [];
  let numStr = "";

  // ["2","3","+","3","5","-","3","5"] -> [23, "+", 35, "-", 35]
  console.log(`before convert arr = ${arr}`);
  arr.map((item, index) => {
    // if item = number or "." or "%", combine to numStr
    if (!isNaN(parseFloat(item)) || item === "." || item === "%") {
      numStr += item;
      console.log(`each numStr = ${numStr}, index = ${index}`);
      if (numStr.indexOf("%") !== -1) {
        console.log(`numStr to /100 ready = ${numStr}`);
        let percentageIndex = numStr.indexOf("%");
        console.log(`percentageIndex = ${percentageIndex}`);
        //get the number before "%" symbol
        // if "5%" -> return "5"
        let numStrBeforePercentageSymbol = numStr.substring(0, percentageIndex);
        console.log(
          `numStrBeforePercentageSymbol = ${numStrBeforePercentageSymbol}`
        );
        let numStrDiv100 = "" + parseFloat(numStrBeforePercentageSymbol) / 100;
        console.log(`numStrDiv100 = ${numStrDiv100}`);
        numStr = numStrDiv100;
        console.log(`step to percentage 100, numStr = ${numStr}`);
      }
    } else {
      // 1. when i = index of symbol, push the saved numStr intro arr
      // 2. empty the numStr
      // 3. push the symbol into arr

      //if have "%" inside the string
      // **below code will convert "3%" to "3" -> should be "3%" -> "0.03"

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

function checkIfSameDotsInOneNumber(arr) {
  // can not "5.5.5";
  //false case
  // 從後到前, 第一個symbol如果係"." 就唔得, 
  for(let i=arr.length-1; i>=0; i--){
    if(isNaN(parseFloat(arr[i]))){
      if(arr[i] === "."){
        return true;
      }else{
        return false;
      }
    }
  }
}
