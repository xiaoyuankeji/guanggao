// miniprogram/pages/im/edit/edit.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    openid:"",
    newnickName:"",
    introduce:""
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("openid已传入",options)
    var _id = options._id
    this.data.openid = _id
    this.uerdata(_id)

  },

  htmlSetData: function (
    _id,
    nickName,
    avatarUrl,
    gender,
    country,
    province,
    introduce
    ) {
    this.setData({
      nickName,
      avatarUrl,
      gender,
      province,
      country,
      _id,
      introduce
    })
  },

  // 获取数据库信息
  uerdata:function(_id){
    const db = wx.cloud.database();
    var that =this
    var _id = _id
    console.log("看看传媒传到这里",_id)
    db.collection("uerdata").doc(_id).get().then(res=>{
      console.log(res)
       
      var nickName = res.data.nickName
      var avatarUrl =  res.data.avatarUrl
      var gender = res.data.gender //性别 0：未知、1：男、2：女
      var province = res.data.province
      var country = res.data.country
      var introduce =res.data.introduce

      that.htmlSetData(
        _id,
        nickName,
        avatarUrl,
        gender,
        country,
        province,
        introduce)
      
    })
  },

  uploadPictures:function(e){
    var that = this
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success (res) {
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths
        that.uploadchucun(tempFilePaths)
        console.log("临时头像路径",tempFilePaths)
      }
    })
  },

  //传入储存空间
  uploadchucun:function(tempFilePaths){
  console.log("上传到储存空间")
  var that = this
  var tempFilePaths = tempFilePaths + ""
  var avatarUrl = this.data.openid + ".png"
  console.log("头像最终命名",avatarUrl)
    // 将图片上传至云存储空间
    wx.cloud.uploadFile({
      cloudPath: avatarUrl, // 上传至云端的路径
      filePath: tempFilePaths, // 小程序临时文件路径
      success: res => {
        // 返回文件 ID
        console.log("已上传",res.fileID)
        var tempFilePaths = res.fileID
        that.touxiangUpData(tempFilePaths)
      },
      fail: console.error
    })


  },


  // 更新数据库头像数据
  touxiangUpData:function(tempFilePaths){
    console.log("更新数据库头像url",tempFilePaths)
    const db = wx.cloud.database();
    var _id = this.data.openid
    var that = this
    db.collection("uerdata").doc(_id).update({
      data: {
        avatarUrl: tempFilePaths
      },
      success: res => {
        console.log("上传成功后返回数据",res)
        that.setData({
          avatarUrl:tempFilePaths
        })
      },
      fail: err => {
        icon: 'none',
        console.error('[数据库] [更新记录] 失败：', err)
      }


    })


  },


  // nickName输入框
  onChange(event) {
    // event.detail 为当前输入的值
    console.log(event.detail);
    
    this.data.newnickName = event.detail

  },
  onChangeIntroduce(event){
    console.log(event.detail);
    this.data.introduce  = event.detail
  },

  // 集体上传
  confirm:function(){
   
    const db = wx.cloud.database();
    var _id = this.data.openid
    var nickname = this.data.newnickName
    var introduce = this.data.introduce
    var that = this
    db.collection("uerdata").doc(_id).update({
      data: {
        nickName: nickname,
        introduce:introduce
      },
      success: res => {
        console.log("集体上传成功",res)

        wx.switchTab({
          url:"../../im/im",
          success: function (e) {  
            var page = getCurrentPages().pop();  
            if (page == undefined || page == null) return;  
            page.onLoad();  
          }  
        })
      
      },
      fail: err => {
        icon: 'none',
        console.error('[数据库] [更新记录] 失败：', err)
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