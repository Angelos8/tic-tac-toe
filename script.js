// GAMEBOARD MODULE
const GameBoard = (() => {
    const WINNING_COMBINATIONS = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
    const gameBoard = Array.from(Array(3), () => new Array(3));
    //console.info(gameBoard);
    let count = 0;
    const getBoard = (row, col) => gameBoard[row][col];
    const setBoard = (i, j,  move) => gameBoard[i][j] = move;
    const getCount = () => count;
    const setCount = (increment) => count = increment; 
    const initialiseCount = () => count = 0;
    const printArray = () => console.info(gameBoard);
    return {getBoard, setBoard, getCount, setCount, initialiseCount, printArray};
})();

// PLAYER OBJECT
const PlayerFactory = () =>{
    let name = '';
    let score = 0;
    let move = '';
    const getName =  () => name;
    const setName = (giveName) => name = giveName;
    const setScore = () => score++;
    const getScore = () => score;
    const getMove = () => move;
    const setMove = (symbol) => move = symbol;
    return {getName, setName, setScore, getScore, getMove, setMove};
}

// CREATE OBJECTS
const playerOne = PlayerFactory();
const playerTwo = PlayerFactory();


// GAME MODULE
const game = (function(){
    let players = [];
    let rounds = 0;
    const addPlayer = (player) => players.push(player);
    const getPlayers = () => players; 
    const getRounds = () => rounds;
    const setRounds = () => {
        rounds++;
    }
    const gameOver = () =>{
        
        console.log('GAME OVER');
        document.getElementsByClassName('game-container')[0].onclick = function(){
            this.onclick =false;
        }
    }
    return {addPlayer, getPlayers,setRounds, getRounds, gameOver}
})();

// --------------------- FUNCTIONS ---------------------------------------------
// SET GAMEBOARD
function setGameboard(){
    for(let i=0;i<3; i++){
        for (let j=0; j<3;j++){
            GameBoard.setBoard(i,j,document.getElementById(`${i}-${j}`));
        }
    }
    GameBoard.printArray();
}


// ADD A MOVE: function that adds x/O to grid (also checks if either symbol alread exists)
function addMove(row, col,move){
    if (GameBoard.getBoard(row, col).innerText === ""){
        GameBoard.getBoard(row,col).innerText = move;
        console.log(GameBoard.getBoard(row, col));
        return true;
    }
    else{
        alert('Move not allowed');
        return false;
    }
}

function checkBoard(){
    
}


// PRINT STATS
function playerStats(p1,p2){
    console.log(`${p1.getName()} (${p1.getMove()}) has score ${p1.getScore()}\n${p2.getName()} (${p2.getMove()}) has score ${p2.getScore()}`)
}



// -------------CLICK EVENTS------------------

document.addEventListener('click', (e) => {
    console.log(`e.target.id = ${e.target.id}`);
    if (e.target.id !== '' && e.target.id !== 'submit') {   //&& (e.target.id >=0 && e.target.id<=8))
        console.log('game rounds',game.getRounds());
        // check if it should continue using a function to check if there's a win or draw
        if (game.getRounds()<9){
            const row = Number(e.target.id.split('-')[0]);
            const col = Number(e.target.id.split('-')[1]);
            let players = game.getPlayers();
            let move = players[game.getRounds()%2].getMove();
            console.log(`row = ${row} and col = ${col} and move = ${move}`)
            if (addMove(row,col,move) === true){
                game.setRounds();
            }
        }
        else{
            console.log('game over!');
        }
    }
    
    if (e.target.value === 'play'){
        document.getElementById('play-btn').style.display = 'none';
        document.getElementById('form').style.display = 'block';

    }
    if(e.target.value === 'cancel'){
        document.getElementById('play-btn').style.display = 'block';
        document.getElementById('form').style.display = 'none';
        
      }
})



// ----------SUBMIT EVENTS-----------------------
form.addEventListener('submit', (e)=>{
    e.preventDefault();
    let player1 = document.getElementById('player1').value;
    let player2 = document.getElementById('player2').value;
    if (player1 === '' || player2 === ''){
      alert('Please enter player names!');
    }
    else{
        document.getElementById('form').style.display = 'none';
        let list = document.getElementsByClassName('player')
        for (element of list){
            element.style.display = 'block';
        }
        playerOne.setName(player1);
        playerTwo.setName(player2);
        playerOne.setMove('X');
        playerTwo.setMove('O');
        playerStats(playerOne, playerTwo);
        game.addPlayer(playerOne);
        game.addPlayer(playerTwo);
        setGameboard();
        //console.log('players added to game module', game.getPlayers());
    }
  })
