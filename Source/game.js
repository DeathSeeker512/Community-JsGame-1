//creates canvas which will be drawed upon
var canvas = document.createElement('canvas');
var ctx = canvas.getContext('2d');
canvas.width = 853;
canvas.height = 480;
document.getElementById("game").appendChild(canvas);
ctx.webkitImageSmoothingEnabled = ctx.imageSmoothingEnabled = ctx.mozImageSmoothingEnabled = ctx.oImageSmoothingEnabled = false;
var isFirst = true;

var keysDown = {};
window.addEventListener('keydown', function (e) {
    keysDown[e.keyCode] = true;
});
window.addEventListener('keyup', function (e) {
    delete keysDown[e.keyCode];
});

var self = this;



/** Player Object */
var player = {
    x: 200,
    y: 200,
    width: 48,
    height: 48,
    speed: 200,
    color: '#c00',
    update: function(mod) {
        if (37 in keysDown || 65 in keysDown) {
            player.x -= player.speed * mod;
        }
        if (38 in keysDown || 87 in keysDown) {
            player.y -= player.speed * mod;
        }
        if (39 in keysDown || 68 in keysDown) {
            player.x += player.speed * mod;
        }
        if (40 in keysDown || 83 in keysDown) {
            player.y += player.speed * mod;
        }
        if (player.y < 0) player.y = 0;
        if (player.x < 0) player.x = 0;
        if (player.x + player.width > map.width) player.x = map.width - player.width;
        if (player.y + player.height > map.height) player.y = map.height - player.height;
    },
    render: function() {
        ctx.fillStyle = player.color;
        ctx.fillRect(~~(player.x - camera.x), ~~(player.y - camera.y), player.width, player.height);
    }
};




/** Map Object */
var map = {
    width: 1536,
    height: 1536
};



/** Generic Tile Object */
var _tile = {
    x: 0,
    y: 0,
    width: 48,
    height: 48
};




/** Camera Object */
var camera = {
    x: 0,
    y: 0,
    update: function(mod){
        camera.x = player.x - (canvas.width >> 1) + (player.width >> 1);
        camera.y = player.y - (canvas.height >> 1) + (player.height >> 1);
        if (camera.x < 0) camera.x = 0;
        if (camera.y < 0) camera.y = 0;
        if (camera.x + canvas.width > map.width) camera.x = map.width - canvas.width;
        if (camera.y + canvas.height > map.height) camera.y = map.height - canvas.height;
    }
};





var mapTileWidth = map.width.valueOf() / _tile.width.valueOf();
var mapTileHeight = map.height.valueOf() / _tile.height.valueOf();
var tiles = [];

/** Map Creating Function */ //will be loading levels eventually
function createMap() {
    for (var x = 0; x < mapTileWidth; x++) {
        for (var y = 0; y < mapTileHeight; y++) {
            self.tiles.push(new tile(x * _tile.width, y * _tile.height, _tile.width, _tile.height, grassSprite));
        }
    }
}




/** Tile Object */
function tile(x, y, w, h, sprite) {
    var a = {
        x: x,
        y: y,
        width: w,
        height: h,
        sprite: sprite
    };
    return a;
}




/** Sprite Sheet Object */
function spriteSheet(loc, w, h) {
    var img = new Image();
    img.src = loc;
    var width = w;
    var height = h;
    return {
        img: img,
        width: width,
        height: height
    };
}

/* Sprite Sheet Declarations */
var tile_sheet = new spriteSheet("https://raw.github.com/DeathSeeker512/Community-JsGame-1/master/Source/images/tileSheet.png", 256, 256);



/** Sprite Object */
function sprite(spriteSheet, x, y, w, h) {
    return {
        drawSprite: function (locx, locy, width, height) {
            ctx.drawImage(spriteSheet.img, x, y, w, h, locx, locy, width, height);
        }
    };
}





/** Sprite Declarations */
var grassSprite = new sprite(tile_sheet, 0, 0, 16, 16);




/**  Self Explanatory */
function update(mod) {
    if (isFirst) {
        createMap();
        isFirst = false;
        return;
    }
    player.update(mod);
    camera.update(mod);
}




/** Also Self Explanatory */
function render() {
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    for (var i = 0; i < tiles.length.valueOf(); i++) {
        if ((tiles[i].x + tiles[i].width >= camera.x) && (tiles[i].y + tiles[i].height >= camera.y)) { //temp drawing method
            if (tiles[i].x <= (camera.x + canvas.width) && tiles[i].y <= (camera.y + canvas.height)) {
                tiles[i].sprite.drawSprite(~~(tiles[i].x - camera.x), ~~(tiles[i].y - camera.y), tiles[i].width, tiles[i].height);
            }
        }
    }
    player.render();
    ctx.fillStyle = '#fff';
    ctx.font = "20px Arial";
    ctx.fillText("x:" + (~~player.x) + ", y:" + (~~player.y), ~~(player.x - camera.x), ~~(player.y - camera.y) - 5);

}





/** Game Loop */
function run() {
    var now = Date.now();
    update((now - time) / 1000);
    render();
    time = now;
}





/////////////////////////
////// Starts Game //////
/////////////////////////
var time = Date.now();
setInterval(run, 10);
