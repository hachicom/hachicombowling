var HachiBowl = HachiBowl || {};

HachiBowl.Highscore = function(){};

HachiBowl.Highscore.prototype = {
  init: function() {
    //this.score = paramArr[0];
    
    this.scoretable = playerData.scoretable.scores;
    this.namestable = playerData.scoretable.names;
  },
  
  preload: function() {},
  
  create: function() {
    this.game.stage.backgroundColor = bgcolor2;
    this.tilewin = 	[
          [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
          [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
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
    
    this.titleMessage = this.game.add.bitmapText(this.game.world.centerX, 10, 'start36', "HI-SCORE", 36);
    this.titleMessage.anchor.setTo(0.5,0);
    
    var nameTxt = '';
    var scoreTxt = '';
    for(var i=0;i<this.scoretable.length;i++){
      nameTxt  += this.namestable[i] + '\n\n';
      scoreTxt += this.scoretable[i] + '\n\n';
    }
    
    this.scoreText = this.game.add.bitmapText(this.game.world.centerX - 80, 128, 'start16', nameTxt, 16);
    this.scoreText.anchor.setTo(0.5,0);
    this.scoreText.align = 'right';
    this.scoreText = this.game.add.bitmapText(this.game.world.centerX + 80, 128, 'start36', scoreTxt, 16);
    this.scoreText.anchor.setTo(0.5,0);
    
    this.CharTiles = this.game.add.tileSprite(this.game.world.centerX, 416, 320, 96, 'playerfaces');
    this.CharTiles.anchor.setTo(0.5,0);
    this.CharTiles.autoScroll(-40, 0);
        
    this.titleTimer = this.game.time.create(false);
    this.titleTimer.add(10000, this.showTitle, this);
    this.titleTimer.start();
  },
  
  update: function() {
    if(this.game.input.activePointer.justPressed()) {
      this.game.plugin.fadeAndPlay("rgb(0,0,0)",0.5,"Title");
    }
  },
  
  
  showTitle: function(){
    this.game.plugin.fadeAndPlay("rgb(0,0,0)",2,"Title");
  }
};
