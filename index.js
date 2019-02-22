"use strict";
var holder = document.querySelectorAll(".holder");
console.log(holder)
var images = ["1.png","2.png","3.png","4.png","5.png","6.png","7.png","8.png","9.png","10.png"];



var randomized = []
while(randomized.length < 20){
    var num = Math.floor(Math.random()*10) + 1;
    if(randomized.indexOf(num) === -1) randomized.push(num)
	else {
		var arr2 = randomized.filter(value => value == num)
		if (arr2.length < 2)
			randomized.push(num);
    }
		
}

console.log(randomized);

var objImages = {
    images: [],
    count: 0,
    tempIndex: "",
    tempIndex2: ""
};

holder.forEach(function(imgHolder,i) {
    imgHolder.innerHTML = "<img src='images/defaultIcon.png' class='image'>";
    imgHolder.innerHTML += `<img src='images/${randomized[i]}.png' class=imgHide>`;
    
    imgHolder.addEventListener("click", handleClick);
    //        
            
    //     }
    // })
    
})

function handleClick() {
    console.log(this.id);
    objImages.count++;
    objImages.images.push(this);

    this.className +=" spin";
    
    console.log(this.children[1].classList)

    setTimeout(() => {
        this.children[1].classList.remove("imgHide")//.innerHTML = `<img src=images/${randomized[index]}.png class=image>`;
        this.children[0].classList.add("imgHide")
    }, 500)

    console.log(`index ${this.id - 1}`, "random "+randomized[this.id - 1], "count"+objImages.count, "arr"+objImages.images.length);
    if (objImages.count === 1) {
        objImages.tempIndex = randomized[this.id - 1];
        console.log(".....",objImages.tempIndex)
    }
    else if (objImages.count === 2) {
        objImages.tempIndex2 = randomized[this.id - 1];
        if (objImages.tempIndex !== objImages.tempIndex2) {
            setTimeout(() => { 
                 objImages.images.forEach(function (openedImage) {
                    openedImage.classList.remove("spin");
                    openedImage.children[1].classList.add("imgHide");
                    openedImage.children[0].classList.remove("imgHide")
                    //openedImage.innerHTML = "<img src='images/defaultIcon.png' class='image'>";
                })
                objImages.count = 0;
                objImages.images = [];
            }, 1000)
               
            
        }
        else {
            objImages.images.forEach(function (openedImage) {
                openedImage.removeEventListener("click",handleClick)
                
                console.log("ttttt",objImages.images.length, objImages.count)
            })
            objImages.count = 0;
            objImages.images = [];
            console.log("tt8888",objImages.images.length, objImages.count)
        }
    }
    
    
}
