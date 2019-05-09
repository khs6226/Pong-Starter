import {SVG_NS} from '../settings';

export default class Paddle {
    constructor() {
        this.width = 8;
        this.height = 56;
    }
    render(svg){
        let paddle1 = document.createElementNS(SVG_NS, 'rect');
        paddle1.setAttributeNS(null, "x", 10);
        paddle1.setAttributeNS(null, "y", 100);
        paddle1.setAttributeNS(null, "width", this.width);
        paddle1.setAttributeNS(null, "height", this.height);
        paddle1.setAttributeNS(null, "fill", "white");
        svg.appendChild(paddle1);

        let paddle2 = document.createElementNS(SVG_NS, 'rect');
        paddle2.setAttributeNS(null, "x", 494);
        paddle2.setAttributeNS(null, "y", 100);
        paddle2.setAttributeNS(null, "width", this.width);
        paddle2.setAttributeNS(null, "height", this.height);
        paddle2.setAttributeNS(null, "fill", "white");
        svg.appendChild(paddle2);
    }
}