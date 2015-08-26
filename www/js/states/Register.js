var HachiBowl = HachiBowl || {};

HachiBowl.Register = function(){};

HachiBowl.Register.prototype = {
  init: function(paramArr) {
    this.score = paramArr[0];
    
    this.scoretable = playerData.scoretable.scores;
    this.namestable = playerData.scoretable.names;
  },
  
  preload: function() {},
  
  create: function() {
    this.nameRegistered = false;
    
    this.titleMessage = this.game.add.bitmapText(this.game.world.centerX, 10, 'start16', "ENTER YOUR NAME", 16);
    this.titleMessage.anchor.setTo(0.5,0);
    
    this.nameText = this.game.add.bitmapText(this.game.world.centerX, 74, 'start16', '', 16);
    this.nameText.anchor.setTo(0.5,0);
    
    var digits = [['A','B','C','D','E','F','G'],
                  ['H','I','J','K','L','M','N'],
                  ['O','P','Q','R','S','T','U'],
                  ['W','V','X','Y','Z','0','1'],
                  ['2','3','4','5','6','7','8'],
                  ['9','-','_','!',' ',' ',' ']];
    
    for(var i=0;i<6;i++){
      for(var j=0;j<7;j++){
        var scoreBtn = this.game.add.bitmapText((j * 40)+40, (i * 40)+140, 'start16', digits[i][j], 16);
        scoreBtn.txtVal = digits[i][j];
        scoreBtn.nameText = this.nameText;
        scoreBtn.inputEnabled = true; 
        scoreBtn.events.onInputUp.add(function(){if(this.nameText.text.length<8) this.nameText.text+=this.txtVal;}, scoreBtn);
      }      
    }
    
    this.backText = this.game.add.bitmapText(this.game.world.centerX - 80, 400, 'start16', "BACK", 16);
    this.backText.anchor.setTo(0.5,0);
    this.backText.inputEnabled = true; 
    this.backText.events.onInputUp.add(function(){
        this.nameText.text=this.nameText.text.slice(0,this.nameText.text.length-1);
      }, this);
    this.doneText = this.game.add.bitmapText(this.game.world.centerX + 80, 400, 'start16', "DONE", 16);
    this.doneText.anchor.setTo(0.5,0);
    this.doneText.inputEnabled = true; 
    this.doneText.events.onInputUp.add(this.saveHighScore, this);
    
    // this.pauseButton = this.game.add.sprite(224, this.scoreWindow.y + this.scoreWindow.height + 64, 'pause');
    // this.pauseButton.inputEnabled = true;
    // this.pauseButton.events.onInputUp.add(this.restartGame, this);
  },
  
  update: function() {
    // if(this.game.input.activePointer.justPressed()) {
      // this.game.plugin.fadeAndPlay("rgb(0,0,0)",0.5,"Highscore");
    // }
  },
  
  saveHighScore: function(){
    if(this.nameRegistered === false){
      for(var i=0;i<this.scoretable.length;i++){
        if (this.scoretable[i]<this.score) {
          //removes last element
          this.scoretable.splice(4,1);
          this.namestable.splice(4,1);
          this.scoretable.splice(i,0,this.score);
          this.namestable.splice(i,0,this.nameText.text);
          playerData.scoretable.scores = this.scoretable;
          playerData.scoretable.names = this.namestable;
          localStorage["com.hachicom.bowling.playerData"] = JSON.encode(playerData);
          break;
        }
      }
      this.nameRegistered = true;
      this.game.plugin.fadeAndPlay("rgb(0,0,0)",0.5,"Highscore");
    }
  }
};
