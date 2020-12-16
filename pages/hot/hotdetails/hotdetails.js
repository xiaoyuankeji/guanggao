// pages/hot/hotdetails/hotdetails.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    start: true,
    openid: "",
    mianfeiyuding: "免费预定",
    zhifu: false,
    tupian0: "",
    tupian1: '',
    tupian2: '',
    tupian3: '',
    tupian4: '',
    tupian5: '',
    tupian6: '',
    tupian7: '',
    tupian8: '',
    _id :"",
    shoukong:false,
    sikutiaozhuan:''
    

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    // 秒杀商品id
    var _id = options.data
    var openid = options.openid
    this.data._id = _id
    this.data.openid = openid
    var shijiancha = options.shijiancha
    this.miaosha(_id)
    this.countTime(shijiancha)
    this.targetTime()

  },

  zhengpinshuoming:function(){
    wx.navigateTo({
      url: '../../zhengpinshuoming/zhengpinshuoming',
    })
  },


  // 预览图片大图
  yulan: function (e) {
    var that = this
    console.log("图片预览功能", e.currentTarget.dataset.tupian)
    var tupian = e.currentTarget.dataset.tupian

    var tupian0 = this.data.tupian0
    var tupian1 = this.data.tupian1
    var tupian2 = this.data.tupian2
    var tupian3 = this.data.tupian3
    var tupian4 = this.data.tupian4
    var tupian5 = this.data.tupian5
    var tupian6 = this.data.tupian6
    var tupian7 = this.data.tupian7
    var tupianshuzu = []
    if (tupian0) {
      tupianshuzu.push(tupian0)
    }

    if (tupian1) {
      tupianshuzu.push(tupian1)
    }
    if (tupian2) {
      tupianshuzu.push(tupian2)
    }
    if (tupian3) {
      tupianshuzu.push(tupian3)
    }
    if (tupian4) {
      tupianshuzu.push(tupian4)
    }
    if (tupian5) {
      tupianshuzu.push(tupian5)
    }
    if (tupian6) {
      tupianshuzu.push(tupian6)
    }
    if (tupian7) {
      tupianshuzu.push(tupian7)
    }





    wx.previewImage({
      current: tupian, // 当前显示图片的http链接
      urls: tupianshuzu // 需要预览的图片http链接列表
    })

  },



  // 跳转寺库小程序相关页面
  siku: function () {
   var sikutiaozhuan =  this.data.sikutiaozhuan 
    wx.navigateToMiniProgram({
      appId: 'wxf9d093e94ba38998',
      path: sikutiaozhuan,
      extraData: {
        foo: 'bar'
      },
      envVersion: 'release',
      success(res) {
        // 打开成功
        console.log("跳转寺库的反馈", res)
      }
    })

  },





  // 获取秒杀商品数据库数据
  miaosha: function (id) {
    var that = this
    const db = wx.cloud.database()
    db.collection("shangcheng")
      .doc(id)
      .get()
      .then(res => {
        console.log("商城返回数据", res)
        var tupian0 = that.data.tupian0 = res.data.tupian0
        var tupian0Panduan = true
        var tupian1 = that.data.tupian0 = res.data.tupian1
        var tupian1Panduan = true
        var tupian2 = that.data.tupian0 = res.data.tupian2
        var tupian2Panduan = true
        var tupian3 = that.data.tupian0 = res.data.tupian3
        var tupian3Panduan = true
        var tupian4 = that.data.tupian0 = res.data.tupian4
        var tupian4Panduan = true
        var tupian5 = that.data.tupian0 = res.data.tupian5
        var tupian5Panduan = true
        var tupian6 = that.data.tupian0 = res.data.tupian6
        var tupian6Panduan = true
        var tupian7 = that.data.tupian0 = res.data.tupian7
        var tupian7Panduan = true

        var kucun = res.data.kucun
        var sikutiaozhuan = res.data.sikutiaozhuan
        that.data.sikutiaozhuan =sikutiaozhuan

        var jiage = res.data.jiage
        var sikujiage = res.data.sikujiage
        var miaoshu = res.data.miaoshu

        if(kucun == 0 ){
          var shoukong = that.data.shoukong = true
         
          that.setData({
            shoukong
          
          })
        }



        if (tupian0 == undefined) {
          tupian0Panduan = false
        }
        if (tupian1 == undefined) {
          tupian1Panduan = false
        }
        if (tupian2 == undefined) {
          tupian2Panduan = false
        }
        if (tupian3 == undefined) {
          tupian3Panduan = false
        }
        if (tupian4 == undefined) {
          tupian4Panduan = false
        }
        if (tupian5 == undefined) {
          tupian5Panduan = false
        }
        if (tupian6 == undefined) {
          tupian6Panduan = false
        }
        if (tupian7 == undefined) {
          tupian7Panduan = false
        }


        // console.log("盒子",objimage)

        that.setData({
          kucun,
          jiage,
          sikujiage,
          miaoshu,
          tupian0,
          tupian0Panduan,
          tupian1,
          tupian1Panduan,
          tupian2,
          tupian2Panduan,
          tupian3,
          tupian3Panduan,
          tupian4,
          tupian4Panduan,
          tupian5,
          tupian5Panduan,
          tupian6,
          tupian6Panduan,
          tupian7,
          tupian7Panduan

        })



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
        var targetSeconds = targetTime.getSeconds();
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



  // 售空的后
  shoukong:function(){
    wx.showToast({
      title: '已经售空',
      icon:'none'
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
        var mianfeiyuding = that.data.mianfeiyuding = "已预订"

        that.setData({
          mianfeiyuding
        })
      }
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


        // that.timelist(reciprocalTime, currentTime)

      }
    })


  },


  // 把已授权的信息放到云数据库
  yudingcloud: function () {
    var openid = this.data.openid
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





  // 倒计时运算及传参  

  countTime: function (reciprocalTime) {
    var that = this;
    var time = reciprocalTime / 1000 //时间差 
    console.log('时间差是多少', reciprocalTime)

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
      var mianfeiyuding = that.data.mianfeiyuding = "立即支付"
      // 正计时调用
      that.upTime(-time)
      that.setData({
        start,
        countDown: false,
        mianfeiyuding
      })
    }

  },

  // 正计时
  upTime: function (reciprocalTime) {
    var that = this;
    var time = reciprocalTime / 1000 //时间差 
    console.log('正计时时间差是多少', reciprocalTime)
    // 获取天、时、分、秒
    let day = parseInt(time / (60 * 60 * 24));
    let hou = parseInt(time % (60 * 60 * 24) / 3600) * day * 24;
    let min = parseInt(time % (60 * 60 * 24) % 3600 / 60);
    let sec = parseInt(time % (60 * 60 * 24) % 3600 % 60);
    console.log("22222", hou)

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
    
    // console.log("uptime的值",uptime)
    // 每1000ms刷新一次
    if (true) {
      that.setData({
        countDown: true
      })
      //  setTimeout(this.countDown, 1000);
      setTimeout(() => {

        this.upTime(reciprocalTime + 1000)
      }, 1000);

    } else {

      that.data.miaoshaEnd = true
      that.setData({
        
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




//支付提交
paypost() {
  let that = this;
  var _id = that.data._id
  console.log("云函数调动",_id)
  wx.showLoading({
    title: '正在下单',
  });
  // 利用云开发接口，调用云函数发起订单
  wx.cloud.callFunction({
    name: 'pay',
    data: {
      $url: "pay", //云函数路由参数
      goodId: _id
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
  var _id = that.data._id
  //官方标准的支付方法
  wx.requestPayment({
    timeStamp: payData.timeStamp,
    nonceStr: payData.nonceStr,
    package: payData.package,
    signType: 'MD5',
    paySign: payData.paySign,
    success(res) {
      console.log("支付成功", res)
    
      wx.navigateTo({
        url: '../../dizhi/dizhi?shangpin=' +  _id
    
      })
    },
  })
},


// 调用数据库对应商品库存减1


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