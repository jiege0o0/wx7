

require('./weapp-adapter.js');
require('./platform.js');
require('./manifest.js');
require('./egret.wxgame.js');



// 启动微信小游戏本地缓存，如果开发者不需要此功能，只需注释即可
// 只有使用 assetsmanager 的项目可以使用

// if(window.RES && RES.processor) {
    // require('./library/image.js');
    // require('./library/text.js');
    // require('./library/sound.js');
    // require('./library/binary.js');
// }
require('./utils/wlad_sdk_game.min.js');
require('./utils/ald-game.js')
// var xhtad = require('./utils/xhtad_sdk.min.js')
// window.xhtad = xhtad

// var fundebug = require("./library/fundebug.0.4.0.min.js");
// fundebug.init({
//   apikey: "9a69bba39a41796ebba788ca6bde75254548c7d076a470c01b735d2d7b9037ac",
//   setSystemInfo: true,
//   monitorHttpData:true
// })	





console.log('_0')
//sasas
wx.cloud.init({
  // env: 'release-c00aa8'
  // env: 'hange0o0-1-797611'
  
});

// wx.cloud.getTempFileURL({
  // fileList: ['cloud://hange0o0-1-797611.6861-hange0o0-1-797611/aa.txt'],
  // success: res => {
    // console.log(res.fileList[0].tempFileURL)
  // },
  // fail: err => {
    // console.log(err)
  // }
// })


// var a;

// wx.cloud.callFunction({      //取玩家openID,
//   name: 'onShareIn',
//   data: {
//     other: 'oRxld5dkAEvmkaAld2xMJ4rOXsrg',
//     skinid: 3,
//   },
//   complete: (res) => {
//     console.log('666',res)
//   }
// })

// const db = wx.cloud.database();
// db.collection('user').doc('XA8m5JT75u22b_2a').update({
//   data: {levelData:{3:4}},
//   success: (res) => {
//     console.log(res)
//   },
// })
console.log('_1')

egret.runEgret({
    //以下为自动修改，请勿修改
    //The following is automatically modified, please do not modify
    //----auto option start----
		entryClassName: "Main",
		orientation: "auto",
		frameRate: 30,
		scaleMode: "fixedWidth",
		contentWidth: 640,
		contentHeight: 1136,
		showFPS: false,
		fpsStyles: "x:0,y:0,size:12,textColor:0xffffff,bgAlpha:0.9",
		showLog: false,
		maxTouches: 2,
		//----auto option end----
    renderMode: 'webgl',
    audioType: 2,
    calculateCanvasScaleFactor: function (context) {
        var backingStore = context.backingStorePixelRatio ||
            context.webkitBackingStorePixelRatio ||
            context.mozBackingStorePixelRatio ||
            context.msBackingStorePixelRatio ||
            context.oBackingStorePixelRatio ||
            context.backingStorePixelRatio || 1;
        return (window.devicePixelRatio || 1) / backingStore;
    }
});
console.log('_2')

// var url = "https://6861-hange0o0-1-797611-1258242303.tcb.qcloud.la/aa.txt"
// var loader = new egret.URLLoader();
// loader.dataFormat = egret.URLLoaderDataFormat.TEXT;
// loader.once(egret.Event.COMPLETE, () => {
//   var sound = loader.data;  
//   console.log(sound)
// },this);
// loader.load(new egret.URLRequest(url));
// require("egret.min.js")
