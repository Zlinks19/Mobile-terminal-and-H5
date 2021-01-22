
import md5 from 'js-md5'
//========================sessionStorage=====================================
//储存数据
function setSessData(key, obj) {
  if (typeof obj === "object") {
    obj = JSON.stringify(obj); //json对象,stringify()将obj转换为string类型
  }
  sessionStorage.setItem(key, obj); //localStorage只能存储字符串类型，所以就必须转为string.
};
//获取存储的数据
function getSessData(key) {
  let data;
  try {
    var obj = sessionStorage.getItem(key); //获取存储数据
    data = JSON.parse(obj); //将OBJ转为JSON
  } catch (event) {
    data = obj;
  }
  return data;
};
//删除指定的存储
function delSessData(key) {
  sessionStorage.removeItem(key);
};

//========================localStorage===================================
//储存数据
function setLocaData(key, obj) {
  if (typeof obj === "object") {
    obj = JSON.stringify(obj); //json对象,stringify()将obj转换为string类型
  }
  localStorage.setItem(key, obj); //localStorage只能存储字符串类型，所以就必须转为string.
};

//获取存储的数据
function getLocaData(key) {
  let data;
  try {
    var obj = localStorage.getItem(key); //获取存储数据
    data = JSON.parse(obj); //将OBJ转为JSON
  } catch (event) {
    data = obj;
  }
  return data;
};

//删除指定的存储
function delLocaData(key) {
  localStorage.removeItem(key);
};

// 隐藏手机中间四位
function hidePhone(phone) {
  if (phone) {
    phone = phone.toString();
    let a = phone.substring(0, 3);
    let b = phone.substring(phone.length - 4, phone.length);
    let newPhone = a + "****" + b
    return newPhone
  } else {
    return "暂无数据"
  }
};

// 隐藏姓名
function hideName(name) {
  if (name) {
    name = name.toString();
    var firstName = name.substring(0, 1);
    var lastName = "";
    for (var i = 0; i < name.length - 1; i++) {
      lastName += '*';
    }
    let newName = firstName + lastName;
    return newName
  } else {
    return "暂无数据"
  }
};

//显示第一个和最后一个数字
function showFirstLast(code) {
  var firstCode = code.substring(0, 1);
  var middleCode = "";
  for (var i = 0; i < code.length - 1; i++) {
    middleCode += '*';
  }
  var lastCode = code.substring(code.length - 1, code.length);
  let newCode = firstCode + middleCode + lastCode;
  return newCode
};
//显示后四位
function showFore(code) {
  var newCode = code.substring(code.length - 4, code.length);
  return newCode
};
//乘法
function accMul(arg1, arg2) {
  if (arg1 && arg2) {
    var m = 0,
      s1 = arg1.toString(),
      s2 = arg2.toString();
    try {
      m += s1.split(".")[1].length
    } catch (e) { }
    try {
      m += s2.split(".")[1].length
    } catch (e) { }
    return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m)
  } else {
    return 0
  }
}
//乘法 舍掉小数点后面的
function accMuls(arg1, arg2) {
  if (arg1 && arg2) {
    var m = 0,
      s1 = arg1.toString(),
      s2 = arg2.toString();
    try {
      m += s1.split(".")[1].length
    } catch (e) { }
    try {
      m += s2.split(".")[1].length
    } catch (e) { }
    var s3 = Number(((Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m)).toString()).split('.')[0])
    return s3
  } else {
    return 0
  }
}
//除法
function addMul(arg1, arg2) {
  if (arg1 && arg2) {
    var m = 0,
      s1 = arg1.toString(),
      s2 = arg2.toString();
    try {
      m += s1.split(".")[1].length
    } catch (e) { }
    try {
      m += s2.split(".")[1].length
    } catch (e) { }
    if (s1.split('.').length > 1 && s1.split('.')[1].length > 1) {
      return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(1000, m)
    } else {
      return (Number(arg1) / 100)
    }
  } else {
    return 0
  }
}

//时间戳转日期格式 没有时分秒
function formatTime(time) {
  let now = new Date(time);
  var year = now.getFullYear();
  var month = now.getMonth() + 1;
  var date = now.getDate();

  if (month < 10) {
    month = "0" + month
  }

  if (date < 10) {
    date = "0" + date
  }
  return year + "-" + month + "-" + date;
}

//时间戳转日期格式有时分秒
function formatTimes(time) {
  let now = new Date(time);
  var year = now.getFullYear();
  var month = now.getMonth() + 1;
  if (month < 10) {
    month = "0" + month
  }
  var date = now.getDate();
  if (date < 10) {
    date = "0" + date
  }
  var hour = now.getHours();
  if (hour < 10) {
    hour = "0" + hour
  }
  var minute = now.getMinutes();
  if (minute < 10) {
    minute = "0" + minute
  }
  var second = now.getSeconds();
  if (second < 10) {
    second = "0" + second
  }
  return year + "-" + month + "-" + date + " " + hour + ":" + minute + ":" + second;
}

//md5加密
function md5s(val) {
  return md5(val).toLowerCase()
}
export {
  setSessData,
  getSessData,
  delSessData,
  setLocaData,
  getLocaData,
  delLocaData,
  hidePhone,
  hideName,
  showFirstLast,
  showFore,
  accMul,
  addMul,
  accMuls,
  md5s,
  formatTime,
  formatTimes
}
