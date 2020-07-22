const app = getApp()

Page({
  data: {
    nickName: "点击登入",
    avatarUrl: "cloud://guojiawen-h3uw4.6775-guojiawen-h3uw4-1302038499/默认头像ICON (1).png",
    shouquan:false,
    introduce:"介绍一下自己，让顾客更信任你~"


  },

  onLoad: function (options) {
    var that = this
    
    wx.getSetting({
      success(res) {
        console.log(res)
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          
          var shouquan = that.data.shouquan = true
          that.uerData(shouquan);
          
        }
      }
    })


  },

  // 如果已有数据调用数据库现有数据
  uerDataDiaoYong:function(openid){
    console.log("监控这里是否执行",openid)
    var  _id = openid
    var that = this
    const db = wx.cloud.database();
    db.collection("uerdata").doc(_id).get().then(res=>{
        console.log("云数据库数据下载",res)
        var userInfo = res.userInfo
        var nickName = that.data.nickName = res.data.nickName
        var avatarUrl = that.data.avatarUrl = res.data.avatarUrl
        var gender = res.data.gender //性别 0：未知、1：男、2：女
        var province = res.data.province
        var country = res.data.country
        var introduce =res.data.introduce
        console.log("自我介绍",introduce)
        
        that.htmlSetData(
          _id,
          nickName,
          avatarUrl,
          gender,
          country,
          province,
          introduce
          )
      
      

    })
  },


  // 最后一步传递数据给html
  htmlSetData: function (
    _id,
    nickName,
    avatarUrl,
    gender,
    country,
    province,
    introduce) {
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


  //第三步往云数据库传递数据
  addDatabase: function (openid, nickName, avatarUrl, gender, country, province) {
    var _id = openid
    const db = wx.cloud.database();
    var that = this
    var introduce = this.data.introduce
    db.collection('uerdata').add({
        // data 字段表示需新增的 JSON 数据
        data: {
          _id,
          nickName,
          avatarUrl,
          gender,
          country,
          province,
          introduce
        }
      })
      .then(res => {
        that.htmlSetData(
          _id,
          nickName,
          avatarUrl,
          gender,
          country,
          province)
      })

  },

  //第二步获取授权获取信息
  uerInfo: function (openid) {
    console.log("监控uerInfo是否执行")
    var that = this
    var openid = openid
    
    wx.getUserInfo({
      success: function (res) {
        console.log("uerInfo 授权成功",res)
        var userInfo = res.userInfo
        var nickName = that.data.nickName = userInfo.nickName
        var avatarUrl = that.data.avatarUrl = userInfo.avatarUrl
        var gender = userInfo.gender //性别 0：未知、1：男、2：女
        var province = userInfo.province
        var country = userInfo.country
        that.addDatabase(openid, nickName, avatarUrl, gender, country, province)

      }
    })
  },

  //第一步获取oppid
  uerData: function (shouquan) {
    console.log("监听运行")
    var that = this
    var shouquan = this.data.shouquan
    wx.cloud.callFunction({
      name: 'login',
      data: {},
      complete: res => {
        console.log("云函数返回结果", res.result.openid)
        var openid = res.result.openid

        // 分授权和未授权两种情况
        if(shouquan){
          that.uerDataDiaoYong(openid)
        }else{
          that.uerInfo(openid)
        }
        
      },
    })


  },
  edit:function(e){
    
    var  dataid = e.currentTarget.dataset['openid']
    console.log(dataid)



    wx.navigateTo({
      url: './edit/edit?_id=' + dataid,

    })

   

  }

})