// miniprogram/pages/xiangqingye/xiangqingye.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    uerName : '',
    touxiang : 'https://6775-guojiawen-h3uw4-1302038499.tcb.qcloud.la/timg.jpg?sign=aef73d406e146e76d6e6387636dc624a&t=1594720405',
    position:'法国',
    jiage :'无',
    miaoshu : '',
    tupian0 : '',
    tupian1 : '',
    tupian2 : '',
    tupian3 : '',
    tupian4 : '',
    tupian5 : '',
    tupian6 : '',
    tupian7 : '',
    tupian8 : ''
 


  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    var  _id = options.data
    this.shujukuList(_id)


  //   const eventChannel = this.getOpenerEventChannel()
  //   // 通过触发相关事件传递数据
  //   eventChannel.emit('pageDataB', {toPageA: '看看是否有回调数据'});
  //   eventChannel.emit('someEvent', {data: '这是发送到页面A的数据2'});
  },

  // 调用数据库方法
  shujukuList:function(_id){
    const db = wx.cloud.database();
    db.collection("shechipinlist").doc(_id).get({}).then(res=>{
      console.log(res)
     var uerName = this.data.uerName = res.data.uerName
      var touxiang = this.data.touxiang = res.data.touxiang
      var jiage = this.data.jiage = res.data.jiage
      var position = this.data.position =res.data.position
      var miaoshu = this.data.miaoshu =  res.data.miaoshu
      var tupian0 = this.data.tupian0 = res.data.tupian0
      var tupian1 = this.data.tupian1 = res.data.tupian1
      var tupian2 = this.data.tupian2 = res.data.tupian2
      var tupian3 = this.data.tupian3 = res.data.tupian3
      var tupian4 = this.data.tupian4 = res.data.tupian4
      var tupian5 = this.data.tupian5 = res.data.tupian5
      var tupian6 = this.data.tupian6 = res.data.tupian6
      var tupian7 = this.data.tupian7 = res.data.tupian7
      var tupian8 = this.data.tupian8 = res.data.tupian8

      this.setData({
        uerName ,
        touxiang ,
        jiage ,
        miaoshu,
        tupian0 ,
        tupian1 ,
        tupian2 ,
        tupian3 ,
        tupian4 ,
        tupian5 ,
        tupian6 ,
        tupian7 ,
        tupian8 
      })
      
    })
  },

  onClickIcon() {
    console.log('分享');
   
  },

  onClickButton() {
    console.log('免费咨询');
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
    var titledata = this.data.miaoshu
  return {
    title: titledata, //转发的标题。当前小程序名称
    path: ``, //转发的路径
    imageUrl: '',//自定义图片路径 支持PNG及JPG。显示图片长宽比是 5:4。
    // success: function (res) {
    //     // 转发成功
    //     var shareTickets = res.shareTickets;
    //     api.showToast('转发成功');
    // },
    // fail: function (res) {
    //     // 转发失败
    //     api.showToast("转发失败:" + JSON.stringify(res));
    // }

}

  }
})