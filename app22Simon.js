//1) Keypress -> gamestart
// 2) btnflash + level1
// 3) btnPress [Event Listeners]
//               |
//     ceck (user <-> game)
//    same||        ||different
//   LevelUp       Game Over


let gameSeq = [];  //empty array
let userSeq = [];  //empty array

// Choosing random buttons
let btns = ["yellow", "red", "purple", "green"];

let started = false;  //means, game not start.
let level = 0;   //means, game not started yet.

let h2 = document.querySelector("h2");

document.addEventListener("keypress", function(){
    // console.log("game started");  //press any key on keyboard, game start
    if(started == false){
        console.log("game is started"); //start the game with press any key on keyboard
        started = true; // now, game started 
        // Level1 complete
    }

    levelUp();  //now, calling levelUp
});

function gameFlash(btn){  // the button which we have to flash it comes as an argument here.
    btn.classList.add("flash"); // adding flash class in classList
    //now remove flash class from some time
    setTimeout(function(){
        btn.classList.remove("flash");  //which remove flash class
    }, 250)                            // for 250 miliSec
}

function userFlash(btn){   //here, when user flash the button
    btn.classList.add("userflash"); 
    setTimeout(function(){
        btn.classList.remove("userflash");  //which remove flash class
    }, 250)                            // for 250 miliSec
}

function levelUp(){
    userSeq = []; //userSeq reset to empty value -> so, it restart again user cover all colors
    level++;
    h2.innerText = `Level ${level}`;
    // Now, for flashing button for some mili sec

    let randIdx = Math.floor(Math.random() * 4); //generating random number b/w 0 to 3 ->  it picks any index
    let randColor = btns[randIdx];  //by this, genearting random color
    // Now accessing, this random color class button
    let randBtn = document.querySelector(`.${randColor}`);
    // console.log(randIdx);
    // console.log(randColor);
    // console.log(randBtn);
    gameSeq.push(randColor);  //pushing random color in gameSeq
    console.log(gameSeq);
    gameFlash(randBtn);  //flashing random button
}

function checkAns(idx){
    // console.log("curr level : ", level);   //checking level

    // Now, checking userSeq === to gameSeq or not
    if (userSeq[idx] === gameSeq[idx]){
        if(userSeq.length == gameSeq.length){
            // console.log("same value");
            // last value || same value
            setTimeout(levelUp, 1000);
        }
    } else {
        h2.innerHTML = `Game Over!Your score was <b>${level}</b> <br> Press any key to start.`;
        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(function(){
            document.querySelector("body").style.backgroundColor = "white";
        }, 150);
        reset(); //when game over we reset the game
    }
}

// user press the button
function btnPress() {  // on pressing button next step starts here
    let btn = this;  //this is that button which we have pressed
    // This btn only used here, not any relation with other btn
    userFlash(btn); //calling  userflash

    // User color availabe on button
    userColor = btn.getAttribute("id");  //accessing id
    userSeq.push(userColor); //pushing userColor on userSeq


    checkAns(userSeq.length-1);  //calling checkAns for checking level
}

let allBtns = document.querySelectorAll(".btn");  //access all btns
for(btn of allBtns){
    btn.addEventListener("click", btnPress);
}

function reset(){
    started = false;  //reset sets started value false
    gameSeq = [];  //gameSeq again empty
    userSeq = [];  //userSeq reinitialized
    level = 0;
}