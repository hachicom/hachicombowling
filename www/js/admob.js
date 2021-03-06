var admobid = {};
if( /(android)/i.test(navigator.userAgent) ) { 
  admobid = { // for Android
      banner: 'ca-app-pub-8006522456285045/7176418810',
      interstitial: 'ca-app-pub-8006522456285045/8653152014'
  };
}
// else if(/(ipod|iphone|ipad)/i.test(navigator.userAgent)) {
    // admobid = { // for iOS
        // banner: 'ca-app-pub-6869992474017983/4806197152',
        // interstitial: 'ca-app-pub-6869992474017983/7563979554'
    // };
// } else {
    // admobid = { // for Windows Phone
        // banner: 'ca-app-pub-6869992474017983/8878394753',
        // interstitial: 'ca-app-pub-6869992474017983/1355127956'
    // };
// }

if(( /(ipad|iphone|ipod|android|windows phone)/i.test(navigator.userAgent) )) {
    document.addEventListener('deviceready', initApp, false);
} else {
    initApp();
}

function initApp() {
    if (! AdMob ) { alert( 'admob plugin not ready' ); return; }
    else alert('admob is ready!');

    AdMob.createBanner( {
        license: 'hachicom@gmail.com/pub-8006522456285045',
        adId: admobid.banner, 
        isTesting: true,
        overlap: true, 
        offsetTopBar: false, 
        position: AdMob.AD_POSITION.BOTTOM_CENTER,
        autoShow: true,
        bgColor: 'black'
    } );
    
    AdMob.prepareInterstitial({
        adId: admobid.interstitial,
        autoShow: true
    });
}