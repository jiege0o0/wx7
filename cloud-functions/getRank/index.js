// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
	var rankKey = 'rank_' + event.type;
	var max = 50;
  var result = await db.collection(rankKey).orderBy('value', 'desc').limit(max).get();
  var arr = result.data;
  var blackList = ['oCAw_5R77033eQXnzOVMBPYRJ3OE'];//不上榜
  if(event.value && event.nick &&(arr.length < max || arr[max-1].value < event.value) && blackList.indexOf(event.openid) == -1)//要更新
  {
	  var newData = {
				value:event.value,
				head:event.head,
				nick:event.nick,
				openid:event.openid
			};
	//是否有自己
	for(var i=0;i<arr.length;i++)
	{
		if(arr[i].openid==event.openid)//有自己的，更新
		{
			await db.collection(rankKey).where({
			  openid: event.openid
			})
			  .update({
				data: newData,
			  })
			arr[i].head=event.head;
			arr[i].value=event.value;
			arr[i].nick=event.nick;
			return arr;
		}
	}

	//替换
	if(arr.length == max)
	{
		await db.collection(rankKey).where({
		  openid: arr[max-1].openid
		})
		  .update({
			data: newData,
		  })
		arr[max-1] = newData;
		return arr;
	}
	//插入
	await db.collection(rankKey).add({
      data: newData});
	  arr.push(newData);
		return arr;
  }
  return arr;
}