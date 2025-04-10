let boxes=document.querySelectorAll(".box");
let reset=document.querySelector("#reset-btn");
let turnO=false;
let winningPatterns=[[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
const nextTurn=()=>{
   let validBox=false;
   while(!validBox){
    let idx=Math.floor(Math.random()*9);
    if(boxes[idx].textContent===''){
        boxes[idx].textContent='O';
        boxes[idx].disabled=true;
        validBox=true;
    }
   }
};
let winner=false;
boxes.forEach((box)=>{
    box.addEventListener("click",()=>{
       box.textContent="X";
       box.disabled=true;
       turnO=true;
       checkWinner();
      if(!winner) checkBoxes();
      if(!winner){
       setTimeout(()=>{
        nextTurn();
        turnO=false;
        checkWinner();
        if(!winner)checkBoxes();
       },500);
    }
    });

});
const checkBoxes=()=>{
    let draw=true;
    for(let i=0;i<boxes.length;i++){
        if(boxes[i].textContent===''){
            draw=false;
            break;
        }
    }
    if(draw){
        winner=true;
        disableBoxes();
        alert(`Match Draw`);
    }
};
const checkWinner=()=>{
    for(let pattern of winningPatterns){
        let pos1=pattern[0];pos2=pattern[1];pos3=pattern[2];
        let val1=boxes[pos1].textContent;
        let val2=boxes[pos2].textContent;
        let val3=boxes[pos3].textContent;
        if(val1!=='' && val1===val2 && val2===val3){
            alert(`Winner is ${val1}`);
            winner=true;
            disableBoxes();
            return;
        }
    }
};
const disableBoxes=()=>{
    boxes.forEach((box)=>{
        box.disabled=true;
    });
};
reset.addEventListener("click",()=>{
    boxes.forEach((box)=>{
        box.textContent="";
        box.disabled=false;
    });
    turnO=false;
    winner=false;
});