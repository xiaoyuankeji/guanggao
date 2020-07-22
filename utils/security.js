(function () {
  var CryptoJS = require("./crypto-js/crypto-js.js")
  // var config = {
  //   imgCheckUrl: 'https://weiping.me/v1'
  // }

  module.exports = {
    imgSecCheck: imgSecCheck,
  }

  //七牛的鉴黄接口，返回0表示不安全
  function imgCheckReq(imgurl, params) {
    params = signparams(params)
    wx.request({
      url: imgurl + '?qpulp',
      method: "GET",
      data: params,
      header: {
        'content-type': 'application/json', // 默认值
        'cache-control': 'no-store'
      },
      success: function (res) {
        if(res["code"] == 0 && res["result"]["label"] == 0){
          return 0
        }else{
          return 1
        }
      },
      fail: function (res) {
        return 1
      }
    })
  }
})();