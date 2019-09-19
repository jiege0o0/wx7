/**
 * 微信开放数据域
 * 使用 Canvas2DAPI 在 SharedCanvas 渲染一个排行榜，
 * 并在主域中渲染此 SharedCanvas
 */

const util = require("util.js");




/**
 * 资源加载组，将所需资源地址以及引用名进行注册
 * 之后可通过assets.引用名方式进行获取
 */
const assetsUrl = {
  // scorebg: "openDataContext/assets/scorebg.png",
  // star2: "openDataContext/assets/chapter_star3.png",
  button1: "openDataContext/assets/page_last.png",
  button2: "openDataContext/assets/page_next.png"
};

/**
 * 资源加载组，将所需资源地址以及引用名进行注册
 * 之后可通过assets.引用名方式进行获取
 */
let assets = {};
console.log();
/**
 * canvas 大小
 * 这里暂时写死
 * 需要从主域传入
 */
let canvasWidth;
let canvasHeight;

let clientData;

//获取canvas渲染上下文
const context = sharedCanvas.getContext("2d");
context.globalCompositeOperation = "source-over";


/**
 * 所有头像数据
 * 包括姓名，头像图片，得分
 * 排位序号i会根据parge*perPageNum+i+1进行计算
 */
var totalGroup = [];

/**
 * 创建排行榜
 */
function drawRankPanel() {
  //起始id
  const startID = perPageMaxNum * page;
  currentGroup = totalGroup.slice(startID, startID + perPageMaxNum);
  //创建头像Bar
  drawRankByGroup(currentGroup);
  //创建按钮
  drawButton()
}
/**
 * 根据屏幕大小初始化所有绘制数据
 */
var wx_scale;
function getV(v){
	return v * wx_scale;
}

function init() {
//排行榜绘制数据初始化,可以在此处进行修改
	let data = wx.getSystemInfoSync();
	canvasWidth = data.windowWidth;
	canvasHeight = data.windowHeight;

	wx_scale = stageWidth/640
	rankWidth =  getV(540);
	
	barWidth = rankWidth;
	barHeight = getV(100);
	preOffsetY = getV(100);
	startX = 0;
	startY = 0;
	avatarSize = getV(80);
	
	


	
	//按钮绘制数据初始化
	buttonWidth = getV(150);
	buttonHeight = getV(60);
	buttonOffset = rankWidth / 2;
	lastButtonX = buttonOffset - buttonWidth - getV(100);
	nextButtonX = buttonOffset + getV(100);
	
	
}

/**
 * 创建两个点击按钮
 */
function drawButton() {

	nextButtonY = lastButtonY = rankHeight - buttonHeight-20; 

  if(page < Math.ceil(totalGroup.length/perPageMaxNum) - 1){
	// context.fillStyle = "#414A5A";
	// context.fillRect(nextButtonX, nextButtonY, buttonWidth, buttonHeight);
	context_drawImage(assets.button2, nextButtonX, nextButtonY, buttonWidth, buttonHeight);
  }
  if(page > 0){
	// context.fillStyle = "#414A5A";
	// context.fillRect(lastButtonX, lastButtonY, buttonWidth, buttonHeight);
	context_drawImage(assets.button1, lastButtonX, lastButtonY, buttonWidth, buttonHeight);
  }
}


/**
 * 根据当前绘制组绘制排行榜
 */
function drawRankByGroup(currentGroup) {
  for (let i = 0; i < currentGroup.length; i++) {
    const data = currentGroup[i];
    drawByData(data, i);
  }
}

/**
 * 根据绘制信息以及当前i绘制元素
 */
