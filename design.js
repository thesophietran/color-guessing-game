var message = document.querySelector("#message"); 
var h1Bgrd = document.querySelector("h1"); 
var allSquares = document.querySelectorAll(".square"); 
var newColorsBtn = document.querySelector("button"); 
var hardBtn = document.querySelectorAll("button")[2]; 
var easyBtn = document.querySelectorAll("button")[1];
var droppedSqr = document.getElementsByClassName("dropped"); 
var keptSqr = document.getElementsByClassName("kept");
var numSqr = 6; //Variable to track what difficulty mode we're on 

function getRandomColor() {
    //Randomize an rgb value
    var r = Math.floor(Math.random()*256);          // Random between 0-255
    var g = Math.floor(Math.random()*256);          // Random between 0-255
    var b = Math.floor(Math.random()*256);          // Random between 0-255
    var rgb = 'rgb(' + r + ', ' + g + ', ' + b + ')'; // Collect all to a string
    return rgb; 
}

function setSquareColor(square) {
    //Randomize color for the square array
    //square is an object 
    for (var i=0; i<square.length; i++) {
        square[i].style.backgroundColor = getRandomColor(); 
    }
}

function displayPickedColor(square) {
    //Select a color and display the picked color value on h1
    var pickedColor = square[Math.floor(Math.random() * square.length)].style.backgroundColor;
    var displayColor = document.querySelector("#displayColor");
    displayColor.textContent = pickedColor; 
}

function guessingColor(square) {
    //If click on the right square: change color of all other squares, and print out CORRECT on whiteBar 
    //If click on the wrong square: make the square disappear and print out TRY AGAIN on whiteBar 
    for (var i=0; i<square.length; i++) {
        square[i].addEventListener("click", function() {
            if (this.style.backgroundColor === displayColor.textContent) {
                //console.log("CORRECT!"); 
                message.textContent = "CORRECT!"; 
                newColorsBtn.textContent = "PLAY AGAIN?"; 
                setSameColor(square); 
            }
            else {
                //console.log("WRONG!"); 
                message.textContent = "TRY AGAIN!"; 
                this.style.backgroundColor = "#36383a"; 
            }
        }); 
    }
}

function setSameColor(square) {
    //When the guess is correct, set all squares and h1 to the correct color 
    for (var i=0; i<square.length; i++) {
        square[i].style.backgroundColor = displayColor.textContent; 
    }
    h1Bgrd.style.backgroundColor = displayColor.textContent;
}

//BROWSER OPEN: 6 SQUARE MODE
function init(square) {
    //Initialize the game in the 6 square mode
    message.textContent = ""; 
    newColorsBtn.textContent = "New Colors"; 
    setSquareColor(square);
    displayPickedColor(square); 
    guessingColor(square); 
    displaySqr(square);
}

init(allSquares); 

//NEW COLORS BUTTON
newColorsBtn.addEventListener("click", function() {
    resetH1(); 
    if (numSqr === 3) {
        init(keptSqr); 
    }
    else if (numSqr === 6) {
        init(allSquares); 
    }
}); 

function resetH1() {
    //Change color of h1 background to the original color
    h1Bgrd.style.backgroundColor = "#4178a8";
}

//HARD BUTTON
hardBtn.addEventListener("click", function() {
    //console.log("HARD CLICKED"); 
    hardBtn.classList.add("selected"); 
    easyBtn.classList.remove("selected"); 
    init(allSquares);
    resetH1(); 
    numSqr = 6; 
}); 

//EASY BUTTON 
function hideSqr(square) {
    //Hide the bottom three squares
    for (var i=0; i<square.length; i++) {
        square[i].style.display = "none"; 
    }
}

function displaySqr(square) {
    //Display the bottom three squares
    for (var i=0; i<square.length; i++) {
        square[i].style.display = "block"; 
    }
}

easyBtn.addEventListener("click", function() {
    //console.log("EASY CLICKED"); 
    easyBtn.classList.add("selected"); 
    hardBtn.classList.remove("selected"); 
    hideSqr(droppedSqr); 
    init(keptSqr); 
    resetH1();
    numSqr = 3; 
});


