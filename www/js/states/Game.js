var HachiBowl = HachiBowl || {};

//title screen
HachiBowl.Game = function(){};

HachiBowl.Game.prototype = {
  init: function(paramArr) {
    this.gamemode = paramArr[0];
  },
  
  preload: function() {},
  
  create: function() {
    this.game.physics.p2.setImpactEvents(true);
    this.game.physics.p2.restitution = 0.8;
    
    this.bgimg = this.game.add.tileSprite(0, 0, this.game.width, this.game.height, 'bgtitle');
    this.bgimg.autoScroll(10, 20);
    
    // Game variables
    this.round = 1; //current round
    this.diamondround = 4; //diamond chance round
    this.difficultspike = 50;
    this.turn = 0; //2 turns per round
    this.pinsHit = 0;
    this.lasthit = 0;
    this.score = 0;
    this.lasthits = [];
    this.strikes = 0;
    this.totalStrikes = 0;
    this.spares = 0;
    this.totalSpares = 0;
    this.diamonds = 0;
    this.paused = false;
    this.gameover = false;
    this.showingMessage = false;
    this.gameTimer = 120000;
    this.lives = 5;
    this.choseAngle = false;
        
    //  Create our collision groups. One for the ball, one for the pins
    this.ballCollisionGroup = this.game.physics.p2.createCollisionGroup();
    this.pinsCollisionGroup = this.game.physics.p2.createCollisionGroup();
    //this.game.physics.p2.updateBoundsCollisionGroup();
    
    //track creation
    this.track = this.game.add.tileSprite(0, 0, 224, this.game.height-64, 'tracks', currentHero);
    this.trackstart = this.game.add.tileSprite(0, this.game.height-64, 224, 64, 'trackstart', currentHero);
    
    //10-pin creation    
    this.bpins = this.game.add.group();
    this.bpins.enableBody = true;
    this.bpins.physicsBodyType = Phaser.Physics.P2JS;
    
    this.pinsPosition = [
                       [46,40],[90,40],[134,40],[178,40],
                          [68,72],[112,72],[156,72],
                              [90,104],[134,104],
                                  [112,136]
                      ];
    
    for (var i = 0; i < 10; i++) {
      var bpin = new BowlingPin(this.game, this.pinsPosition[i][0], this.pinsPosition[i][1], currentHero, this.pinsCollisionGroup);
      bpin.body.collides(this.ballCollisionGroup);
      bpin.body.collides(this.pinsCollisionGroup,this.hitPin,this);
      this.bpins.add(bpin);
    }
    
    //Blocks creation
    this.block1 = new Block(this.game, 64, this.game.height - 320, 0);
    this.game.add.existing(this.block1);
    this.block2 = new Block(this.game, 168, this.game.height - 192, 1);
    this.game.add.existing(this.block2);
    
    //Player Input creation    
    this.angleBar = new AngleBar(this.game);
    this.game.add.existing(this.angleBar);
    this.angleBar.visible = false;
    
    this.leftButton = this.game.add.sprite(40, this.game.height - 40, 'arrow');
    this.leftButton.anchor.setTo(0.5,0.5);
    this.leftButton.inputEnabled = true;   
    this.leftButton.visible = false;
    this.leftButton.alpha  = 0.8;
    this.leftRect = new Phaser.Rectangle(0,this.leftButton.y - 32,112,64);
    
    this.rightButton = this.game.add.sprite(180, this.game.height - 40, 'arrow');
    this.rightButton.anchor.setTo(0.5,0.5);
    this.rightButton.inputEnabled = true;
    this.rightButton.scale.x = -1; 
    this.rightButton.visible = false;
    this.rightButton.alpha  = 0.8;
    this.rightRect = new Phaser.Rectangle(112,this.rightButton.y - 32,112,64);
    
    this.leftKey = this.game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
    this.leftKey.onDown.add(this.handleKeyLeftDown, this);
    this.aKey = this.game.input.keyboard.addKey(Phaser.Keyboard.A);
    this.aKey.onDown.add(this.handleKeyLeftDown, this);

    this.rightKey = this.game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
    this.rightKey.onDown.add(this.handleKeyRightDown, this);
    this.sKey = this.game.input.keyboard.addKey(Phaser.Keyboard.S);
    this.sKey.onDown.add(this.handleKeyRightDown, this);
    
    //Diamond Sticker creation
    this.diamondChanceSpr = this.game.add.sprite(112, this.angleBar.y - 64, 'diamondbig');
    this.diamondChanceSpr.anchor.setTo(0.5,0.5);
    this.diamondChanceSpr.visible = false;
    this.diamondChanceSpr.animations.add('shine');
    this.diamondMessage = this.game.add.bitmapText(this.diamondChanceSpr.x, this.diamondChanceSpr.y, 'start16', "DIAMOND\nCHANCE", 16);
    this.diamondMessage.align = 'center';
    this.diamondMessage.visible = false;
    this.diamondMessage.anchor.setTo(0.5,0.5);
    this.diamondMessageExp = this.game.add.bitmapText(this.diamondChanceSpr.x, this.diamondChanceSpr.y + 128, 'start12', glossary.text.diamondMsg[language], 12);
    this.diamondMessageExp.align = 'center';
    this.diamondMessageExp.visible = false;
    this.diamondMessageExp.anchor.setTo(0.5,0.5);
    
    //Bowling Ball creation
    this.ball = new Ball(this.game, 192, this.game.height - 64, currentHero);
    this.game.add.existing(this.ball);
    this.ball.visible = false;
    
    this.ball.body.setCollisionGroup(this.ballCollisionGroup);
    this.ball.body.collides(this.pinsCollisionGroup,this.hitPin,this);  
    
    //Player creation
    this.playerSpr = new Player(this.game, 192, this.game.height - 32, currentHero, this.ball, this.angleBar);
    this.game.add.existing(this.playerSpr);
    
    //UI creation
    this.scoreWindow = new ScoreWindow(this.game,this.gamemode);
    this.game.add.existing(this.scoreWindow);
    
    this.messageBG = this.game.add.tileSprite(this.game.world.centerX, this.game.world.centerY, 320, 192, 'barbg');
    this.messageBG.anchor.setTo(0.5,0.5);
    
    this.startMessage = this.game.add.bitmapText(this.game.world.centerX, this.game.world.centerY-64, 'start36', "READY!", 36);
    this.startMessage.anchor.setTo(0.5,0.5);
    this.startMessage.alpha = 0;
    this.fadeTween = this.game.add.tween(this.startMessage);
    this.fadeTween.to({alpha:1},1000,Phaser.Easing.Linear.NONE);
    this.fadeTween.start();
    this.winPoseSpr = this.game.add.sprite(-96, this.startMessage.y + 40, 'playerwin', currentHero);
    this.moveTweenR = this.game.add.tween(this.winPoseSpr);
    this.moveTweenR.to({x:this.game.width - 110},2000,Phaser.Easing.Cubic.InOut);
    this.moveTweenR.start();
    this.narratorMessage = this.game.add.bitmapText(this.game.width, this.game.world.centerY+48, 'start12', glossary.text.readyMsg[language], 12);
    this.narratorMessage.anchor.setTo(0,0.5);
    this.moveTween = this.game.add.tween(this.narratorMessage);
    this.moveTween.to({x:10},2000,Phaser.Easing.Cubic.InOut);
    this.moveTween.start();
    
    this.pauseButton = new tileButton(this.game, 224, this.scoreWindow.y + this.scoreWindow.height + 32, '', 12, 'small', 'pause');
    this.pauseRect = new Phaser.Rectangle(224,this.scoreWindow.y + this.scoreWindow.height + 32,96,64);
    
    this.quitButton = new tileButton(this.game, 0, this.game.world.centerY, glossary.UI.sair[language], 16, 'big','','start16');
    this.resuButton = new tileButton(this.game, 160, this.game.world.centerY, glossary.UI.continuar[language], 16, 'big');
    this.quitButton.show(false);
    this.resuButton.show(false);
    
    this.bonusMessage = this.game.add.bitmapText(224, this.pauseButton.y + 74, 'start16', "", 14);
    //this.bonusMessage.anchor.setTo(0,0.5);
    
    this.leftButton.bringToTop();
    this.rightButton.bringToTop();
    
    /*****************************
     ******** GAME SOUNDS ********
     *****************************/
    this.pinSound = this.game.add.audio('pinhit');
    this.rollSound = this.game.add.audio('rolling');
    this.skullSound = this.game.add.audio('explode');
    this.selectSound = this.game.add.audio('select');
    this.cancelSound = this.game.add.audio('cancel');
    this.powerSound = this.game.add.audio('powerup');
    this.overSound = this.game.add.audio('over');
    this.coinSound = this.game.add.audio('coin');

    /****************************
     ********** TIMERS **********
     ****************************/
    this.startTimer = this.game.time.create(false);
    this.startTimer.add(2000, this.hideStartMessage, this);
    this.startTimer.start();
        
    if(this.gamemode=='B') {
      this.matchTimer = this.game.time.create(false);
      this.matchTimer.loop(1000, this.countMatchTime, this);
    }
    
    this.tenpinTimer = this.game.time.create(false);
    this.tenpinTimer.loop(3000, this.hideTenpinWin, this);
    
    this.bonusTimer = this.game.time.create(false);
    this.bonusTimer.loop(3000, this.hideBonusMessage, this);
    
    this.gameoverTimer = this.game.time.create(false);
    this.gameoverTimer.add(4000, this.showResults, this);
  },
  
  update: function() {
    if(this.game.input.activePointer.justPressed() && this.gameTimer>0) {
      if(this.playerSpr.launched === true && this.choseAngle === false){
        var ballVelo = this.angleBar.stopCursor();
        this.choseAngle = true;
        this.ball.roll(ballVelo);
        this.playerSpr.y-=20;
        this.playerSpr.animations.play('throw', 12, false);
        if(ballVelo >= -60 && ballVelo <= 60) this.showDpad(true);
        if(sfxOn===true){
          this.rollSound.play();
        }
        //console.log(ballVelo);
      }      
    }
    
    if(this.ball.changedDir>=this.ball.maxChangeDir) this.showDpad(false);
    
    if(this.block1.visible===true && this.block1.gothit === false)
      if (Phaser.Rectangle.intersects(this.ball.getBounds(), this.block1.getBounds())) {this.hitBlock(this.ball,this.block1)}
    if(this.block2.visible===true && this.block2.gothit === false)
      if (Phaser.Rectangle.intersects(this.ball.getBounds(), this.block2.getBounds())) {this.hitBlock(this.ball,this.block2)}
    
    if(this.ball.onTrack===false && this.gameover===false){
      if(this.pinsHit == 10){
        //strike or spare
        if(this.turn==0){
          //strike
          if(this.showingMessage === false) this.showTenpinWin("STRIKE!!",1000);
        }else{
          //spare
          if(this.showingMessage === false) this.showTenpinWin("SPARE!",500);
        }
        this.showDpad(false);
      }else if(10 - this.pinsHit == this.bpins.total){
        this.turn++;
        this.checkSpareScore();
        if(this.strikes>0){
          this.lasthits.push(this.lasthit);
        }
        if(this.turn>1){
          //this.score+=this.pinsHit * 10;
          this.lastscore = '';
          this.turn = 0;
          this.round++;
          if(this.gamemode == 'A') this.lives--;
          if(this.lives == 0){
            this.endGame();
          }else this.resetPins();
        }
        this.checkStrikeScore();
        this.lasthit = 0;
        this.playerSpr.reset();
        this.showDpad(false);
        this.choseAngle = false;
      }
    }
    //this.ball.listenChangeDirection();
    this.scoreWindow.updateInfo(this.score,this.turn+1,this.round,this.gameTimer,this.diamonds,this.lives);
  },
  
  render: function(){
    //this.game.debug.text("Hit Total: " + this.pinsHit + " Actual: " + this.lasthit, 0, 10);
    //this.game.debug.text("lasthits: " + this.lasthits[0] + "|" + this.lasthits[1], 0, 20);
    // this.game.debug.geom( this.ball.getBounds(), 'rgba(255,255,0,0.4)' ) ;
    // this.game.debug.geom( this.block1.getBounds(), 'rgba(255,0,255,0.4)' ) ;
  },
  
  handlePointerDown: function(pointer){
    var pausepress = this.pauseRect.contains(pointer.x,pointer.y);
    if(pausepress===true && this.messageBG.visible===false) this.pauseGame();
    
    var leftpress = this.leftRect.contains(pointer.x,pointer.y);
    if(leftpress===true && this.leftButton.visible===true) {
      this.ball.changeDirection('left');
      if(sfxOn===true) this.cancelSound.play();
    }
    var rightpress = this.rightRect.contains(pointer.x,pointer.y);
    if(rightpress===true && this.rightButton.visible===true) {
      this.ball.changeDirection('right');
      if(sfxOn===true) this.cancelSound.play();
    }
  },
  
  handleKeyLeftDown: function(){
    if(this.leftButton.visible===true) {
      this.ball.changeDirection('left');
      if(sfxOn===true) this.cancelSound.play();
    }
  },
  
  handleKeyRightDown: function(){
    if(this.rightButton.visible===true) {
      this.ball.changeDirection('right');
      if(sfxOn===true) this.cancelSound.play();
    }
  },
  
  showDpad(bool){
    this.leftButton.visible = bool;
    this.rightButton.visible = bool;
  },
  
  hitBlock(ball,block){
    if(ball.body.y >= block.body.y) {
      if(block.frame == 0){
        if(sfxOn===true) this.powerSound.play();
        this.score+=block.hvelo;
        this.bonusMessage.setText("BLOCK\nBONUS\n"+block.hvelo);
        this.bonusTimer.start();
      }else if(block.frame == 1){
        if(sfxOn===true) this.skullSound.play();
        if(block.body.x >= 112) ball.body.velocity.x = -160;
        else ball.body.velocity.x = 160;
      }
      block.freeze();
    }
  },
  
  hitPin: function(body1,body2) {
    if(body2.sprite.gotHit === false){
      body2.sprite.gotHit = true;
      this.pinsHit++;
      this.lasthit++;
      this.score+=10;
      if(sfxOn===true){
        this.pinSound.play();
      }
      if("vibrate" in window.navigator) {
        if(vibrationOn===true) window.navigator.vibrate(100);
      }
    }
    if(body1.sprite.nameid == 'ball') body1.sprite.accelVal = 0;
  },
  
  resetPins: function() {
    this.pinsHit = 0;
    this.bpins.removeAll(true);
    for (var i = 0; i < 10; i++) {
      var bpin = new BowlingPin(this.game, this.pinsPosition[i][0], this.pinsPosition[i][1], currentHero, this.pinsCollisionGroup);
      bpin.body.collides(this.ballCollisionGroup);
      bpin.body.collides(this.pinsCollisionGroup,this.hitPin,this);
      this.bpins.add(bpin);
    }
    if(this.round%this.diamondround == 0){
      this.diamondChanceSpr.visible = true;
      this.diamondChanceSpr.animations.play('shine', 12, true);
      this.diamondMessage.visible = true;
      this.diamondMessageExp.visible = true;
      //this.diamondMessage.alpha = 0;
      //this.blinkTween.start();
    }else{
      this.diamondChanceSpr.visible = false;
      this.diamondChanceSpr.animations.stop('shine', true);
      this.diamondMessage.visible = false;
      this.diamondMessageExp.visible = false;
      //this.blinkTween.stop(true);
    }
    this.block1.reset();
    this.block2.reset();
    
    //if last round was a diamond chance round
    if((this.round-1)%this.diamondround == 0) {
      this.angleBar.cursorspeed += this.difficultspike;
      var qtdDiamondRnd = (this.round-1)/this.diamondround;
      if(qtdDiamondRnd == 1) this.block1.visible = true;
      if(qtdDiamondRnd == 2) this.block2.visible = true;
    }
  },
  
  checkStrikeScore: function() {
    if(this.strikes>0){
      if(this.lasthits.length >= 2){
        var bonus = (this.lasthits[0] + this.lasthits[1]) * 10;
        this.score+=bonus;
        this.bonusMessage.setText("STRIKE\nBONUS\n"+bonus);
        this.bonusTimer.start();
        this.strikes--;
        if(this.strikes>0){
          this.lasthits.splice(0,1);
        }else this.lasthits = [];
      }
    }
  },
  
  checkSpareScore: function() {
    if(this.spares>0){
      var bonus = (this.lasthit)*10;
      this.score+=bonus;
      this.bonusMessage.setText("SPARE\nBONUS\n"+bonus);
      this.bonusTimer.start();
      this.spares--;
    }
  },
  
  //find objects in a Tiled layer that containt a property called "type" equal to a certain value
  findObjectsByType: function(type, map, layer) {
    var result = new Array();
    map.objects[layer].forEach(function(element){
      if(element.properties.type === type) {
        element.y -= map.tileHeight;
        result.push(element);
      }      
    });
    return result;
  },
  
  //create a sprite from an object
  createFromTiledObject: function(element, group) {
    var sprite = group.create(element.x, element.y, element.properties.sprite);

    //copy all properties to the sprite
    Object.keys(element.properties).forEach(function(key){
      sprite[key] = element.properties[key];
    });
  },
  
  createItems: function() {
    //create items
    this.items = this.game.add.group();
    this.items.enableBody = true;
    var item;    
    result = this.findObjectsByType('item', this.map, 'objectsLayer');
    result.forEach(function(element){
      this.createFromTiledObject(element, this.items);
    }, this);
  },
  
  hideStartMessage: function() {
    this.startMessage.visible = false;
    this.narratorMessage.visible = false;
    this.winPoseSpr.visible = false;
    this.messageBG.visible = false;
    this.ball.visible = true;
    this.playerSpr.input.enableDrag();
    if(this.gamemode == 'B') this.matchTimer.start();
    
    // READ USER INPUT
    this.game.input.onDown.add(this.handlePointerDown,this);
  },
  
  countMatchTime: function() {
    this.gameTimer-=1000;
    if(this.gameTimer<=10000){
      if(sfxOn===true) this.coinSound.play();
    }
    if(this.gameTimer<=0) {
      this.matchTimer.stop();
      this.endGame();
    }
  },
  
  endGame: function() {
    if(this.gamemode == 'B') this.startMessage.setText(glossary.text.timeup[language]);
    else this.startMessage.setText(glossary.text.nolife[language]);
    this.narratorMessage.setText(glossary.text.gameover[language]);
    this.startMessage.visible = true;
    this.startMessage.alpha = 0;
    this.fadeTween.start();
    this.narratorMessage.visible = true;
    this.narratorMessage.x = this.game.width;
    this.moveTween.start();
    this.messageBG.visible = true;
    this.gameover = true;
    //this.playerSpr.reset();
    this.ball.freeze();
    this.playerSpr.input.disableDrag();
    this.showDpad(false);
    this.angleBar.freeze();
    //this.score+=this.pinsHit * 10;
    this.gameoverTimer.start();
    if(isMobile()) isPlayingBGM = false;
    currentBGM.stop();
    if(sfxOn===true) this.overSound.play();
  },
  
  showResults: function() {
    var paramArr = [this.score,this.strikes,this.totalStrikes,this.spares,this.totalSpares,this.diamonds,this.gamemode]
    this.game.plugin.fadeAndPlay("rgb(0,0,0)",2,"Gameover",paramArr);
  },
  
  hideBonusMessage: function() {
    this.bonusMessage.setText("");
    this.bonusTimer.stop(false);
  },
  
  showTenpinWin: function(text,vibtime) {
    if(sfxOn===true) this.powerSound.play();
    this.startMessage.setText(text);
    this.startMessage.visible = true;
    this.startMessage.alpha = 0;
    //this.fadeTween = this.game.add.tween(this.startMessage);
    //this.fadeTween.to({alpha:1},1000);
    this.fadeTween.start();
    if(this.turn==0){
      //strike
      this.narratorMessage.setText(glossary.text.strikeMsg[language]);
      this.winPoseSpr.frame = currentHero;
      if(this.round%this.diamondround==0) {
        this.narratorMessage.setText(glossary.text.strikeDiamondMsg[language]);
        this.winPoseSpr.frame = 4;
      }
    }else{
      //spare
      this.narratorMessage.setText(glossary.text.spareMsg[language]);
      this.winPoseSpr.frame = currentHero;
      if(this.round%this.diamondround==0) {
        this.narratorMessage.setText(glossary.text.spareDiamondMsg[language]);
        this.winPoseSpr.frame = 4;
      }
    }
    this.narratorMessage.visible = true;
    this.winPoseSpr.visible = true;
    this.narratorMessage.x = this.game.width;
    this.winPoseSpr.x = -96;
    this.moveTween.start();
    this.moveTweenR.start();
    this.messageBG.visible = true;
    if(this.gamemode == 'B') this.matchTimer.pause();
    this.tenpinTimer.start();
    if("vibrate" in window.navigator) {
      if(vibrationOn===true) window.navigator.vibrate(vibtime);
    }
    this.showingMessage = true;
  },
  
  hideTenpinWin: function() {
    this.startMessage.setText("");
    this.startMessage.visible = false;
    this.narratorMessage.setText("");
    this.narratorMessage.visible = false;
    this.winPoseSpr.visible = false;
    this.messageBG.visible = false;
    this.checkSpareScore();
    if(this.turn==0){
      //strike
      if(this.strikes>0){
        this.lasthits.push(10);
      }
      this.strikes++;
      this.totalStrikes++;
    }else{
      //spare
      if(this.strikes>0){
        this.lasthits.push(this.lasthit);
      }
      this.spares++;
      this.totalSpares++;
    }
    if(this.round%this.diamondround==0){
      this.diamonds++;
    }
    this.checkStrikeScore();
    this.turn = 0;
    this.round++;
    this.resetPins();
    this.lasthit = 0;
    this.playerSpr.reset();
    this.showDpad(false);
    this.choseAngle = false;
    if(this.gamemode == 'B') this.matchTimer.resume();
    this.tenpinTimer.stop(false);
    this.showingMessage = false;
  },
  
  pauseGame: function() {
    //console.log("clicked pause button");
    this.startMessage.setText("PAUSED");
    this.startMessage.visible = true;
    this.startMessage.alpha = 1;
    this.messageBG.visible = true;
    this.quitButton.show(true);
    this.resuButton.show(true);
    if(sfxOn===true){
      //this.selectSound.play();
      //TODO: use lowlatency plugin here
    }
    this.game.paused = true;
    this.paused = true;
    this.input.onDown.add(this.unpauseGame, this);
  },
  
  unpauseGame: function(event){
    if(event.y>=this.game.world.centerY && event.y<=this.game.height/2 + 96){
      if(event.x < this.game.width/2){
        this.game.paused = false;
        this.paused = false;
        this.input.onDown.remove(this.unpauseGame,this);
        if(sfxOn===true){
          this.cancelSound.play();
        }
        if(isMobile()) {
          if(AdMob) {
            AdMob.showBanner(AdMob.AD_POSITION.BOTTOM_CENTER);
            isPlayingBGM = false;
          }
        }
        currentBGM.stop();        
        this.game.plugin.fadeAndPlay("rgb(0,0,0)",1,"Title");
      }else{
        this.quitButton.show(false);
        this.resuButton.show(false);
        this.startMessage.visible = false;
        this.messageBG.visible = false;
        this.game.paused = false;
        this.paused = false;
        if(sfxOn===true){
          this.selectSound.play();
        }
        this.input.onDown.remove(this.unpauseGame,this);
      }
    }
  }
};