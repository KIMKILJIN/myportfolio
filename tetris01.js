let row      = 22;   
let col      = 12;   
let colorList = ["black", "green", "red", "purple", "orange", "blue", "yellow", "skyblue", "wall", "black"];
let $table = document.createElement("table");
let dataList2 = [];
let dataList = [];   
let curY = 0;    
let curX = 0;   
let curBlock = null;
let gameover = false;
let intervalId = null;
let color = null;
let r = 0;
let gameScore = 0;
let holdBlock = null;
let lv = [2, 3, 4, 5, 6, 7, 8, 9, 10];
let line = [10, 20, 30, 40, 50, 60, 70, 80];
let level = [900, 750, 600, 450, 300, 150, 100, 90, 80]
let $hold = document.querySelector("#hold");





function init() {

    $table.id = "myTetris"
    for(i = 0; i < row; i++) {
        let $tr = document.createElement("tr");
        for(j = 0; j < col; j++) {
            let $td = document.createElement("td");
            $tr.append($td);
        }
        $table.append($tr);
    }


    document.querySelector("#tetrisCenter").append($table)

    for(i = 0; i < row; i++) {
        let temp = [];
        for(j = 0; j < col; j++) {
            temp.push(0);
        }
        dataList.push(temp)
    }

    for(i = 0; i < row; i++) {
        dataList[i][0] = 8;
        dataList[i][col -1] = 8
    }
    for(i = 0; i < col; i++) {
        dataList[0][i] = 8;
        dataList[row - 1][i] = 8
    }

    for(i = 0; i < dataList.length; i++) {
        for(j = 0; j < dataList[i].length; j++) {
            if(dataList[i][j] == 8) {
                $table.children[i].children[j].setAttribute("class", "wall");
            }
        }
    }
    r = Math.floor(Math.random() * blockList.length);
    copy()
    
} 
intervalId = setInterval(play, 1000);

let blockList = [
    {
        name: "s",
        color: 1,
        shape: [
            [0, 0, 0],
            [0, 1, 1],
            [1, 1, 0]
        ]
    },
    {
        name: "z",
        color: 2,
        shape: [
            [0, 0, 0],
            [1, 1, 0],
            [0, 1, 1]
        ]
    },
    {
        name: "t",
        color: 3,
        shape: [
            [0, 0, 0],
            [1, 1, 1],
            [0, 1, 0]
        ]
    },
    {
        name: "l",
        color: 4,
        shape: [
            [0, 1, 0],
            [0, 1, 0],
            [0, 1, 1]
        ]
    },
    {
        name: "j",
        color: 5,
        shape: [
            [0, 1, 0],
            [0, 1, 0],
            [1, 1, 0]
        ]
    },
    {
        name: "o",
        color: 6,
        shape: [
            [1, 1],
            [1, 1]
        ]
    },
    
    {
        name: "i",
        color: 7,
        shape: [
            [0, 0, 0, 0],
            [1, 1, 1, 1],
            [0, 0, 0, 0],
            [0, 0, 0, 0]
        ]
    },
]
let r2 = 0;
let nextBlock = null;
function randomBlock() {
    
    curY = 1;
    curX = 4;

    r2 = Math.floor(Math.random() * blockList.length);
    
    curBlock = blockList[r];
    nextBlock = blockList[r2];
    let shape = curBlock.shape;
    checkGameOver();
    for(i = 0; i < shape.length; i++) {
        for(j = 0; j < shape[i].length; j++) {
            if(shape[i][j] == 1) {
                dataList[i + curY][curX + j] = curBlock.color;
            }
        }
    }
    color = colorList[r];
    
    r = r2;
    
    printNextBlock();
}

function skin() {
    for(i = 0; i < dataList.length; i++) {
        for(j = 0; j < dataList[i].length; j++) {
            $table.children[i].children[j].setAttribute("class", colorList[dataList[i][j]])
        }
    }
}

function copy() {
    for(i = 0; i < dataList.length; i++) {
        let temp2 = [];
        for(j = 0; j < dataList[i].length; j++) {
            temp2.push(dataList[i][j])
        }
        dataList2[i] = temp2
    }

}

function pauseKey(e) {
    if(e.code == "KeyP") {
        pause();
    }   
}

