var HachiBowl = HachiBowl || {};

//title screen
HachiBowl.Game = function(){};

HachiBowl.Game.prototype = {
  preload: function() {},
  
  create: function() {
    this.game.physics.p2.setImpactEvents(true);
    this.game.physics.p2.restitution = 0.8;
    
    // Game variables
    this.round = 1; //current round
    this.diamondround = 4; //diamond chance round
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
    this.choseAngle = false;
        
    //  Create our collision groups. One for the ball, one for the pins
    this.ballCollisionGroup = this.game.physics.p2.createCollisionGroup();
    this.pinsCollisionGroup = this.game.physics.p2.createCollisionGroup();
    //this.game.physics.p2.updateBoundsCollisionGroup();
    
    //track creation
    this.track = this.game.add.tileSprite(0, 0, 224, this.game.height-64, 'tracks', 1);
    this.trackstart = this.game.add.tileSprite(0, this.game.height-64, 224, 64, 'trackstart', 1);
    
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
      var bpin = new BowlingPin(this.game, this.pinsPosition[i][0], this.pinsPosition[i][1], 0, this.pinsCollisionGroup);
      bpin.body.collides(this.ballCollisionGroup);
      bpin.body.collides(this.pinsCollisionGroup,this.hitPin,this);
      this.bpins.add(bpin);
    }
    
    //bowling track objects creation    
    this.angleBar = new AngleBar(this.game);
    this.game.add.existing(this.angleBar);
    this.angleBar.visible = false;
    
    this.leftButton = this.game.add.sprite(64, this.angleBar.y + 120, 'arrow');
    this.leftButton.anchor.setTo(0.5,0.5);
    this.leftButton.inputEnabled = true;   
    this.leftButton.visible = false;
    
    this.rightButton = this.game.add.sprite(160, this.angleBar.y + 120, 'arrow');
    this.rightButton.anchor.setTo(0.5,0.5);
    this.rightButton.inputEnabled = true;
    this.rightButton.scale.x = -1; 
    this.rightButton.visible = false;
    
    this.diamondChanceSpr = this.game.add.sprite(112, this.angleBar.y - 64, 'diamondbig');
    this.diamondChanceSpr.anchor.setTo(0.5,0.5);
    this.diamondChanceSpr.visible = false;
    this.diamondChanceSpr.animations.add('shine');
        
    this.ball = new Ball(this.game, 192, this.game.height - 64, 0);
    this.game.add.existing(this.ball);
    this.ball.visible = false;
    
    this.ball.body.setCollisionGroup(this.ballCollisionGroup);
    this.ball.body.collides(this.pinsCollisionGroup,this.hitPin,this);
    this.leftButton.events.onInputDown.add(function(){this.ball.changeDirection('left');},this); 
    this.rightButton.events.onInputDown.add(function(){this.ball.changeDirection('right');},this);   
    
    this.playerSpr = new Player(this.game, 192, this.game.height - 32, 0, this.ball, this.angleBar);
    this.game.add.existing(this.playerSpr);
    
    //UI creation
    this.scoreWindow = new ScoreWindow(this.game);
    this.game.add.existing(this.scoreWindow);
    this.startMessage = this.game.add.bitmapText(this.game.world.centerX, this.game.world.centerY, 'start36', "READY!", 36);
    this.startMessage.anchor.setTo(0.5,0.5);
    
    this.pauseButton = this.game.add.sprite(224, this.scoreWindow.y + this.scoreWindow.height + 64, 'pause');
    this.pauseButton.inputEnabled = true;
    this.pauseButton.events.onInputUp.add(this.pauseGame, this);
    
    this.bonusMessage = this.game.add.bitmapText(224, this.pauseButton.y + 40, 'start16', "", 14);
    //this.bonusMessage.anchor.setTo(0,0.5);
    
    //TODO: Ao sair da tela de jogo, esse evento deve ser removido!
    // this.game.input.onDown.add(function(){
      // if(this.paused===true){
        // this.startMessage.visible = false;
        // this.game.paused = false;
        // this.paused = false;
      // }
    // }, this);
    
    /****************************
     ********** TIMERS **********
     ****************************/
    this.startTimer = this.game.time.create(false);
    this.startTimer.add(2000, this.hideStartMessage, this);
    this.startTimer.start();
    
    this.matchTimer = this.game.time.create(false);
    this.matchTimer.loop(1000, this.countMatchTime, this);
    
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
        this.showDpad(true);
        //console.log(ballVelo);
      }      
    }
    
    if(this.ball.changedDir>=2) this.showDpad(false);
    
    if(this.ball.onTrack===false && this.gameover===false){
      if(this.pinsHit == 10){
        //strike or spare
        if(this.turn==0){
          //strike
          if(this.showingMessage === false) this.showTenpinWin("STRIKE!!");
        }else{
          //spare
          if(this.showingMessage === false) this.showTenpinWin("SPARE!");
        }
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
          this.resetPins();
        }
        this.checkStrikeScore();
        this.lasthit = 0;
        this.playerSpr.reset();
        this.showDpad(false);
        this.choseAngle = false;
      }
    }
    //this.ball.listenChangeDirection();
    this.scoreWindow.updateInfo(this.score,this.totalStrikes,this.totalSpares,this.gameTimer,this.diamonds);
  },
  
  render: function(){
    //this.game.debug.text("Hit Total: " + this.pinsHit + " Actual: " + this.lasthit, 0, 10);
    //this.game.debug.text("lasthits: " + this.lasthits[0] + "|" + this.lasthits[1], 0, 20);
  },
  
  showDpad(bool){
    this.leftButton.visible = bool;
    this.rightButton.visible = bool;
  },
  
  hitPin: function(body1,body2) {
    if(body2.sprite.gotHit === false){
      body2.sprite.gotHit = true;
      this.pinsHit++;
      this.lasthit++;
      this.score+=10;
      if("vibrate" in window.navigator) {
        window.navigator.vibrate(100);
      }
    }
  },
  
  resetPins: function() {
    this.pinsHit = 0;
    this.bpins.removeAll(true);
    for (var i = 0; i < 10; i++) {
      var bpin = new BowlingPin(this.game, this.pinsPosition[i][0], this.pinsPosition[i][1], 0, this.pinsCollisionGroup);
      bpin.body.collides(this.ballCollisionGroup);
      bpin.body.collides(this.pinsCollisionGroup,this.hitPin,this);
      this.bpins.add(bpin);
    }
    if(this.round%this.diamondround == 0){
      this.diamondChanceSpr.visible = true;
      this.diamondChanceSpr.animations.play('shine', 12, true);
    }else{
      this.diamondChanceSpr.visible = false;
      this.diamondChanceSpr.animations.stop('shine', true);
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
    this.ball.visible = true;
    this.playerSpr.input.enableDrag();
    this.matchTimer.start();
  },
  
  countMatchTime: function() {
    this.gameTimer-=1000;
    if(this.gameTimer<=0) {
      this.matchTimer.stop();
      this.endGame();
    }
  },
  
  endGame: function() {
    this.startMessage.setText("TIME UP!");
    this.startMessage.visible = true;
    this.gameover = true;
    //this.playerSpr.reset();
    this.ball.freeze();
    this.playerSpr.input.disableDrag();
    this.showDpad(false);
    this.angleBar.freeze();
    //this.score+=this.pinsHit * 10;
    this.gameoverTimer.start();
  },
  
  showResults: function() {
    var paramArr = [this.score,this.strikes,this.totalStrikes,this.spares,this.totalSpares,this.diamonds]
    this.game.plugin.fadeAndPlay("rgb(0,0,0)",2,"Gameover",paramArr);
  },
  
  hideBonusMessage: function() {
    this.bonusMessage.setText("");
    this.bonusTimer.stop(false);
  },
  
  showTenpinWin: function(text) {
    this.startMessage.setText(text);
    this.startMessage.visible = true;
    this.matchTimer.pause();
    this.tenpinTimer.start();
    if("vibrate" in window.navigator) {
      window.navigator.vibrate(500);
    }
    this.showingMessage = true;
  },
  
  hideTenpinWin: function() {
    this.startMessage.setText("");
    this.startMessage.visible = false;
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
    this.matchTimer.resume();
    this.tenpinTimer.stop(false);
    this.showingMessage = false;
  },
  
  pauseGame: function() {
    //console.log("clicked pause button");
    this.startMessage.setText("PAUSED");
    this.startMessage.visible = true;
    this.game.paused = true;
    this.paused = true;
    this.input.onDown.add(function(){
        this.startMessage.visible = false;
        this.game.paused = false;
        this.paused = false;
        this.input.onDown.removeAll();
    }, this);
  },
};