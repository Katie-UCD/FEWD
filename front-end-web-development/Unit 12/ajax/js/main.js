document.addEventListener("DOMContentLoaded", function() {

   async function newDog(){ 
    const url_server = "https://dog.ceo/api/breeds/image/random";
    
    const result = await fetch(url_server);
    if(result.ok){
        const dog = await result.json();
        document.getElementById('content').src = dog.message; //change this for right api
    }
    else{
        console.error(result.statusText);
    }
}

document.getElementById("newDogBtn").addEventListener("click", newDog);

newDog();
});


 
