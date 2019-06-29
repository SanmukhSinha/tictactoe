player = ['X', 'O'];
pos = 0;
totalMatches = 5;

function resetClass(id) {
    /* Resets the class of each block used*/

    var element, name, arr;
    element = document.getElementById(id);
    arr = element.className.split(" ");
    if (arr.indexOf(name) == -1) {
        element.className = element.className.slice(0, -2);
    }
}

function setClass(id, cls) {
    /* Sets the class of the block to apply proper formatting,
     according to type of player moved*/

    var element, name, arr;
    element = document.getElementById(id);
    arr = element.className.split(" ");

    if (arr.indexOf(name) == -1) {
        element.className += " " + cls;
    }
}

function reset() {
    /* Resets the board */

    pos = 0;
    document.getElementById("xplayer").innerHTML = player[pos];
    document.getElementById("oplayer").innerHTML = "";
    document.getElementById("winner").innerHTML = "";

    for (i = 0; i < 9; i++) {

        b = document.getElementById(i.toString())
        if (b.innerHTML == "X" || b.innerHTML == "O")
            resetClass(b.id);
        b.innerHTML = "";
    }

}

function play() {
    /*Starts new game*/

    reset();
    document.getElementById("match").innerHTML = 1;
    document.getElementById("xscore").innerHTML = 0;
    document.getElementById("oscore").innerHTML = 0;
}

function checkBoard() {
    /* Checks whether match is finished or not,
    and if yes then who is the winner (or draw)*/

    b = [];
    w = 9;

    /*Sets points for block state
    X=0; 
    O=1; 
    empty=9;*/
    for (i = 0; i < 9; i++) {
        mv = document.getElementById(i.toString()).innerHTML
        if (mv == 'X')
            b[i] = 0;
        else if (mv == 'O')
            b[i] = 1;
        else
            b[i] = 9;
    }

    /*Adds points in each row, if total is
    0 : X wins; 
    1 : O wins; */
    for (i = 0; i < 3; i++) {
        sum = 0;
        for (j = 0; j < 3; j++)
            sum += b[3 * i + j];
        if (sum == 0 || sum == 3)
            return sum;
    }
    for (i = 0; i < 3; i++) {
        sum = 0;
        for (j = 0; j < 3; j++)
            sum += b[3 * j + i];
        if (sum == 0 || sum == 3)
            return sum;
    }
    sum = b[0] + b[4] + b[8];
    if (sum == 0 || sum == 3)
        return sum
    sum = b[2] + b[4] + b[6];
    if (sum == 0 || sum == 3)
        return sum;

    /*Checks if any empty block is left, 
    returns 999 if no moves left*/
    for (i = 0; i < 9; i++)
        if (b[i] == 9)
            break;

    if (i == 9)
        return 999; /* 999 = draw */
    return w;
}

function checkGame() {
    /*Checks if the game is finished */

    x = parseInt(document.getElementById("xscore").innerHTML); // X-points
    o = parseInt(document.getElementById("oscore").innerHTML); // O-points
    m = parseInt(document.getElementById("match").innerHTML); // match number

    if (m == totalMatches) {
        if (x > o)
            alert("X Wins the Game");
        else if (o > x)
            alert("O Wins the Game");
        else if (x == o)
            alert("Draw");
    } else
        document.getElementById("match").innerHTML = m + 1; // match counter
}

function move(m) {
    /*Responds to each click-move on the board 
    and prints the corresponding move */

    b = document.getElementById(m);
    if (b.innerHTML != "X" && b.innerHTML != "O" && b.innerHTML != " ") {
        /*Prevents overriding existing moves */

        b.innerHTML = player[pos];
        setClass(m, player[pos]);

        if (pos) {
            pos = 0;
            document.getElementById("xplayer").innerHTML = "X";
            document.getElementById("oplayer").innerHTML = "";
        } else {
            pos = 1;
            document.getElementById("oplayer").innerHTML = "O";
            document.getElementById("xplayer").innerHTML = "";
        }

        w = checkBoard();
        if (w == 0) {
            document.getElementById("winner").innerHTML = "X Wins";
            s = parseInt(document.getElementById("xscore").innerHTML);
            document.getElementById("xscore").innerHTML = s + 1;

        } else if (w == 3) {
            document.getElementById("winner").innerHTML = "O Wins";
            s = parseInt(document.getElementById("oscore").innerHTML);
            document.getElementById("oscore").innerHTML = s + 1;

        } else if (w == 999) {
            document.getElementById("winner").innerHTML = "Draw";

        }

        if (w == 999 || w == 0 || w == 3) {
            for (i = 0; i < 9; i++) {
                b = document.getElementById(i.toString())
                if (b.innerHTML == "")
                    b.innerHTML = " ";
            }

            setTimeout(function () {
                reset();
            }, 1000);

            setTimeout(function () {
                checkGame();
            }, 1100);
        }
    }
}

document.getElementById("play").onsubmit = function (event) {
    event.preventDefault();
    play();
};

window.onload = function () {
    play();
};