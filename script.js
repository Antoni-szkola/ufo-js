
class Obiekt {
    constructor(x, y) {
        // Początkowe (x, y)
        this.x = x;
        this.y = y;   

        this.element = document.createElement("img");
        this.element.style.position = "absolute";

        this.updatePos();
    }

    // Syncs object (x, y) with CSS 
    updatePos() {
        this.element.style.left = `${this.x}px`;
        this.element.style.top = `${this.y}px`;
    }

    // Nastawienie faktycznego zdjęcia
    draw(src, alt) {
        this.element.src = src;
        this.element.alt = alt;

        this.updatePos();
        
        document.body.append(this.element);
    }

    move(x, y) {
        this.x += x;
        this.y += y;
        this.updatePos();
    }
}

const UFO = new Obiekt(50, 50);
UFO.draw("img/ufo.png", "UFO");

UFO.move(110, 100);