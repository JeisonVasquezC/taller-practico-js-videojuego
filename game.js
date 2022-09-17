const canvas = document.querySelector('#game');
const btnUp = document.querySelector('#up');
const btnLeft = document.querySelector('#left');
const btnRight = document.querySelector('#right');
const btnDown = document.querySelector('#down');
const game = canvas.getContext('2d');

let canvasSize;
let elementsSize;
let level = 0;
let lives = 3;

const playerPosition = {
    x: undefined,
    y: undefined,
};

const giftPosition = {
    x: undefined,
    y: undefined,
};

let bombPosition = [];

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

    const map = maps[level];

    if(!map){
        gameWin();
    }

    const mapRows = map.trim().split('\n');
    const mapRowCols = mapRows.map(row => row.trim().split(''))
    
    bombPosition = [];
    game.clearRect(0,0,canvasSize,canvasSize);

    mapRowCols.forEach((row, rowI) => {
        row.forEach((col, colI) => {
            const posX = elementsSize * (colI + 1) + 15;
            const posY = elementsSize * (rowI + 1);
            game.fillText(emojis[col], posX, posY);
            
            if(col == 'O'){
                if(!playerPosition.x & !playerPosition.y){
                    playerPosition.x = posX;
                    playerPosition.y = posY;
                }
            }else if(col == 'I'){
                giftPosition.x = posX;
                giftPosition.y = posY;
            }else if(col == 'X'){
                bombPosition.push({
                    x: posX,
                    y: posY, 
                });
            };
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

    movePlayer();
};

function movePlayer(){
    const giftPositionX = playerPosition.x.toFixed(2) == giftPosition.x.toFixed(2);
    const giftPositionY = playerPosition.y.toFixed(2) == giftPosition.y.toFixed(2);
    const isGiftCollision = giftPositionX && giftPositionY;

    
    if(isGiftCollision){
        levelWin();
    };
    
    const isBombCollision = bombPosition.find(enemy => {
        const enemyCollisionX = enemy.x.toFixed(2) == playerPosition.x.toFixed(2);
        const enemyCollisionY = enemy.y.toFixed(2) == playerPosition.y.toFixed(2);
        return enemyCollisionX && enemyCollisionY;
    });

    if(isBombCollision){
        levelLost();
    };

    game.fillText(emojis['PLAYER'], playerPosition.x, playerPosition.y);
}

function levelWin(){
    console.log('Subiste de nivel');
    level++;
    startGame();
};

function gameWin(){
    console.log('Terminaste el Juego');
};

function levelLost(){
    lives--;
    
    if(lives <= 0) {
        level = 0;
        lives = 3;
    }

    playerPosition.x = undefined;
    playerPosition.y = undefined;
    startGame();
}

btnUp.addEventListener('click', moveUp);
btnLeft.addEventListener('click', moveLeft);
btnRight.addEventListener('click', moveRight);
btnDown.addEventListener('click', moveDown);

window.addEventListener('keydown', moveByKeys);

function moveByKeys(event){
    if(event.key == 'ArrowUp') moveUp();
    if(event.key == 'ArrowLeft') moveLeft();
    if(event.key == 'ArrowRight') moveRight();
    if(event.key == 'ArrowDown') moveDown();

};

function moveUp(){
    console.log('Me quiero mover hacia arriba.');
    if((playerPosition.y - elementsSize) > (elementsSize-15)){
        playerPosition.y -= elementsSize;
        startGame();
    };
};

function moveLeft(){
    console.log('Me quiero mover hacia la izquierda.');
    if((playerPosition.x - elementsSize) > elementsSize){
        playerPosition.x -= elementsSize;
        startGame();
    };
};

function moveRight(){
    console.log('Me quiero mover hacia derecha.');
    if((playerPosition.x - elementsSize) < (elementsSize*9)){
        playerPosition.x += elementsSize;
        startGame();
    };
};

function moveDown(){
    console.log('Me quiero mover hacia abajo.');
    if((playerPosition.y - elementsSize) < (elementsSize*9)){
        playerPosition.y += elementsSize;
        startGame();
    };
};