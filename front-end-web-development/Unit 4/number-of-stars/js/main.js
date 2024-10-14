

  // Declare variables
  let numberOfStars = 0;
  let outputStars = '';


  // inputs
  numberOfStars = prompt("Enter the number of stars?");


 // loop
 while(isNaN(numberOfStars) || numberOfStars <=0){
    alert("You did not enter a number greater than zero");
    numberOfStars = prompt("Enter a number greater than zero?");
 }
 
  for (let i=0; i < numberOfStars; i++ ) {
    outputStars += "*";
 }


 // output 
 alert("Outputting " + numberOfStars + " stars: " + outputStars)

