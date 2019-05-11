import {SVG_NS} from '../settings';
import audioFile from '../../public/sounds/pong-01.wav';

export default class Ball {
  constructor(boardWidth, boardHeight, radius) {
      this.boardWidth = boardWidth;
      this.boardHeight = boardHeight;
      this.radius = radius;
      this.direction = -1;
      this.ping = new Audio(audioFile);
      this.reset();
  }
  
  reset(){
    this.x = this.boardWidth/2;
    this.y = this.boardHeight/2;
    this.vy = 0;
    this.vx = 0;
    while (this.vy === 0){
      this.vy = Math.floor(Math.random()*4 - 2);
    }
    this.vx = this.direction * (3-Math.abs(this.vy));
    console.log(this.vx);
    console.log(this.vy);
  }

  wallCollision() {
    const hitsTop = this.y - this.radius <= 0;
    const hitsBottom = this.y + this.radius >= this.boardHeight;
    if (hitsTop || hitsBottom) {
      this.vy = this.vy * -1;
    }
  }

  goalCollision(player1, player2) {
    if (this.x <= 0) {
      player2.increaseScore();
      this.direction = this.direction * -1;
      this.reset();
    } else if (this.x >= this.boardWidth) {
      player1.increaseScore();
      this.direction = this.direction * -1;
      this.reset();
    }
  }

  paddleCollision(player1, player2) {
    if (this.vx > 0) {
      const p2 = player2.getCoordinates();
      if (this.x + this.radius >= p2.left &&
          this.x + this.radius <= p2.right &&
          this.y + this.radius >= p2.top &&
          this.y - this.radius <= p2.bottom) {
            this.ping.play();
            this.vx = this.vx * -1;
          }
    } else {
      const p1 = player1.getCoordinates();
      if (this.x - this.radius <= p1.right &&
          this.x - this.radius >= p1.left &&
          this.y + this.radius >= p1.top &&
          this.y - this.radius <= p1.bottom) {
            this.ping.play();
            this.vx = this.vx * -1;
        }
      }
    }

  render(svg, player1, player2){
    let circle = document.createElementNS(SVG_NS, 'circle');
    circle.setAttributeNS(null, "fill", "white");
    circle.setAttributeNS(null, "r", this.radius);
    circle.setAttributeNS(null, "cx", this.x);
    circle.setAttributeNS(null, "cy", this.y);
    this.x += this.vx;
    this.y += this.vy;
    this.wallCollision();
    this.paddleCollision(player1, player2);
    this.goalCollision(player1, player2);
    svg.appendChild(circle);

  }
}