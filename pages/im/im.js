const app = getApp()

Page({
  data: {
    nickName: "点击登入",
    avatarUrl: "cloud://guojiawen-h3uw4.6775-guojiawen-h3uw4-1302038499/默认头像ICON (1).png",
    shouquan: false,
    introduce: "介绍一下自己，让顾客更信任你~"


  },

  onLoad: function (options) {
    var that = this


    // wx.getSetting({
    //   success(res) {
    //     if (!res.authSetting["scope.userInfo"]) {

    //       var shouquan = that.data.shouquan = true
    //       console.log('加载中de授权',shouquan)
    //       that.uerData(shouquan);

    //       wx.authorize({
    //         scope: 'scope.userInfo',
    //         success () {
    //           // 用户已经同意小程序使用录音功能，后续调用 wx.startRecord 接口不会弹窗询问
    //           wx.startRecord()
    //         }
    //       })
    //     }
    //   }
    // })

    wx.getSetting({
      success(res) {
        console.log(res)
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          console.log('加载中de授权', shouquan)
          var shouquan = that.data.shouquan = true
          that.uerData(shouquan);

        }
      }
    })


  },

  // 获取授权弹框
  tankuang: function (openid) {
    var  that  = this
    wx.getSetting({
      success(res) {


          that.uerInfo(openid)

      }
    },2000)
  },



  // 如果已有数据调用数据库现有数据
  uerDataDiaoYong: function (openid) {
    console.log("监控这里是否执行", openid)
    var shouquan = this.data.shouquan
    var _id = openid
    var that = this
    


    const db = wx.cloud.database();
    db.collection("uerdata").doc(openid).get({

      success:function(res){
        console.log("云数据库数据下载", res)
        var userInfo = res.userInfo
        var nickName = that.data.nickName = res.data.nickName
        var avatarUrl = that.data.avatarUrl = res.data.avatarUrl
        var gender = res.data.gender //性别 0：未知、1：男、2：女
        var province = res.data.province
        var country = res.data.country
        var introduce = res.data.introduce
        console.log("自我介绍", introduce)
  
        that.htmlSetData(
          _id,
          openid,
          nickName,
          avatarUrl,
          gender,
          country,
          province,
          introduce
        )


      },
      fail:function(err){
        console.log("失败走这里")
        that.uerInfo(openid)
      }





    })
    // .then(res => {
    //   console.log("云数据库数据下载", res)
    //   var userInfo = res.userInfo
    //   var nickName = that.data.nickName = res.data.nickName
    //   var avatarUrl = that.data.avatarUrl = res.data.avatarUrl
    //   var gender = res.data.gender //性别 0：未知、1：男、2：女
    //   var province = res.data.province
    //   var country = res.data.country
    //   var introduce = res.data.introduce
    //   console.log("自我介绍", introduce)

    //   that.htmlSetData(
    //     _id,
    //     openid,
    //     nickName,
    //     avatarUrl,
    //     gender,
    //     country,
    //     province,
    //     introduce
    //   )



    // })
  },


  // 最后一步传递数据给html
  htmlSetData: function (
    _id,
    openid,
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
      openid,
      introduce
    })
    // this.onLoad();
  },


  //第三步往云数据库传递数据
  addDatabase: function (openid, nickName, avatarUrl, gender, country, province) {
    var _id = openid
    const db = wx.cloud.database();
    var that = this
    var introduce = this.data.introduce
    console.log("走到上传数据库的步骤")
    db.collection('uerdata').add({
        // data 字段表示需新增的 JSON 数据
        data: {
          _id,
          nickName,
          avatarUrl,
          gender,
          country,
          province,
          openid,
          introduce
        }
      })
      .then(res => {
          that.htmlSetData(
            _id,
            openid,
            nickName,
            avatarUrl,
            gender,
            country,
            province)


        }

      )

  },

  //第二步获取授权获取信息
  uerInfo: function (openid) {
    console.log("监控uerInfo是否执行")
  
    var that = this
    
    var openid = openid
    
    wx.getUserInfo({
      success: function (res) {
        console.log("uerInfo 授权成功", res)
        var userInfo = res.userInfo
        var nickName = that.data.nickName = userInfo.nickName
        var avatarUrl = that.data.avatarUrl = userInfo.avatarUrl
        var gender = userInfo.gender //性别 0：未知、1：男、2：女
        var province = userInfo.province
        var country = userInfo.country
        var shouquan = that.data.shouquan = true
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
        console.log("云函数返回结果", res.result.openid, "授权的值", shouquan)
        var openid = res.result.openid

        // 分授权和未授权两种情况
        if (shouquan) {
          that.uerDataDiaoYong(openid)
        } else {
          console.log("未授权走了吗？")
          setTimeout(function () {
            that.tankuang(openid)
            //要延时执行的代码
           }, 2000)
          
        }

      },
    },7500)

   




  },
  edit: function (e) {

    var dataid = e.currentTarget.dataset['openid']
    console.log(dataid)



    wx.navigateTo({
      url: './edit/edit?_id=' + dataid,

    })



  }

})