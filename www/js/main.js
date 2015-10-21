/**
 * This template was created following the tutorial in the link below:
 * http://www.gamedevacademy.org/html5-phaser-tutorial-spacehipster-a-space-exploration-game/
 *
 * Credit to Pablo Farias Navarro - Zenva
 */
 
var playerDataDefault = {
  scoretable: {
    names: ['BABE','NICKY','PEPITO','HACHI','MELODY','ROLF','YUKI','SNOW'],
    scores: [4000,3000,2500,2000,1500,1000,750,500]
  },
  scoretable2: {
    names: ['HACHI','PEPITO','NICKY','BABE','SNOW','YUKI','ROLF','MELODY'],
    scores: [6000,5000,4000,3000,2500,2000,1500,1000]
  },
  savedata: {
		firstrun: true,
    version: 2 //change this number if save from new version is different
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
  playerDataTmp = JSON.decode(localStorage["com.hachicom.bowling.playerData"]);
  if (playerDataTmp!=null) playerData = playerDataTmp;
  if(playerData.savedata.version < playerDataDefault.savedata.version){
    playerData.scoretable2 = {
      names: ['HACHI','PEPITO','NICKY','BABE','SNOW','YUKI','ROLF','MELODY'],
      scores: [6000,5000,4000,3000,2500,2000,1500,1000]
    };
    playerData.savedata.version = playerDataDefault.savedata.version;
    localStorage["com.hachicom.bowling.playerData"] = JSON.encode(playerData);
  }
  //console.dir(playerData);
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
    
    //if(isMobile()) document.addEventListener("pause", yourCallbackFunction, false);
    
    var ad_units = {
      android : {
        banner: "ca-app-pub-8006522456285045/7176418810", // or DFP format "/6253334/dfp_example_ad"
        interstitial: "ca-app-pub-8006522456285045/8653152014"
      }
    };
    
    // select the right Ad Id according to platform
    var admobid = ad_units.android;//( /(android)/i.test(navigator.userAgent) ) ? ad_units.android : ad_units.ios;
    
    if (! AdMob ) { alert( 'admob plugin not ready' ); return; }
    if(AdMob) {
      AdMob.createBanner({
        license: 'hachicom@gmail.com/pub-8006522456285045',
        adId:admobid.banner, 
        position:AdMob.AD_POSITION.BOTTOM_CENTER, 
        overlap:true, 
        isTesting: true,
        autoShow:true
      });
      
      AdMob.prepareInterstitial({
        adId: admobid.interstitial,
        isTesting: true,
        autoShow: false
      });
    }
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