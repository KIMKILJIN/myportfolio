let size = 8;   
let dataList = [];  
let $chess = document.querySelector("#chess");
$chess.id = "chess";
let $table = document.createElement("table");
let chessList2 = [10, 11, 12, 13, 14, 15, 50, 51, 52, 53, 54, 55];
let pieces = ["♙", "♖", "♘", "♗", "♕", "♔", "♟", "♜", "♞", "♝", "♛", "♚"]; 
let promotionPiecesP1 = ["♖", "♘", "♗", "♕"];
let promotionPiecesP2 = ["♜", "♞", "♝", "♛"];
let board = ["beige", "brown"];
let turn = true;
let me = 0;
let you = 0;
let p1King = false;
let p2King = false;
let p1Rook1 = false;
let p1Rook2 = false;
let p2Rook1 = false;
let p2Rook2 = false;


// 초기화
function init() {

    dataList = [
        [51, 52, 53, 54, 55, 53, 52, 51],
        [50, 50, 50, 50, 50, 50, 50, 50],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [10, 10, 10, 10, 10, 10, 10, 10],
        [11, 12, 13, 14, 15, 13, 12, 11]
    ];

    for(let i=0; i<size; i++) {
        let temp = [];
        let $tr = document.createElement("tr");
        for(let j=0; j<size; j++) {
            let $td = document.createElement("td");
            $tr.append($td);
            $td.addEventListener("click", moveEvent)
            temp.push(0);
        }
        $table.append($tr);
    }
    $chess.append($table);

    skin();
    boardSkin();
    printTurn(turn);
}

function move(check) {
    if(check == 0) {
        pawn(i, j, me);
    }
    else if(check == 1) {
        rook(i, j, me, you);
    }
    else if(check == 2) {
        knight(i, j, me);
    }
    else if(check == 3) {
        bishop(i, j, me, you);
    }
    else if(check == 4) {
        rook(i, j, me, you);
        bishop(i, j, me, you);
    }
    else if(check == 5) {
        king(i, j, me);
        checkKing();
        checkRook();
        castling();
        castlingRook();
    }
}

function boardSkin() {
    for(i = 0; i < size; i++) {
        for(j = 0; j < size; j++) {
            if(i % 2 == 0) {
                if(j % 2 == 0) {
                    $table.children[i].children[j].setAttribute("class", "beige")
                }
                else {
                    $table.children[i].children[j].setAttribute("class", "brown")
                }
            }
            else {
                if(j % 2 != 0) {
                    $table.children[i].children[j].setAttribute("class", "beige")
                }
                else {
                    $table.children[i].children[j].setAttribute("class", "brown")
                }
            }
        }
    }

}
function skin() {

    for(i = 0; i < size; i++) {
        for(j = 0; j < size; j++) {
            $table.children[i].children[j].innerText = "";
            for(k = 0; k < chessList2.length; k++) {
                if(dataList[i][j] == chessList2[k]) {
                    $table.children[i].children[j].innerText = pieces[k];
                    $table.children[i].children[j].style.cursor = "pointer";
                }
            }
        }
    }
    
}
let clckNum = -1;
let index1 = -1;
let index2 = -1;

function king(i, j, me) {
    
        for(k = -1; k <= 1; k++) {
            for(l = -1; l <= 1; l++) {
                if(k != 0 || l != 0) {
                    if(i + k >= 0 && i + k < size && j + l >= 0 && j + l < size) {
                        if(parseInt(dataList[i + k][j + l] / 10) != me) {
                            $table.children[i + k].children[j + l].setAttribute("id", "movable");
                        }
                    }
                }
            }      
        }
    
}

function knight(i, j, me) {
    for(k = -2; k <= 2; k++) {
        let temp = 0;
        if(k == 0) {
            k++;
        }
        if(k == -2 || k == 2) {
            temp = 1;
        }
        else {
            temp = 2;
        }
        if(i + k >= size || i + k < 0) {
            continue;
        } 
        if(j + temp < size) {
            if(parseInt(dataList[i + k][j + temp] / 10) != me) {
                $table.children[i + k].children[j + temp].setAttribute("id", "movable");

            }
        }
        if(j - temp >= 0) {
            if(parseInt(dataList[i + k][j - temp] / 10) != me) {
                $table.children[i + k].children[j - temp].setAttribute("id", "movable");

            }
        }
        
    }
}

