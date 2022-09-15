const themeSwitchButtons=document.querySelectorAll(".switch");
const numberButtons=document.querySelectorAll("[data-button-type=number]");
const operationButtons=document.querySelectorAll("[data-button-type=operation]");
const resetAllButton=document.querySelector("[data-button-type=reset]");
const equalsButton=document.querySelector("[data-button-type=equal]");
const deleteButton=document.querySelector("[data-button-type=delete]");
let previewSpan=document.querySelector(".number-preview");
let textField=document.querySelector("[data-input=number]");
let previousVal="";
let currentVal="";
// add event for the switch buttons
themeSwitchButtons.forEach((theme)=>{theme.addEventListener("click",switchTheme)});

function switchTheme(e){
themeSwitchButtons.forEach((item)=>{
    item.classList.remove("active-span");
    if(item===e.target){
        item.classList.add("active-span");
        
    }
    if(themeSwitchButtons[0]==e.target){
        document.querySelectorAll("link")[2].setAttribute("href","./css/darkTheme.css");
    }
else if(themeSwitchButtons[1]==e.target){
        document.querySelectorAll("link")[2].setAttribute("href","./css/lightTheme.css");
    }
   else if(themeSwitchButtons[2]==e.target){
        document.querySelectorAll("link")[2].setAttribute("href","./css/neonTheme.css");
    }
})
}


// calculator class
class Calculator{
    constructor(previousOperand,currentOperand){
        this.previousOperand=previousOperand;
        this.currentOperand=currentOperand;
        this.reset();
    }
appendNumber(number){
    if (number === '.' && this.currentOperand.includes('.')) return;
this.currentOperand+=number;
// this.updateDisplay(this.currentOperand);
// console.log(this.currentOperand);
}
operationsSelector(operation){
    if (this.currentOperand === '') return;
    if (this.previousOperand !== '') {
        this.compute();
        }
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = '';
    }
compute() {
        let computation;
        let prev=parseFloat(this.previousOperand);
        let current=parseFloat(this.currentOperand);
        if (isNaN(prev) || isNaN(current)) 
        {return;}
        switch(this.operation){
        case "+":
        computation=prev+current;
        break;
        case "-":
        computation=prev-current;
        break;
        case "/":
        computation=prev/current;
        break;
        case "x":
        computation=prev*current;
        break;
        default:
            return;
        }
        this.currentOperand= computation;
        this.previousOperand="";
        this.operation=undefined;
    }
    delete(){
        if(this.currentOperand==""){
            return;
        }
        this.currentOperand=this.currentOperand.slice(0,-1);
        
    }
    reset(){
        this.currentOperand="";
        this.previousOperand="";
        this.operation=undefined;
    }
    updateDisplay(){
        textField.value = this.getDisplayNumber(parseFloat(this.currentOperand))
      if (this.operation != null) {
        previewSpan.innerText =
          `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`
      } else {
        previewSpan.innerText = ''
      }
    }
    getDisplayNumber(number) {
        const stringNumber = number.toString()
        const integerDigits = parseFloat(stringNumber.split('.')[0])
        const decimalDigits = stringNumber.split('.')[1]
        let integerDisplay
        if (isNaN(integerDigits)) {
          integerDisplay = '0';
        } else {
          integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 });
        }
        if (decimalDigits != null) {
          return `${integerDisplay}.${decimalDigits}`
        } else {
          return integerDisplay
        }
    }
    

}
// instantiate new calculator object
const calculator=new Calculator(previousVal,currentVal);
// give event listener to the numbered buttons
numberButtons.forEach((numberButton)=>{
 
    numberButton.addEventListener("click",() => {
        calculator.appendNumber(numberButton.value);
  
        calculator.updateDisplay();
  
    })
    });
    // give event listener to the delete buttons
deleteButton.addEventListener("click",()=>{
    calculator.delete();
    calculator.updateDisplay();
})
// give event listener to the operations buttons
operationButtons.forEach(operationButton=>{
    operationButton.addEventListener("click",()=>{
        calculator.operationsSelector(operationButton.value);
        calculator.updateDisplay();
        
    })
})
// equals to event
equalsButton.addEventListener("click",()=>{
calculator.compute();
calculator.updateDisplay();
})
// reset button event
resetAllButton.addEventListener("click",()=>{
    calculator.reset();
    calculator.updateDisplay();
})
/*
KEYBOARD EVENTS
*/
document.body.addEventListener("keydown",(e)=>{
    let keys=event.key.toLowerCase();
  
    // let numKey=Number(keys);
    // if(!isNaN(){
        numberButtons.forEach((numberButton)=>{
            if(numberButton.value==keys){
    calculator.appendNumber(keys);
    calculator.updateDisplay();  

    numberButton.style.transform="translateY(5px)"
    setTimeout(()=>{
        numberButton.style.transform="translateY(0)"

    },100);
}
  })      
    // }
     if(keys==="backspace"){
        calculator.delete();
        calculator.updateDisplay();      

        deleteButton.style.transform="translateY(5px)"
        setTimeout(()=>{
            deleteButton.style.transform="translateY(0)"
    
        },100);
    }
    else if(keys==="+" ||keys==="-"||keys==="/"|| keys==="x"){
        calculator.operationsSelector(keys.toLowerCase());
        calculator.updateDisplay();
        operationButtons.forEach((operationButton)=>{
            if(operationButton.value==keys.toLowerCase()){
            
                operationButton.style.transform="translateY(5px)"
                setTimeout(()=>{
                    operationButton.style.transform="translateY(0)"
            
                },100);
            }
              })      
    }
    else if(keys==="*"){
        calculator.operationsSelector("x");
        calculator.updateDisplay();
        operationButtons.forEach((operationButton)=>{
            if(operationButton.value=="X".toLowerCase()){
            
                operationButton.style.transform="translateY(5px)"
                setTimeout(()=>{
                    operationButton.style.transform="translateY(0)"
            
                },100);
            }
              })      
    }
    else if(keys==="enter" || keys==="="){
        calculator.compute();
        calculator.updateDisplay();
                equalsButton.style.transform="translateY(5px)"
        setTimeout(()=>{
            equalsButton.style.transform="translateY(0)"
    
        },100);
    }
    // textField+=
})