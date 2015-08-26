var HachiBowl = HachiBowl || {};

HachiBowl.Credits = function(){};

HachiBowl.Credits.prototype = {
  init: function() {
  },
  
  preload: function() {},
  
  create: function() {    
    this.game.stage.backgroundColor = '#aaaaff';
    
    // this.titleMessage = this.game.add.bitmapText(this.game.world.centerX, 20, 'start36', "HACHICOM\nBOWLING", 36);
    // this.titleMessage.align = 'center';
    // this.titleMessage.anchor.setTo(0.5,0);
    
    this.creditText = this.game.add.bitmapText(this.game.world.centerX, this.game.height, 'start16', "", 12);
    this.creditText.align = 'center';
    this.creditText.setText(
      'THANKS GOD FOR\nANOTHER GAME\nRELEASED!\n\n\n\n'
      +'*HACHICOM BOWLING*\n\nHACHICOM SOFT 3RD RELEASE\nPOWERED BY PHASER.IO\n\n\n\n'
      +'=======================\n\n\n* CODE, ART & DESIGN *\n\n'
      +'Adinan Batista Alves\nhachicomsoft@gmail.com\n\n\n\n'
      +'=======================\n\n\n* DEMOSCENE MUSIC *\n\n'
      +'Caramel Condition\n(ko0x)\n\n'
      +'My South West\n(WONDERBOY)\n\n'
      +'Spanish Candy\n(ARACHNO)\n\n'
      +'My Dirty Old Kamel\n(ZALZA)\n\n\n\n'
      +'THESE TRACKS ARE\nPRESUMED TO BE FREE\nOR PUBLIC DOMAIN\n\n'
      +'IF YOUR MUSIC IS HERE\nAND WANT IT REMOVED,\nPLEASE CONTACT ME!\n\n\n\n'
      +'=======================\n\n\n* PHASER FADE PLUGIN *\n\n'
      +'EMANUELE FERONATO\n\n\n\n'
      +'=======================\n\n\n* SOUND EFFECTS *\n\n'
      +'CREATED IN BFXR.NET\n\n\n\n'
      +'=======================\n\n\n* 8BIT JINGLES *\n\n'
      +'LittleRobotSound\nFactory.com\n\n\n\n'
      +'=======================\n\n\n* SPECIAL THANKS *\n\nPRISCILA MARQUETO\nROSEANE ALVES\nELTON BATISTA\nFELIPE NUNES\n\n\n\n'
      +'=======================\n\n\nTHANKS FOR PLAYING!\n\nSEE YOU NEXT GAME!!'
    );
    this.creditText.anchor.setTo(0.5,0);
    this.game.physics.enable(this.creditText, Phaser.Physics.ARCADE);
    this.creditText.body.velocity.y=-40;
  },
  
  update: function() {
    //this.creditText.y-=2;
    if(this.game.input.activePointer.justPressed() || this.creditText.y< -this.creditText.height) {
      this.game.plugin.fadeAndPlay("rgb(0,0,0)",2,"Title");
    }
  }
};
