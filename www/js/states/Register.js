var HachiBowl = HachiBowl || {};

HachiBowl.Register = function(){};

HachiBowl.Register.prototype = {
  init: function(paramArr) {
    this.score    = paramArr[0];
    this.gamemode = paramArr[1];
    this.scorepos = paramArr[2]+1;
    
    if(this.gamemode == 'B') {
      this.scoretable = playerData.scoretable.scores;
      this.namestable = playerData.scoretable.names;
    }else {
      this.scoretable = playerData.scoretable2.scores;
      this.namestable = playerData.scoretable2.names;
    }
  },
  
  preload: function() {},
  
  create: function() {    
    this.game.stage.backgroundColor = bgcolor2;
    
    this.bgimg = this.game.add.tileSprite(0, 0, this.game.width, this.game.height, 'bgtitle');
    this.bgimg.autoScroll(10, 20);
    
    /*****************************
     ******** GAME SOUNDS ********
     *****************************/
    this.selectSound = this.game.add.audio('select');
    this.cancelSound = this.game.add.audio('cancel');
    
    this.tilewin = 	[
          [-1,0,1,1,1,1,1,1,2,-1],
          [-1,6,7,7,7,7,7,7,8,-1],
          [-1,-1,0,1,1,1,1,2,-1,-1],
          [-1,-1,6,7,7,7,7,8,-1,-1],
          [0,1,1,1,1,1,1,1,1,2],
          [3,4,4,4,4,4,4,4,4,5],
          [3,4,4,4,4,4,4,4,4,5],
          [3,4,4,4,4,4,4,4,4,5],
          [3,4,4,4,4,4,4,4,4,5],
          [3,4,4,4,4,4,4,4,4,5],
          [3,4,4,4,4,4,4,4,4,5],
          [6,7,7,7,7,7,7,7,7,8],
          [0,1,1,1,2,0,1,1,1,2],
          [6,7,7,7,8,6,7,7,7,8],
        ];
        
    for(var i = 0; i<this.tilewin.length; i++) {
      for(var j = 0; j<this.tilewin[i].length; j++) {
        if(this.tilewin[i][j]>-1) var wintile = this.game.add.sprite(j*32,i*32, 'windowtile', this.tilewin[i][j]);
      }
    }
    
    this.nameRegistered = false;
    
    var postext = '';
    switch(this.scorepos){
      case 1: postext = glossary.UI.pos1entry[language]; break;
      case 2: postext = glossary.UI.pos2entry[language]; break;
      case 3: postext = glossary.UI.pos3entry[language]; break;
      default: postext = this.scorepos+glossary.UI.posDentry[language]; break;
    }
    
    this.titleMessage = this.game.add.bitmapText(this.game.world.centerX, 24, 'start36', postext+'-'+glossary.UI.nameentry[language], 16);
    this.titleMessage.anchor.setTo(0.5,0);
    
    this.nameText = this.game.add.bitmapText(this.game.world.centerX, 88, 'start16', '', 16);
    this.nameText.anchor.setTo(0.5,0);
    
    this.digitRects = new Array(6);
    for(var i=0;i<6;i++){
      this.digitRects[i] = new Array(7);
    }
    
    this.digits = [['A','B','C','D','E','F','G'],
                  ['H','I','J','K','L','M','N'],
                  ['O','P','Q','R','S','T','U'],
                  ['W','V','X','Y','Z','0','1'],
                  ['2','3','4','5','6','7','8'],
                  ['9','-','_','.','!','*',' ']];
    
    for(var i=0;i<6;i++){
      for(var j=0;j<7;j++){
        var scoreBtn = this.game.add.bitmapText((j * 40)+30, (i * 40)+140, 'start16', this.digits[i][j], 16);
        scoreBtn.txtVal = this.digits[i][j];
        scoreBtn.nameText = this.nameText;
        
        var btnRect = new Phaser.Rectangle(scoreBtn.x - 10,scoreBtn.y - 10,40,40);        
        this.digitRects[i][j] = btnRect;
      }      
    }
    
    this.backText = this.game.add.bitmapText(80, 416, 'start16', glossary.UI.deletar[language], 16);
    this.backText.anchor.setTo(0.5,0.5);
    this.backRect = new Phaser.Rectangle(0,384,160,64);
    
    this.doneText = this.game.add.bitmapText(240, 416, 'start16', glossary.UI.entrar[language], 16);
    this.doneText.anchor.setTo(0.5,0.5);
    this.doneRect = new Phaser.Rectangle(160,384,160,64);
        
    // READ USER INPUT    
    this.game.input.onDown.add(this.handlePointerDown,this);
  },
  
  update: function() {
    // if(this.game.input.activePointer.justPressed()) {
      // this.game.plugin.fadeAndPlay("rgb(0,0,0)",0.5,"Highscore");
    // }
  },
  
  render: function(){
    //this.game.debug.text("1st place: " + this.namestable[0] + " gamemode: " + this.gamemode, 0, 10);
  },
  
  handlePointerDown: function(pointer){
    for(var i=0;i<6;i++){
      for(var j=0;j<7;j++){
        if(this.digitRects[i][j].contains(pointer.x,pointer.y)){
          if(this.nameText.text.length<8) {
            if(sfxOn===true) this.selectSound.play();
            this.nameText.text+=this.digits[i][j];
          }else if(sfxOn===true) this.cancelSound.play();
        }
      }
    }
    
    var backpress = this.backRect.contains(pointer.x,pointer.y);
    var donepress = this.doneRect.contains(pointer.x,pointer.y);
    if(backpress===true) {this.nameText.text=this.nameText.text.slice(0,this.nameText.text.length-1);if(sfxOn===true) this.cancelSound.play();}
    if(donepress===true) this.saveHighScore();
  },
  
  saveHighScore: function(){
    if(this.nameRegistered === false){
      if(sfxOn===true) this.selectSound.play();
      if(this.nameText.text=='') this.nameText.text = 'BABY';
      if(this.nameText.text=='        ') this.nameText.text = 'MEG';
      var pos = 0;
      for(var i=0;i<this.scoretable.length;i++){
        if (this.scoretable[i]<this.score) {
          //removes last element
          var hikey = this.scoretable.length - 1;
          this.scoretable.splice(hikey,1);
          this.namestable.splice(hikey,1);
          this.scoretable.splice(i,0,this.score);
          this.namestable.splice(i,0,this.nameText.text);
          pos = i;
          if(this.gamemode == 'B') {
            playerData.scoretable.scores = this.scoretable;
            playerData.scoretable.names = this.namestable;
          }else{
            playerData.scoretable2.scores = this.scoretable;
            playerData.scoretable2.names = this.namestable;
          }
          localStorage["com.hachicom.bowling.playerData"] = JSON.encode(playerData);
          break;
        }
      }
      this.nameRegistered = true;
      this.game.plugin.fadeAndPlay("rgb(0,0,0)",0.5,"Highscore",[pos,this.gamemode]);
    }
  }
};