function drawByData(data, i) {

// console.log(data,i)
let x = startX;
  //绘制底框
  let color = "#8C8C8C";
  context.fillStyle = color; 
  context.fillRect(startX, startY + (i+1) * preOffsetY-2, barWidth, 2);

  x += getV(40);
  //设置字体
  fontSize = getV(40);
  textOffsetY = (barHeight + fontSize) / 2;
  context.font = (fontSize) + "px Arial";
  
  
  //绘制序号
  context.textAlign = "center";
  context.fillStyle = data.index < 4 ? "#ffffff" : "#cccccc";
  context.fillText(data.index + "", x, startY + i * preOffsetY + textOffsetY, getV(80));
  x += getV(40);
  
  //绘制头像
  var img = wx.createImage();
  img.x = x;
  img.onload = () => {
	context_drawImage(img, img.x, startY + i * preOffsetY + (barHeight - avatarSize) / 2, avatarSize, avatarSize);
 }
  img.src = data.avatarUrl;

  //绘制昵称
   x += avatarSize + getV(10);
  context.textAlign = "left";
  fontSize = getV(24);
  textOffsetY = (barHeight + fontSize) / 2;
  context.font = fontSize + "px Arial";
  context.fillStyle = "#FFFFFF";
  context.fillText(util.getStringByLength(data.nickname + "", 8), x, startY + i * preOffsetY + textOffsetY); 
 

  //绘制球球背景
  // x = barWidth - getV(230);
  // context_drawImage(assets.scorebg, x, startY + i * preOffsetY + (barHeight - getV(50)) / 2, getV(220), getV(50));
  
  // x = barWidth - getV(225);
	// context_drawImage(assets.star2, x, startY + i * preOffsetY + (barHeight - getV(46)) / 2, getV(46), getV(46));
  
  //绘制球球
  // if(data.skin){ //兼容老代码，没有skin
	  // let iiimg = assets["skin_total"]; //128*128 每行8个
	  // if(iiimg){
	     // let skinid = cache.cache_getSkinPid(data.skin);
		 // let dx = (skinid - 1) % 8 * 128;
		 // let dy = Math.floor(skinid/8) * 128;
	  	 // context_drawImage(iiimg, x, startY + i * preOffsetY + (barHeight - 38) / 2, 38, 38, dx, dy, 128, 128);
	  // }
  // }

  x = barWidth - getV(20);
  context.textAlign = "right";
  //绘制分数
  context.fillStyle = "#ffffff";
  context.fillText(data.level + "", x, startY + i * preOffsetY + textOffsetY);
}

/**
 * 点击处理
 */
function onTouchEnd(event) {
//console.log(event)
  let x = event.clientX * sharedCanvas.width / canvasWidth;
  let y = event.clientY * sharedCanvas.height / canvasHeight;
  if(!clientData) return;
  x -= getV(clientData.x);
  y -= getV(clientData.y);


  if (x > lastButtonX && x < lastButtonX + buttonWidth &&
    y > lastButtonY && y < lastButtonY + buttonHeight) {
    //在last按钮的范围内
    if (page > 0) {
      buttonClick(0);

    }
  }
  if (x > nextButtonX && x < nextButtonX + buttonWidth &&
    y > nextButtonY && y < nextButtonY + buttonHeight) {
    //在next按钮的范围内
    if ((page + 1) * perPageMaxNum < totalGroup.length) {
      buttonClick(1);
    }
  }

}
/**
 * 根据传入的buttonKey 执行点击处理
 * 0 为上一页按钮
 * 1 为下一页按钮
 */
function buttonClick(buttonKey) {
  let old_buttonY;
  if (buttonKey == 0) {
    //上一页按钮
    // old_buttonY = lastButtonY;
    // lastButtonY += 10;
    page--;
    renderDirty = true;
    // console.log('上一页' + page);
    // setTimeout(() => {
      // lastButtonY = old_buttonY;
      // renderDirty = true;
    // }, 100);
  } else if (buttonKey == 1) {
    //下一页按钮
    // old_buttonY = nextButtonY;
    // nextButtonY += 10;
    page++;
    renderDirty = true;
    // console.log('下一页' + page);
    // setTimeout(() => {
      // nextButtonY = old_buttonY;
      // renderDirty = true;
    // }, 100);
  }

}

/////////////////////////////////////////////////////////////////// 相关缓存数据

///////////////////////////////////数据相关/////////////////////////////////////

/**
 * 渲染标脏量
 * 会在被标脏（true）后重新渲染
 */
let renderDirty = true;

/**
 * 当前绘制组
 */
let currentGroup = [];
/**
 * 每页最多显示个数
 */
let perPageMaxNum = 7;
/**
 * 当前页数,默认0为第一页
 */
let page = 0;
///////////////////////////////////绘制相关///////////////////////////////
/**
 * 舞台大小
 */
let stageWidth;
let stageHeight;
/**
 * 排行榜大小
 */
let rankWidth;
let rankHeight;

/**
 * 每个头像条目的大小
 */
let barWidth;
let barHeight;
/**
 * 条目与排行榜边界的水平距离
 */
let offsetX_barToRank
/**
 * 绘制排行榜起始点X
 */