function key(e)  {
    let key = e.code;
    
    if(e.code == "ArrowLeft") {
        leftEvent();
    }
    else if(e.code == "ArrowRight") {
        rightEvent();
    }
    else if(e.code == "ArrowDown") {
        gameScore += 1;
        if(downEvent() == false) {
            randomBlock();
        }
    }
    else if(e.code == "ArrowUp") {
        change();
    }
    else if(e.code == "Space") {
        while(downEvent()) {
            gameScore += 2;
        }
        del()
        randomBlock();
    }
    else if(e.code == "KeyC") {
        hold();
    }   
    
    skin()
    document.querySelector("#score").innerText = gameScore;

}
let tempBlock = null;
function hold() {
    let shape = curBlock.shape;

    if(tempBlock == null) {
        tempBlock = curBlock;
        for(i = 0; i < dataList.length; i++) {
            for(j = 0; j < dataList[i].length;j++) {
                dataList[i][j] = dataList2[i][j]
            }
        }
        randomBlock();
    }
    else {
        for(i = 0; i < dataList.length; i++) {
            for(j = 0; j < dataList[i].length;j++) {
                dataList[i][j] = dataList2[i][j]
            }
        }
        
        let tempB = tempBlock
        tempBlock = curBlock;
        curBlock = tempB;
        
        curX = 4;
        curY = 1;
        for(i = 0; i < curBlock.shape.length; i++) {
            for(j = 0; j < curBlock.shape[i].length; j++) {
                if(curBlock.shape[i][j] == 1) {
                    dataList[i + curY][curX + j] = curBlock.color;
                }
            }
        }
    }


    printHoldBlock();
}
function printHoldTable() {
    for(i = 0; i < 4; i++) {
        let $tr = document.createElement("tr");
        for(j = 0; j < 4; j++) {
            let $td = document.createElement("td");
            $tr.append($td);
        }
        $hold.append($tr)
    }
}
function printHoldBlock() {

    $hold.innerHTML = "";
    let $table = document.createElement("table")
    for(i = 0; i < tempBlock.shape.length; i++) {
        let $tr = document.createElement("tr");
        for(j = 0; j < tempBlock.shape[i].length; j++) {
            let $td = document.createElement("td");
            $tr.append($td);
        }
        $hold.append($tr)
    }
    for(i = 0; i < tempBlock.shape.length; i++) {
        for(j = 0; j < tempBlock.shape[i].length; j++) {
            if(tempBlock.shape[i][j] == 1) {
                $hold.children[i].children[j].setAttribute("class", colorList[tempBlock.color])
            }
        } 
    }

}




function leftEvent() {
    let nextY = 0;
    let nextX = -1;
    let shape = curBlock.shape;

    let pos = realPos(shape);
    let moveCheck = check(pos, nextY, nextX)
    if(moveCheck) {
        setData(pos, 0, 0, 0);
        setData(pos, nextY, nextX, curBlock.color);
        curX -= 1;
    }
}
function rightEvent() {
    let nextY = 0;
    let nextX = 1;
    let shape = curBlock.shape;

    let pos = realPos(shape);
    let moveCheck = check(pos, nextY, nextX)
    if(moveCheck) {
        setData(pos, 0, 0, 0);
        setData(pos, nextY, nextX, curBlock.color);
        curX += 1;
    }
}

function downEvent() {
    let nextY = 1;
    let nextX = 0;
    let shape = curBlock.shape;
    
    let pos = realPos(shape);
    let moveCheck = check(pos, nextY, nextX);
    if(moveCheck) {
        setData(pos, 0, 0, 0);
        setData(pos, nextY, nextX, curBlock.color);
        curY += 1;
    }
    else {
        setData(pos, 0, 0, curBlock.color);
        del();
        copy();
    }

    return moveCheck;

}


function realPos(shape) { 
    let pos = [];
    for(i = 0; i < shape.length; i++) {
        for(j = 0; j < shape[i].length; j++) {
            if(shape[i][j] == 1) {
                pos.push([curY + i, curX + j])
            }
        }
    }
        return pos;
}

function check(pos, nextY, nextX) {

    for(i = 0; i < pos.length; i++) {
            if(dataList2[pos[i][0] + nextY][pos[i][1] + nextX] != 0) {
                return false;
            }
    }
    return true;
}

$nextBlock = document.querySelector("#next");

function printNextBlock() {
    $nextBlock.innerHTML = "";
    let $table = document.createElement("table")
    for(i = 0; i < nextBlock.shape.length; i++) {
        let $tr = document.createElement("tr");
        for(j = 0; j < nextBlock.shape[i].length; j++) {
            let $td = document.createElement("td");
            $tr.append($td);
        }
        $nextBlock.append($tr)
    }
    for(i = 0; i < nextBlock.shape.length; i++) {
        for(j = 0; j < nextBlock.shape[i].length; j++) {
            if(nextBlock.shape[i][j] == 1) {
                $nextBlock.children[i].children[j].setAttribute("class", colorList[nextBlock.color])
            }
        } 
    }
    

    
}

