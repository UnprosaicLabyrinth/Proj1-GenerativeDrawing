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
        // Case 0: Greyscale
        if (opt == 0) {
            fill(this.gray, this.gray, this.gray, 200);
        }
        // Case 1: Bluish green
        else if (opt == 1) {
            fill(0, this.gray, this.gray - 102);
        }
        // Case 2: Flash blue
        else if (opt == 2) {
            fill(0, 0, this.gray);
        }
        // Case 3: Yellowish green
        else if (opt == 3) {
            fill(this.gray - 51, this.gray, 0);
        }
        // Case 4: Flash red
        else if (opt == 4) {
            fill(this.gray - 51, 0, 0);
        }
        // Default: Random grayscale
        else {
            fill(random(256));
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

const r = 4; // radius of the drawing agents
let flash_val = 0; // flash color
let green_val = 0; // agent color
let green_balls = [];
let flash_balls = [];
const N = 10000; // no. of drawing and flash agents

function setup() 
{
    createCanvas(windowWidth, windowHeight);
    background(0);
    let Cx = width / 2
    let Cy = height / 2
    for (let j = 0; j < N / 4; ++j) {
        green_balls[j] = new Ball(Cx, Cy, r, 4 - (16 * j / N), 16 * j / N, 0);
        flash_balls[j] = new Ball(Cx / 2, Cy, r, 4 - (16 * j / N), 16 * j / N, 0);
    }
    for (let j = N / 4; j < N / 2; ++j) {
        green_balls[j] = new Ball(Cx, Cy, r, -4 + (16 * (j - (N / 4)) / N), -16 * (j - (N / 4)) / N, 0);
        flash_balls[j] = new Ball(3 * Cx / 2, Cy, r, -4 + (16 * (j - (N / 4)) / N), -16 * (j - (N / 4)) / N, 0);
    }
    for (let j = N / 2; j < 3 * (N / 4); ++j) {
        green_balls[j] = new Ball(Cx, Cy, r, 4 - (16 * (j - (N / 2)) / N), -16 * (j - (N / 2)) / N, 0);
        flash_balls[j] = new Ball(Cx / 2, Cy, r, 4 - (16 * (j - (N / 2)) / N), -16 * (j - (N / 2)) / N, 0);
    }
    for (let j = 3 * (N / 4); j < N; ++j) {
        green_balls[j] = new Ball(Cx, Cy, r, -4 + (16 * (j - (3 * N / 4)) / N), 16 * (j - (3 * N / 4)) / N, 0);
        flash_balls[j] = new Ball(3 * Cx / 2, Cy, r, -4 + (16 * (j - (3 * N / 4)) / N), 16 * (j - (3 * N / 4)) / N, 0);
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

//
// User interaction
//
function keyPressed() {
    // color added when 'c' pressed
    // color alternated between cool and warm themes
    // when pressed after that
    if (keyCode === 67 || keyCode === 99) {
        green_val = green_val == 1 ? 3 : 1;
        flash_val = flash_val == 2 ? 4 : 2;
    } 
    // direction reversed when space pressed
    else if (keyCode === 32) {
        for (let i = 0; i < N; ++i) {
            green_balls[i].speed_x *= -1;
            flash_balls[i].speed_x *= -1;
            green_balls[i].speed_y *= -1;
            flash_balls[i].speed_y *= -1;
        }
    } 
    // b&w when backspace pressed
    else if (keyCode === BACKSPACE) {
        green_val = 0;
        flash_val = 0;
    }
}