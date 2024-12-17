
class ButtonHandler {
    constructor(buttonElementId){
        this.buttonElement = document.getElementById(buttonElementId);
        this.buttonElement.addEventListener("click", this);
        document.getElementById("root").appendChild(this.buttonElement);
     }

     handleEvent(event){
        alert("Hello World");

     }
  
    }
    


export default ButtonHandler;