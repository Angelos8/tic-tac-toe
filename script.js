// GAMEBOARD MODULE
const GameBoard = (() => {
    const winningCombos = [
        ["0-0", "0-1", "0-2"],
        ["1-0", "1-1", "1-2"],
        ["2-0", "2-1", "2-2"],
        ["0-0", "1-0", "2-0"],
        ["0-1", "1-1", "2-1"],
        ["0-2", "1-2", "2-2"],
        ["0-0", "1-1", "2-2"],
        ["0-2", "1-1", "2-0"]
    ]; // (8x3)
    const gameBoard = Array.from(Array(3), () => new Array(3));
    //console.info(gameBoard);
    let count = 0;
    let emptyDivs = 9;
    const getBoard = (row, col) => gameBoard[row][col];
    const setBoard = (i, j,  move) => gameBoard[i][j] = move;
    const getCount = () => count;
    const setCount = (increment) => count = increment; 
    const initialiseCount = () => count = 0;
    const printArray = () => console.info(gameBoard);
    const getWinningCombos = () => winningCombos;
    const setWinningCombos = (divID, move) => {
        for (let row=0; row<8; row++){
            for (let col=0; col<3; col++){
                if (winningCombos[row][col] === divID){
                    winningCombos[row][col] = move;
                }
            }
        }
    }
    const printWinningCombos = () => console.info(winningCombos);
    const setEmptyDivs = () => emptyDivs--;
    const getEmptyDivs = () => emptyDivs;
    return {
                getBoard, 
                setBoard, 
                getCount, 
                setCount, 
                initialiseCount, 
                printArray, 
                getWinningCombos, 
                setWinningCombos, 
                printWinningCombos,
                getEmptyDivs,
                setEmptyDivs
            };
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
}


// ADD A MOVE: function that adds x/O to grid (also checks if either symbol alread exists)
function addMove(row, col,move){
    if (GameBoard.getBoard(row, col).innerText === ""){
        GameBoard.getBoard(row,col).innerText = move;
        GameBoard.setEmptyDivs();
        console.log(GameBoard.getBoard(row, col).innerText);
        GameBoard.setWinningCombos(`${row}-${col}`, move);

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

// CHECK IF A PLAYER HIT A WINNING COMBO
function findWinner(){
    const movesArr = GameBoard.getWinningCombos();
    for (let row=0; row<8; row++){
        let symbol_x = 0, symbol_o = 0;
        for (let col=0; col<3; col++){
            if (movesArr[row][col] === 'X'){
                symbol_x++;
            }
            else if (movesArr[row][col] === 'O'){
                symbol_o++;
            }
        }
        if (symbol_o==3){
            return 'O';
        }
        else if (symbol_x==3){
            return 'X';
        }
    }
    if (GameBoard.getEmptyDivs() == 0){
        return 'Draw';
    }
    return 'continue';
}

// -------------CLICK EVENTS------------------

document.addEventListener('click', (e) => {
    console.log(`e.target.id = ${e.target.id}`);
    if (e.target.id !== '' && e.target.id !== 'submit') {   //&& (e.target.id >=0 && e.target.id<=8))
        console.log('game rounds',game.getRounds());
        const row = Number(e.target.id.split('-')[0]);
        const col = Number(e.target.id.split('-')[1]);
        let players = game.getPlayers();
        let move = players[game.getRounds()%2].getMove();
        console.log(`row = ${row} and col = ${col} and move = ${move}`);
        addMove(row,col,move);
        let result = findWinner();
        if (result === 'X'){
            console.log(`${playerOne.getName()} wins!`);
            game.gameOver();
        }
        else if (result=== 'O'){
            console.log(`${playerTwo.getName()} wins!`);
            game.gameOver();
        }
        else if (result=== 'Draw'){
            console.log("It's a draw!");
            game.gameOver();
        }
        else{
            game.setRounds();
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
    }
  })
