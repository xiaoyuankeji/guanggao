(function () {
  var CryptoJS = require("./crypto-js.js")
  const regeneratorRuntime = require('./regenerator-runtime/runtime.js')
  var config = {
    // networkUrl: 'http://localhost:31460/v1'
    // networkUrl: 'https://maishou.weiping.me/v1'
    networkUrl: 'https://shechipin.1401studio.com/v1'
  }

  module.exports = {
    searchImage: searchImage,
    uploadFile: uploadFile,
    login: login,
    updateUserInfo: updateUserInfo,
    checkToken: checkToken,
    register: register,
    submitRefer: submitRefer,
    goodsUpToken: goodsUpToken,
    goodsPreUpload: goodsPreUpload,
    addGoods: addGoods,
    getGoods: getGoods,
    updateGoodsImg: updateGoodsImg,
    getGoodsItem: getGoodsItem,
    followOther: followOther,
    checkFollow: checkFollow,
    getUserGoodsList: getUserGoodsList,
    getComments: getComments,
    getFollows: getFollows,
    getRefers: getRefers,
    getReferBonus: getReferBonus,
    prepayForQuick: prepayForQuick,
    getGoodsPublisherInfo: getGoodsPublisherInfo,
    prepayForVIP: prepayForVIP,
    refreshGoods: refreshGoods,
    getUserGoodsListCount: getUserGoodsListCount,
    getCommentsCount: getCommentsCount,
    getFollowsCount: getFollowsCount,
    getFansCount: getFansCount,
    addHelp: addHelp,
    getUserHelps: getUserHelps,
    getUserHelpCount: getUserHelpCount,
    getVipInfo: getVipInfo,
    getFollowGoodsList: getFollowGoodsList,
    getOneUserGoods: getOneUserGoods,
    searchGoods: searchGoods,
    updateGoods: updateGoods,
    upGoods: upGoods,
    downGoods: downGoods,
    getNewFollowGoodsCount: getNewFollowGoodsCount,
    getNewCommentsCount: getNewCommentsCount,
    getNewFansCount: getNewFansCount,
    checkFollowStatus: checkFollowStatus,
    addComment: addComment,
    getReferParam: getReferParam,
    getVipParam: getVipParam,
    getQuickParam: getQuickParam,
    getUserFindsList: getUserFindsList,
    getUserFindsListCount: getUserFindsListCount,
    soldoutGoods: soldoutGoods,
    getUserGoodsSoldCount: getUserGoodsSoldCount,
    getStatData: getStatData,
    updateFirstLogin: updateFirstLogin,
    updateIsAuth: updateIsAuth,
    registerPhone: registerPhone,
    registerWechat: registerWechat,
    registerSms: registerSms,
  }

  function signparams(params){
    var app = getApp()
    //console.log(app)
    if(app == undefined){
      return params;
    }
    var token = app.globalData.token
    if (token == undefined){
      return params;
    }
    params["userid"] = app.globalData.userid
    params["tokenid"] = app.globalData.tokenid
    var timestamp = new Date().getTime()
    params["timestamp"] = timestamp
    var keys = new Array();
    for (var key in params) {
      keys.push(key);
    }
    
    keys.sort(function (a, b) {
      if(a < b){
        return -1;
      }else if (a == b){
        return 0;
      }else{
        return 1;
      }
    });

    
    var param = ""
    for (var index in keys) {
      var key = keys[index];
      if(index == keys.length - 1){
        param += key + "=" + params[key]
      }else{
        param += key + "=" + params[key] + "&"
      }
    }
    var signature = CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(CryptoJS.HmacSHA1(param, token).toString()));
    params["signature"] = signature
    
    return params;
  }

  function networkReq(url, params, success, fail) {
    params = signparams(params)
    wx.request({
      url: url,
      method: "POST",
      data: params,
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success: function (res) {
        success(res)
      },
      fail: function (res) {
        fail(res)
      }
    })
  }

  function searchImage(filapath, params, success, fail) {
    params = signparams(params)
    wx.uploadFile({
      url: config.networkUrl + '/search/add_img_mini',
      filePath: filapath,
      name: 'search_img',
      formData: params,
      success: function (res) {
        success(res)
      },
      fail: function (res) {
        fail(res)
      }
    })
  }

  function uploadFile(fileKey, filePath){
    return new Promise((resolve, reject) => {
      console.log(`upload file filekey: ${fileKey}, filePath: ${filePath}`)
      var params = new Array()
      params = signparams(params)
      wx.uploadFile({
        url: config.networkUrl + '/goods/upload_img_to_ali',
        filePath: filePath,
        name: fileKey,
        formData: params,
        success: function (res) {
          console.log(res.data)
          try{
            let result = JSON.parse(res.data);
            if (result.ResultCode == 0) {
              console.log('result 0')
              resolve()
            } else {
              console.log(`result ${result}`)
              reject()
            }
          }catch(e){
            reject()
          }
        },
        fail: function (res) {
          console.log("upload file error")
          reject()
        }
      })
    })
    
  }
  
  function checkToken(params, success, fail){
    networkReq(config.networkUrl + "/user/checktoken", params, success, fail)
  }

  function login(params, success, fail){
    networkReq(config.networkUrl + "/minipro/login", params, success, fail)
  }

  function updateUserInfo(params, success, fail){
    networkReq(config.networkUrl + "/minipro/updateinfo", params, success, fail)
  }

  function register(params, success, fail) {
    networkReq(config.networkUrl + "/user/register", params, success, fail)
  }

  function registerSms(params, success, fail) {
    networkReq(config.networkUrl + "/user/register_sms", params, success, fail)
  }

  function registerPhone(params, success, fail) {
    networkReq(config.networkUrl + "/user/register_phone", params, success, fail)
  }

  function registerWechat(params, success, fail) {
    networkReq(config.networkUrl + "/user/register_wx", params, success, fail)
  }

  function submitRefer(params, success, fail) {
    networkReq(config.networkUrl + "/user/refer", params, success, fail)
  }

  function goodsUpToken(params, success, fail) {
    networkReq(config.networkUrl + "/goods/uptoken", params, success, fail)
  }

  function goodsPreUpload(params, success, fail) {
    networkReq(config.networkUrl + "/goods/pre_upload_img", params, success, fail)
  }

  function addGoods(params, success, fail) {
    networkReq(config.networkUrl + "/goods/add_goods", params, success, fail)
  }

  function getGoods(params, success, fail) {
    networkReq(config.networkUrl + "/goods/query_goods", params, success, fail)
  }

  function updateGoodsImg(params, success, fail) {
    networkReq(config.networkUrl + "/goods/update_img", params, success, fail)
  }

  function getGoodsItem(params, success, fail) {
    networkReq(config.networkUrl + "/goods/query_goods_item", params, success, fail)
  }

  function followOther(params, success, fail) {
    networkReq(config.networkUrl + "/follow/add_follow", params, success, fail)
  }

  function checkFollow(params, success, fail) {
    networkReq(config.networkUrl + "/follow/check_follow", params, success, fail)
  }

  function getUserGoodsList(params, success, fail) {
    networkReq(config.networkUrl + "/goods/user_list", params, success, fail)
  }

  function getUserGoodsListCount(params, success, fail) {
    networkReq(config.networkUrl + "/goods/user_list_count", params, success, fail)
  }

  function getUserGoodsSoldCount(params, success, fail) {
    networkReq(config.networkUrl + "/goods/user_sold_count", params, success, fail)
  }

  function getUserFindsList(params, success, fail) {
    networkReq(config.networkUrl + "/goods/user_finds", params, success, fail)
  }

  function getUserFindsListCount(params, success, fail) {
    networkReq(config.networkUrl + "/goods/user_finds_count", params, success, fail)
  }

  function getComments(params, success, fail) {
    networkReq(config.networkUrl + "/comment/query_comment", params, success, fail)
  }

  function getCommentsCount(params, success, fail) {
    networkReq(config.networkUrl + "/comment/query_comment_count", params, success, fail)
  }

  function getFollows(params, success, fail) {
    networkReq(config.networkUrl + "/follow/query_follow", params, success, fail)
  }

  function getFollowsCount(params, success, fail) {
    networkReq(config.networkUrl + "/follow/query_follow_count", params, success, fail)
  }

  function getFans(params, success, fail) {
    networkReq(config.networkUrl + "/follow/query_fans", params, success, fail)
  }

  function getFansCount(params, success, fail) {
    networkReq(config.networkUrl + "/follow/query_fans_count", params, success, fail)
  }

  function getRefers(params, success, fail) {
    networkReq(config.networkUrl + "/refer/query_refer", params, success, fail)
  }

  function getReferBonus(params, success, fail) {
    networkReq(config.networkUrl + "/refer/get_bonus", params, success, fail)
  }

  function prepayForQuick(params, success, fail) {
    networkReq(config.networkUrl + "/pay/pay_quick", params, success, fail)
  }

  function getGoodsPublisherInfo(params, success, fail) {
    networkReq(config.networkUrl + "/goods/pub_user_info", params, success, fail)
  }

  function prepayForVIP(params, success, fail) {
    networkReq(config.networkUrl + "/pay/pay_vip", params, success, fail)
  }

  function refreshGoods(params, success, fail) {
    networkReq(config.networkUrl + "/goods/refresh", params, success, fail)
  }

  function addHelp(params, success, fail) {
    networkReq(config.networkUrl + "/help/add_help", params, success, fail)
  }

  function getUserHelps(params, success, fail) {
    networkReq(config.networkUrl + "/help/query_help", params, success, fail)
  }

  function getUserHelpCount(params, success, fail) {
    networkReq(config.networkUrl + "/help/query_help_count", params, success, fail)
  }

  function getVipInfo(params, success, fail){
    networkReq(config.networkUrl + "/user/vip_info", params, success, fail)
  }

  function getFollowGoodsList(params, success, fail) {
    networkReq(config.networkUrl + "/goods/query_follow_goods", params, success, fail)
  }

  function getNewCommentsCount(params, success, fail) {
    networkReq(config.networkUrl + "/comment/new_comments_count", params, success, fail)
  }

  function getNewFansCount(params, success, fail) {
    networkReq(config.networkUrl + "/follow/new_fans_count", params, success, fail)
  }

  function getNewFollowGoodsCount(params, success, fail) {
    networkReq(config.networkUrl + "/goods/new_follow_goods_count", params, success, fail)
  }

  function getOneUserGoods(params, success, fail) {
    networkReq(config.networkUrl + "/goods/query_user_goods", params, success, fail)
  }

  function searchGoods(params, success, fail) {
    networkReq(config.networkUrl + "/goods/search_goods", params, success, fail)
  }

  function updateGoods(params, success, fail) {
    networkReq(config.networkUrl + "/goods/update_goods", params, success, fail)
  }

  function upGoods(params, success, fail) {
    networkReq(config.networkUrl + "/goods/up_goods", params, success, fail)
  }

  function downGoods(params, success, fail) {
    networkReq(config.networkUrl + "/goods/down_goods", params, success, fail)
  }

  function checkFollowStatus(params, success, fail) {
    networkReq(config.networkUrl + "/follow/check_status", params, success, fail)
  }

  function addComment(params, success, fail) {
    networkReq(config.networkUrl + "/comment/add_comment", params, success, fail)
  }

  function getReferParam(params, success, fail) {
    networkReq(config.networkUrl + "/refer/param", params, success, fail)
  }

  function getVipParam(params, success, fail) {
    networkReq(config.networkUrl + "/param/vip_fee", params, success, fail)
  }

  function getQuickParam(params, success, fail) {
    networkReq(config.networkUrl + "/param/quick_fee", params, success, fail)
  }

  function soldoutGoods(params, success, fail) {
    networkReq(config.networkUrl + "/goods/sold_out", params, success, fail)
  }

  function getStatData(params, success, fail) {
    networkReq(config.networkUrl + "/data/today_stat", params, success, fail)
  }

  function updateFirstLogin(params, success, fail) {
    networkReq(config.networkUrl + "/user/update_first_login", params, success, fail)
  }

  function updateIsAuth(params, success, fail) {
    networkReq(config.networkUrl + "/user/update_is_auth", params, success, fail)
  }

})();