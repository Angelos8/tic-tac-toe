// player object
const PlayerFactory = () =>{
    let name = '';
    let score = 0;
    let move = '';
    const getName =  () => name;
    const setName = (changeName) => name = changeName;
    const setScore = () => score++;
    const getScore = () => score;
    const getMove = () => move;
    const setMove = (symbol) => move = symbol;
    return {getName, setName, setScore, getScore, getMove, setMove};
}

const p1 = PlayerFactory();
const p2 = PlayerFactory();
p1.setName('John')
p2.setName('Tony');
console.log(p1.getName())
console.log(p2.getName())


// create gameboard object
const GameBoard = (() => {
    const gameBoard = [];
    let count = 0;
    const getBoard = () => gameBoard;
    const setBoard = (index, move) => gameBoard[index] = move;
    const getCount = () => count;
    const setCount = (increment) => count = increment; 
    const initialiseCount = () => {
        console.log('initialising count in :');
        for (let i=0;i<9;i++){
            console.log(i);
        }
        console.log('hahah!', gameBoard);
    }
    return {getBoard, setBoard, getCount, setCount, initialiseCount};
})();

p1.setMove('X');
p2.setMove('O');


GameBoard.setBoard(GameBoard.getCount(),p1.getMove());
GameBoard.setCount(1);
GameBoard.setBoard(GameBoard.getCount(),p2.getMove());
console.log(GameBoard.getBoard());
list = GameBoard.getBoard();
console.log('list ', list);


GameBoard.initialiseCount();


const game = (function(){
    let players = [];
    let rounds = 0;
    const addPlayer = (player) => {
        players.push(player);
        console.log('player added');
    }
    const getPlayer = () => players;
    const setRounds = () => rounds++;
    const getRounds = () => rounds;
    return {addPlayer, getPlayer, getRounds,setRounds}
})();

game.addPlayer(p1);
game.addPlayer(p2);

console.log('game rounds = ',game.getRounds());
game.setRounds();
console.log('game rounds = ',game.getRounds());

const arr = Array.from(Array(3), () => new Array(3));
let h=0;

for(let i=0;i<3; i++){
    for (let j=0; j<3;j++){
        arr[i][j] = h++;
    }
}
console.info(arr)

const WINNING_COMBINATIONS = [
	[0, 1, 2],
	[3, 4, 5],
	[6, 7, 8],
	[0, 3, 6],
	[1, 4, 7],
	[2, 5, 8],
	[0, 4, 8],
	[2, 4, 6]
] // (7x3)
console.log(WINNING_COMBINATIONS[7][2])
WINNING_COMBINATIONS[7][2] = 'X'
console.info(WINNING_COMBINATIONS)
