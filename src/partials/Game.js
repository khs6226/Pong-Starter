import {SVG_NS, PADDLE_HEIGHT, PADDLE_WIDTH, BOARD_GAP, KEYS, RADIUS,} from '../settings';
import Board from './Board';
import Paddle from './Paddle';
import Ball from './Ball';
import Ball2 from './Ball2';
import Ball3 from './Ball3';
import Score from './Score';

export default class Game {
  constructor(element, width, height) {
    this.element = element;
    this.width = width;
    this.height = height;
    this.paused = false;

    this.gameElement = document.getElementById(this.element);
    this.board = new Board(this.width, this.height);
    const boardMid = (this.height - PADDLE_HEIGHT)/2;
    this.paddle1 = new Paddle(this.height, PADDLE_WIDTH, PADDLE_HEIGHT, BOARD_GAP, boardMid, KEYS.p1up, KEYS.p1down);
    const paddle2Gap = this.width-BOARD_GAP-PADDLE_WIDTH;
    this.paddle2 = new Paddle(this.height, PADDLE_WIDTH, PADDLE_HEIGHT, paddle2Gap, boardMid, KEYS.p2up, KEYS.p2down);
    this.ball = new Ball(this.width, this.height, RADIUS);
    this.ball2 = new Ball2(this.width, this.height, RADIUS);
    this.ball3 = new Ball3(this.width, this.height, RADIUS);
    this.score1 = new Score(this.width/2 - 50, 30);
    this.score2 = new Score(this.width/2 + 25, 30);
    document.addEventListener('keydown', (event) => {
      if(event.key === KEYS.pause) {
        this.paused = !this.paused;
      }
    });
    // Other code goes here...
  }

  render() {
    if (this.paused) {
      return;
    }
    this.gameElement.innerHTML = '';
    let svg = document.createElementNS(SVG_NS, 'svg');
    svg.setAttributeNS(null, "width", this.width);
    svg.setAttributeNS(null, "height", this.height);
    svg.setAttributeNS(null, "viewbox", `0 0 ${this.width} ${this.height}`);
    this.gameElement.appendChild(svg);

    this.board.render(svg);
    this.paddle1.render(svg);
    this.paddle2.render(svg);
    this.score1.render(svg, this.paddle1.getScore());
    this.score2.render(svg, this.paddle2.getScore());
    this.ball.render(svg, this.paddle1, this.paddle2);
    if(this.paddle1.getScore() >= 3 && this.paddle2.getScore() >= 3){
      this.ball2.render(svg, this.paddle1, this.paddle2);
    }
    if (this.paddle1.getScore() >= 7 && this.paddle2.getScore() >= 7) {
      this.ball3.render(svg, this.paddle1, this.paddle2);
    }
  }
}

