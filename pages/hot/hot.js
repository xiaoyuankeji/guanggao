// pages/hot/hot.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    obj: [],
    openid: "",
    number1:"1",
    number2:"2",
    number3:"3",
    number4:"4",
    number5:"5",
    yuding: false,
    time: "",
    targetTime: "",
    xxxx: "",
    start: true,
    reciprocalTime: "",
    uptime:true,
    miaoshaEnd:false,
    shijianchan:'',
    mianfeiyuding:"免费预定",
    qiangduozhong:false
   
  },

  /**
   * 生命周期函数--监听页面加载
   */

  // 返回按钮
  back: function () {
    this.setData({
      goods_imgs: [],
      goods_description: "",
      jiage: '',
      videojudge: false
    })
    wx.switchTab({
      url: '../shouye/shouye',
      success: function (res) {


        var page = getCurrentPages().pop();
        if (page == undefined || page == null) return;
        page.onLoad();
      }
    }, )
  },



  // 授权启动弹框
  shouquan: function () {
    wx.authorize({
      scope: 'scope.userInfo',
      success() {
        // 用户已经同意小程序使用录音功能，后续调用 wx.userInfo 接口不会弹窗询问
        wx.getUserInfo({
          success: function (res) {
            console.log(res.userInfo)

          }
        })
      }
    })
  },


  // 获取openid

  get_openid: function () {
    var that = this
    wx.cloud.callFunction({
      name: 'login',
      data: {

      }
    }).then(res => {
      console.log("openid运行到这里了", res.result.openid)
      that.data.openid = res.result.openid
    })
  },

  onLoad: function (options) {
    var that = this;
    wx.hideTabBar({});
    this.get_openid();
    this.cloudData();
    this.targetTime()
    // this.timejishi();
    // this.daojishi();
    wx.getSetting({
      withSubscriptions: true,
      success(res) {

        console.log("获取用户当前授权的东西都有哪些", res)
        var itemSettings = res.subscriptionsSetting.itemSettings
        if (itemSettings) {
          if (itemSettings['FDtvyqrJjiUxnqOyIxveXhg1qMcsbw5dn72AJLeTOoI'] === 'accept') {
            console.log('is accredit：ok')
            that.data.yuding = true
          }
        }
      }
    })

  },

  zhengmingshuoming: function (params) {
    wx.navigateTo({
      url: '../zhengpinshuoming/zhengpinshuoming',
    })
  },

  tiaozhuan:function(e){
    console.log("跳转到商品详情页",e.currentTarget.dataset.id)
    var _id = e.currentTarget.dataset.id
    var openid = this.data.openid
    var objdata = [_id,openid]
    var reciprocalTime = this.data.reciprocalTime
    console.log ("时间差",reciprocalTime)
    wx.navigateTo({
      url: '../hot/hotdetails/hotdetails?data='+ _id + '&openid='+openid+'&shijiancha='+reciprocalTime,
      // events: {
      //   // 为指定事件添加一个监听器，获取被打开页面传送到当前页面的数据
      //   pageDataB: function(data) {
      //     console.log('页面B触发事件时传递的数据1：',data)
      //   },
      //   someEvent: function(data) {
      //     console.log('页面B触发事件时传递的数据2：',data)
      //   }
      // }
    })

  },
  

  // 调用数据库商城信息
  cloudData: function () {

    console.log("运行到这里了")
    const db = wx.cloud.database()

    db.collection('shangcheng')
      .orderBy("_id", "asc")
      .get()
      .then(res => {
        console.log("调用商城数据库", res)
        var obj = this.data.obj = res.data

        this.setData({
          obj
        })
      })
  },



  // 预定按钮点击
  yuding: function () {
    var that = this
    console.log("按钮点击生效")



    const db = wx.cloud.database()

    wx.requestSubscribeMessage({
      tmplIds: ['FDtvyqrJjiUxnqOyIxveXhg1qMcsbw5dn72AJLeTOoI'],
      success(res) {

        console.log("授权成功返回什么", res)

        that.yudingcloud()
        var mianfeiyuding= that.data.mianfeiyuding = "已预订"
      
        that.setData({
          mianfeiyuding
        })

      }
    })



  },


  // 获取目标时间
  targetTime: function () {
    const db = wx.cloud.database()
    var that = this
    db.collection('time')
      .doc('cc9f30fe5fb51d380001b69a6f178353')
      .get()
      .then(res => {
        console.log("获取目标时间", res.data.datatime)
        var targetTime = res.data.datatime
        that.daojishi(targetTime)
        var targetYear = targetTime.getFullYear();
        var targetMonth = targetTime.getMonth() + 1;
        var targetDay = targetTime.getDate();
        var targetHours = targetTime.getHours();
        var targetMinutes = targetTime.getMinutes();
        if(targetMinutes == 0){
          targetMinutes = "00"
        }
        var targetSeconds = targetTime.getSeconds();
        if(targetSeconds == 0){
          targetSeconds = "00"
        }

        var xxxx = targetTime.toLocaleString();
        that.setData({
          targetYear,
          targetMonth,
          targetDay,
          targetHours,
          targetMinutes,
          targetSeconds,
          xxxx
        })
      })

  },


  // 获取服务器时间并倒计时
  daojishi: function (currentTime) {
    var that = this
    var currentTime = currentTime
    console.log("哈哈哈", currentTime)
    wx.cloud.callFunction({
      name: 'time',
      data: {},
      success: function (res) {
        var reciprocalTime = res.result.time
        console.log("当前时间嘿嘿", reciprocalTime)


        that.timelist(reciprocalTime, currentTime)

      }
    })


  },

  //时间戳转换成时、分、秒
  timelist: function (t, y) {
    var that = this
    var tt = Number(t)
    var yy = Number(y)
    console.log("现在时间", t, "目标时间", yy.valueOf())
    var reciprocalTime = yy.valueOf() - tt.valueOf()

    console.log("时间倒计时运行到这里了", reciprocalTime)

    that.data.reciprocalTime = reciprocalTime
    that.countTime(reciprocalTime)




    // that.daojishiSet(hour, minute, second)


  },

  // 倒计时运算及传参  

  countTime: function (reciprocalTime) {
    var that = this;
    // var date = new Date();
    // var now = date.getTime();
    // var endDate = new Date(that.data.endDate2);//设置截止时间
    // var end = endDate.getTime();
    var time = reciprocalTime / 1000 //时间差 
    console.log('时间差是多少', reciprocalTime)

    // var d, h, m, s, ms;
    // d = Math.floor(time / 1000 / 60 / 60 / 24);
    // h = Math.floor(time / 1000 / 60 / 60 % 24);
    // m = Math.floor(time / 1000 / 60 % 60);
    // s = Math.floor(time / 1000 % 60);
    // ms = Math.floor(time % 1000);




    // 获取天、时、分、秒
    let day = parseInt(time / (60 * 60 * 24));
    let hou = parseInt(time % (60 * 60 * 24) / 3600);
    let min = parseInt(time % (60 * 60 * 24) % 3600 / 60);
    let sec = parseInt(time % (60 * 60 * 24) % 3600 % 60);
    console.log("12345", hou)

    console.log("日", day, "小时", hou, "分钟", min, "秒", sec)
    // console.log(day + "," + hou + "," + min + "," + sec)
    day = that.timeFormin(day),
      hou = that.timeFormin(hou),
      min = that.timeFormin(min),
      sec = that.timeFormin(sec)
    that.setData({
      day: that.timeFormat(day),
      hou: that.timeFormat(hou),
      min: that.timeFormat(min),
      sec: that.timeFormat(sec)
    })
    // 每1000ms刷新一次
    if (time > 0) {
      that.setData({
        countDown: true
      })
      //  setTimeout(this.countDown, 1000);
      setTimeout(() => {

        this.countTime(reciprocalTime - 1000)
      }, 1000);

    } else {
      var start = that.data.start = false
      var qiangduozhong = that.data.qiangduozhong = true
      that.data.mianfeiyuding = "立即支付"
      // 正计时调用
      that.upTime(-time)
      that.setData({
        qiangduozhong,
        start,
        countDown: false
      })
    }

  },

  // 正计时
  upTime: function (reciprocalTime) {
    var that = this;
    var time = reciprocalTime / 1000 //时间差 
  
    console.log('时间差是多少', reciprocalTime)
    // 获取天、时、分、秒
    let day = parseInt(time / (60 * 60 * 24));
    let hou = parseInt(time % (60 * 60 * 24) / 3600) * day * 24;
    let min = parseInt(time % (60 * 60 * 24) % 3600 / 60);
    let sec = parseInt(time % (60 * 60 * 24) % 3600 % 60);
    console.log("12345", hou)

    console.log("日", day, "小时", hou, "分钟", min, "秒", sec)
    // console.log(day + "," + hou + "," + min + "," + sec)
    day = that.timeFormin(day),
      hou = that.timeFormin(hou),
      min = that.timeFormin(min),
      sec = that.timeFormin(sec)
    that.setData({
      day: that.timeFormat(day),
      hou: that.timeFormat(hou),
      min: that.timeFormat(min),
      sec: that.timeFormat(sec)
    })
    var uptime = that.data.uptime
    // 每1000ms刷新一次
    if (uptime) {
      that.setData({
        countDown: true
      })
      // setTimeout(this.countDown, 1000);
      setTimeout(() => {

        this.upTime(reciprocalTime + 1000)
      }, 1000);

    } else {
        
      that.data.miaoshaEnd = true
      that.setData({
        start,
        countDown: false
      })
    }

  },


  //小于10的格式化函数（2变成02）
  timeFormat(param) {
    return param < 10 ? '0' + param : param;
  },
  //小于0的格式化函数（不会出现负数）
  timeFormin(param) {
    return param < 0 ? 0 : param;
  },


  // 云函数获取当前服务器时间
  // 实时获取数据库数据

  // timejishi: function () {








  //   var that = this
  //   const db = wx.cloud.database()
  //   console.log("实时获取内部执行")
  //   db.collection('time')
  //    .doc("cc9f30fe5fb51d380001b69a6f178353")
  //     .watch({
  //       onChange: function(snapshot) {
  //         console.log('你大爷', snapshot.docs[0].time)
  //       },
  //       onError: function(err) {
  //         console.error('the watch closed because of error', err)
  //       }

  //       },

  //     )
  //   .get().then(res=>{
  //     console.log("你大爷",res)
  //     var targetTime = res.data.datatime
  //     that.daojishi(targetTime)

  //   })
  // },



  // 把已授权的信息放到云数据库
  yudingcloud: function () {
    var openid = this.data.openid
    var that = this
    console.log("检测openid是否取下来", openid)
    const db = wx.cloud.database()
    db.collection("yuding").add({
      data: {
        _id: openid,
        openid: openid
      },
      success: function (res) {
        console.log(res)

      }
    })

  },


  // 判断是否预订成功，预定成功后变UI
  panduanyuding: function () {

  },



  ceshi: function () {
    console.log("测试1")
    wx.cloud.callFunction({
      name: "time",
      data: {


      },
      success(res) {
        console.log("取回来的订阅通知", res)
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
    wx.hideTabBar({})
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