function bishop(i, j, me, you) {
    for(k = 1; k <= size - 1; k++) {
        for(l = 1; l <= size - 1; l++) {
            if(k == l) {
                if(i - k >= 0 && j - l >= 0) {
                    if(parseInt(dataList[i - k][j - l] / 10) == me) {
                        k = size + 1;
                        continue;
                    }
                    $table.children[i - k].children[j - l].setAttribute("id", "movable");
                    if(parseInt(dataList[i - k][j - l] / 10) == you) {
                        k = size + 1;
                        continue;
                    }
                }
            }
        }
    }
    for(k = 1; k <= size - 1; k++) {
        for(l = 1; l <= size - 1; l++) {
            if(k == l) {
                if(i - k >= 0 && j + l < size) {
                    if(parseInt(dataList[i - k][j + l] / 10) == me) {
                        k = size + 1;
                        continue;
                    }
                    $table.children[i - k].children[j + l].setAttribute("id", "movable");
                    if(parseInt(dataList[i - k][j + l] / 10) == you) {
                        k = size + 1;
                        continue;
                    }
                }
            }
        }
    }
     
    for(k = 1; k <= size - 1; k++) {
        for(l = 1; l <= size - 1; l++) {
            if(k == l) {
                if(i + k < size && j + l < size) {
                    if(parseInt(dataList[i + k][j + l] / 10) == me) {
                        k = size + 1;
                        continue;
                    }
                    $table.children[i + k].children[j + l].setAttribute("id", "movable");
                    if(parseInt(dataList[i + k][j + l] / 10) == you) {
                        k = size + 1;
                        continue;
                    }
                }
            }
        }
    }
     
    for(k = 1; k <= size - 1; k++) {
        for(l = 1; l <= size - 1; l++) {
            if(k == l) {
                if(i + k < size && j - l >= 0) {
                    if(parseInt(dataList[i + k][j - l] / 10) == me) {
                        k = size + 1;
                        continue;
                    }
                    $table.children[i + k].children[j - l].setAttribute("id", "movable");
                    if(parseInt(dataList[i + k][j - l] / 10) == you) {
                        k = size + 1;
                        continue;
                    }
                }
            }
        }
    }
}

function rook(i, j, me, you) {
        for(k = 1; k <= size; k++) {
            if(i + k < size) {
                if(parseInt(dataList[i + k][j] / 10) == me) {
                    break;
                }
                $table.children[i + k].children[j].setAttribute("id", "movable");
                if(parseInt(dataList[i + k][j] / 10) == you) {
                    break;
                }
            }
            
        }
        for(k = 1; k <= size; k++) {
            if(i - k >= 0) {
                if(parseInt(dataList[i - k][j] / 10) == me) {
                    break;
                }
                $table.children[i - k].children[j].setAttribute("id", "movable");
                if(parseInt(dataList[i - k][j] / 10) == you) {
                    break;
                }
            }
        }
        for(k = 1; k <= size; k++) {
            if(j + k < size) {
                if(parseInt(dataList[i][j + k] / 10) == me) {
                    break;
                }
                $table.children[i].children[j + k].setAttribute("id", "movable");
                if(parseInt(dataList[i][j + k] / 10) == you) {
                    break;
                }
            }
        }
        for(k = 1; k <= size; k++) {
            if(j - k >= 0) {
                if(parseInt(dataList[i][j - k] / 10) == me) {
                    break;
                }
                $table.children[i].children[j - k].setAttribute("id", "movable");
                if(parseInt(dataList[i][j - k] / 10) == you) {
                    break;
                }
            }
        }
}

