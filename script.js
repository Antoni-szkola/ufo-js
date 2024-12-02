class Obiekt {
    constructor(config) {
        this.x = config.defaultX;
        this.y = config.defaultY;   
        this.class = config.class == undefined ? "" : config.class

        this.speed = config.speed;

        this.element = document.createElement("img");
        this.element.style.position = "absolute";

        this.updatePos();

        this.moving = { up: false, down: false, left: false, right: false };  // Track in which direction it's currently moving
        this.isMoving = false; // Track if the object is moving
    }

    // Syncs object (x, y) with CSS 
    updatePos() {
        this.element.style.left = `${this.x}px`;
        this.element.style.top = `${this.y}px`;
    }

    // Set src, alt and draw to screen
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

    isOOB(direction) {
        const elementWidth = this.element.clientWidth;
        const elementHeight = this.element.clientHeight;

        if (direction === 'right') {
            return this.x + elementWidth > window.innerWidth - this.speed;
        } else if (direction === 'left') {
            return this.x < 0 + this.speed;
        } else if (direction === 'up') {
            return this.y < 0 + this.speed;
        } else if (direction === 'down') {
            return this.y + elementHeight > window.innerHeight - this.speed;
        }
        return false;
    }

    animate() {
        const speed = this.speed;

        if (this.moving.right && !this.isOOB('right')) this.move(speed, 0);
        if (this.moving.left && !this.isOOB('left')) this.move(-speed, 0);
        if (this.moving.up && !this.isOOB('up')) this.move(0, -speed);
        if (this.moving.down && !this.isOOB('down')) this.move(0, speed);

        if (this.isMoving) {
            requestAnimationFrame(() => this.animate());
        }
    }
}

class UFO extends Obiekt {
    handleInput() {
        document.addEventListener("keydown", (e) => {
            const key = e.key.toLowerCase(); 
            if (key === "d" || key === "arrowright") {
                this.moving.right = true;
            } else if (key === "a" || key === "arrowleft") {
                this.moving.left = true;
            } else if (key === "w" || key === "arrowup") {
                this.moving.up = true;
            } else if (key === "s" || key === "arrowdown") {
                this.moving.down = true;
            }

            if (!this.isMoving) {
                this.isMoving = true;
                this.animate();
            }
        });

        document.addEventListener("keyup", (e) => {
            const key = e.key.toLowerCase();
            if (key === "d" || key === "arrowright") {
                this.moving.right = false;
            } else if (key === "a" || key === "arrowleft") {
                this.moving.left = false;
            } else if (key === "w" || key === "arrowup") {
                this.moving.up = false;
            } else if (key === "s" || key === "arrowdown") {
                this.moving.down = false;
            }

            // Stop moving if no keys are pressed
            if (!this.moving.right && !this.moving.left && !this.moving.up && !this.moving.down) {
                this.isMoving = false;
            }
        });
    }
}

class Rock extends Obiekt {
    fall() {
        this.moving.down = true;

        if (!this.isMoving) {
            this.isMoving = true;
            this.animate();
        }
    }

    animate() {
        super.animate();

        if (this.isOOB('down')) {
            this.element.remove(); 
            this.isMoving = false;
        }

        if (this.checkCollision(ufo)) {
            alert("Zostałeś zaceglony :(((((");
            window.location.reload()
        }
    }

    checkCollision(ufo) {
        const ufoRect = ufo.element.getBoundingClientRect();
        const rockRect = this.element.getBoundingClientRect();

        return !(
            ufoRect.right < rockRect.left ||
            ufoRect.left > rockRect.right ||
            ufoRect.bottom < rockRect.top ||
            ufoRect.top > rockRect.bottom
        );
    }
}


// Falling rocks
function spawnRock() {
    const randomX = Math.random() * (window.innerWidth - 200); 
    const rock = new Rock({
        defaultX: randomX,
        defaultY: 0,
        speed: 5,
        class: "rock"
    });
    rock.draw("img/rock.png", "Rock");
    rock.fall();
}
setInterval(spawnRock, 1250);

// Create the UFO
const ufo = new UFO({
    defaultX: 0,
    defaultY: 0,
    speed: 10, // Adjust speed for smoother movement
});
ufo.draw("img/ufo.png", "UFO");
ufo.handleInput();