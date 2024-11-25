function calculateFactorial(){
    let input = parseInt(prompt("Enter a number greater than 1 and less than 20"));
    
    if(isNaN(input) || input < 1 || input >20){

        console.error('invalid input');
        return
    }
    function factorial(n){
        let result = 1;
        for(let i = 1; i <= n; i++){
            result *=i;
        }
        return result;
    }

    for(let i = 1; i <= input; i++){
        console.log(`${i} != ${factorial(i)}`);
    }
    
}


calculateFactorial();