var HachiBowl = HachiBowl || {};
var medstyle = { font: "20px Arial", fill: "#55ffff", stroke: "#000000", strokeThickness: 3, align: "center", wordWrap: true, wordWrapWidth: 212 };
var bigstyle = { font: "48px Arial", fill: "#ffff00", stroke: "#000000", strokeThickness: 8, align: "center", wordWrap: true, wordWrapWidth: 212 };
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
    this.load.image('ball', 'assets/images/ball1.png');
    this.load.image('bpin', 'assets/images/pin.png');
    this.load.image('player', 'assets/images/player.png');
    this.load.image('pause', 'assets/images/pause.png');
    this.load.image('windowsmall', 'assets/images/windowSmall.png');
    this.load.image('windowbig', 'assets/images/windowBig.png');
    this.load.image('barbgm', 'assets/images/barBgm.png');
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
      this.game.plugin.fadeAndPlay("rgb(0,0,0)",0.5,"Game");
    }
  },
  onLoadComplete: function() {
    this.ready = true;
  }
};

//module.exports = Preload  