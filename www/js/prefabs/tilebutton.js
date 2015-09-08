var tileButton = function(game,x,y,label,labelsize,btnsize,imgkey,imgframe) {
  Phaser.Group.call(this, game);
  
  //create board sprite
  this.windowTiles = [];
  switch(btnsize){
    case 'small': 
      this.tilewin = [
				[0,1,2],
				[6,7,8],
			]; break;
    case 'medium': 
      this.tilewin = [
				[0,1,1,2],
				[6,7,7,8],
			]; break;
    case 'big': 
      this.tilewin = [
				[0,1,1,1,2],
				[6,7,7,7,8],
			]; break;
    default: 
      this.tilewin = [
				[0,1,2],
				[6,7,8],
			]; break;
  }
      
  for(var i = 0; i<this.tilewin.length; i++) {
    for(var j = 0; j<this.tilewin[i].length; j++) {
      var floor = this.create(j*32,i*32, 'windowtile', this.tilewin[i][j]);
      this.windowTiles.push(floor);
    }
  }
  
  var tileWidth = this.tilewin[0].length * 32;
  var tileHeight = this.tilewin.length * 32;
  
  if(imgkey != undefined){
    if(imgframe == undefined) imgframe = 0;
    var btnicon = this.create(tileWidth/2, tileHeight/2, imgkey, imgframe);
    btnicon.anchor.setTo(0.5,0.5);
  }

  this.LabelText = this.game.add.bitmapText(tileWidth/2, tileHeight/2, 'start12', label, labelsize);
  this.LabelText.anchor.setTo(0.5,0.5);
  this.add(this.LabelText);
  
  this.y = y;
  this.x = x;

};

tileButton.prototype = Object.create(Phaser.Group.prototype);  
tileButton.prototype.constructor = tileButton;

tileButton.prototype.show = function(boolval) {  
  for(var i = 0; i<this.windowTiles.length; i++) {
    this.windowTiles[i].visible = boolval;
  }
  this.LabelText.visible = boolval;
};