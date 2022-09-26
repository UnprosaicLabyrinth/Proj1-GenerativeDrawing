class Ball {
    constructor(x, y, radius, speed_x, speed_y, gray) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.speed_x = speed_x;
        this.speed_y = speed_y;
        this.gray = gray;
    }

    display(opt) {
        if (opt == 1) {
            fill(this.gray - 51, 0, 0);
        } else if (opt == 2) {
            fill(0, this.gray, this.gray - 102);
        } else if (opt == 3) {
            fill(0, 0, this.gray - 51);
        } else if (opt == 4) {
            fill(this.gray - 51, this.gray, 0);
        }else {
            fill(this.gray);
        }
        circle(this.x, this.y, this.radius);
    }

    move(val) {
        // changing x
        this.x += this.speed_x;
        if (this.x >= (width - this.radius) || this.x <= this.radius) {
            this.speed_x *= -1;
        }

        // changing y
        this.y += this.speed_y;
        if (this.y >= (height - this.radius) || this.y <= this.radius) {
            this.speed_y *= -1;
        }

        // changing shade
        this.gray += val;
        if (this.gray > 255) {
            this.gray = 0;
        }
    }
}

const r = 4;
let flash_val = 3;
let green_val = 2;
let green_balls = [];
let flash_balls = [];
let N = 10000;

function setup() 
{
    createCanvas(windowWidth, windowHeight);
    background(0);
    frameRate(30);
    let Ux = width / 2
    let Uy = height / 2
    for (let j = 0; j < N / 4; ++j) {
        green_balls[j] = new Ball(Ux, Uy, r, 4 - (16 * j / N), 16 * j / N, 0);
        flash_balls[j] = new Ball(Ux / 2, Uy, r, 4 - (16 * j / N), 16 * j / N, 0);
    }
    for (let j = N / 4; j < N / 2; ++j) {
        green_balls[j] = new Ball(Ux, Uy, r, -4 + (16 * (j - (N / 4)) / N), -16 * (j - (N / 4)) / N, 0);
        flash_balls[j] = new Ball(3 * Ux / 2, Uy, r, -4 + (16 * (j - (N / 4)) / N), -16 * (j - (N / 4)) / N, 0);
    }
    for (let j = N / 2; j < 3 * (N / 4); ++j) {
        green_balls[j] = new Ball(Ux, Uy, r, 4 - (16 * (j - (N / 2)) / N), -16 * (j - (N / 2)) / N, 0);
        flash_balls[j] = new Ball(Ux / 2, Uy, r, 4 - (16 * (j - (N / 2)) / N), -16 * (j - (N / 2)) / N, 0);
    }
    for (let j = 3 * (N / 4); j < N; ++j) {
        green_balls[j] = new Ball(Ux, Uy, r, -4 + (16 * (j - (3 * N / 4)) / N), 16 * (j - (3 * N / 4)) / N, 0);
        flash_balls[j] = new Ball(3 * Ux / 2, Uy, r, -4 + (16 * (j - (3 * N / 4)) / N), 16 * (j - (3 * N / 4)) / N, 0);
    }
}

function draw() 
{
    for (let i = 0; i < N; i++) {
        green_balls[i].display(green_val);
        green_balls[i].move(10);

        flash_balls[i].display(flash_val);
        flash_balls[i].move(flash_balls[i].gray + 1)

    }
}

function keyPressed() {
    if (keyCode === 67 || keyCode === 99) {
        flash_val = flash_val == 1 ? 3 : 1;
        green_val = green_val == 4 ? 2 : 4;
    } else if (keyCode === 32) {
        for (let i = 0; i < N; ++i) {
            green_balls[i].speed_x *= -1;
            flash_balls[i].speed_x *= -1;
            green_balls[i].speed_y *= -1;
            flash_balls[i].speed_y *= -1;
        }
    } else if (keyCode === BACKSPACE) {
        flash_val = flash_val == 1 || flash_val == 3 ? 5 : 3;
        green_val = green_val == 4 || green_val == 2 ? 5 : 2;
    }
}