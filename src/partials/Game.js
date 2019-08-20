import {SVG_NS, PADDLE_HEIGHT, PADDLE_WIDTH, BOARD_GAP, KEYS, RADIUS, BALL} from '../settings';
import Board from './Board';
import Paddle from './Paddle';
import Ball from './Ball';
import Score from './Score';
import gameEnd from './gameEnd';


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
    this.ball2 = new Ball(this.width, this.height, RADIUS);
    this.ball3 = new Ball(this.width, this.height, RADIUS);
    this.score1 = new Score(this.width/2 - 50, 30);
    this.score2 = new Score(this.width/2 + 25, 30);
    this.winnerLeft = new gameEnd(60, 128);
    this.winnerRight = new gameEnd(316, 128);
    document.addEventListener('keydown', (event) => {
      if(event.key === KEYS.pause) {
        this.paused = !this.paused;
      }
      else if(event.key === KEYS.restart) {
        document.location.reload();
        }
      });
  }

  render() {
    if (this.paused) {
      this.paddle1.paddleStop();
      this.paddle2.paddleStop();
      return;
    } else {
      this.paddle1.paddleRecover();
      this.paddle2.paddleRecover();
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
    this.ball.render(svg, this.paddle1, this.paddle2, BALL.COLORS.blue, BALL.speedFactors.normal);
    if(this.paddle1.getScore() >= 3 && this.paddle2.getScore() >= 3){
      this.ball2.render(svg, this.paddle1, this.paddle2, BALL.COLORS.yellow, BALL.speedFactors.faster);
    }
    if (this.paddle1.getScore() >= 8  && this.paddle2.getScore() >= 8) {
      this.ball3.render(svg, this.paddle1, this.paddle2, BALL.COLORS.lightgreen, BALL.speedFactors.slower);
    }
    if (this.paddle1.getScore() >= 15) {
      this.paused = true;
      this.winnerLeft.render(svg, 'Winner!');
    }
    else if (this.paddle2.getScore() >= 15) {
      this.paused = true;
      this.winnerRight.render(svg, 'Winner!');
    };
  }
}

