var mats = [
	{
		name: "ground",
		maxStrength: 100,
		vertical: 0,
		horizontal: 0,
		diagonal: 0,
		thinWall: 0,
		slope: 0,
		color: "#613f2d"
	},
	{
		name: "air",
		maxStrength: 0,
		vertical: 0,
		horizontal: 0,
		diagonal: 0,
		thinWall: 0,
		slope: 0,
		color: "#aabbff"
	},
	{
		name: "brick",
		maxStrength: 80,
		vertical: -8,
		horizontal: -30,
		diagonal: -20,
		thinWall: -5,
		slope: 0,
		color: "brown"
	},
	{
		name: "wood",
		maxStrength: 50,
		vertical: -10,
		horizontal: -12,
		diagonal: -10,
		thinWall: -2,
		slope: 0,
		color: "#815f4d"
	},
	{
		name: "stone blocks",
		maxStrength: 100,
		vertical: -8,
		horizontal: -50,
		diagonal: -40,
		thinWall: -4,
		slope: 0,
		color: "#555555"
	},
	{
		name: "earth",
		maxStrength: 50,
		vertical: -8,
		horizontal: -100,
		diagonal: -10,
		thinWall: -8,
		slope: -15,
		color: "#613f2d"
	},
	{
		name: "straw",
		maxStrength: 25,
		vertical: -5,
		horizontal: -15,
		diagonal: -8,
		thinWall: -5,
		slope: -5,
		color: "yellow"
	},
	{
		name: "canvas",
		maxStrength: 10,
		vertical: -3,
		horizontal: -1,
		diagonal: -4,
		thinWall: 0,
		slope: 0,
		color: "#dddddd"
	},
	{
		name: "steel",
		maxStrength: 90,
		vertical: -4,
		horizontal: -8,
		diagonal: -4,
		thinWall: -2,
		slope: 0,
		color: "#aaaabb"
	},
];

var examples = [
	{
		name: "Earthen Hovel",
		data: "1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111555511111111111111155115511111111111111551155111111100000000000000000000"
	},
	{
		name: "Tent",
		data: "1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111117777711111111111111711111711111111111117111117111111100000000000000000000"
	},
	{
		name: "Brick & Wood",
		data: "1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111113333333311111111111121111112111111111111211111121111111111112111111211111100000000000000000000"
	},
	{
		name: "Stone Hall",
		data: "1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111133333333311111111111431111134111111111144111111144111111111441111111441111111114411111114411111111144111111144111100000000000000000000"
	},
	{
		name: "Steel Arch",
		data: "1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111888888111111111111188111188111111111188811111188811111118811111111118811111881111111111118811118111111111111118111181111111111111181111811111111111111811118111111111111118111181111111111111181111811111111111111811118111111111111118111181111111111111181100000000000000000000"
	},
	{
		name: "Mixed",
		data: "1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111133333111111111111113311133111111111111231111132111111111112111111121111111111121111111211111111111411111114111111111114111111141111100000000000000000000"
	},
	{
		name: "Tower",
		data: "1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111133333311111111111111431134111111111111144111144111111111111441111441111111111114433334411111111111144111144111111111111441111441111111111114433334411111111111144111144111111111111441111441111100000000000000000000"
	}
];

var gs = 30;
var gridW = 20;
var gridH = 20;
var matSel = mats[2];
var showNumbers = false;

var grid = [];
for (var y = 0; y < gridH; y++) {
	var row = [];
	grid.push(row);
	for (var x = 0; x < gridW; x++) {
		if (y == gridH - 1) {
			row.push([mats[0], 100]);
		} else {
			row.push([mats[1], 0]);
		}
	}
}

function load(data) {
	var i = 0;
	for (var y = 0; y < gridH; y++) {
		for (var x = 0; x < gridW; x++) {
			grid[y][x][0] = mats[parseInt(data[i])];
			grid[y][x][1] = grid[y][x][0].maxStrength;
			i++;
		}
	}
	recalculate();
}

function hwl(name, volume) {
    return new Howl({src: ["sounds/" + name + ".ogg", "sounds/" + name + ".mp3", "sounds/" + name + ".wav"], volume: volume || 1});
}

