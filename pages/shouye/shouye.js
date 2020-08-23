// miniprogram/pages/shouye/shouye.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    value: '',
    obj:[],
    leftRight:false,
    videoJudge:false,
    page:0,
    listnuber:0
  
    

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showTabBar({})
    this.data.obj = []

    wx.showToast({

      title: '加载中',      
      icon: 'loading'
      
      });
    this.dataList()
    
  },


// 跳转微信圈子功能
shanghai:function(){
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
beijing:function(){
  console.log("点击1实验按钮")
  wx.navigateToMiniProgram({
    appId: 'wxb036cafe2994d7d0',
    path: '/portal/group-profile/group-profile?group_id=13104375380757129&invite_ticket=BgAAQLuSVWP9ZjgxACSErPLM0Q&fromScene=bizArticle',
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









  // 跳转详情页
  tiaozhuan:function(e){
    //获取前端传来的值
    console.log(e.currentTarget.dataset['index'])
    var obj = e.currentTarget.dataset['index']
    wx.navigateTo({
      url: '../xiangqingye/xiangqingye?data='+ obj,
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


  shenhe:function(){
    wx.showTabBar({})
    wx.showToast({
      title: '审核中',
      icon:"waiting",
      duration: 2000,
      
    })
  },


  //调用云函数返回云数据库数据
  dataList: function () {
    
    var that = this
   
    var listnuber = this.data.listnuber + this.data.page*20
    var value = this.data.value
    
    // console.log("搜所值",value)
    for (var i = 0 ; i <=19;i++){
      
      // console.log("内部数字",i)
      that.shujulist(i,listnuber,value)

    }
  },

  //传入for循环i后的查询数据库数据
  shujulist:function(i,listnuber,value){
    const db = wx.cloud.database();
    
    // console.log(i)
    db.collection('shechipinlist')
      .skip(listnuber)
      .where({
        shenhe: 'TRUE',
        })
        .orderBy("time",'desc')
        // .orderBy("_id","desc")
        .get().then(res => {

      console.log("i的值",res.data[i])
      var _id = res.data[i]._id
      
      var miaoshu  = res.data[i].miaoshu
      var touxiang = res.data[i].touxiang
      var uerName  = res.data[i].uerName
      var abc = res.data[i].tupian0
      var leftRight = this.data.leftRight
      var videoJudge = this.data.videoJudge
      if(i%2==0){
        leftRight = true
      }

      if(abc.indexOf("mp4") !== -1){
        videoJudge = true
      }

      var obj = {
        _id,
        miaoshu,
        touxiang,
        uerName,
        abc,
        
        leftRight,
        videoJudge
      }
      //调用获取宽高
      // this.heightWidth(_id,miaoshu,touxiang,uerName,abc,leftRight,videoJudge);

      this.setdataobj(obj)
      
      //

    },)
  },


  //获取图片高度，宽度
   heightWidth:function(_id,miaoshu,touxiang,uerName,abc,leftRight,videoJudge){
    //  console.log("ID",_id,"描述",miaoshu,"头像",touxiang,"封面图",abc)
     wx.getImageInfo({
       src: abc,
       
     }).then(res=>{
       var height = res.height
       var width = res.width
       var obj = {
         _id,
         miaoshu,
         touxiang,
         uerName,
         abc,
         height,
         width,
         leftRight,
         videoJudge
       }
      //  console.log("综合数据",obj)
       this.setdataobj(obj)
     })
   },

   // 把数据压到前端
   setdataobj:function(abc){
     var obj = this.data.obj
    this.setData({
      obj: this.data.obj.concat(abc)
    })
   },


  //填入搜索框的数据
  onChange(e) {
    this.setData({
      value: e.detail,
      
    });
    
    

  },
  //搜索框点确定按钮数据（键盘自带的）
  onSearch(value) {
    console.log(value)
    
    this.data.obj = []
    this.data.page =  0
    wx.showToast({

      title: '加载中',      
      icon: 'loading'
      
      });
    this.dataList()
    wx.stopPullDownRefresh()
    
  },
  //点击右侧搜索按钮后调用
  onClick(value) {
    this.data.searchData  = this.data.searchData + value
    this.data.obj = []
    this.data.page =  0
    wx.showToast({

      title: '加载中',      
      icon: 'loading'
      
      });
    this.dataList()
    wx.stopPullDownRefresh()
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
   
    this.data.page++
    this.data.obj = []
    wx.showToast({

      title: '加载中',      
      icon: 'loading'
      
      });
    this.dataList()
    wx.stopPullDownRefresh()

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.data.page++
    wx.showToast({

      title: '加载中',      
      icon: 'loading'
      
      });
    this.dataList()

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})