let startX;
/**
 * 绘制排行榜起始点Y
 */
let startY;
/**
 * 每行Y轴间隔offsetY
 */
let preOffsetY;
/**
 * 按钮大小
 */
let buttonWidth;
let buttonHeight;
/**
 * 上一页按钮X坐标
 */
let lastButtonX;
/**
 * 下一页按钮x坐标
 */
let nextButtonX;
/**
 * 上一页按钮y坐标
 */
let lastButtonY;
/**
 * 下一页按钮y坐标
 */
let nextButtonY;
/**
 * 两个按钮的间距
 */
let buttonOffset;

/**
 * 字体大小
 */
let fontSize;
/**
 * 文本文字Y轴偏移量
 * 可以使文本相对于图片大小居中
 */
let textOffsetY;
/**
 * 头像大小
 */
let avatarSize;
/**
 * 名字文本最大宽度，名称会根据
 */
let textMaxSize;
/**
 * 绘制元素之间的间隔量
 */
let intervalX;
/**
 * 排行榜与舞台边界的水平距离
 */
let offsetX_rankToBorder;
/**
 * 排行榜与舞台边界的竖直距离
 */
let offsetY_rankToBorder;
/**
 * 绘制排名的最大宽度
 */
let indexWidth;

//////////////////////////////////////////////////////////
/**
 * 监听点击
 */
wx.onTouchEnd((event) => {
  const l = event.changedTouches.length;
  for (let i = 0; i < l; i++) {
    onTouchEnd(event.changedTouches[i]);
  }
});


/**
 * 是否加载过资源的标记量
 */
let hasLoadRes;

/**
 * 资源加载
 */
function preloadAssets() {
  let preloaded = 0;
  let count = 0;
  for (let asset in assetsUrl) {
    count++;
    const img = wx.createImage();
    img.onload = () => {
      preloaded++;
      if (preloaded == count) {
        console.log("加载完成");
        hasLoadRes = true;
      }

    }
    img.src = assetsUrl[asset];
    assets[asset] = img;
  }
}


/**
 * 绘制屏幕
 * 这个函数会在加载完所有资源之后被调用
 */
function createScene() {
  if (sharedCanvas.width && sharedCanvas.height) {
    console.log('初始化完成')
    stageWidth = sharedCanvas.width;
    stageHeight = sharedCanvas.height;
    init();
    return true;
  } else {
    console.log('创建开放数据域失败，请检查是否加载开放数据域资源');
    return false;
  }
}


//记录requestAnimationFrame的ID
let requestAnimationFrameID;
let hasCreateScene;

/**
 * 增加来自主域的监听函数
 */
function addOpenDataContextListener() {
  console.log('增加监听函数')
  wx.onMessage((data) => {
    console.log(data);
	clientData = data;
    if (data.command == 'open') {
      if (!hasCreateScene) {
        //创建并初始化
        hasCreateScene = createScene();
      }
	  
		rankHeight = getV(data.rankHeight);
		perPageMaxNum = Math.floor((rankHeight - 100)/barHeight);
	console.log(rankHeight,perPageMaxNum);
	
	  renderDirty = true;
	  totalGroup = [];
      requestAnimationFrameID = requestAnimationFrame(loop);
	  requestData(data, function(){
			renderDirty = true;
			requestAnimationFrameID = requestAnimationFrame(loop);
		  });
    } else if (data.command == 'close' && requestAnimationFrameID) {
      cancelAnimationFrame(requestAnimationFrameID);
      requestAnimationFrameID = null
    } else if (data.command == 'loadRes' && !hasLoadRes) {
      /**
       * 加载资源函数
       * 只需要加载一次
       */
      console.log('加载资源')
      preloadAssets();
    }else if(data.command == "drawSaveData"){
			core.wxdecode.drawSaveFun(data, null);
		}
  });
  preloadAssets();
}

addOpenDataContextListener();

/**
 * 循环函数
 * 每帧判断一下是否需要渲染
 * 如果被标脏，则重新渲染
 */
function loop() {
  if (renderDirty) {
    // console.log(`stageWidth :${stageWidth}   stageHeight:${stageHeight}`)
    context.setTransform(1, 0, 0, 1, 0, 0);
    context.clearRect(0, 0, sharedCanvas.width, sharedCanvas.height);
    drawRankPanel();
    renderDirty = false;
  }
  requestAnimationFrameID = requestAnimationFrame(loop);
}