function pawn(i, j, me) {
    if(me == 1) {
        if(i == size - 2) {
            for(k = i - 1; k >= i - 2; k--) {
                if(k < 0) {
                    continue;
                }
                if(dataList[k][j] != 0) {
                    break;
                }
                else {
                    if(dataList[k][j] == 0) {
                        $table.children[k].children[j].setAttribute("id", "movable");
                    }
                } 
            }
        }
        else { // 처음 x
            for(k = i - 1; k > i - 2; k--) {
                if(k < 0 ) {
                    continue;
                }
                else {
                    if(dataList[k][j] == 0) {
                        $table.children[k].children[j].setAttribute("id", "movable");
                    }
                } 
            }
    
        }
    
        if(i - 1 < size && i - 1 >= 0) { // 대각
    
            if(parseInt(dataList[i - 1][j - 1] / 10) == 5 && j - 1 >= 0) {
                $table.children[i - 1].children[j - 1].setAttribute("id", "movable");
            } 
            if(parseInt(dataList[i - 1][j + 1] / 10) == 5 && j + 1 < size) {
                $table.children[i - 1].children[j + 1].setAttribute("id", "movable");
            }
        }
    }
    else {
        if(i == 1) {
            for(k = i + 1; k <= i + 2; k++) {
                if(k >= size) {
                    continue;
                }
                if(dataList[k][j] != 0) {
                    break;
                }
                else {
                    $table.children[k].children[j].setAttribute("id", "movable");                                
                }
                
            }
        }
        else { // 처음 x
            for(k = i + 1; k < i + 2; k++) {
                if(k >= size ) {
                    continue;
                }
                else {
                    if(dataList[k][j] == 0) {
                        $table.children[k].children[j].setAttribute("id", "movable");
                    }
                } 
            }
        }

        if(i + 1 < size) {
            if(parseInt(dataList[i + 1][j - 1] / 10) == 1 && j - 1 >= 0) {
                $table.children[i + 1].children[j - 1].setAttribute("id", "movable");
            } 
            if(parseInt(dataList[i + 1][j + 1] / 10) == 1 && j + 1 < size) {
                $table.children[i + 1].children[j + 1].setAttribute("id", "movable");
            }
        }
    }
}

function moveEvent() {
    let clck = false;

    for(i = 0; i < size; i++) {
        for(j = 0; j < size; j++) {
            if($table.children[i].children[j].id == "selected") {
                clck = true;   
            }
        }
    }
    
    let turnCheck = false;
    if(clck == false) {
        for(i = 0; i < size; i++) {
            for(j = 0; j < size; j++) {
                if(this == $table.children[i].children[j]) {
                    if(turn) {
                        if(dataList[i][j] != 0 && parseInt(dataList[i][j] / 10 ) == 1) {
                            $table.children[i].children[j].setAttribute("id", "selected");
                            index1 = i;
                            index2 = j;
                            clckNum = dataList[i][j];
                            turnCheck = true;
                            me = 1;
                            you = 5;
                        }
                    }
                    else {
                        if(dataList[i][j] != 0 && parseInt(dataList[i][j] / 10 ) == 5) {
                            $table.children[i].children[j].setAttribute("id", "selected");
                            index1 = i;
                            index2 = j;
                            clckNum = dataList[i][j];
                            turnCheck = true;
                            me = 5;
                            you = 1;
                        }
                    }
                    
                    if(turnCheck) {
                            let a = dataList[i][j] % 10;
                              move(a);
                    } 
                }
            }
        }
    }              
    
    else {
        for(i = 0; i < size; i++) {
            for(j = 0; j < size; j++) {
                if(this == $table.children[i].children[j]) {
                    if($table.children[i].children[j].id == "movable") {
                        dataList[i][j] = clckNum;
                        dataList[index1][index2] = 0;
                        turn = !turn;
                    }
                }
            }
        }
        
        for(i = 0; i < size; i++) {
            for(j = 0; j < size; j++) {
                $table.children[i].children[j].setAttribute("id", "");
            }
        }
        skin();
        win();
        confirmCheck();
    }
    
    skin();
    checkPieces();
    promotionCheck();
    printTurn(turn);

}

function win() {
    let p1 = false;
    let p2 = false;
    for(i = 0; i < dataList.length; i++) {
        for(j = 0; j < dataList[i].length; j++) {
            if(dataList[i][j] == 55) {
                p2 = true;
            }
            if(dataList[i][j] == 15) {
                p1 = true;
            }
            
        }
    }
    if(p1 == false) {
        alert("player2 win");
        reset();
    }
    if(p2 == false) {
        alert("player1 win");
        reset();
    }
}

