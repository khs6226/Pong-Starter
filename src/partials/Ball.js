import {SVG_NS, KEYS} from '../settings';
import cat1 from '../../public/sounds/cat1.wav';
import cat2 from '../../public/sounds/cat2.mp3';
import goal from '../../public/sounds/goal.mp3';

export default class Ball {
  constructor(boardWidth, boardHeight, radius) {
      this.boardWidth = boardWidth;
      this.boardHeight = boardHeight;
      this.radius = radius;
      this.direction = -1;
      this.cat1 = new Audio(cat1);
      this.cat2 = new Audio(cat2);
      this.goal = new Audio(goal);
      this.start();
  }
  
  start() {
    this.x = this.boardWidth/2;
    this.y = this.boardHeight/2;
    this.vy = 0;
    this.vx = 0;
    if(document.addEventListener('keydown', (event) => {
      if(event.key === KEYS.start) {
        while (this.vy === 0){
          this.vy = Math.floor(Math.random()*5 - 2.5);
          this.vx = this.direction * (4-Math.abs(this.vy));
        }
      }
    }));
  }

  reset(){
    this.x = this.boardWidth/2;
    this.y = this.boardHeight/2;
    this.vy = 0;
    this.vx = 0;
    while (this.vy === 0){
      this.vy = Math.floor(Math.random()*5 - 2.5);
    }
    this.vx = this.direction * (4-Math.abs(this.vy));
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
      this.goal.play();
      player2.paddleSizeChange();
      this.reset();
    } else if (this.x >= this.boardWidth) {
      player1.increaseScore();
      this.direction = this.direction * -1;
      this.goal.play();
      player1.paddleSizeChange();
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
            this.cat1.play();
            this.vx = this.vx * -1;
          }
    } else {
      const p1 = player1.getCoordinates();
      if (this.x - this.radius <= p1.right &&
          this.x - this.radius >= p1.left &&
          this.y + this.radius >= p1.top &&
          this.y - this.radius <= p1.bottom) {
            this.cat2.play();
            this.vx = this.vx * -1;
        }
      }
    }

  render(svg, player1, player2, color, speed){
    let circle = document.createElementNS(SVG_NS, 'circle');
    circle.setAttributeNS(null, "fill", color);
    circle.setAttributeNS(null, "r", this.radius);
    circle.setAttributeNS(null, "cx", this.x);
    circle.setAttributeNS(null, "cy", this.y);
    this.x += this.vx*speed;
    this.y += this.vy*speed;
    this.wallCollision();
    this.paddleCollision(player1, player2);
    this.goalCollision(player1, player2);
    svg.appendChild(circle);
  }
}