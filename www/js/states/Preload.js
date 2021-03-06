var HachiBowl = HachiBowl || {};
var medstyle = { font: "20px Arial", fill: "#ffff00", stroke: "#ffaa00", strokeThickness: 2, align: "left", wordWrap: true, wordWrapWidth: 212 };
var calcstyle = { font: "20px Arial", fill: "#55ffff", stroke: "#000000", strokeThickness: 5, align: "center", wordWrap: true, wordWrapWidth: 212 };
var bigstyle = { font: "48px Arial", fill: "#ffff00", stroke: "#000000", strokeThickness: 8, align: "center", wordWrap: true, wordWrapWidth: 300 };
var curlevel = 'level1';
var bgcolor1 = 'aaaaff';
var bgcolor2 = 'aa55ff';
var startpos;
var bgmmusic;

var mobileMode = false; //true: usa plugins de som para mobile, false: usa o sistema do Phaser

HachiBowl.Preload = function() {
  this.asset = null;
  this.ready = false;
}

HachiBowl.Preload.prototype = {
  preload: function() {
    //show loading screen
    this.game.stage.backgroundColor = '000000';
    this.preloadBar = this.add.sprite(this.game.world.centerX - 60, this.game.world.centerY + 128, 'preloadbar');
    this.preloadBar.anchor.setTo(0,0.5);

    this.load.setPreloadSprite(this.preloadBar,0);
    
    this.loadingText = this.game.add.text(this.game.world.centerX, this.game.world.centerY + 180, "", medstyle);
    this.loadingText.anchor.setTo(0.5,0.5);
    this.blinkTween = this.game.add.tween(this.loadingText);
    this.blinkTween.to({alpha:0},2000,Phaser.Easing.Linear.NONE,false,0,-1,true);
    this.blinkTween.onComplete.add(this.onFadeEnd, this);

  	this.splash = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'logo');
    this.splash.anchor.setTo(0.5);
    this.splash.alpha = 0;
    this.fadeTween = this.game.add.tween(this.splash);
    this.fadeTween.to({alpha:1},5000,Phaser.Easing.Linear.NONE);
    this.fadeTween.onComplete.add(this.onFadeEnd, this);
    
    this.load.onLoadComplete.addOnce(this.onLoadComplete, this);
    
    // this.load.tilemap('level1', 'assets/tilemaps/level1.json', null, Phaser.Tilemap.TILED_JSON);
    // this.load.tilemap('level2', 'assets/tilemaps/level2.json', null, Phaser.Tilemap.TILED_JSON);
    // this.load.image('gameTiles', 'assets/images/tiles.png');
    this.load.spritesheet('ball', 'assets/images/ball1.png', 24, 24);
    this.load.spritesheet('block', 'assets/images/blocks.png', 24, 24);
    this.load.spritesheet('bpin', 'assets/images/pin.png', 24, 32);
    this.load.spritesheet('player', 'assets/images/player.png', 64, 64);
    this.load.spritesheet('playerface', 'assets/images/player_portrait.png', 96, 96);
    this.load.spritesheet('playerwin', 'assets/images/player_win.png', 96, 96);
    this.load.spritesheet('arrow', 'assets/images/arrow.png', 64, 64);
    this.load.spritesheet('diamondsmall', 'assets/images/diamondSmall.png', 16, 13);
    this.load.spritesheet('diamondbig', 'assets/images/diamondBig.png', 68, 54);
    this.load.spritesheet('tracks', 'assets/images/tracks.png', 224, 128);
    this.load.spritesheet('trackstart', 'assets/images/tracks_start.png', 224, 128);
    this.load.spritesheet('windowtile', 'assets/images/windowSmall.png', 32, 32);
    this.load.spritesheet('finger', 'assets/images/fingerSheet.png', 32, 42);
    this.load.image('pause', 'assets/images/pause.png');
    this.load.image('barbg', 'assets/images/barBg.png');
    this.load.image('bgtitle', 'assets/images/bgtitle.png');
    this.load.image('cursor', 'assets/images/cursor.png');
    this.load.image('barmeter', 'assets/images/meterbar.png');
    this.load.image('heart', 'assets/images/heart.png');
    this.load.image('titlelogo', 'assets/images/titlelogo.png');
    this.load.image('playerfaces', 'assets/images/player_portrait.png');
    this.load.bitmapFont('start12', 'assets/fonts/start12.png', 'assets/fonts/start12.fnt');
    this.load.bitmapFont('start16', 'assets/fonts/start16.png', 'assets/fonts/start16.fnt');
    this.load.bitmapFont('start36', 'assets/fonts/start36.png', 'assets/fonts/start36.fnt');
    this.load.audio('cancel', 'assets/audio/cancel.wav');
    this.load.audio('explode', 'assets/audio/explosion.wav');
    this.load.audio('pinhit', 'assets/audio/pinhit.wav');
    this.load.audio('rolling', 'assets/audio/rolling.wav');
    this.load.audio('select', 'assets/audio/select.wav');
    this.load.audio('powerup', 'assets/audio/powerup.wav');
    this.load.audio('coin', 'assets/audio/coin.wav');
    this.load.audio('over', 'assets/audio/over.ogg');
    if(!isMobile()){
      this.load.audio('bgm1', 'assets/audio/bgm1.ogg');
      this.load.audio('bgm2', 'assets/audio/bgm2.ogg');
      this.load.audio('stats', 'assets/audio/stats.ogg');
    }
  },
  
  create: function() {
    //this.asset.cropEnabled = false;
    //this.loadingText.setText('Decoding BGM Files... Please Wait...');
    if(!isMobile()) currentBGM = this.game.add.audio('bgm1', 1, true);
    else currentBGM = bgm1cordova;
    // bgmmusic['bgm2'] = this.game.add.audio('bgm2', 1, true);
    // bgmmusic['over'] = this.game.add.audio('bgm2', 1, false);
    // bgmmusic['stats'] = this.game.add.audio('bgm2', 1, true);
  },
  
  update: function() {
    if(!!this.ready) {
      //if(isMobile()) {if(AdMob) AdMob.showBanner(AdMob.AD_POSITION.BOTTOM_CENTER);}
      if(isMobile()){
        if (playerData.savedata.firstrun === true) {
          this.game.plugin.fadeAndPlay("rgb(0,0,0)",1,"Setup");
        } else {
          this.game.plugin.fadeAndPlay("rgb(0,0,0)",1,"Title");
        }
      }else if (this.cache.isSoundDecoded('bgm1') && this.cache.isSoundDecoded('bgm2')){
        if (playerData.savedata.firstrun === true) {
          this.game.plugin.fadeAndPlay("rgb(0,0,0)",1,"Setup");
        } else {
          this.game.plugin.fadeAndPlay("rgb(0,0,0)",1,"Title");
        }
      }
    }
  },
  
  onLoadComplete: function() {
    this.preloadBar.visible = false;
    this.fadeTween.start();
  },
  
  onFadeEnd: function(){
    this.ready = true;
    if(!isMobile()) {
      this.loadingText.setText('Decoding BGM Files... Please Wait...');
      this.blinkTween.start();
    }
  }
};

//module.exports = Preload  