function reset() {
    $table.innerHTML = "";
    $table2.innerHTML = "";

    p1King = false;
    p2King = false;
    p1Rook1 = false;
    p1Rook2 = false;
    p2Rook1 = false;
    p2Rook2 = false;
    turn = true;

    document.querySelectorAll(".situation1")[0].innerText = "";
    document.querySelectorAll(".situation1")[1].innerText = "";
    document.querySelectorAll(".checkMsg")[0].innerText = "";
    document.querySelectorAll(".checkMsg")[1].innerText = "";

    init()
}

let $table2 = document.createElement("table");
function promotionCheck() {
    $table2.innerHTML = "";
    let checkP1 = false;
    let checkP2 = false;
    let index = -1;
    let y = -1;
    for(i = 0; i < size; i++) {
        if(dataList[0][i] == 10) {
            checkP1 = true;
            index = i;
            y = 0;
        }
        else if(dataList[size -1][i] == 50) {
            checkP2 = true;
            index = i;
            y = size - 1;
        }
    }
    $table2.id = "pr";
    if(checkP1 == true || checkP2 == true) {
        let $tr = document.createElement("tr");
        for(i = 0; i < 4; i++) {
            let $td = document.createElement("td");
            $td.addEventListener("click", changePromotion)
            $tr.append($td);
        }
        $table2.append($tr);
    }

    
    if(checkP1) {
        document.querySelector("#p1Pawn").append($table2);
        for(i = 0; i < 4; i++) {
            $table2.children[0].children[i].innerText = promotionPiecesP1[i];
        }
        changePromotion();
    }
    else if(checkP2) {
        document.querySelector("#p2Pawn").append($table2);
        for(i = 0; i < 4; i++) {
            $table2.children[0].children[i].innerText = promotionPiecesP2[i];
        }
    }

}
let promotionListP1 = [11, 12, 13, 14];
let promotionListP2 = [51, 52, 53, 54];
function changePromotion() {
    let p1Check = false;
    let p2Check = false;
    let index = -1;

    for(i = 0; i < size; i++) {
        if(dataList[0][i] == 10) {
            p1Check = true;
            index = i;
        }
        else if(dataList[size - 1][i] == 50) {
            p2Check = true;
            index = i;
        }
    }

    if(p1Check) {
        for(i = 0; i < 4; i++) {
            if(this == $table2.children[0].children[i]) {
                dataList[0][index] = promotionListP1[i];
                $table2.innerHTML = "";
            }
        }
    }
    else if(p2Check) {
        for(i = 0; i < 4; i++) {
            if(this == $table2.children[0].children[i]) {
                dataList[size - 1][index] = promotionListP2[i];
                $table2.innerHTML = "";

            }
        }
        
    }
    confirmCheck();
    skin();
}

let p1CheckMsg = false;
let p2CheckMsg = false;
function confirmCheck() {

    for(i = 0; i < size; i++) {
        for(j = 0; j < size; j++) {
            let a = dataList[i][j] % 10;
            me = 1;
            you = 5;
            if(parseInt(dataList[i][j] / 10) == 5) {
                me = 5;
                you = 1;
            }

            if(parseInt(dataList[i][j] / 10) == 1) {
                move(a);
                
                for(k = 0; k < size; k++) {
                    for(l = 0; l < size; l++) {
                        if(dataList[k][l] == 55) {
                            if($table.children[k].children[l].id == "movable") {
                                p1CheckMsg = true;
                            }
                            else {
                                p1CheckMsg = false;
                            }
                        }
                    }
                }

            }
            if(parseInt(dataList[i][j] / 10) == 5) {
                move(a);
                for(k = 0; k < size; k++) {
                    for(l = 0; l < size; l++) {
                        if(dataList[k][l] == 15) {
                            if($table.children[k].children[l].id == "movable") {
                                p2CheckMsg = true;
                            }
                            else {
                                p2CheckMsg = false;
                            }

                        }
                    }
                }
            }
        }

    }
   
    printCheckMsg();
    
    for(i = 0; i < size; i++) {
        for(j = 0; j < size; j++) {
            if($table.children[i].children[j].id == "movable") {
                $table.children[i].children[j].id = "";
            }
        }
    }
    if(p2CheckMsg || p1CheckMsg) {
        checkmate();
    }
}
let piecesCount = [8, 2, 2, 2, 1];
let piecesListP1 = ["♙", "♖", "♘", "♗", "♕"];
let piecesListP2 = ["♟", "♜", "♞", "♝", "♛"];

