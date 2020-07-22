// miniprogram/pages/text/text.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    avatarUrl: './user-unlogin.png',
    userInfo: {},
    logged: false,
    takeSession: false,
    requestResult: ''
  },


//   // 获取用户信息



// onGetUserInfo: function (e) {
//   if (!this.data.logged && e.detail.userInfo) {
//     this.setData({
//       logged: true,
//       avatarUrl: e.detail.userInfo.avatarUrl,
//       userInfo: e.detail.userInfo
//     })
//   }
// },

// onGetOpenid: function () {
//   // 调用云函数
//   wx.cloud.callFunction({
//     name: 'login',
//     data: {},
//     success: res => {
//       console.log('[云函数] [login] user openid: ', res.result.openid)
//       app.globalData.openid = res.result.openid
//       wx.navigateTo({
//         url: '../userConsole/userConsole',
//       })
//     },
//     fail: err => {
//       console.error('[云函数] [login] 调用失败', err)
//       wx.navigateTo({
//         url: '../deployFunctions/deployFunctions',
//       })
//     }
//   })
// },
/**
 * 生命周期函数--监听页面加载
 */
onLoad: function (options) {
  wx.getSetting({
    success: res => {
      if (res.authSetting['scope.userInfo']) {
        // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
        this.text()
      }
    }
  })
},

text:function(){
    var that = this
  wx.getUserInfo({
    success: function(res) {
      var userInfo = res.userInfo
      var nickName = userInfo.nickName
      var avatarUrl = userInfo.avatarUrl
      var gender = userInfo.gender //性别 0：未知、1：男、2：女
      var province = userInfo.province
      var city = userInfo.city
      var country = userInfo.country
     
      console.log(avatarUrl)
      that.setData({
        avatarUrl
      })
    }
  })


  // wx.cloud.callFunction({
  //   name:"login",
  //   data:{},
  //   success:res=>{
  //     console.log(res)
  //   }
  // })
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