function recalculate() {
	// Clear old strength values.
	for (var y = 0; y < gridH - 1; y++) {
		for (var x = 0; x < gridW; x++) {
			grid[y][x][1] = 0;
		}
	}
	lp: while (true) {
		for (var y = gridH - 1; y > 0; y--) {
			// Thin wall penalty
			for (var x = 0; x < gridW; x++) {
				var me = grid[y][x];
				// Max strength
				me[1] = Math.min(me[1], me[0].maxStrength);
				if (
					(x == 0 || grid[y][x - 1][0] == mats[1]) &&
					(x == gridW - 1 || grid[y][x + 1][0] == mats[1])
				) {
					me[1] += me[0].thinWall;
				}
			}
			// Slope penalty
			if (y < gridH - 1) {
				for (var x = 1; x < gridW - 1; x++) {
					var me = grid[y][x];
					if (grid[y + 1][x - 1][0] == mats[1]) {
						me[1] += me[0].slope;
					}
					if (grid[y + 1][x + 1][0] == mats[1]) {
						me[1] += me[0].slope;
					}
				}
			}
			// Loop in both directions
			for (var x = 0; x < gridW; x++) {
				var me = grid[y][x];
				// Max strength
				me[1] = Math.min(me[1], me[0].maxStrength);
				// Vertical
				grid[y - 1][x][1] = Math.min(grid[y - 1][x][0].maxStrength, Math.max(grid[y - 1][x][1], me[1] + me[0].vertical));
				// Horizontal, diagonal
				if (x > 0) {
					grid[y][x - 1][1] = Math.min(grid[y][x - 1][0].maxStrength, Math.max(grid[y][x - 1][1], me[1] + me[0].horizontal));
					grid[y - 1][x - 1][1] = Math.min(grid[y - 1][x - 1][0].maxStrength, Math.max(grid[y - 1][x - 1][1], me[1] + me[0].diagonal));
				}
				if (x < gridW - 1) {
					grid[y][x + 1][1] = Math.min(grid[y][x + 1][0].maxStrength, Math.max(grid[y][x + 1][1], me[1] + me[0].horizontal));
					grid[y - 1][x + 1][1] = Math.min(grid[y - 1][x + 1][0].maxStrength, Math.max(grid[y - 1][x + 1][1], me[1] + me[0].diagonal));
				}
			}
			for (var x = gridW - 1; x >= 0; x--) {
				var me = grid[y][x];
				// Max strength
				me[1] = Math.min(me[1], me[0].maxStrength);
				// Vertical
				grid[y - 1][x][1] = Math.min(grid[y - 1][x][0].maxStrength, Math.max(grid[y - 1][x][1], me[1] + me[0].vertical));
				// Horizontal and diagonal
				if (x > 0) {
					grid[y][x - 1][1] = Math.min(grid[y][x - 1][0].maxStrength, Math.max(grid[y][x - 1][1], me[1] + me[0].horizontal));
					grid[y - 1][x - 1][1] = Math.min(grid[y - 1][x - 1][0].maxStrength, Math.max(grid[y - 1][x - 1][1], me[1] + me[0].diagonal));
				}
				if (x < gridW - 1) {
					grid[y][x + 1][1] = Math.min(grid[y][x + 1][0].maxStrength, Math.max(grid[y][x + 1][1], me[1] + me[0].horizontal));
					grid[y - 1][x + 1][1] = Math.min(grid[y - 1][x + 1][0].maxStrength, Math.max(grid[y - 1][x + 1][1], me[1] + me[0].diagonal));
				}
			}
			for (var x = 0; x < gridW; x++) {
				var me = grid[y][x];
				if (me[1] <= 0 && me[0] != mats[1]) {
					// Collapse
					me[1] = 0;
					me[0] = mats[1];
					continue lp;
				}
			}
		}
		break;
	}
}

