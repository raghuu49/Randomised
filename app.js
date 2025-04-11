let boxes=document.querySelectorAll(".box");
let reset=document.querySelector("#reset-btn");
let winningPatterns=[[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
let board=['','','','','','','','',''];
let winner=false;
let level=document.querySelector("#difficulty");
let difficulty_level=level.value;
let winScore=0,DrawScore=0,ComputerScore=0;
let player=document.querySelector("#player-score");
let computer=document.querySelector("#computer-score");
let draw_score=document.querySelector("#draw-score");
const isEvaluate=()=>{
    for(let pattern of winningPatterns){
        if(board[pattern[0]] && board[pattern[0]]===board[pattern[1]] && board[pattern[1]]===board[pattern[2]]){
            return (board[pattern[0]]==="O")?10:-10;
        }
    }
    return 0;
};
const MovesLeft=()=>{
    return board.includes('');
};
const minmax=(isMaximise)=>{
    let score=isEvaluate();
    if(score===-10 || score===10) return score;
    if(!MovesLeft()) return 0;
    if(isMaximise){
        let bestVal=-Infinity;
        for(let i=0;i<9;i++){
            if(board[i]===''){
                board[i]='O';
                bestVal=Math.max(bestVal,minmax(false));
                board[i]='';
            }
        }
        return bestVal;
    }
    else{
        let bestVal=Infinity;
        for(let i=0;i<9;i++){
            if(board[i]===''){
                board[i]='X';
                bestVal=Math.min(bestVal,minmax(true));
                board[i]='';
            }
        }
        return bestVal;
    }
};
const findbestMove=()=>{
    let bestVal=-Infinity;
    let move=-1;
    for(let i=0;i<9;i++){
        if(board[i]===''){
            board[i]='O';
            let score=minmax(false);
            board[i]="";
            if(score>bestVal){
                bestVal=score;
                move=i;
            }
        }
    }
    return move;
};

const randomMove=()=>{
    let empty=[];
    for(let i=0;i<9;i++){
        if(board[i]==='')empty.push(i);
    }
    return empty[Math.floor(Math.random()*empty.length)];
};

const resetScorecard=()=>{
    winScore=0;DrawScore=0;ComputerScore=0;
    player.textContent='0';
    computer.textContent='0';
    draw_score.textContent='0';
}

const resetGame=()=>{
    board=['','','','','','','','',''];
    winner=false;
    resetScorecard();
    boxes.forEach((box)=>{
        box.textContent='';
        box.disabled=false;
        box.classList.remove('winner');
    });
}
// game logic 

const checkWinner=()=>{
    for(let pattern of winningPatterns){
        let pos1=pattern[0];pos2=pattern[1];pos3=pattern[2];
        let val1=boxes[pos1].textContent;
        let val2=boxes[pos2].textContent;
        let val3=boxes[pos3].textContent;
        if(val1!=='' && val1===val2 && val2===val3){
            alert(`Winner is ${val1}`);
            winner=true;
            HighlightWinning([pos1,pos2,pos3]);
            disableBoxes();
            if(val1==="X"){
                winScore++;
                player.textContent=winScore;
            }
            else{
                ComputerScore++;
                computer.textContent=ComputerScore;
            }
            return;
        }
    }
};

const HighlightWinning=(positions)=>{
    positions.forEach((pos)=>{
        boxes[pos].classList.add("winner");
    });
};

const checkBoxes=()=>{
    if(!board.includes('') && !winner){
        alert('Match Draw!!!');
        winner=true;
        disableBoxes();
        DrawScore++;
        draw_score.textContent=DrawScore;
    }
};

const disableBoxes=()=>{
    boxes.forEach((box)=>{
        box.disabled=true;
    });
};

const enableBoxes=()=>{
    boxes.forEach((box)=>{
        box.disabled=false;
    });
};

boxes.forEach((box,i)=>{
    box.addEventListener("click",()=>{
       if(board[i]==='' && !winner){
        box.textContent='X';
        board[i]="X";
        box.disabled=true;
        checkWinner();
        checkBoxes();
        if(!winner){
            setTimeout(()=>{
                let bestMove;
                if(difficulty_level==="easy") bestMove=randomMove();
                else if(difficulty_level==="medium"){
                    bestMove=(Math.random()<0.2)?randomMove():findbestMove();
                }
                else bestMove=findbestMove();
                if(bestMove!==-1){
                    board[bestMove]='O';
                    boxes[bestMove].textContent='O';
                    boxes[bestMove].disabled=true;
                    checkWinner();
                    checkBoxes();
                }
            },300);    
        }
       }
    });

});


reset.addEventListener("click",()=>{
    boxes.forEach((box)=>{
        box.textContent="";
        box.disabled=false;
        box.classList.remove('winner');
    });
    board=['','','','','','','','',''];
    winner=false;
});

level.addEventListener("change",()=>{
    difficulty_level=level.value;
    resetGame();
});
