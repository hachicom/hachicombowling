var HachiBowl = HachiBowl || {};
var medstyle = { font: "20px Arial", fill: "#ffff00", stroke: "#ffaa00", strokeThickness: 2, align: "left", wordWrap: true, wordWrapWidth: 212 };
var calcstyle = { font: "20px Arial", fill: "#55ffff", stroke: "#000000", strokeThickness: 5, align: "center", wordWrap: true, wordWrapWidth: 212 };
var bigstyle = { font: "48px Arial", fill: "#ffff00", stroke: "#000000", strokeThickness: 8, align: "center", wordWrap: true, wordWrapWidth: 300 };
var curlevel = 'level1';
var startpos;

HachiBowl.Preload = function() {
  this.asset = null;
  this.ready = false;
}

HachiBowl.Preload.prototype = {
  preload: function() {
    //show loading screen
    this.preloadBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY + 128, 'preloadbar');
    this.preloadBar.anchor.setTo(0.5);

    this.load.setPreloadSprite(this.preloadBar);
    
    this.loadingText = this.game.add.text(this.game.world.centerX, this.game.world.centerY + 160, "LOADING", medstyle);
    this.loadingText.anchor.setTo(0.5,0.5);

  	this.splash = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'logo');
    this.splash.anchor.setTo(0.5);
    
    this.load.onLoadComplete.addOnce(this.onLoadComplete, this);
    
    // this.load.tilemap('level1', 'assets/tilemaps/level1.json', null, Phaser.Tilemap.TILED_JSON);
    // this.load.tilemap('level2', 'assets/tilemaps/level2.json', null, Phaser.Tilemap.TILED_JSON);
    // this.load.image('gameTiles', 'assets/images/tiles.png');
    this.load.spritesheet('ball', 'assets/images/ball1.png', 24, 24);
    this.load.spritesheet('bpin', 'assets/images/pin.png', 24, 32);
    this.load.spritesheet('player', 'assets/images/player.png', 64, 64);
    this.load.spritesheet('arrow', 'assets/images/arrow.png', 64, 64);
    this.load.spritesheet('diamondsmall', 'assets/images/diamondSmall.png', 16, 13);
    this.load.spritesheet('diamondbig', 'assets/images/diamondBig.png', 64, 50);
    this.load.spritesheet('tracks', 'assets/images/tracks.png', 224, 128);
    this.load.spritesheet('trackstart', 'assets/images/tracks_start.png', 224, 128);
    this.load.spritesheet('windowtile', 'assets/images/windowSmall.png', 32, 32);
    this.load.image('pause', 'assets/images/pause.png');
    this.load.image('barbg', 'assets/images/barBg.png');
    this.load.image('cursor', 'assets/images/cursor.png');
    this.load.image('barmeter', 'assets/images/meterbar.png');
    this.load.bitmapFont('start12', 'assets/fonts/start12.png', 'assets/fonts/start12.fnt');
    this.load.bitmapFont('start16', 'assets/fonts/start16.png', 'assets/fonts/start16.fnt');
    this.load.bitmapFont('start36', 'assets/fonts/start36.png', 'assets/fonts/start36.fnt');
  },
  
  create: function() {
    //this.asset.cropEnabled = false;
    //this.loadingText.setText('Decoding BGM... Please Wait...');
    //titleMusic = this.game.add.audio('bgm1', 1, true);
    //stageMusic = this.game.add.audio('bgm2', 1, true);
  },
  
  update: function() {
    if(!!this.ready) {
      //this.state.start('Game');
      this.game.plugin.fadeAndPlay("rgb(0,0,0)",1,"Title");
    }
  },
  onLoadComplete: function() {
    this.ready = true;
  }
};

//module.exports = Preload  