function tick(ms) {
    c.resetTransform();
    c.fillStyle = "#cccccc";
    c.fillRect(0, 0, canvas.width, canvas.height);
    c.font = "15px Arial";
    if (pressed("E")) {
    	var data = "";
    	for (var y = 0; y < gridH; y++) {
    		for (var x = 0; x < gridW; x++) {
    			data += "" + mats.indexOf(grid[y][x][0]);
    		}
    	}
    	console.log(data);
    }
    for (var y = 0; y < gridH; y++) {
    	for (var x = 0; x < gridW; x++) {
    		c.fillStyle = grid[y][x][0].color;
    		c.fillRect(x * gs, y * gs, gs, gs);
    		c.fillStyle = "black";
    		if (showNumbers) {
    			c.fillText("" + grid[y][x][1], x * gs + 2, y * gs + 15);
    		}
    		if (y < gridH - 1 && (mouseDown && cursor.x >= x * gs && cursor.x < x * gs + gs && cursor.y >= y * gs && cursor.y < y * gs + gs) || (click && click.x >= x * gs && click.x < x * gs + gs && click.y >= y * gs && click.y < y * gs + gs)) {
    			grid[y][x][0] = matSel;
    			recalculate();
    		}
    	}
    }
    c.font = "15px Arial";
    var yy = 10;
    for (var i = 1; i < mats.length; i++) {
    	if (mats[i] == matSel) {
    		c.fillStyle = "yellow";
    		c.fillRect(608, yy - 2, gs + 4, gs + 4);
    	}
    	c.fillStyle = mats[i].color;
    	c.fillRect(610, yy, gs, gs);
    	c.fillStyle = "black";
    	c.fillText(mats[i].name + " (" + i + ")", 620 + gs, yy + 15);
    	if (pressed("" + i) || (click && click.x > 600 && click.y >= yy && click.y <= yy + gs + 10)) {
    		matSel = mats[i];
    	}
    	yy += gs + 10;
    }
    c.fillStyle = "black";
    c.fillRect(608, yy - 2, gs + 4, gs + 4);
    c.fillStyle = showNumbers ? "yellow" : "#888888";
    c.fillRect(610, yy, gs, gs);
    c.fillStyle = "black";
    c.fillText("Toggle numbers (X)", 620 + gs, yy + 15);
    if (pressed("X") || (click && click.x > 600 && click.y >= yy && click.y <= yy + gs + 10)) {
		showNumbers = !showNumbers;
	}
	yy += gs + 20;
	c.fillStyle = "black";
	c.fillText("Examples (click to load)", 610, yy + 15);
	yy += 25;
	for (var i = 0; i < examples.length; i++) {
		c.fillText("> " + examples[i].name, 610, yy + 15);
		if (click && click.x > 600 && click.y >= yy && click.y < yy + 25) {
			load(examples[i].data);
		}
		yy += 25;
	}
	
	c.fillText("Structural integrity toy for block-style games, David Stark / Zarkonnen, 2023", 10, 30);
	c.fillText("Different materials have different strengths. Place blocks and experiment.", 10, 50);
}

var images = {};

function img(img, x, y) {
    if (img == null) { return; }
    if (!images[img]) {
        images[img] = new Image();
        images[img].src = "graphics/" + img + ".png";
    }
    c.drawImage(images[img], x, y);
}

var canvas = document.getElementById("gameCanvas");
var c = canvas.getContext("2d");
var keys = {};
var keyCodes = {};
var click = null;
var mouseDown = false;
var cursor = {x: 300, y: 300};

// Listen for key presses.
function canvasKeyUp(e) {
    keyCodes[e.which] = true;
    keys[String.fromCharCode(e.which)] = true;
}

function pressed(key) {
    return !!keys[key] || !!keyCodes[key];
}

$('body').keyup(canvasKeyUp);

// Listen for mouse stuff.
function canvasClick(e) {
    click = { "x": e.offsetX, "y": e.offsetY };
}

function canvasMouseDown(e) {
    mouseDown = true;
}

function canvasMouseUp(e) {
    mouseDown = false;
}

function canvasMove(e) {
    cursor = { "x": e.offsetX, "y": e.offsetY };
}

$('#gameCanvas').click(canvasClick).mousemove(canvasMove).mousedown(canvasMouseDown).mouseup(canvasMouseUp);

// Set up game loop.
var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
var lastUpdate = new Date().getTime();

function nextFrame() {
    var currentTime = new Date().getTime();
    tick(currentTime - lastUpdate);
    keys = {};
    keyCodes = {};
    click = null;
    lastUpdate = currentTime;
    requestAnimationFrame(nextFrame);
}

// Once everything is set up, start game loop.
requestAnimationFrame(nextFrame);

/*
jQuery(window).resize(function() {
    canvas.width = window.innerWidth - 20;
    canvas.height = window.innerHeight - 20;
});
jQuery(window).ready(function() {
    canvas.width = window.innerWidth - 20;
    canvas.height = window.innerHeight - 20;
});
*/
 
/*canvas.addEventListener("click", function() {
    if (canvas.webkitRequestFullScreen) {
        canvas.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
    } else if (canvas.mozRequestFullScreen) {
        canvas.mozRequestFullScreen();
    } else if (canvas.requestFullScreen) {
        canvas.requestFullScreen();
    }
});*/
