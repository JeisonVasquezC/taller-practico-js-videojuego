const canvas = document.querySelector('#game');
const game = canvas.getContext('2d');

let canvasSize;
let elementsSize

window.addEventListener('load', setCanvasSize);
window.addEventListener('resize', setCanvasSize);

function setCanvasSize(){
    if (window.innerHeight > window.innerWidth) {
        canvasSize = window.innerWidth * 0.75;
    }else{
        canvasSize = window.innerHeight * 0.75;
    }
    
    canvas.setAttribute('width', canvasSize);
    canvas.setAttribute('height', canvasSize);
    
    elementsSize = canvasSize / 10 - 1.5;

    startGame();
};

function startGame() {
    // game.fillRect(0,0,100,100); //lugar donde inicia el trazo
    // game.clearRect(0,0,100,50); //borrar trazos
    /* game.font = '25px Verdana';
    game.fillStyle = 'purple';
    game.textAlign = 'start';
    game.fillText('prueba',1,20) //inserta texto */

    game.font = `${elementsSize}px Verdana`;
    game.textAlign = 'end';

    const mapRows = maps[0].trim().split('\n');
    const mapRowCols = mapRows.map(row => row.trim().split(''));

    mapRowCols.forEach((row, rowI) => {
        row.forEach((col, colI) => {
            const posX = elementsSize * (colI + 1) + 15;
            const posY = elementsSize * (rowI + 1);
            game.fillText(emojis[col], posX, posY);
        });
    });

    /*
    for (let row = 1; row <= 10; row++) {
        for (let col = 1; col <= 10; col++) {
            let elementEmoji = mapRowCols[row - 1][col - 1];
            game.fillText(emojis[elementEmoji], (elementsSize*col) + 15, elementsSize*row);
        }
    };
    */
};