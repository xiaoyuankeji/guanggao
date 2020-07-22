const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [month, day].map(formatNumber).join('-') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatDateTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('-')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

const parseDateStr = dateStr => {
  var strtime = dateStr;
  var date = new Date(strtime);
  // 可以这样做
  //var date = new Date(strtime.replace(/-/g, '/'));

  // 有三种方式获取，在后面会讲到三种方式的区别
  // time1 = date.getTime();
  // time2 = date.valueOf();
  // time3 = Date.parse(date);
  return date
}

const countdown = (count, callback, finish) => {
  if (count == 0) {
    finish()
    return;
  }

  callback()

  setTimeout(function () {
    count--;
    countdown(count, callback, finish);
  }, 1000);
}

const networkUrl = 'https://weiping.dboy.org.cn/v1'
//const networkUrl = 'http://localhost:6969/v1'

const miniappid = 'wx57c842b75117c829'
//const minisecret = '02bc9b101f79ce9039f77dfef32359a8'

module.exports = {
  formatTime: formatTime,
  formatDateTime: formatDateTime,
  parseDateStr: parseDateStr,
  networkUrl: networkUrl,
  miniappid: miniappid,
  countdown: countdown,
}