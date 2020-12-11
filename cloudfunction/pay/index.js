const config = {
  appid: 'wx3ccd409b7d8886a9', //小程序Appid
  envName: 'guojiawen-h3uw4', // 小程序云开发环境ID
  mchid: '1488009392', //商户号
  partnerKey: 'zxcvbnmasdfghjklqwertyuiop123456', //此处填商户密钥
  notify_url: 'http://test.yuanobao.com/zww/', //支付回调网址,这里可以随意填一个网址
  spbill_create_ip: '127.0.0.1'
};
// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: config.envName
})



const db = cloud.database();
const TcbRouter = require('tcb-router'); //云函数路由
const rq = require('request');
const tenpay = require('tenpay'); //支付核心模块



exports.main = async (event, context) => {
  const app = new TcbRouter({
    event
  });
  //支付回调
  app.router('pay', async (ctx) => {
    const wxContext = cloud.getWXContext();
    // 在云函数参数中，提取商品 ID
    const goodId = event.goodId;
    // 根据商品的数据库_id将其它数据提取出来
    let goods = await db.collection('shangcheng').doc(goodId).get();
    // 在云函数中提取数据，包括名称、价格才更合理安全，
    // 因为从端里传过来的商品数据都是不可靠的
    let good = goods.data;
    let jiage = good.jiage * 100
    let miaoshu = good.miaoshu
    console.log("描述",good)
    const curTime = Date.now();
    const api = tenpay.init(config)
    let result = await api.getPayParams({
      //商户订单号，我这里是定义的book+商品发布时间+当前时间戳
      //微信这里限制订单号一次性不能重复，只需要唯一即可
      out_trade_no: 'book' + good.creat + '' + curTime,
      body: miaoshu, //商品名称，我设置的书名
      total_fee: jiage, //金额，注意是数字，不是字符串
      openid: 'oHWfx0E5OCE3gt_H5zkWh76p8oVc'//***用户的openid
    });
    ctx.body = result; //返回前端结果
  });
  //修改订单状态，以下是支付成功后的其余操作，与配置支付无关
  app.router('change', async (ctx) => {
    try {
      return await db.collection('shangcheng').doc(goodId).update({
        data: {
          status: 1 ////0在售；1买家已付款，但卖家未发货；2买家确认收获，交易完成；3、交易作废，退还买家钱款
        }
      })
    } catch (e) {
      console.error(e)
    }
  });
  return app.serve();
}