/**
 * 图片绘制函数
 */
function context_drawImage(image, x, y, width, height) {
  if (image.width != 0 && image.height != 0 && context) {
    if (width && height) {
      context.drawImage(image, x, y, width, height);
    } else {
      context.drawImage(image, x, y);
    }
  }
}


function requestData(mainData, fun){
	//获取小游戏开放数据接口 --- 开始
	console.log('requestData')
	var k1 = clientData.key;
	page = 0;
	var param = {
		keyList: [k1],
		success: res => {
		// console.log(res)
			//{"errMsg":"getFriendCloudStorage:ok","data":[{"openid":"ozf4X46_jTnno34XKjDSf8q6CjoY","nickname":"IT学思想","avatarUrl":"https://wx.qlogo.cn/mmopen/vi_32/GViaFficKDl6kLs2dVibiazBuianzMCWkpw45ia5b1kduROt1KWYdwO1FVpM9JERibn5GTjXQyXneeiaPaxoElxLstiaHbw/0"
			// ,"KVDataList":[{"key":"score","value":"10"}]}]}

			//[
			//{"key":score,"value":exp#level}
			//]
			// if(mainData.debug_log) console.log("getFriendCloudStorage=", JSON.stringify(res));
			// res.data.push(JSON.parse(JSON.stringify(res.data[0])))
			// res.data.push(JSON.parse(JSON.stringify(res.data[0])))
			// res.data.push(JSON.parse(JSON.stringify(res.data[0])))
			// res.data.push(JSON.parse(JSON.stringify(res.data[0])))
			// res.data.push(JSON.parse(JSON.stringify(res.data[0])))
			// res.data.push(JSON.parse(JSON.stringify(res.data[0])))
			// res.data.push(JSON.parse(JSON.stringify(res.data[0])))
			// res.data.push(JSON.parse(JSON.stringify(res.data[0])))
			// res.data.push(JSON.parse(JSON.stringify(res.data[0])))
			// res.data.push(JSON.parse(JSON.stringify(res.data[0])))
			// res.data.push(JSON.parse(JSON.stringify(res.data[0])))
			// res.data.push(JSON.parse(JSON.stringify(res.data[0])))
			// res.data.push(JSON.parse(JSON.stringify(res.data[0])))
			// res.data.push(JSON.parse(JSON.stringify(res.data[0])))
	
			totalGroup = [];
			for(var i = 0; i < res.data.length; i++){
				var item = res.data[i];
				item.type = k1;
				var data = item.KVDataList;
				delete item.KVDataList;
				var isMe = mainData.me == item.openid;
				item.isMe = isMe;
				var bool = false;
				if(item.isMe)
				{
					bool = true;
					item.level = mainData.me_value;
					item.orderindex = 0;
				}
				else
				{
					var oo = {};
					for(var j = 0; j < data.length; j++){
						oo[data[j].key] = data[j].value;
					}
					// console.log(oo);
					if(oo[k1])
					{
						var temp = JSON.parse(oo[k1]);
						bool = true;
						item.level = temp.wxgame.score;//Number(vv[0]) || 0;
						item.orderindex  = temp.wxgame.update_time
					}
					// else if(oo[k2])
					// {
						// var vv = oo[k2].split(",");  //score + "," + time;
						// bool = true;
						// item.level = Number(vv[0]) || 0;
						// item.orderindex  = Number(vv[1]) || 0;
					// }			
				}
				if(bool)
					totalGroup.push(item);
			}
			

			util.sortByField(totalGroup, ["level","orderindex"], [1,0]);
			for (let i = 0; i < totalGroup.length; i++) {
				totalGroup[i].index = (i+1);
				// if(clientData.key == 'winrate')
				// {
					// totalGroup[i].level += '%'
				// }
				if(clientData.key == 'level')
				{
					totalGroup[i].level = '第 '+totalGroup[i].level+' 天'
				}
				else
				{
					totalGroup[i].level = util.getStringBySecond(totalGroup[i].level).substr(-5);
				}
			}

			// console.log(totalGroup);
			fun && fun(mainData);
		},
		fail: err => {
			console.log(err);
		},
		complete: () => {
		}
	};

	if(mainData.shareTicket){
		param.shareTicket = mainData.shareTicket;
		wx.getGroupCloudStorage(param);
		return;
	}
	wx.getFriendCloudStorage(param);
	console.log(param.keyList);
}