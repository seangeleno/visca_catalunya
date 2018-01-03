var c = document.getElementById("c");
var ctx = c.getContext("2d");

var cw = c.width = 400,
    cX = cw / 2;
var ch = c.height = 270,
    cY = ch / 2;

var rad = (Math.PI / 180);
var R = 10;
var offset = R;
var W = ~~(cw / offset) - 1;
var H = ~~(ch / offset) - 1;
var a = 0;
var increment = -1;
ctx.strokeStyle = "white";
var p = [];
var hue = 53,
    lum;

for (var j = 1; j <= H; j++) {
    for (var i = 1; i <= W; i++) {
        k = p.length
        a -= 18 * increment;
        p[k] = {}

        p[k].j = j;
        p[k].i = i;
        p[k].a = a;
        p[k].cx = i * offset;
        p[k].cy = j * offset;
        p[k].x = p[k].cx + R * Math.cos(p[k].a * i * rad);
        p[k].y = p[k].cy + R * Math.sin(p[k].a * i * rad);
    }
}

function drawGrid() {
    for (var j = 1; j <= H; j++) {
        for (var i = (j - 1) * W; i < j * W; i++) {

            ctx.beginPath();
            if (i < j * W - 1) {
                ctx.moveTo(p[i].x, p[i].y);
                ctx.lineTo(p[i + 1].x, p[i + 1].y);
                if (j < H) {
                    ctx.lineTo(p[i + 1 + W].x, p[i + 1 + W].y);
                    ctx.lineTo(p[i + W].x, p[i + W].y);
                    ctx.closePath();

                    /* Andorra */ //if(p[i].i  < W/3){hue = 230;}else if(p[i].i > 2*W/3){hue = 0;}else{hue = 53}

                    /* Catalunya */
                    if (p[i].j % 6 < 3) {
                        hue = 53;
                    } else if (p[i].j % 6 >= 3) {
                        hue = 0;
                    }//-----------

                    var diff = (p[i + 1].x - p[i].x) / R;
                    var lum = 50 * diff;
                    var color = "hsl(" + hue + ", 100%, " + lum + "%)";
                    ctx.fillStyle = ctx.strokeStyle = color;

                    ctx.fill();
                    ctx.stroke();
                }
            }
        }
    }
}

function Update() {
    ctx.clearRect(0, 0, cw, ch);
    for (var i = 0; i < p.length; i++) {
        p[i].a += increment;
        p[i].x = p[i].cx + R * Math.cos(p[i].a * rad);
        p[i].y = p[i].cy + R * Math.sin(p[i].a * rad);

    }
    drawGrid();
    requestId = window.requestAnimationFrame(Update);
}

function start() {
    requestId = window.requestAnimationFrame(Update);
    stopped = false;
}

function stopAnim() {
    if (requestId) {
        window.cancelAnimationFrame(requestId);
    }
    stopped = true;
}

window.addEventListener("load", start(), false);
c.addEventListener("click", function () {
    (stopped == true) ? start() : stopAnim();
}, false);
