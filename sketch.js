class Ball {
    constructor(x, y, radius, speed_x, speed_y, gray) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.speed_x = speed_x;
        this.speed_y = speed_y;
        this.gray = gray;
    }

    display(col) 
    {
        if (col == 1) {
            fill(this.gray, 0, 0);
        } else if (col == 2) {
            fill(0, this.gray, 0);
        } else if (col == 3) {
            fill(0, 0, this.gray);
        } else {
            fill(this.gray);
        }
        circle(this.x, this.y, this.radius);
    }

    move(acc) 
    {
        this.x += this.speed_x;
        this.y += this.speed_y;
        this.gray += acc;
        if (this.gray >= 255) {
            this.gray = 0;
        }
        if (this.x >= (width - this.radius) || this.x <= this.radius) {
            this.speed_x *= -1;
        }
        if (this.y >= (height - this.radius) || this.y <= this.radius) {
            this.speed_y *= -1;
        }
    }
}
const r = 5;
let green_balls = [];
let flash_balls = [];
let N = 6500;

function setup() 
{
    createCanvas(windowWidth, windowHeight);
    background(0);
    frameRate(1000);
    let Ux = width / 2 //random(2, 10);
    let Uy = height / 2 //random(2, 10);
    for (let j = 0; j < N / 4; ++j) {
        green_balls[j] = new Ball(Ux, Uy, r, 4 - (16 * j / N), 16 * j / N, 0);
        flash_balls[j] = new Ball(Ux + 1, Uy + 1, r, 4 - (16 * j / N), 16 * j / N, 0);
    }
    for (let j = N / 4; j < N / 2; ++j) {
        green_balls[j] = new Ball(Ux, Uy, r, -4 + (16 * (j - (N / 4)) / N), -16 * (j - (N / 4)) / N, 0);
        flash_balls[j] = new Ball(Ux - 1, Uy - 1, r, -4 + (16 * (j - (N / 4)) / N), -16 * (j - (N / 4)) / N, 0);
    }
    for (let j = N / 2; j < 3 * (N / 4); ++j) {
        green_balls[j] = new Ball(Ux, Uy, r, 4 - (16 * (j - (N / 2)) / N), -16 * (j - (N / 2)) / N, 0);
        flash_balls[j] = new Ball(Ux + 1, Uy - 1, r, 4 - (16 * (j - (N / 2)) / N), -16 * (j - (N / 2)) / N, 0);
    }
    for (let j = 3 * (N / 4); j < N; ++j) {
        green_balls[j] = new Ball(Ux, Uy, r, -4 + (16 * (j - (3 * N / 4)) / N), 16 * (j - (3 * N / 4)) / N, 0);
        flash_balls[j] = new Ball(Ux - 1, Uy + 1, r, -4 + (16 * (j - (3 * N / 4)) / N), 16 * (j - (3 * N / 4)) / N, 0);
    }
}

function draw() 
{
    for (let i = 0; i < N; i++) {
        green_balls[i].display(2);
        green_balls[i].move(10);

        flash_balls[i].display(3);
        flash_balls[i].move(flash_balls[i].gray + 1)

    }
}