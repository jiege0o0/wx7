const Util = {

	getFreeWeekNo: (time,startTime = 1537718400)=> {
		if (time < startTime) {
			return -1;
		}
		// 一秒，一分钟（60秒），一小时（60分钟），一天（24小时），一周（7天）
		var  s = 1, min = 60 * s, h = 60 * min, d = 24 * h, week = 7 * d;
		return Math.floor((time - startTime) / week + 1);
	},

	getStringByLength: (str,len)=>{
		len = len*2;
		for(var i=1;i<=str.length;i++)
		{
			var rs = str.substr(0,i);
			if(Util.getStringLength(rs) > len)
				return   str.substr(0,i-1);
		}
		return str;
	},

	getStringLength: (char)=>{
		return char.replace(/[^\x00-\xff]/g,"aa").length;
	},

	/**
    * 数组排序（只支持数值大小比较）
    * 例子：sortByField(ff, ["score","level","exp"], [1,1,1]);
    * @param data 源数组
    * @param fields 字段名
    * @param type 字段排序规则[0,0,0....] 0表示从小到大,其他任何值都是从大到小
    */
	sortByField: (data, fields, type)=>
    {
        if(data && fields && type && fields.length == type.length)
        {
            var copy = fields.slice();//复制一份
            var copy2 = type.slice();//复制一份
            data.sort(listSort);
        }
        
        function listSort(a, b)
        {
            if(a != null && b != null)
            {
                fields = copy.slice();
                type = copy2.slice();
                while(fields.length > 0)
                {
                    if((a[fields[0]]) < (b[fields[0]]))
                    {
                        return (type[0] == 0 || type[0] == -1 ? -1 : 1);
                    }
                    else if((a[fields[0]]) > (b[fields[0]]))
                    {
                        return (type[0] == 0 || type[0] == -1 ? 1 : -1);
                    }
                    else
                    {
                        fields.shift();
                        type.shift();
                    }
                }
            }
            return 0;
        }
        return data;
    },
	
	 getStringBySecond:(value)=> {
        if(value < 0)
            value = 0;
        var hour = Math.floor(value / 3600);
        var minute = Math.floor((value % 3600) / 60);
        var second = Math.floor(value % 60);
        var msg = "";

        var h = "" + hour;
        if(h.length < 2)
            h = "0" + h;
        msg += h;
        var m = "0" + minute;
        m = m.substr(m.length - 2,2);
        msg += ":" + m;
        var s = "0" + second;
        s = s.substr(s.length - 2,2);
        msg += ":" + s;

        return msg;
    },

	addNumSeparator:(num,len)=>{
        var s = String(num);
        
        var ss="";
        
        if(s.length<=3)
        {
            ss = s;
        }
        
        while (s.length>3) {
            
            ss = (ss=="") ? s.substr(-3): s.substr(-3) + "," + ss;
            
            s = s.substr(0,s.length-3);
            
            if(s.length<=3)
            {
                ss = s + "," + ss;
            }
        }
        if(len)
        {
            var arr = ss.split(',');
            if(arr.length > len)
            {
                var index = arr.length - len;
                arr.length = len;
                ss = arr.join(',')+ ['K','M','G','T'][index-1];
            }
        }
        
        return ss;
    }

}
module.exports = Util;