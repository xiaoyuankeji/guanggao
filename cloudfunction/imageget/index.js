// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()

  var aa
  db.collection('shechipinlist').get({

    success: function (res) {
      aa = res.data
      console.log(res)
      console.log("内部aa", aa)
      
    }
    

  })

  return {
    aa
  }
 
}