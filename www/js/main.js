/**
 * This template was created following the tutorial in the link below:
 * http://www.gamedevacademy.org/html5-phaser-tutorial-spacehipster-a-space-exploration-game/
 *
 * Remember to give credit to Pablo Farias Navarro - Zenva
 */
 
var playerDataDefault = {
  scoretable: {
    names: ['BABE','HACHI','PEPITO','NICKY','MELODY','ROLF','YUKI','SNOW'],
    scores: [4000,3000,2500,2000,1500,1000,750,500]
  },
  savedata: {
		firstrun: true,
    version: 1 //change this number if save from new version is different
	},
  settings: {
		sfx: true,
		bgm: true,
		vibration: true,
    language: 'en_US' //pt_BR
	},
	// ...
}; 

var playerData = playerDataDefault;
if (isLocalStorageSupported()){
  //console.log("Supports Save!");
  playerDataTmp = JSON.parse(localStorage["com.hachicom.bowling.playerData"]);
  if (playerDataTmp!=null) playerData = playerDataTmp;
  //console.dir(playerData);
  //alert(localStorage["com.hachicom.bowling.playerData"])
}
else
{
  //console.log("Doesn't support Save!");
  localStorage = [];
  playerData = playerDataDefault;
}

var sfxOn = playerData.settings.sfx;
var language = playerData.settings.language;
var vibrationOn = playerData.settings.vibration;

var currentBGM = '';
var currentHero = '';

var HachiBowl = HachiBowl || {};

document.addEventListener("deviceready", function() {
    setTimeout(function() {
        navigator.splashscreen.hide();
    }, 5000, false);
});

(function() {
  HachiBowl.game = new Phaser.Game(320, 568, Phaser.CANVAS, '');

  HachiBowl.game.state.add('Boot', HachiBowl.Boot);
  HachiBowl.game.state.add('Preload', HachiBowl.Preload);
  HachiBowl.game.state.add('Title', HachiBowl.Title);
  HachiBowl.game.state.add('Tutorial', HachiBowl.Tutorial);
  HachiBowl.game.state.add('Credits', HachiBowl.Credits);
  HachiBowl.game.state.add('Setup', HachiBowl.Setup);
  HachiBowl.game.state.add('Menu', HachiBowl.Menu);
  HachiBowl.game.state.add('Game', HachiBowl.Game);
  HachiBowl.game.state.add('Gameover', HachiBowl.Gameover);
  HachiBowl.game.state.add('Register', HachiBowl.Register);
  HachiBowl.game.state.add('Highscore', HachiBowl.Highscore);

  HachiBowl.game.state.start('Boot');
})();