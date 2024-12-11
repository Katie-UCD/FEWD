document.addEventListener("DOMContentLoaded", function(){
    console.log('loaded');
})

class Animal{
    constructor(name, diet, legsNum){
        this.name = name;
        this.diet = diet;
        this.legsNum = legsNum;
    }
    introdce(){
        console.log(this.name + ' eats ' + this.diet + ' and has ' + this.legsNum + ' legs');
    }
}

class Mammal extends Animal{
    introdce(){
        console.log(this.name + ' eats ' + this.diet + ' and has ' + this.legsNum + ' legs' + ' and is warm blooded with fur or hair');
    }
}

class Reptile extends Animal{
    introdce(){
        console.log(this.name + ' eats ' + this.diet + ' and has ' + this.legsNum + ' legs' + ' and is cold blooded with scales and lays eggs');
    }
}

class Fish extends Animal{
    introdce(){
        console.log(this.name + ' eats ' + this.diet + ' and has ' + this.legsNum + ' legs' + ' and lives underwater');
    }
}

class Bird extends Animal{
    introdce(){
        console.log(this.name + ' eats ' + this.diet + ' and has ' + this.legsNum + ' legs' + ' and is warm blooded with wings and feathers and lays eggs');
    }
}

class Enclosure{
    constructor(name, length, width, height, location){
        this.length = length;
        this.width = width;
        this.location = location;
        this. height = height;
        this.name = name;
    }
    enclosuredetails(){
    console.log('The required enclosure for the '+ this.name + ' is ' + this.length +' meters long, ' + this.width + ' meters wide, ' + this.height + ' meters tall, and is located ' + this.location);
}
}

const lion = new Mammal("Lion", "meat", 2);
lion.introdce();

const snake = new Reptile("Cobra", "mice", 0);
snake.introdce();

const bird = new Bird("Robin", "bugs", 2);
bird.introdce();

const fish = new Fish("Cod", "crusteaceans", 0);
fish.introdce();

const aviary = new Enclosure("aviary", 5, 5, 2, "outside");
aviary.enclosuredetails();

const reptleHouse = new Enclosure("Reptile House", 35, 35, 10, "inside");
reptleHouse.enclosuredetails();

const savanah = new Enclosure("Savannah", 50, 100, 30, "outside");
savanah.enclosuredetails();