//odd integers
function oddIntegers(N) {
 
    let calculation = 0;

    for (let i = 0; i < N; i++) {
        calculation += 2 * i + 1;
    }
    
    console.log("The sum of the first " + N + " odd integers is: " + calculation);
}

oddIntegers(4); 

//star pyramid
function drawConsolePyramid(height) {
const baseWidth = 2 * height - 1;
for (let i=1; i<=height; i++){
   
    const pyramid = 2 * i - 1;
    const spaces = Math.floor((baseWidth - pyramid) / 2);
    const row = ' '.repeat(spaces) + '*'.repeat(pyramid);
    console.log(row)

    }
}

drawConsolePyramid(8);

//array
function multiplyArray(numbers) {
   
    let product = 1;
    for (let i = 0; i < numbers.length; i++) {
        product *= numbers[i];
       

    }

    return product;
}


const myArray = [2, 1, 1];
console.log(multiplyArray(myArray)); 
console.log(myArray.toString());


//random average
function randomAverage(n){
let sum = 0;
for (let i = 0; i < n; i++){
    let randomNumber = Math.random();
    sum += randomNumber;
}
let average = sum/n;
return average;
}

console.log(randomAverage(1));
console.log(randomAverage(10));
console.log(randomAverage(100));
console.log(randomAverage(1000));
console.log(randomAverage(10000));
console.log(randomAverage(100000));
console.log(randomAverage(1000000));