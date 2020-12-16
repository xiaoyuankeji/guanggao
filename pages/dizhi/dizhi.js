// pages/dizhi/dizhi.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    value: '',
    dianhua:"",
    dianhua:"",
    miaoshu:"",
    jiage:"",
    tupian0:""
  },


  onChange(event) {
    // event.detail 为当前输入的值
    console.log(event.detail);
  },
  phone(event) {
    // event.detail 为当前输入的值
    console.log(event.detail);
  },
  bindTextAreaBlur: function(e) {
    console.log(e.detail.value);
    var that = this;
    that.setData({
      details: e.detail.value
    });
  },



  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("这里是个啥",options)
    var _id =  options.shangpin
    this.shangpin(_id)
  },

  // 获取商品信息
  shangpin:function(_id){
    var _id = _id
    var that = this
    const db = wx.cloud.database()
    db.collection("shangcheng").doc(_id).get().then(res=>{
      console.log(res)
      var good = res.data
      var jiage =  that.data.jiage = good.jiage;
      var miaoshu = that.data.miaoshu = good.miaoshu;
      var tupian0 = that.data.tupian0 = good.tupian0


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