function checkPieces() {
    document.querySelector("#p1Situation").innerText = "";
    document.querySelector("#p2Situation").innerText = "";

    for(i = 0; i < 5; i++) {
        let count = 0;
        for(j = 0; j < size; j++) {
            for(k = 0; k < size; k++) {
                if(chessList2[i] == dataList[j][k]) {
                    count++;
                }
            }
        }
        if(count != piecesCount[i]) {
            for(j = 0; j < piecesCount[i] - count; j++) {
                document.querySelector("#p1Situation").innerText += piecesListP1[i]
            }
        }
        
    }
    for(i = 0; i < 5; i++) {
        count = 0;
        for(j = 0; j < size; j++) {
            for(k = 0; k < size; k++) {
                if(chessList2[i + 6] == dataList[j][k]) {
                    count++;
                }
            }
        }
        if(count != piecesCount[i]) {
            for(j = 0; j < piecesCount[i] - count; j++) {
                document.querySelector("#p2Situation").innerText += piecesListP2[i]
            }
        }
    }
}

function printTurn(turn) {
    if(turn) {
        document.querySelectorAll(".player")[0].style.backgroundColor = "";
        document.querySelectorAll(".player")[0].style.color = "rgba(238, 238, 210)";
        document.querySelectorAll(".player")[1].style.backgroundColor = "rgba(118, 150, 86)";
        document.querySelectorAll(".player")[1].style.color = "rgba(238, 238, 210)";
    }
    else {
        document.querySelectorAll(".player")[0].style.backgroundColor = "rgba(118, 150, 86)";
        document.querySelectorAll(".player")[0].style.color = "rgba(238, 238, 210)";
        document.querySelectorAll(".player")[1].style.backgroundColor = "";
        document.querySelectorAll(".player")[1].style.color = "rgba(238, 238, 210)";
        
    }
 }

 function checkRook() {
    if(dataList[0][0] != 51) {
        p2Rook1 = true;
    }
    if(dataList[0][7] != 51) {
        p2Rook2 = true;
    }
    if(dataList[7][0] != 11) {
        p1Rook1 = true;
    }
    if(dataList[7][7] != 11) {
        p1Rook2 = true;
    }
}
 function checkKing() {
     if(dataList[0][4] != 55) {
         p2King = true;
     }
     if(dataList[7][4] != 15) {
         p1King = true;
     }     
 }

 let dir = 0;
 function castling() {
    if(p1King == false) {
        let index1 = 7;
        let index2 = 4;

        let count1 = 0;
        let count2 = 0;
        for(k = -3; k < 0; k++) {
            if(dataList[index1][index2 + k] == 0) {
                count1++;
            }
        }
        for(k = 1; k <= 2; k++) {
            if(dataList[index1][index2 + k] == 0) {
                count2++;
            }

        }

        if(count1 == 3 && p1Rook1 == false && dataList[7][0] == 11)  {
            $table.children[index1].children[index2 - 2].setAttribute("id", "movable");
            dir = 1;
        }
        if(count2 == 2 && p1Rook2 == false && dataList[7][7] == 11) {
            $table.children[index1].children[index2 + 2].setAttribute("id", "movable");
            dir = 2;
        }
    }
    if(p2King == false) {
        let index3 = 0;
        let index4 = 4;

        let count3 = 0;
        let count4 = 0;
        for(k = -3; k < 0; k++) {
            if(dataList[index3][index4 + k] == 0) {
                count3++;
            }
        }
        for(k = 1; k <= 2; k++) {
            if(dataList[index3][index4 + k] == 0) {
                count4++;
            }

        }
        if(count3 == 3 && p2Rook1 == false && dataList[0][0] == 51) {
            $table.children[index3].children[index4 - 2].setAttribute("id", "movable");
            dir = 3;
        }
        if(count4 == 2 && p2Rook2 == false && dataList[0][7] == 51) {
            $table.children[index3].children[index4 + 2].setAttribute("id", "movable");
            dir = 4;
        }
    }
 }

 function change() {
    if(me == 5) {
        me = 1;
        you = 5;
    }
    else {
        me = 5;
        you = 1;
    }
 }

 function castlingRook() {
     
    if(p1King) {
        if(dataList[7][3] == 0 && dataList[7][2] == 15) {
            dataList[7][0] = 0;
            dataList[7][3] = 11;
        }
        if(dataList[7][6] == 15 && dataList[7][5] == 0) {
            dataList[7][7] = 0;
            dataList[7][5] = 11;
        }
    }
    if(p2King) {
        if(dataList[0][3] == 55 && dataList[0][3] == 0) {
            dataList[0][0] = 0;
            dataList[0][3] = 51;
        }
        if(dataList[0][6] == 55 && dataList[0][5] == 0) {
            dataList[0][7] = 0;
            dataList[0][5] = 51;
        }
    }
 }

