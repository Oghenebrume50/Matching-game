"use strict";
var holder = document.querySelectorAll(".holder");
var reset = document.querySelector("#reset");
var timeCounter = document.querySelector("#timeCounter");
var clicksCounter = document.querySelector("#clicksCounter");
reset.addEventListener("click", resetGame);

var randomized = []

var resolved = [];

console.log(randomized);

var objImages = {
    images: [],
    count: 0,
    tempIndex: "",
    tempIndex2: "",
    score: 0,
    timeElapsed: 0,
    clicks: 0
};

function gameOver() {
    if (resolved.length !== 0 && resolved.length === randomized.length ) {
        console.log("gameOver");
    }
}

gameOver();

setInterval(function () {
    objImages.timeElapsed += 1;
    timeCounter.innerHTML = objImages.timeElapsed;
},1000)

function init () {
    while(randomized.length < 20){
        var num = Math.floor(Math.random()*10) + 1;
        if(randomized.indexOf(num) === -1) randomized.push(num)
        else {
            var arr2 = randomized.filter(value => value == num)
            if (arr2.length < 2)
                randomized.push(num);
        }
            
    }

    holder.forEach(function(imgHolder,i) {
        imgHolder.innerHTML = "<img src='images/defaultIcon.png' class=''>";
        imgHolder.innerHTML += `<img src='images/${randomized[i]}.png' class=imgHide>`;
        imgHolder.classList.remove("spin");
        
        
        imgHolder.addEventListener("click", handleClick);
    })
}

init();

function resetGame () {
    randomized = [];
    
    init();
    
    objImages.images = [];
    objImages.count = 0;
    objImages.tempIndex = "";
    objImages.tempIndex2 = "";
    objImages.score = 0;
    objImages.clicks = 0;
    objImages.timeElapsed = 0;

    clicksCounter.innerHTML = objImages.clicks;
}

function handleClick() {
    objImages.count++;
    objImages.images.push(this);
    objImages.score += 5;
    objImages.clicks += 1;

    clicksCounter.innerHTML = objImages.clicks;
    

    this.className +=" spin";

    setTimeout(() => {
        this.children[1].classList.remove("imgHide")
        this.children[0].classList.add("imgHide")
    }, 500)

    if (objImages.count === 1) {
        objImages.tempIndex = randomized[this.id - 1];
        objImages.images[objImages.images.length - 1].removeEventListener("click",handleClick);
    }
    else if (objImages.count === 2) {
        objImages.images[objImages.images.length - 2].addEventListener("click",handleClick);
        objImages.tempIndex2 = randomized[this.id - 1];
        if (objImages.tempIndex !== objImages.tempIndex2) {
            setTimeout(() => { 
                 objImages.images.forEach(function (openedImage) {
                    openedImage.classList.remove("spin");
                    openedImage.children[1].classList.add("imgHide");
                    openedImage.children[0].classList.remove("imgHide")
                })
                objImages.count = 0;
                objImages.images = [];
            }, 700)
               
            
        }
        else {
            objImages.images.forEach(function (openedImage) {
                openedImage.removeEventListener("click",handleClick)
                resolved.push(openedImage);
            })
            objImages.count = 0;
            objImages.images = [];
            gameOver();
        }
    }
    
    
}