function setData(pos, nextY, nextX, color) {
    for(let i=0; i<pos.length; i++) {
        let y = pos[i][0];
        let x = pos[i][1];

        dataList[y + nextY][x + nextX] = color;
    }

}

function change() {
    let shape = curBlock.shape;
    let nextShape = changeShape(shape);
    let a = realPos(shape);
    let b = realPos(nextShape);

    let check2 = check(realPos(nextShape), 0, 0)

    if(check2) {
        setData(realPos(shape), 0, 0, 0)
        setData(realPos(nextShape), 0, 0, curBlock.color)
        curBlock.shape = nextShape;
    }
}

function changeShape(shape) {
    let temp = []

    for(i = 0; i < shape.length; i++) {
       temp2 = []
       for(j = 0; j < shape[i].length; j++) {
            temp2.push(0);
       }
       temp.push(temp2);
    }
    
    for(i = 0; i < shape.length; i++) { 
        for(j = 0; j < shape[i].length; j++) {
            temp[j][shape.length - i - 1] = shape[i][j];
        }
    }

    return temp;
}
let delLine = 0;


function del() {
    let delCount = 0;
    for(i = 1; i < dataList.length - 1; i++) {
        let count = 0;
        for(j = 1; j < dataList[i].length - 1; j++) {
            if(dataList[i][j] > 0) {
                count++;
                if(count == 10) {
                    dataList.splice(i, 1)
                    dataList.splice(0, 1)

                    dataList.unshift([8,0,0,0,0,0,0,0,0,0,0,8]);
                    dataList.unshift([8,8,8,8,8,8,8,8,8,8,8,8]);
                    delCount++;
                    delLine++;
                }
            }
        }
    }

    if(delCount == 1) {
        gameScore += 100;
    }
    else if(delCount == 2) {
        gameScore+= 300;
        
    }
    else if(delCount == 3) {
        gameScore += 500;
        
    }
    else if(delCount == 4) {
        gameScore += 800;
        
    }
    
    document.querySelector("#score").innerText = gameScore;
    skin()
    document.querySelector("#line").innerText = delLine;
    LVindex = -1;
    for(i = 0; i < lv.length; i++) {
        if(delLine >= line[i]) {
            LVindex = i;
        }
    }
    if(LVindex != -1) {
        document.querySelector("#lv").innerText = lv[LVindex];
        clearInterval(intervalId)

        intervalId = setInterval(play, level[LVindex])
    }

}
let LVindex = -1;

function play() {
    if(gameover == true) {
        clearInterval(intervalId);

        alert("게임종료");
        reset();
        init();
        randomBlock();
        skin();

        return
    }

    if(downEvent() == false) {
        del();
        randomBlock();
    }
    skin()
}

function checkGameOver() {
    let realBlock = realPos(curBlock.shape);

    for(i = 0; i < realBlock.length; i++) {
        if(dataList[realBlock[i][0]][realBlock[i][1]] != 0) {
            gameover = true;
            break;
        }
    }
}
let pauseCheck = false;
function pause() {
    if(pauseCheck == false) {
        clearInterval(intervalId);
        pauseCheck = true;
        window.removeEventListener("keydown", key);
        document.querySelector("#pause").style.display = "block";
        
        
    }
    else {
        if(intervalId != null) {
            clearInterval(intervalId);
        }
        if(LVindex == -1) {
            intervalId = setInterval(play, 1000);
            pauseCheck = false;
        }
        else {
            intervalId = setInterval(play, level[LVindex]);
            pauseCheck = false;
        }
        window.addEventListener("keydown", key)
        document.querySelector("#pause").style.display = "none";
        
    }
}

function reset() {
    dataList = [];
    curY = 0;
    curX = 0;
    curBlock = null;
    gameover = false;
    intervalId = null;
    gameScore = 0;
    tempBlock = null;
    $hold.innerText = ""
    delLine = 0;
    pauseCheck = false;
    LVindex = -1;


    document.querySelector("#score").innerText = 0;
    document.querySelector("#lv").innerText = 1;
    document.querySelector("#line").innerText = 0;


    if(document.querySelector("#myTetris") != null) {
        $table.innerHTML = "";
    }
    intervalId = setInterval(play, 1000);
    printHoldTable();


}



window.addEventListener("keydown", key)
window.addEventListener("keydown", pauseKey)
init();
randomBlock();
skin();

