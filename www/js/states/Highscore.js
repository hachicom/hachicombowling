var HachiBowl = HachiBowl || {};

HachiBowl.Highscore = function(){};

HachiBowl.Highscore.prototype = {
  init: function(paramArr) {
    //console.dir(paramArr);
    if(typeof paramArr !== 'undefined'){
      this.blinkpos = paramArr[0];
      this.gamemode = paramArr[1];
    }else{
      this.blinkpos = 0;
      this.gamemode = '';
    }
    
    this.scoretable = playerData.scoretable.scores;
    this.namestable = playerData.scoretable.names;
    this.scoretable2 = playerData.scoretable2.scores;
    this.namestable2 = playerData.scoretable2.names;
  },
  
  preload: function() {},
  
  create: function() {
    this.page = 0;
    if(this.gamemode !== '') this.page=1;
    this.game.stage.backgroundColor = bgcolor2;
    
    this.bgimg = this.game.add.tileSprite(0, 0, this.game.width, this.game.height, 'bgtitle');
    this.bgimg.autoScroll(10, 20);
    
    this.tilewin = 	[
          [-1,0,1,1,1,1,1,1,2,-1],
          [-1,6,7,7,7,7,7,7,8,-1],
          [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
          [0,1,1,1,1,1,1,1,1,2],
          [3,4,4,4,4,4,4,4,4,5],
          [3,4,4,4,4,4,4,4,4,5],
          [3,4,4,4,4,4,4,4,4,5],
          [3,4,4,4,4,4,4,4,4,5],
          [3,4,4,4,4,4,4,4,4,5],
          [3,4,4,4,4,4,4,4,4,5],
          [3,4,4,4,4,4,4,4,4,5],
          [3,4,4,4,4,4,4,4,4,5],
          [6,7,7,7,7,7,7,7,7,8],
          [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
        ];
        
    for(var i = 0; i<this.tilewin.length; i++) {
      for(var j = 0; j<this.tilewin[i].length; j++) {
        if(this.tilewin[i][j]>-1) var wintile = this.game.add.sprite(j*32,i*32, 'windowtile', this.tilewin[i][j]);
      }
    }
    
    this.titleMessage = this.game.add.bitmapText(this.game.world.centerX, 20, 'start36', "HISCORE GAME-A", 16);
    this.titleMessage.anchor.setTo(0.5,0);
    if(this.gamemode == 'B') this.titleMessage.setText("HISCORE GAME-B");
    
    var nameTxt = '';
    var scoreTxt = '';
    if(this.gamemode == 'B')
    for(var i=0;i<this.scoretable.length;i++){
      nameTxt  += this.namestable[i] + '\n\n';
      scoreTxt += this.scoretable[i] + '\n\n';
    }
    else 
    for(var i=0;i<this.scoretable2.length;i++){
      nameTxt  += this.namestable2[i] + '\n\n';
      scoreTxt += this.scoretable2[i] + '\n\n';
    }
    
    this.scoreText = this.game.add.bitmapText(this.game.world.centerX - 80, 128, 'start16', nameTxt, 16);
    this.scoreText.anchor.setTo(0.5,0);
    this.scoreText.align = 'right';
    this.scoreText2 = this.game.add.bitmapText(this.game.world.centerX + 80, 128, 'start36', scoreTxt, 16);
    this.scoreText2.anchor.setTo(0.5,0);
    
    this.CharTiles = this.game.add.tileSprite(this.game.world.centerX, 416, 320, 96, 'playerfaces');
    this.CharTiles.anchor.setTo(0.5,0);
    this.CharTiles.autoScroll(-40, 0);
        
    this.titleTimer = this.game.time.create(false);
    this.titleTimer.loop(10000, this.showTitle, this);
    this.titleTimer.start();
    
    this.game.input.onDown.add(this.handlePointerDown,this);
  },
  
  update: function() {
    /* if(this.game.input.activePointer.justPressed()) {
      this.showTitle();
    } */
  },
  
  // render: function(){
    // this.game.debug.text("my place: " + this.blinkpos + " gamemode: " + this.gamemode, 0, 10);
  // },
  
  handlePointerDown: function(pointer) {
    this.showTitle();
  },
    
  showTitle: function(){
    this.page++;
    if(this.page==2) {
      if(isMobile()) isPlayingBGM = false;
      currentBGM.stop();
      this.game.plugin.fadeAndPlay("rgb(0,0,0)",2,"Title");
    }
    else{
      var nameTxt = '';
      var scoreTxt = '';
      for(var i=0;i<this.scoretable.length;i++){
        nameTxt  += this.namestable[i] + '\n\n';
        scoreTxt += this.scoretable[i] + '\n\n';
      }
      this.titleMessage.setText("HISCORE GAME-B");
      this.scoreText.setText(nameTxt);
      this.scoreText2.setText(scoreTxt);
    }
  }
};
