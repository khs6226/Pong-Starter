import {SVG_NS, SPEED} from '../settings';
import gameEnd from './gameEnd';

export default class Paddle {
    constructor(boardHeight, paddleWidth, paddleHeight, initialX, initialY, keyUp, keyDown) {
        this.boardHeight = boardHeight;
        this.paddleWidth = paddleWidth;
        this.paddleHeight = paddleHeight;
        this.x = initialX;
        this.y = initialY;
        this.score = 0;
        this.speed = SPEED;
        this.gameEnd = new gameEnd(150, 128);
        this.paused = false;
        document.addEventListener("keydown", event => {
            switch(event.key) {
                case keyUp:
                this.moveUp();
                break;
                case keyDown:
                this.moveDown();
                break;
            }
        });
    }
    
    increaseScore(){
        this.score++;
    }

    getScore(){
        return this.score;
    }
    
    moveUp() { 
        this.y = Math.max(0, this.y-this.speed);
    }
    
    moveDown() {
        this.y = Math.min(this.boardHeight-this.paddleHeight, this.y + this.speed);
    }

    paddleStop() {
        this.speed = 0;
    }
    
    paddleRecover() {
        this.speed = SPEED;
    }

    paddleSizeChange() {
        switch(this.score) {
            case 4:
            case 7:
            this.paddleHeight = this.paddleHeight * 2 / 3;
            break;
        }
    }
    
    getCoordinates(){
        const walls = {
            left : this.x,
            top : this.y,
            right : this.x + this.paddleWidth,
            bottom : this.y + this.paddleHeight
        }
        return walls;
    }

    render(svg){
        let paddle = document.createElementNS(SVG_NS, 'rect');
        paddle.setAttributeNS(null, "x", this.x);
        paddle.setAttributeNS(null, "y", this.y);
        paddle.setAttributeNS(null, "width", this.paddleWidth);
        paddle.setAttributeNS(null, "height", this.paddleHeight);
        paddle.setAttributeNS(null, "fill", "white");
        svg.appendChild(paddle);
    }
}