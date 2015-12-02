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
var isPlayingBGM = false;
var bgm1cordova = '';
var bgm2cordova = '';
var bgmstatscordova = '';

var HachiBowl = HachiBowl || {};

if(isMobile()){
  document.addEventListener("deviceready", function() {
    //HIDE SPLASHSCREEN
    setTimeout(function() {
        navigator.splashscreen.hide();
    }, 5000, false);
    
    //alert('loading sound');
    var bgm1URL = getMediaURL("assets/audio/bgm1.ogg");
    bgm1cordova = new Media(bgm1URL, null, mediaError, loopTrack);
    var bgm2URL = getMediaURL("assets/audio/bgm2.ogg");
    bgm2cordova = new Media(bgm2URL, null, mediaError, loopTrack);
    var bgmSURL = getMediaURL("assets/audio/stats.ogg");
    bgmstatscordova = new Media(bgmSURL, null, mediaError);
  
    function getMediaURL(s) {
      if(/Android/i.test(navigator.userAgent)) return "/android_asset/www/" + s;
      return s;
    }
    
    function mediaError(e) {
      console.log('Media Error');
      console.log(JSON.stringify(e));
    }
    
    function loopTrack(status){
      if (status === Media.MEDIA_STOPPED) {
        var posit = currentBGM.getCurrentPosition();
        var durat = currentBGM.getDuration();
        if (posit>=durat) currentBGM.play();
      }
    }
    
    //DEAL WITH APP VISIBILITY
    document.addEventListener("webkitvisibilitychange", onVisibilityChange, false);
    function onVisibilityChange(event) {
      if (event.target.webkitHidden) {
        HachiBowl.game.paused = true;
        if(isPlayingBGM) currentBGM.pause();
      }
      else {
        HachiBowl.game.paused = false;
        if(isPlayingBGM) currentBGM.play();
      }
    }
    
    //REMOVE BACK BUTTON EXIT
    document.addEventListener("backbutton", onBackKeyDown, false);
    function onBackKeyDown(){
      // game.stop();
      // navigator.notification.confirm(
        // 'Sair/Quit?', // message
        // onConfirm, // callback to invoke with index of button pressed
        // 'Exit', // title
        // ['Cancel','Ok'] // buttonLabels
      // );
      e.preventDefault();
    }

    function onConfirm(buttonIndex) {
      if(buttonIndex == 2){
        if (navigator && navigator.app) {
          navigator.app.exitApp();
        } else if (navigator && navigator.device) {
          navigator.device.exitApp();
        }
        //console.log("exited");
        window.close();
      }else game.resume();
    }
    
    //ADMOB CONFIGURATION
    if (! AdMob ) { alert( 'admob plugin not ready' ); return; }
    if( /(android)/i.test(navigator.userAgent) ) { 
      admobid = { // for Android
          banner: 'ca-app-pub-8006522456285045/7176418810',
          interstitial: 'ca-app-pub-8006522456285045/8653152014'
      };
    }
    
    // document.addEventListener('onAdFailLoad',function(data){
      // alert( data.error + ',' + data.reason );
    // });

    AdMob.createBanner( {
        license: 'hachicom@gmail.com/pub-8006522456285045',
        adId: admobid.banner, 
        isTesting: false,
        overlap: true, 
        offsetTopBar: false, 
        position: AdMob.AD_POSITION.BOTTOM_CENTER,
        autoShow: true,
        bgColor: 'black'
    } );
    
    AdMob.prepareInterstitial({
        adId: admobid.interstitial,
        isTesting: false,
        autoShow: false
    });
  });
}

(function() {
  HachiBowl.game = new Phaser.Game(320, 568, Phaser.AUTO, '');

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