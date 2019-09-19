// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init();
const db = cloud.database();

exports.main = async (event, context) => {
  try {
    var data = { shareUser: {}}
	data.shareUser[event.index] = 1;
    return await db.collection('user').where({
      _openid: event.other
    }).update({data:data});
  } catch (e) {
    console.error(e)
  }
}
