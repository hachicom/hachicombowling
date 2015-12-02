var HachiBowl = HachiBowl || {};

HachiBowl.Credits = function(){};

HachiBowl.Credits.prototype = {
  init: function() {
  },
  
  preload: function() {},
  
  create: function() {    
    this.game.stage.backgroundColor = bgcolor1;
    
    var textspeed = -48;
    
    // this.titleMessage = this.game.add.bitmapText(this.game.world.centerX, 20, 'start36', "HACHICOM\nBOWLING", 36);
    // this.titleMessage.align = 'center';
    // this.titleMessage.anchor.setTo(0.5,0);
    
    this.creditText1 = this.game.add.bitmapText(this.game.world.centerX, this.game.height, 'start12', "", 12);
    this.creditText1.align = 'center';
    this.creditText1.setText(
      'THANKS GOD FOR\n\nANOTHER GAME\n\nRELEASED!\n\n\n\n'
      +'* HACHICOM BOWLING *\n\nHACHICOM SOFT\n\n3RD RELEASE\n\nPOWERED BY PHASER.IO\n\n\n\n'
      +'=======================\n\n\n* CODE, ART & DESIGN *\n\n'
      +'Adinan Batista Alves\n\nhachicomsoft@gmail.com'
    );
    this.creditText1.anchor.setTo(0.5,0);
    this.game.physics.enable(this.creditText1, Phaser.Physics.ARCADE);
    this.creditText1.body.velocity.y=textspeed;
    
    this.creditText2 = this.game.add.bitmapText(this.game.world.centerX, this.creditText1.y + this.creditText1.height + 36, 'start12', "", 12);
    this.creditText2.align = 'center';
    this.creditText2.setText(
      '=======================\n\n\n* MUSIC *\n\n'
      +'BGM1:\nArt (Szymon Matuszewski)\n\n'
      +'BGM2:\nX & Y (Szymon Matuszewski)\n\n'
      +'Over:\nVictory (Circlerun)\n\n'
      +'Stats:\nTrance Menu (Rezoner)\nhttp://soundcloud.com/\nrezoner/\n\n'
    );
    this.creditText2.anchor.setTo(0.5,0);
    this.game.physics.enable(this.creditText2, Phaser.Physics.ARCADE);
    this.creditText2.body.velocity.y=textspeed;
    
    this.creditText3 = this.game.add.bitmapText(this.game.world.centerX, this.creditText2.y + this.creditText2.height + 36, 'start12', "", 12);
    this.creditText3.align = 'center';
    this.creditText3.setText(
      '=======================\n\n\n* PHASER TEMPLATE *\n\n'
      +'PABLO FARIAS NAVARRO\n\n\n\n'      
      +'=======================\n\n\n* PHASER FADE PLUGIN *\n\n'
      +'EMANUELE FERONATO\n\n\n\n'
      +'=======================\n\n\n* SOUND EFFECTS *\n\n'
      +'CREATED IN BFXR.NET\n\n\n\n'
      +'=======================\n\n\n* 8BIT JINGLES *\n\n'
      +'LittleRobotSound\n\nFactory.com'
    );
    this.creditText3.anchor.setTo(0.5,0);
    this.game.physics.enable(this.creditText3, Phaser.Physics.ARCADE);
    this.creditText3.body.velocity.y=textspeed;
    
    this.creditText4 = this.game.add.bitmapText(this.game.world.centerX, this.creditText3.y + this.creditText3.height + 36, 'start12', "", 12);
    this.creditText4.align = 'center';
    this.creditText4.setText(
      '=======================\n\n\n* SPECIAL THANKS *\n\nPRISCILA MARQUETO\n\nROSEANE ALVES\n\nELTON BATISTA\n\nFELIPE NUNES\n\n\n\n'
      +'=======================\n\n\nIN MEMORY OF TWO LOVELY\n\nDOGS, "BABY" AND "MEG"\n\n\nWE WILL MISS YOU'
    );
    this.creditText4.anchor.setTo(0.5,0);
    this.game.physics.enable(this.creditText4, Phaser.Physics.ARCADE);
    this.creditText4.body.velocity.y=textspeed;
  },
  
  update: function() {
    if(this.game.input.activePointer.justPressed() || this.creditText4.y< -this.creditText4.height) {
      this.game.plugin.fadeAndPlay("rgb(0,0,0)",2,"Title");
    }
  }
};
