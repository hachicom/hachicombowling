var HachiBowl = {
	_WIDTH: 320,
	_HEIGHT: 400
};

HachiBowl.Boot = function(){};

//setting game configuration and loading the assets for the loading screen
HachiBowl.Boot.prototype = {
  preload: function() {
  	//assets we'll use in the loading screen
    this.load.image('logo', 'assets/images/hachilogo.png');
    this.load.image('preloadbar', 'assets/images/preloader-bar.png');
  },
  create: function() {
  	//loading screen will have a white background
    this.game.stage.backgroundColor = '#fff';

    //scaling options
		this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
		this.game.scale.pageAlignHorizontally = true;
		this.game.scale.pageAlignVertically = true;
    
    this.game.scale.updateLayout(true);

    //physics system for movement
    this.game.physics.startSystem(Phaser.Physics.ARCADE);
    
    this.state.start('Preload');
    this.game.plugin=this.game.plugins.add(Phaser.Plugin.FadePlugin);
  }
};