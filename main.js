import Animation from "./animation.js";
import Tetris from "./tetris.js";

const canvas = document.getElementById("main_canvas");
const ctx = canvas.getContext("2d");

const WIDTH = canvas.width = 300;
const HEIGHT = canvas.height = 600;

const SIZE = 30;

const tetris = new Tetris(ctx,WIDTH,HEIGHT,SIZE);
const animation = new Animation(ctx,WIDTH,HEIGHT,SIZE);

function animate() {
    ctx.clearRect(0,0,WIDTH,HEIGHT);
    tetris.update();
    tetris.shape_move(tetris);
    tetris.shape_rotation(tetris);
    animation.update();
    requestAnimationFrame(animate);
}

setInterval(function() {
    tetris.shape_push();
}, 300);

animate();
