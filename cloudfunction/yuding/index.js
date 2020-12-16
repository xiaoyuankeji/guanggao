// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main =  (event, context) => {
  const wxContext = cloud.getWXContext()
  
  var neirong = "您预约的秒杀马上开始，请做好准备"

  
  // 获取该发通知的数据库数据
  function cloudlist (){
    const db = cloud.database()
    var that =this
    db.collection("uerdata")
    .where({

    })
    .get()
    .then(res=>{
      console.log("获取数据库数据",this)
      var datalist = res.data
      // var datalist = "oHWfx0E5OCE3gt_H5zkWh76p8oVc"
      var listlength = res.data.length
      xunhuan(datalist,listlength)
    })
  };
  
  // 循环执行
  function xunhuan (datalist,listlength){
    console.log(datalist)
    for(var i = 0; i< listlength;i++){
      var openid = datalist[i]._id
      console.log(openid)
      senddingyue(openid)
    }


  };




  cloudlist()

  function senddingyue (openidlist){
    const result =  cloud.openapi.subscribeMessage.send({

      touser: openidlist,
      page: 'hot',
      lang: 'zh_CN',
      data: {
        time2: {
          value:"2020年12月24日 12:00"
        },
        thing3: {
          value: '预约的圣诞节秒杀即将开始'
        },
        thing1: {
          value: "奢侈品官方商城圣诞秒杀活动"
        },

      },
      templateId: 'FDtvyqrJjiUxnqOyIxveXhg1qMcsbw5dn72AJLeTOoI',
      miniprogramState: 'developer'
    })
    
  };
  // senddingyue();

    console.log("云函数执行到这里了")


  return{
    // event,
    // result
  }
 
}