// miniprogram/pages/publish/publish.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goods_description: '',
    goods_imgs: [],
    tupian: [],
    user_state: 0,
    pub_type: 1,
    goods_id: 0,
    goods: null,
    formid: '',
    show_success: false,
    notify_num: 1,
    _id: "",
    shouquan: false,
    shenhe:"false",
    userInfo: "",
    uerName: "",
    jiage: '',
    avatarUrl: "",
    gender: "",
    province: "",
    country: "",
    huancun1:0,
    huancun2:1,
    show:false,
    videojudge:false




  },

  // 返回按钮
  back:function(){
    this.setData({
      goods_imgs : [],
      goods_description:"",
      jiage:'',
      videojudge:false
    })
    wx.switchTab({
      url: '../shouye/shouye',
      success:function(res){


        var page = getCurrentPages().pop();
        if(page == undefined || page == null)return;
        page.onLoad();
      }
    },)
  },

  // 缓存清除
  huancunfangfa:function(){
    var huancun1  = this.data.huancun1
    huancun1 ++
    this.setData({
      huancun:huancun1
    })
  },



  bindKeyInput:function(e){
    console.log("填写的价格",e.detail.value)
    var  jiage = e.detail.value
    this.setData({
      jiage : e.detail.value
    
    })
  },

  shenhedata:function(){
    var openid =  this.data._id
    var shenhe = this.data.shenhe





    var hege  = "oHWfx0E5OCE3gt_H5zkWh76p8oVc"
    var hege1 = "oHWfx0GbfQYX4dsopEzN-hkCscSM"
    console.log("审核获取到openid了吗",openid)
    if(openid == hege || openid == hege1 ){
      this.setData({
        shenhe:"TRUE"
      })
     
    }
  },



  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // wx.hideTabBar({})
    
    var that = this

    // 获取openid
    wx.cloud.callFunction({
      // 云函数名称
      name: 'login',
      // 传给云函数的参数
      data: {

      },
      success: function (res) {
        console.log(res.result.openid)
        var openid = res.result.openid
        that.data._id = openid
        that.uershuju(openid)
        that.uerData()
        //判断是否授权
        // wx.getSetting({
        //   success(res) {
        //     if (!res.authSetting["scope.userInfo"]) {

        //       var shouquan = that.data.shouquan = true
        //       console.log("没有运行到这里吗")
        //       that.uerData();


        //     }
        //   }
        // })


      },
      fail: console.error

    })









  },





  //文字描述
  onDescribeChange: function (e) {


    // var that = this
    // console.log(e.detail.value)
    this.data.goods_description = e.detail.value
    // console.log("看看传值了吗",that.data.goods_description)
  },

  // 查询用户数据库信息
  uershuju:function(openid){
    console.log("444444")
    var  that =  this
    // var  openid = that.data._id
    console.log("xxxxid",openid)
    const db = wx.cloud.database()
    db.collection("uerdata").where({
      openid : openid
    }).get({
      success:function(res){
        console.log("调取用户库头像成功",res)
        

        that.setData({
          uerName:res.data[0].nickName,
          avatarUrl:res.data[0].avatarUrl,
          gender:res.data[0].gender,
          country:res.data[0].country,
          shenhe:res.data[0].shenhe
        })
      }
    })
  },

 

  // 上传用户信息到data
  uerData: function () {
    var that = this
    // 掉审核函数

    


    this.shenhedata()
    console.log("运行到获取用户权限")
    wx.getSetting({
      success(res) {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          wx.getUserInfo({
            success: function (res) {
              var userInfo = res.userInfo
              

              var uerName = that.data.uerName 
              var avatarUrl = that.data.avatarUrl 
              var gender = that.data.gender = userInfo.gender //性别 0：未知、1：男、2：女
              var province = that.data.province = userInfo.province
              var country = that.data.country = userInfo.country
              console.log(country)
            }
          })
        }
      }
    })
  },

  //传image生成的IP地址
  onAddImg: function () {
    
   this.setData({
     show:true
   })


  
  },

  //传video生成的IP地址

  onVideo:function(){
    
    var that = this
    
    wx.chooseVideo({
      sourceType: ['album','camera'],
      maxDuration: 60,
      camera: 'back',
      success(res) {
        console.log(res.tempFilePath)
        var abc = res.tempFilePath
        var time = new Date().getTime();
        var openid = that.data._id
        var videoname = time + openid +'.mp4'
        let count = 9 - that.data.goods_imgs.length
        wx.cloud.uploadFile({
          cloudPath: videoname, // 上传至云端的路径
          filePath: abc, // 小程序临时文件路径
          success: res => {
            // 返回文件 ID
            that.data.goods_imgs.unshift(res.fileID)
            var mp4 = that.data.goods_imgs
            console.log("MP4的值",mp4)
            that.setData({
              
              goods_imgs: mp4,
              show:false,
              videojudge:true
            })
            console.log("上传视频成功",res.fileID)


          },
          fail: console.error
        })
        



        that.setData({
          abc:abc
        })
      }
    })
  },


  // 上传到储存
  




 //传image生成的IP地址
