const canvas = document.querySelector('#game');
const game = canvas.getContext('2d');

window.addEventListener('load', startGame);

function startGame() {
    // game.fillRect(0,0,100,100); //lugar donde inicia el trazo
    // game.clearRect(0,0,100,50); //borrar trazos


    /* game.font = '25px Verdana';
    game.fillStyle = 'purple';
    game.textAlign = 'start';
    game.fillText('prueba',1,20) //inserta texto */

    let canvasSize;
    
    if (window.innerHeight > window.innerWidth) {
        canvasSize = window.innerWidth * 0.75;
    }else{
        canvasSize = window.innerHeight * 0.75;
    }

    canvas.setAttribute('width', canvasSize);
    canvas.setAttribute('height', canvasSize);

    const elementsSize = canvasSize / 10;

    game.font = `${elementsSize}px Verdana`;
    game.textAlign = 'end';

    for (let i = 1; i <= 10; i++) {
        game.fillText(emojis['X'], elementsSize*i, elementsSize);
    }

};