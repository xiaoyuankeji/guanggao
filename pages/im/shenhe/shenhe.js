// pages/im/shenhe/shenhe.js


Page({

  /**
   * 页面的初始数据
   */
 

  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var  that = this
   const db = wx.cloud.database()
   db.collection("shechipinlist")
   .where({
     shenhe:"false"
   })
   .get().then(res=>{
     console.log("调用审核为false成功",res)
      var obj = res.data
      
     that.setData({
      obj
    })
   })

  },


// 通过审核函数
pass:function(e){
  var that = this
  console.log(e.currentTarget.dataset['id'])
  var id = e.currentTarget.dataset['id']
  
  const db = wx.cloud.database()
  db.collection('shechipinlist').doc(id).update({
    data:{
      shenhe:true
    },
    success:function(res){
      console.log("通过",res.data)
      that.onLoad()
    },
    fail:function(err){
      console.log("通过失败",err)
    }
  })


},

FailPass:function(e){
  var that = this
  console.log(e.currentTarget.dataset['openid'])
  var id = e.currentTarget.dataset['id']
  var jujue = "jujue"
  const db = wx.cloud.database()

  db.collection('shechipinlist')
  // .where({
  //   shenhe:"jujue"
  // })
  .doc(id)
  // .get({
  //   success:function(res){
  //     console.log("这里查的到底是什么",res)
  //   }
  // })
  .update({
    data:{
      shenhe:"jujue"
    },
    success:function(res){
      that.onLoad()
      console.log(res)
    },
    fail:function(err){
      console.log(err)
    }
  })




},







  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})