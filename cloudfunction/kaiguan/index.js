const cloud = require('wx-server-sdk')
exports.main = (event, context) => {

  let video ="cloud://guojiawen-h3uw4.6775-guojiawen-h3uw4-1302038499/shipin1.mp4"
  let sum = "cloud://guojiawen-h3uw4.6775-guojiawen-h3uw4-1302038499/2.png"

  return {
    video,
    sum
    
  }
}