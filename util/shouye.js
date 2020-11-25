// 奢侈品审核数据调用
function shechipinlist(){
  console.log("js引用成功")
  const db = wx.cloud.database()
  db.collection('shechipinlist')
  .orderBy("time",'desc')
  .where({
    shenhe:"false"
  })
  .get().then(res=>{

   
    var list = {}
    list = res.data
    console.log('调用以后的结果',list)
    return list
  })

}

module.exports = {
  count:shechipinlist
}