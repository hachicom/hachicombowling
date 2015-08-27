Phaser.Plugin.SimpleTilePlugin = function (game, parent) {
	Phaser.Plugin.call(this, game, parent);
};
 
Phaser.Plugin.SimpleTilePlugin.prototype = Object.create(Phaser.Plugin.prototype);
Phaser.Plugin.SimpleTilePlugin.prototype.constructor = Phaser.Plugin.SimpleTilePlugin;
 
Phaser.Plugin.SimpleTilePlugin.prototype.drawTilemap = function (style,time,nextState,paramArr) {
	this.tilewin = 	[
				[0,1,2],
				[3,4,5],
				[6,7,8],
				[0,1,2],
				[3,4,5],
				[3,4,5],
				[3,4,5],
				[3,4,5],
				[6,7,8],
        [0,1,2],
				[6,7,8],
			];
      
  for(var i = 0; i<11; i++) {
    for(var j = 0; j<3; j++) {
      var floor = this.create(j*32,i*32, 'windowtile', this.tilewin[i][j]);
    }
  }
};