import {SVG_NS, TEXT_SIZE} from '../settings';

export default class gameEnd {
  constructor(xPosition, yPosition) {
      this.x = xPosition;
      this.y = yPosition;
  }
  render(svg, winner){
    let text = document.createElementNS(SVG_NS, 'text');
    text.setAttributeNS(null, "fill", "white");
    text.setAttributeNS(null, "font-size", TEXT_SIZE);
    text.setAttributeNS(null, "font-family", "'Silkscreen Web', monotype");
    text.setAttributeNS(null, "x", this.x);
    text.setAttributeNS(null, "y", this.y);
    text.textContent = winner;
    svg.appendChild(text);
    
  }
}