onImgIp:function(){

  var that = this
  let count = 9 - this.data.goods_imgs.length
  wx.chooseImage({
    count: count,
    success: function (res) {
      that.setData({
        goods_imgs: that.data.goods_imgs.concat(res.tempFilePaths),
        show:false
      })
    }
  })

},










  //封装变量并上传至数据库
  uploudOpenidlist: function (time) {
    var that = this

    this.uershuju()

    console.log("获取授权弹框")
    var openid = this.data._id
    var shenhe = this.data.shenhe
    var uerName = this.data.uerName
    var touxiang = this.data.avatarUrl
    var gender = this.data.gender
    var province = this.data.province
    var country = this.data.country
    var miaoshu = this.data.goods_description
    var tupian0 = this.data.tupian[0]
    var tupian1 = this.data.tupian[1]
    var tupian2 = this.data.tupian[2]
    var tupian3 = this.data.tupian[3]
    var tupian4 = this.data.tupian[4]
    var tupian5 = this.data.tupian[5]
    var tupian6 = this.data.tupian[6]
    var tupian7 = this.data.tupian[7]
    var tupian8 = this.data.tupian[8]


    var obj = {
      openid,
      shenhe,
      uerName,
      touxiang,
      touxiang,
      gender,
      province,
      country,
      miaoshu,
      tupian0,
      tupian1,
      tupian2,
      tupian3,
      tupian4,
      tupian5,
      tupian6,
      tupian7,
      tupian8,
      time
    }

    console.log("是否运行到obj这里" , obj)

  

    // 上传数据库
    const db = wx.cloud.database();
    db.collection('shechipinlist').add({
      // data 字段表示需新增的 JSON 数据
      data: obj,
      success: function(res) {
        
    

        console.log("成功上传至数据库",res)
        that.setData({
          goods_imgs : [],
          goods_description:"",
          jiage:'',
          videojudge:false
        })
        wx.switchTab({
          url: '../shouye/shouye',
          success:function(res){

        
              wx.showToast({
                title: '提交审核成功',
                icon:"waiting",
                duration: 2000,
                
              })
            var page = getCurrentPages().pop();
            
            if(page == undefined || page == null)return;
            page.shenhe();
            // page.onLoad();
            
          }
        },4000)
      }
    })



  },


// 上传内容弹框

// 上传视频


// 上传图片


// 取消
quxiao:function(){
  this.setData({
    show:false
  })
},







  //点击上传按钮事件
  formSubmit: function () {
    var that = this
    console.log("程序走到这里了")
    var imageLength = this.data.goods_imgs.length
   
    wx.getSetting({
      success(res) {
        if (!res.authSetting["scope.userInfo"]) {

          var shouquan = that.data.shouquan = true
          that.uerData(shouquan);

          wx.authorize({
            scope: 'scope.userInfo',
            success () {
              // 用户已经同意小程序使用录音功能，后续调用 wx.startRecord 接口不会弹窗询问
              wx.startRecord()
            }
          })
        }
      }
    })
 
    wx.showLoading({
      title: '上传中',
    },2000)


    // 获取图片总长度
    
    for (var i = 0; i < imageLength; i++) {

      (function(){
        that.uploadData(i,imageLength)

      }(i),2000)
  

     
    }
  },


  //最终上传至云储存空间
  uploadData: function (i, imageLength) {
    console.log("数据i的值", i)
    console.log("imageLengthd的值", imageLength)
    var that = this
    var openid = this.data._id
    var uerName = this.data.uerName
    var touxiang = this.data.avatarUrl
    var miaoshu = this.data.miaoshu
    var tupian = this.data.tupian
    var cloudpath
    var j = i + 1
    
    console.log(i, imageLength)
    //获取原始时间戳，是计算机元年时间
    var time = new Date().getTime();
    console.log("时间", time)
    var imagePath = this.data.goods_imgs[i]
    console.log("imagePath的值", imagePath)
   
    if(imagePath.indexOf("mp4")>=0){

       console.log('是mp4的')
       
       if (j == imageLength) {
        // 如果i等于图片长度时循环完毕，并实现最受一次上传云储存库
        console.log("最后一次循环并跳出")
        that.setData({
          tupian: that.data.tupian.concat(imagePath)

        })
        that.uploudOpenidlist(time)

        //准备启动上传数据库的方法
      } else {
        console.log("循环中")
        that.setData({
          tupian: that.data.tupian.concat(imagePath)
        })


      }
      
    
    }else{
      console.log("不是mp4")
       cloudpath = openid + time +i + ".png"
      
    }
     
 
    
    console.log("cloudpath的值",cloudpath)
    
    wx.cloud.uploadFile({
      cloudPath: cloudpath, // 上传至云端的路径,命名
      filePath: imagePath, // 小程序临时文件路径，所上传的文件命
      success: res => {
          
        // 返回文件 ID
        
        console.log("是否有返回值", res.fileID)
        console.log("j的值 ",j,"imageLength的值",imageLength)
        if (j == imageLength) {
          // 如果i等于图片长度时循环完毕，并实现最受一次上传云储存库
          console.log("最后一次循环并跳出")
          that.setData({
            tupian: that.data.tupian.concat(res.fileID)

          })
          that.uploudOpenidlist(time)

          //准备启动上传数据库的方法
        } else {
          console.log("循环中")
          that.setData({
            tupian: that.data.tupian.concat(res.fileID)
          })


        }
      },
      fail: console.error
    },1000)

  },




  inputText: function (value) {
    console.log(value.detail.value)
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
    // wx.hideTabBar({})

    
    
    
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