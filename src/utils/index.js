import { placesmap } from "./placesmap"

export default {
  // 补0方法
  formatZero(num, len) {
    if (String(num).length > len) return num
    return (Array(len).join(0) + num).slice(-len)
  },
  // localStorage存储
  setStore(name, content) {
    let contentClone = content
    if (!name) return
    if (typeof content !== 'string') {
      contentClone = JSON.stringify(contentClone)
    }
    window.localStorage.setItem(name, contentClone)
  },
  // localStorage获取
  getStore(name) {
    if (!name) return null
    return window.localStorage.getItem(name)
  },
  // localStorage删除
  removeStore(name) {
    if (!name) return
    window.localStorage.removeItem(name)
  },
  // 日期格式化
  dateFormat(str, type) {
    let date = new Date(str)
    let year = date.getFullYear()
    let month = this.formatZero(date.getMonth() + 1, 2)
    let day = this.formatZero(date.getDate(), 2)
    let hour = this.formatZero(date.getHours(), 2)
    let minute = this.formatZero(date.getMinutes(), 2)
    let seconds = this.formatZero(date.getSeconds(), 2)
    if (type == 'YYYY-MM-DD') {
      return `${year}-${month}-${day}`
    } else if (type == 'YYYY-MM-DD HH:MM:SS') {
      return `${year}-${month}-${day} ${hour}:${minute}:${seconds}`
    } else if (type == 'MM/DD  HH:MM:SS') {
      return `${month}/${day} ${hour}:${minute}:${seconds}`
    }
  },
  // 获取当前时间前后N天前后日期
  getDateBefore(dayCount) {
    var date = new Date()
    date.setDate(date.getDate() + dayCount)
    let year = date.getFullYear()
    let month = this.formatZero(date.getMonth() + 1, 2)
    let day = this.formatZero(date.getDate(), 2)
    return `${year}-${month}-${day}`
  },
  /**
   * 数字转整数 如 100000 转为10万
   * @param {需要转化的数} num
   * @param {需要保留的小数位数} point
   */
  tranNumber(num, point) {
    let numStr = num.toString()
    // 十万以内直接返回
    if (numStr.length < 6) {
      return numStr
    }
    //大于8位数是亿
    else if (numStr.length > 8) {
      let decimal = numStr.substring(
        numStr.length - 8,
        numStr.length - 8 + point
      )
      return parseFloat(parseInt(num / 100000000) + '.' + decimal) + '亿'
    }
    //大于6位数是十万 (以10W分割 10W以下全部显示)
    else if (numStr.length > 5) {
      let decimal = numStr.substring(
        numStr.length - 4,
        numStr.length - 4 + point
      )
      return parseFloat(parseInt(num / 10000) + '.' + decimal) + '万'
    }
  },
  // 格式化时间毫秒转分秒
  formatTime(time) {
    // 取整
    time = ~~time
    var formatTime
    if (time < 10) {
      formatTime = '00:0' + time
    } else if (time < 60) {
      formatTime = '00:' + time
    } else {
      var m = ~~parseInt((time % (1000 * 60 * 60)) / (1000 * 60))
      if (m < 10) {
        m = '0' + m
      }
      var s = ~~parseInt((time % (1000 * 60)) / 1000)
      if (s < 10) {
        s = '0' + s
      }
      formatTime = m + ':' + s
    }
    return formatTime
  },
  // 转换成秒
  formatSecond(time) {
    // 取整
    time = ~~time
    var secondTime
    if (time < 10) {
      secondTime = '00:0' + time
    } else if (time < 60) {
      secondTime = '00:' + time
    } else {
      var m = ~~parseInt((time % (1000 * 60 * 60)) / (1000 * 60))
      var s = ~~parseInt((time % (1000 * 60)) / 1000)
      secondTime = Number(m * 60 + s)
    }
    return secondTime
  },
  // 秒转00:00
  formatSecondTime(interval) {
    interval = interval | 0
    const m = (interval / 60) | 0
    const s = interval % 60
    return `${this.formatZero(m, 2)}:${this.formatZero(s, 2)}`
  },
  // 时间戳转换成几分钟前，几小时前，几天前
  formatMsgTime(dateTimeStamp) {
    var result = ''
    var minute = 1000 * 60
    var hour = minute * 60
    var day = hour * 24
    var month = day * 30
    var now = new Date().getTime()
    var diffValue = now - dateTimeStamp
    if (diffValue < 0) return
    var monthC = diffValue / month
    var weekC = diffValue / (7 * day)
    var dayC = diffValue / day
    var hourC = diffValue / hour
    var minC = diffValue / minute
    if (monthC >= 1) {
      result = '' + parseInt(monthC) + '月前'
    } else if (weekC >= 1) {
      result = '' + parseInt(weekC) + '周前'
    } else if (dayC >= 1) {
      result = '' + parseInt(dayC) + '天前'
    } else if (hourC >= 1) {
      result = '' + parseInt(hourC) + '小时前'
    } else if (minC >= 1) {
      result = '' + parseInt(minC) + '分钟前'
    } else {
      result = '刚刚'
    }
    return result
  },
  // 字符串 00:00 转秒
  strConvertSecond(str) {
    const items = str.split(":")
    const mimuteOfSecond = Number(items[0]) * 60;
    const seconds = Number(items[1]);
    return mimuteOfSecond + seconds;

  },
  // 获取是几几后
  getAstro(timestamp) {
    function getGeneration(year) {
      let generation;
      if (year >= 2000) {
        generation = "00 后";
      } else if (year >= 1990) {
        generation = "90 后";
      } else if (year >= 1980) {
        generation = "80 后";
      } else if (year >= 1970) {
        generation = "70 后";
      } else if (year >= 1960) {
        generation = "60 后";
      } else if (year >= 1950) {
        generation = "50 后";
      } else {
        generation = "更早之前";
      }
      return generation;
    }

    function getZodiac(month, day) {
      const zodiacs = [
        "摩羯", "水瓶", "双鱼", "白羊", "金牛", "双子",
        "巨蟹", "狮子", "处女", "天秤", "天蝎", "射手"
      ];
      const offsets = [
        19, 18, 20, 19, 20, 21,
        22, 23, 22, 23, 22, 21
      ];
      const index = month - 1;
      const offset = offsets[index];
      const zodiacIndex = day < offset ? index : (index + 1) % 12;
      return zodiacs[zodiacIndex];
    }


    const date = new Date(timestamp);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const generation = getGeneration(year);
    const zodiac = getZodiac(month, day);
    return `${generation}，${zodiac}座`;
  },
  // 数组随机
  shuffle(arr) {
    let _arr = arr.slice()
    for (let i = 0; i < _arr.length; i++) {
      let j = this.getRandomInt(0, i)
      let t = _arr[i]
      _arr[i] = _arr[j]
      _arr[j] = t
    }
    return _arr
  },
  getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
  },

  // 行政代码转地区
  getCityText(code) {
    return placesmap[code]
  },

  //歌手数组专字符串
  tranNameListToString(list) {
    let str = "";

    for (let i = 0; i < list.length; i++) {
      str += `${list[i].name} / `
    }

    return str.slice(0, str.length - 3);
  }
}
