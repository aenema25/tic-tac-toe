const player = (name,marker) => {
    return {name,marker};
};

const gameFunction = (() =>{
    const gameBoard = ['','','','','','','','',''];
    const spot = document.querySelectorAll('.spot');
    let playerOneCounter = 0;
    let playerTwoCounter = 0;
    let firstTurn = 0;
    const hide = (id) => {
        let x = document.getElementById(id);
        x.style.display = "none";
        if(id=="playMode"){
            document.getElementById("playerNames").style.display="block";
        };
        if(id=="playerNames"){
            document.querySelector(".container").style.display="block";
            document.querySelector(".scoreboard").style.display="block";
            playerOne = player(document.querySelector("#playerOne").value,'X');
            playerTwo = player(document.querySelector("#playerTwo").value,'O');
            document.querySelector("#playerone").textContent=playerOne.name + ' = ' + playerOneCounter;
            document.querySelector("#playertwo").textContent=playerTwo.name + ' = ' + playerOneCounter;
            spot.forEach(spots=>{spots.setAttribute( "onClick", "gameFunction.againstOtherPlayer(this.id)" );});
        };
        if(id =="soloGame"){
            document.querySelector(".container").style.display="block";
            document.querySelector(".scoreboard").style.display="block";
            playerOne = player(document.querySelector("#solo").value,'X');
            playerTwo = player('computer','O');
            document.querySelector("#playerone").textContent=playerOne.name + ' = ' + playerOneCounter;
            document.querySelector("#playertwo").textContent=playerTwo.name + ' = ' + playerTwoCounter;
            spot.forEach(spots=>{spots.setAttribute( "onClick", "gameFunction.againstComputer(this.id)" );});
        }
        if(id=="playComputer"){
            document.querySelector('#playMode').style.display="none";
            document.querySelector('#soloGame').style.display="block";
        };
    };
    const checkWin = () => {
        let winningOptions = [
            gameBoard.slice(0,3),gameBoard.slice(3,6),gameBoard.slice(6),
            [gameBoard[0],gameBoard[3],gameBoard[6]], [gameBoard[1],gameBoard[4],gameBoard[7]], [gameBoard[2],gameBoard[5],gameBoard[8]],
            [gameBoard[0],gameBoard[4],gameBoard[8]], [gameBoard[2],gameBoard[4],gameBoard[6]]
        ];
        winningOptions.forEach(element => {
            x=element.every (x => x === 'X');
            o=element.every (x => x === 'O');
            (x == true || o == true)? win(): 'nothing'; 
        });
    };
    const clear = () => {
        spot.forEach(spots=>{spots.textContent='';});
        spot.forEach(spots=>{spots.style.cssText='';});
        gameBoard.forEach((square,index)=>{gameBoard[index]=''});
    };

    const win = () =>{
        if(x == true) {
            alert(playerOne.name + ' win!')
            playerOneCounter=playerOneCounter+1;
            document.querySelector("#playerone").textContent=playerOne.name + ' = ' + playerOneCounter;
        }else{
            alert (playerTwo.name + ' win!');
            playerTwoCounter=playerTwoCounter+1;
            document.querySelector("#playertwo").textContent=playerTwo.name + ' = ' + playerTwoCounter;
        } 
        change=0;
        clear();
    }

    const computerPlay = (id) => {
        let randomID=Math.floor(Math.random() * 9)
        let computerID=(randomID==id) ? Math.floor(Math.random() * 9) : randomID;
        while(gameBoard[computerID]!=''){
            computerID=Math.floor(Math.random() * 9);  
        };
        gameBoard[computerID] = playerTwo.marker;
        spot[computerID].textContent = playerTwo.marker;
        changeTurn(computerID);
        checkWin();
        checkTie();
    };

    const changeTurn = (id) => {
        spot[id].style.cssText='pointer-events: none;';
    };

    const playerOnePlay = (id) =>{
        gameBoard[id] = playerOne.marker;
        spot[id].textContent=playerOne.marker;
        changeTurn(id);
        checkWin();
        checkTie();
    }

    const playerTwoPlay = (id) =>{
        gameBoard[id] = playerTwo.marker;
        spot[id].textContent=playerTwo.marker;
        changeTurn(id);
        checkWin();
        checkTie();
    }

    const checkTie = () => {
        if(gameBoard.filter(Boolean).length == 9){
            alert('its a tie');
            change=0;
            clear();
        }
    }

    const againstComputer = (id) =>{
        change=1;
        playerOnePlay(id);
        if (change!=0){
            computerPlay(id);
        }
    }
    
    const againstOtherPlayer = (id) =>{
        if(firstTurn==0){
            playerOnePlay(id);
            firstTurn=1;
        }else{
            playerTwoPlay(id);
            firstTurn=0;
        }
    }
    return{againstComputer,hide,againstOtherPlayer};

})();

function restart(){
    if (confirm("You wanna restart the game ?")) {
        window.location.reload();
      }    
}