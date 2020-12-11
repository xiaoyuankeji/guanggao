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
    requestResult: '',
    goods_description: '',
    abc: "",
    show: false,
    actions: [{
        name: '选项',
      },
      {
        name: '选项',
      },
      {
        name: '选项',
        subname: '副文本',
        openType: 'share',
      },
    ],

  },

  onClose() {
    this.setData({
      show: false
    });
  },

  onSelect(event) {
    console.log(event.detail);
  },

  // 支付功能
  //支付提交
  paypost() {
    let that = this;
    console.log("云函数调动")
    wx.showLoading({
      title: '正在下单',
    });
    // 利用云开发接口，调用云函数发起订单
    wx.cloud.callFunction({
      name: 'pay',
      data: {
        $url: "pay", //云函数路由参数
        goodId: "fc61cd8c5fa15f140009540617db15b6"
      },
      success: res => {
        wx.hideLoading();
        that.pay(res.result)
      },
      fail(e) {
        wx.hideLoading();
        wx.showToast({
          title: '支付失败，请及时反馈或稍后再试',
          icon: 'none'
        })
      }
    });
  },
  //实现小程序支付
  pay(payData) {
    console.log("支付调动了吗")
    let that = this;
    //官方标准的支付方法
    wx.requestPayment({
      timeStamp: payData.timeStamp,
      nonceStr: payData.nonceStr,
      package: payData.package,
      signType: 'MD5',
      paySign: payData.paySign,
      success(res) {
        console.log("支付成功", res)
      },
    })
  },

  text: function () {
    console.log("点击1实验按钮")
    wx.navigateToMiniProgram({
      appId: 'wxb036cafe2994d7d0',
      path: '/portal/group-profile/group-profile?group_id=13104378350848831&invite_ticket=BgAAKp3-Mbcoq3dCBt3yrH68EQ&fromScene=bizArticle',
      extraData: {
        foo: 'bar'
      },
      // develop
      envVersion: 'release',
      success(res) {
        // 打开成功
      }
    })
  },



  show: function () {
    var that = this
    wx.chooseVideo({
      sourceType: ['album', 'camera'],
      maxDuration: 60,
      camera: 'back',
      success(res) {
        console.log(res.tempFilePath)
        var abc = res.tempFilePath
        that.setData({
          abc: abc
        })
      }
    })

    // wx.cloud.callFunction({
    //   // 云函数名称
    //   name: 'addtext',
    //   // 传给云函数的参数
    //   data: {
    //     a: 1,
    //     b: 2,
    //   },
    //   success: function(res) {
    //     console.log("云函数返回值",res) // 3
    //   },
    //   fail: console.error
    // })



  },


  show1: function () {
    this.setData({
      show: true
    })
  },


  pass: function (e) {
    var that = this
    console.log(e.currentTarget.dataset['id'])
    var id = e.currentTarget.dataset['id']

    const db = wx.cloud.database()
    db.collection('shechipinlist').doc(id).update({
      data: {
        shenhe: true
      },
      success: function (res) {
        console.log("成功了", res.data)
      },
      fail: function (err) {
        console.log("失败了", err)
      }
    })



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