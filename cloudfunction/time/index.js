// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()








// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()

  // 获取time数据库数据
  var countdown = "";

var time = new Date().getTime();
console.log("时间aaaaa",time)





  return {
  
    time,
    event,
    openid: wxContext.OPENID,
    appid: wxContext.APPID,
    unionid: wxContext.UNIONID,
  }
}