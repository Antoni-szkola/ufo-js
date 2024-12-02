
class Obiekt {
    constructor(x, y, speed) {
        // Początkowe (x, y)
        this.x = x;
        this.y = y;   

        this.speed = speed;

        this.element = document.createElement("img");
        this.element.style.position = "absolute";

        this.updatePos();

        this.moving = { up: false, down: false, left: false, right: false }; // Track movement state
        this.moveInterval = null; // To store the interval for continuous movement
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

    handleInput() {
        const speed = this.speed;
        
        document.body.addEventListener("keydown", (e) => {
            const key = e.key;
            console.log(e.key);
            if (key === "d" || key === "ArrowRight") {
                this.moving.right = true;
            } else if (key === "a" || key === "ArrowLeft") {
                this.moving.left = true;
            } else if (key === "w" || key === "ArrowUp") {
                this.moving.up = true;
            } else if (key === "s" || key === "ArrowDown") {
                this.moving.down = true;
            }

            if (!this.moveInterval) {
                this.moveInterval = setInterval(() => {
                    if (this.moving.right) this.move(speed, 0);
                    if (this.moving.left) this.move(-speed, 0);
                    if (this.moving.up) this.move(0, -speed);
                    if (this.moving.down) this.move(0, speed);
                }, 100);
            }
        });

        document.addEventListener("keyup", (e) => {
            const key = e.key;
            if (key === "d" || key === "ArrowRight") {
                this.moving.right = false;
            } else if (key === "a" || key === "ArrowLeft") {
                this.moving.left = false;
            } else if (key === "w" || key === "ArrowUp") {
                this.moving.up = false;
            } else if (key === "s" || key === "ArrowDown") {
                this.moving.down = false;
            }

            // Stop moving if no keys are pressed
            if (!this.moving.right && !this.moving.left && !this.moving.up && !this.moving.down) {
                clearInterval(this.moveInterval);
                this.moveInterval = null;
            }
        });
    }
}

const UFO = new Obiekt(50, 50, 100);
UFO.draw("img/ufo.png", "UFO");

UFO.handleInput()