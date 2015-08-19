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
    this.turn = 0; //2 turns per round
    this.pinsHit = 0;
    this.lasthit = 0;
    this.score = 0;
    this.lasthits = [];
    this.strikes = 0;
    this.totalStrikes = 0;
    this.spares = 0;
    this.totalSpares = 0;
    this.paused = false;
        
    //  Create our collision groups. One for the ball, one for the pins
    this.ballCollisionGroup = this.game.physics.p2.createCollisionGroup();
    this.pinsCollisionGroup = this.game.physics.p2.createCollisionGroup();
    //this.game.physics.p2.updateBoundsCollisionGroup();
    
    //10-pin creation    
    this.bpins = this.game.add.group();
    this.bpins.enableBody = true;
    this.bpins.physicsBodyType = Phaser.Physics.P2JS;
    
    this.pinsPosition = [
                       [42,40],[90,40],[138,40],[186,40],
                          [66,72],[114,72],[162,72],
                              [90,104],[138,104],
                                  [114,136]
                      ];
    
    for (var i = 0; i < 10; i++) {
      var bpin = new BowlingPin(this.game, this.pinsPosition[i][0], this.pinsPosition[i][1], 0, this.pinsCollisionGroup);
      bpin.body.collides(this.ballCollisionGroup);
      bpin.body.collides(this.pinsCollisionGroup,this.hitPin,this);
      this.bpins.add(bpin);
    }
    
    //bowling ball creation
    this.ball = new Ball(this.game, 192, this.game.height - 64, 0);
    this.game.add.existing(this.ball);
    this.ball.visible = false;
    
    this.ball.body.setCollisionGroup(this.ballCollisionGroup);
    this.ball.body.collides(this.pinsCollisionGroup,this.hitPin,this);
    
    this.playerSpr = new Player(this.game, 192, this.game.height - 32, 0, this.ball);
    this.game.add.existing(this.playerSpr);
    
    //UI creation
    this.game.stage.backgroundColor = '#aaaaaa';
    this.rightBar = this.game.add.tileSprite(224, 0, 96, this.game.height, 'barbgm');

    this.portraitWindow = this.game.add.sprite(224, 0, 'windowsmall');
    this.scoreWindow = new ScoreWindow(this.game);
    this.game.add.existing(this.scoreWindow);
    this.startMessage = this.game.add.text(this.game.world.centerX, this.game.world.centerY, "READY!", bigstyle);
    this.startMessage.anchor.setTo(0.5,0.5);
    
    this.pauseButton = this.game.add.sprite(224, this.scoreWindow.y + this.scoreWindow.height + 20, 'pause');
    this.pauseButton.inputEnabled = true;
    this.pauseButton.events.onInputUp.add(this.pauseGame, this);
    
    //TODO: Ao sair da tela de jogo, esse evento deve ser removido!
    // this.game.input.onDown.add(function(){
      // if(this.paused===true){
        // this.startMessage.visible = false;
        // this.game.paused = false;
        // this.paused = false;
      // }
    // }, this);
    
    //Timers
    this.startTimer = this.game.time.create(false);
    this.startTimer.add(2000, this.hideStartMessage, this);
    this.startTimer.start();
  },
  
  update: function() {
    if(this.ball.onTrack===false){
      if(this.bpins.total<=0){
        //strike or spare
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
        this.checkStrikeScore();
        this.turn = 0;
        this.round++;
        this.resetPins();
        this.lasthit = 0;
        this.playerSpr.reset();
      }else if(10 - this.pinsHit == this.bpins.total){
        this.turn++;
        this.checkSpareScore();
        if(this.strikes>0){
          this.lasthits.push(this.lasthit);
        }
        if(this.turn>1){
          this.score+=this.pinsHit;
          this.lastscore = '';
          this.turn = 0;
          this.round++;
          this.resetPins();
          this.score+=this.pinsHit;
        }
        this.checkStrikeScore();
        this.lasthit = 0;
        this.playerSpr.reset();
      }
    }
    this.ball.listenChangeDirection();
    this.scoreWindow.updateInfo(this.score,this.strikes,this.spares);
  },
  
  render: function(){
    this.game.debug.text("Hit Total: " + this.pinsHit + " Actual: " + this.lasthit, 0, 10);
    this.game.debug.text("lasthits: " + this.lasthits[0] + "|" + this.lasthits[1], 0, 20);
  },
  
  hitPin: function(body1,body2) {
    if(body2.sprite.gotHit === false){
      body2.sprite.gotHit = true;
      this.pinsHit++;
      this.lasthit++;
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
  },
  
  checkStrikeScore: function() {
    if(this.strikes>0){
      if(this.lasthits.length >= 2){
        this.score+=10 + this.lasthits[0] + this.lasthits[1];
        this.strikes--;
        if(this.strikes>0){
          this.lasthits.splice(0,1);
        }else this.lasthits = [];
      }
    }
  },
  
  checkSpareScore: function() {
    if(this.spares>0){
      this.score+=10 + this.lasthit;
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