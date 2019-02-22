"use strict";
var holder = document.querySelectorAll(".holder");
var reset = document.querySelector("#reset");

reset.addEventListener("click", resetGame);

var randomized = []


console.log(randomized);

var objImages = {
    images: [],
    count: 0,
    tempIndex: "",
    tempIndex2: "",
    score: 0
};

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
}

function handleClick() {
    objImages.count++;
    objImages.images.push(this);
    objImages.score += 5;

    this.className +=" spin";

    setTimeout(() => {
        this.children[1].classList.remove("imgHide")
        this.children[0].classList.add("imgHide")
    }, 500)

    if (objImages.count === 1) {
        objImages.tempIndex = randomized[this.id - 1];
    }
    else if (objImages.count === 2) {
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
            })
            objImages.count = 0;
            objImages.images = [];
        }
    }
    
    
}
