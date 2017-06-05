/**
 * NAME : JSPONG
 * VERSION : 1.0
 * DATE CREATED : 5th June 2017
 * LAST UPDATED : 5th June 2017
 * AUTHOR(S) : Adheesh S. Juvekar (1.0)
 */

//GAMESPEED or LEVEL
//Refresh per xth of second
const GS = 30;

// Paddle 1 and Paddle 2 position in y axis
var p1y = 0;
var p2y = 0;

// Paddle Width an height
var pw = 5; 
var ph = 120;

// Ball Dimensions
var bd = 10;

// Ball Position in x and y
var bx = bd/2;
var by = bd/2;

// x and y Speed of Ball
const XS = 8
const YS = 5

// x and y Velocity of Ball
var xv = XS;
var yv = YS;

// Scores of player 1 and 2
var score1 = 0;
var score2 = 0;

// Speed of Paddle 2 
var p2speed = 3;


window.onload = function(){
    canvas = document.getElementById('gameCanvas');
    canvasContext = canvas.getContext('2d');
    setInterval(update,1000/GS);
    canvas.addEventListener('mousemove',function(e){
        p1y = e.clientY - ph/2;
    });
}
function resetB(winFlag){
    // true if p1 has won last point
    // false if p2 has won last point
    if(winFlag){
        bx = pw + bd/2;
        by = p1y + ph/2;

        xv = XS;
        yv = YS;
    }
    else{
        bx = canvas.width - pw - bd/2;
        by = p1y + ph/2;
        xv = -XS;
        yv = -YS;
    } 
}

function update(){

    bx += xv;
    by += yv;
    
    if(by < bd/2 || by > canvas.height - bd/2){
        yv = -yv;
    }
    if(bx > canvas.width - bd/2 - pw){
        if(by > p2y && by < p2y + ph){
            // Successfull hit
            xv = -xv;
        }
        else{
            // Player 2 miss, Player 1 Scores
            score1++;
            console.log("Player 1 scored!");
            console.log("Player 1 " + score1);
            console.log("Player 2 " + score2);
            var x = true;
            resetB(x);
        }
    }
    if(bx < pw + bd/2){
        if(by > p1y && by < p1y + ph){
            // Successfull hit
            xv = -xv;
        }
        else{
            // Player 1 miss, Player 2 Scores
            score2++;
            console.log("Player 2 scored!");
            console.log("Player 1 " + score1);
            console.log("Player 2 " + score2);
            var x = false;
            resetB(x);
        }
    }

    if(p2y + ph/2<by){
        p2y += p2speed;
    }
    else{
        p2y -= p2speed;
    }

    canvasContext.fillStyle = 'black';
    canvasContext.fillRect(0,0,canvas.width,canvas.height);
    canvasContext.fillStyle = 'white';
    canvasContext.fillRect(0,p1y,pw,ph);
    canvasContext.fillRect(canvas.width-pw,p2y,pw,ph);
    canvasContext.fillRect(bx - bd/2,by - bd/2,bd,bd);
    canvasContext.fillText(score1,100,100);
    canvasContext.fillText(score2,canvas.width-100,100);


}

function mouseMove(evt){

    p1y = evt.client - ph/2;

    // switch(evt.keyCode){
    //     case 37 :
    //         p1y -= 3;
    //     break;

    //     case 39 :
    //         p1y += 3;
    //     break;
    // }

}