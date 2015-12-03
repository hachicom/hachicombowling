var HachiBowl = HachiBowl || {};

HachiBowl.Gameover = function(){};

HachiBowl.Gameover.prototype = {
  init: function(paramArr) {
    this.score        = paramArr[0];
    this.strikes      = paramArr[1];
    this.totalStrikes = paramArr[2];
    this.spares       = paramArr[3];
    this.totalSpares  = paramArr[4];
    this.diamonds     = paramArr[5];
    this.gamemode     = paramArr[6];
    
    if(this.gamemode == 'B') this.scoretable = playerData.scoretable.scores;
    else this.scoretable = playerData.scoretable2.scores;
  },
  
  preload: function() {},
  
  create: function() {    
    this.game.stage.backgroundColor = bgcolor1;
    this.finalScore = this.score + (100*this.totalStrikes) + (50*this.totalSpares) + (500*this.diamonds);
    
    this.titleMessage = this.game.add.bitmapText(this.game.world.centerX, 64, 'start36', "RESULTS", 36);
    this.titleMessage.anchor.setTo(0.5,0.5);
    
    this.scoreText = this.game.add.bitmapText(32, 120, 'start16', "SCORE: "+this.score.toString()+"pts.", 16);
    this.scoreText.anchor.setTo(0,0.5);
    
    this.spareCalcText = this.game.add.bitmapText(32, 160, 'start16', "SPARES: "+this.totalSpares.toString()+" x50", 16);
    this.spareCalcText.anchor.setTo(0,0.5);
    this.spareText = this.game.add.bitmapText(32, 180, 'start36', "+ "+(this.totalSpares * 50).toString()+"pts.", 16);
    this.spareText.anchor.setTo(0,0.5);
    
    this.strikeCalcText = this.game.add.bitmapText(32, 224, 'start16', "STRIKES: "+this.totalStrikes.toString()+" x100", 16);
    this.strikeCalcText.anchor.setTo(0,0.5);
    this.strikeText = this.game.add.bitmapText(32, 244, 'start36', "+ "+(this.totalStrikes * 100).toString()+"pts.", 16);
    this.strikeText.anchor.setTo(0,0.5);
    
    this.diamondCalcText = this.game.add.bitmapText(32, 288, 'start16', "DIAMONDS: "+this.diamonds.toString()+" x500", 16);
    this.diamondCalcText.anchor.setTo(0,0.5);
    this.diamondText = this.game.add.bitmapText(32, 308, 'start36', "+ "+(this.diamonds * 500).toString()+"pts.", 16);
    this.diamondText.anchor.setTo(0,0.5);
    
    this.finalscorelabelText = this.game.add.bitmapText(32, 384, 'start16', "FINAL SCORE:", 16);
    this.finalscorelabelText.anchor.setTo(0,0.5);
    this.finalscoreText = this.game.add.bitmapText(this.game.world.centerX, 420, 'start36', this.finalScore.toString(), 36);
    this.finalscoreText.anchor.setTo(0.5,0.5);
    
    if(isMobile()){
      this.bgmmusic = bgmstatscordova;
      isPlayingBGM = true;
    }else{
      this.bgmmusic = this.game.add.audio('stats', 1, true);
    }
    currentBGM = this.bgmmusic;
    if(bgmval !== 'off') currentBGM.play();
    
    if(isMobile()) {
      if(AdMob) {
        AdMob.showBanner(AdMob.AD_POSITION.BOTTOM_CENTER);
        AdMob.showInterstitial();
      }
    }
  },
  
  update: function() {
    if(this.game.input.activePointer.justPressed()) {
      registerName = false;
      scorepos = 0;
      for(var i=0;i<this.scoretable.length;i++){
        if (this.scoretable[i]<this.finalScore) {
          registerName = true;
          scorepos = i;
          break;
        }
      }
      if(registerName === true) this.game.plugin.fadeAndPlay("rgb(0,0,0)",0.5,"Register",[this.finalScore,this.gamemode,scorepos]);
      else this.game.plugin.fadeAndPlay("rgb(0,0,0)",0.5,"Highscore");
    }
  },
  
  render: function(){
    //this.game.debug.text("1st place: " + this.scoretable[0] + " gamemode: " + this.gamemode, 0, 10);
  },
};