function printCheckMsg() {
    for(i = 0; i < size; i++) {
        for(j = 0; j < size; j++) {
            $table.children[i].children[j].setAttribute("name", "");
            if(dataList[i][j] == 55){
                if(p1CheckMsg) {
                    $table.children[i].children[j].setAttribute("name", "checked");
                    document.querySelectorAll(".checkMsg")[0].innerText = "CHECK";
                }
                else {
                    document.querySelectorAll(".checkMsg")[0].innerText = "";
                }
            }
            if(dataList[i][j] == 15){
                if(p2CheckMsg) {
                    $table.children[i].children[j].setAttribute("name", "checked");
                    document.querySelectorAll(".checkMsg")[1].innerText = "CHECK";
                }
                else {
                    document.querySelectorAll(".checkMsg")[1].innerText = "";

                }
            }
        }
    }
}

function checkmate() {
    let result = true;
    change();
    for(i = 0; i < size; i++) { 
        for(j = 0; j < size; j++) {
            let tempIndex = [];
            let count = 0;
            if(parseInt(dataList[i][j] / 10) == me) { 
                let a = dataList[i][j] % 10; 
                move(a); 
                for(x = 0; x < size; x++) {  
                    for(y = 0; y < size; y++) {
                        if($table.children[x].children[y].id == "movable") { 
                            tempIndex[count] = [x, y]; 
                            count++;
                        }
                    }
                }
                for(x = 0; x < size; x++) {
                    for(y = 0; y < size; y++) {
                        if($table.children[x].children[y].id == "movable") {
                            $table.children[x].children[y].id = "";
                        }
                    }
                }
                for(x = 0; x < tempIndex.length; x++) { 

                    let temp2 = dataList[tempIndex[x][0]][tempIndex[x][1]];
                    let temp = dataList[i][j];

                    dataList[tempIndex[x][0]][tempIndex[x][1]] = temp; 
                    dataList[i][j] = 0;

                    for(m = 0; m < size; m++) { 
                        for(n = 0; n < size; n++) {
                            if($table.children[m].children[n].id == "movable") {
                                $table.children[m].children[n].id = "";
                            }
                        }
                    }

                    for(m = 0; m < size; m++) { 
                        for(n = 0; n < size; n++) {
                            if(parseInt(dataList[m][n] / 10) == you) { 
                                let b = dataList[m][n] % 10;
                                change();
                                let temp3 = i;
                                let temp4 = j;
                                i = m;
                                j = n;
                                move(b);
                                i = temp3;
                                j = temp4;
                                change();
                            }
                        }
                        
                    }
                    change();
                    for(k = 0; k < size; k++) {
                        for(l = 0; l < size; l++) {
                            if(dataList[k][l] == you * 10 + 5) {
                                if($table.children[k].children[l].id != "movable") {
                                    result = false;
                                }
                            }
                        }
                    }
                    for(k = 0; k < size; k++) {
                        for(l = 0; l < size; l++) {
                            if($table.children[k].children[l].id == "movable") {
                                $table.children[k].children[l].id = "";
                            }
                        }
                    }
                    
                    dataList[i][j] = temp;
                    dataList[tempIndex[x][0]][tempIndex[x][1]] = temp2;
                        
                    change();
                }         
            }
        }
    }
    change();
    
    skin();
    if(result) {
        alert("CHECKMATE");
        reset();
    }
}

    




init();
