// 封装GET/POST公共请求方法
'use strict'
import axios from 'axios'
import Vue from 'vue';
import router from '../router';
import store from '../store'

//配置请求前缀
axios.defaults.baseURL = process.env.api_url
axios.interceptors.response.use(response => {
  store.state.loading = false
  return response
}, error => {
  store.state.loading = false
  return Promise.resolve(error.response)
})

export default {
  get(url, params, tokens = true) {
    store.state.loading = true
    if (params != undefined && params == false) {
      tokens = false
    }
    if (params == undefined || params == false) {
      var params = {}
    }
    var token = ''; // 公共参数token
    if (tokens) { //需要token
      var userinfo = Vue.prototype.common.setSessData("yyxh5_user");
      if (userinfo) {
        token = userinfo.token;
      } else {
        store.state.loading = false
        return
      }
    }
    return axios({
      method: 'get', // 请求方式
      url, // 请求链接
      params,
      timeout: 60000,
      headers: {
        'Content-Type': 'application/json',
        TOK: token,
        VFT: 'ZYY',
        CLT: '1',
        RT: Date.parse(new Date()) / 100,
      }
    }).then((response) => {
      store.state.loading = false
      return checkStatus(response);
    })
  },
  post(url, params, tokens = true,userToken="") {
    store.state.loading = true
    if (params != undefined && params == false) {
      tokens = false
    }
    if (params == undefined || params == false) {
      var params = {}
    }
    let _token = "";
    var token = ''; // 公共参数token
    var userinfo = Vue.prototype.common.getSessData("yyxh5_user");
    if (tokens) { //需要token
      var userinfo = Vue.prototype.common.getSessData("yyxh5_user");
      if (userinfo) {
        token = userinfo.token;
      } else {
        store.state.loading = false
        return
      }
    }
    _token = token ||  userToken || ""
    return axios({
      method: 'post', // 请求方式
      url, // 请求链接
      data: params,
      timeout: 60000,
      headers: {
        'Content-Type': 'application/json',
        TOK: _token,
        VFT: 'ZYY',
        CLT: '1',
        RT: Date.parse(new Date()) / 100,
      }
    }).then((response) => {
      store.state.loading = false
      return checkStatus(response);
    })
  },
  postQuery(url, params, tokens = true) {
    store.state.loading = true
    if (params != undefined && params == false) {
      tokens = false
    }
    if (params == undefined || params == false) {
      var params = {}
    }
    var token = ''; // 公共参数token
    if (tokens) { //需要token
      var userinfo = Vue.prototype.common.getSessData("yyxh5_user");
      if (userinfo) {
        token = userinfo.token;
      } else {
        store.state.loading = false
        return
      }
    }
    return axios({
      method: 'post', // 请求方式
      url, // 请求链接
      params: params,
      timeout: 60000,
      headers: {
        'Content-Type': 'application/json',
        TOK: token,
        VFT: 'zyy',
        CLT: '3',
        RT: Date.parse(new Date()) / 100,
      }
    }).then((response) => {
      store.state.loading = false
      // window.clearInterval(times2);
      return checkStatus(response);
    })
  },
  //上传图片请求方法
  upimg(url, data) {
    store.state.loading = true
    if (data == undefined) {
      var data = {}
    }
    // 公共参数timestamp
    var token;
    let userinfo = Vue.prototype.common.getSessData("yyxh5_user");
    if (userinfo) {
      token = userinfo.token;
    } else {
      store.state.loading = false
      showMessage("您还未登录，请先登录");
      setTimeout(() => {
        router.push({
          path: 'login',
          query: {
            path: 'back'
          }
        });
      }, 1000);
      return
    }
    return axios({
      method: 'post', // 请求方式
      url, // 请求链接
      data, // 请求带的参数
      timeout: 60000,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        token,
      }
    }).then((response) => {
      store.state.loading = false
      return checkStatus(response)
    })
  },
}
// 检测返回状态
function checkStatus(response) {
  if (response && (response.status.toString() === '200' || response.status.toString() === '304' || response.status.toString() === '400')) {
    if (response.data.code) {
      switch (response.data.code.toString()) {
        case '200':
          return response.data;
          break;
        case '20000':
          return response.data;
        case '20003':
            return response.data;
        case '30010':
          return response.data;
        case '30013':
          return response.data;
        case '30015':
          return response.data;
        case '30016':
          return response.data;
        default:
          showMessage(response.data.message);
          return
      };
    }
    if (response.data.retCode) {
      switch (response.data.retCode.toString()) {
        case '200':
          return response.data;
          break;
        case '20000':
          return response.data;
        case '20003':
            return response.data;
        case '30010':
          return response.data;
        case '30013':
          return response.data;
        case '30015':
          return response.data;
        case '30016':
          return response.data;
        default:
          showMessage(response.data.retMsg);
          return
      };
    }
  } else {
    if (response) {
      switch (response.status) {
        case 500:
          showMessage("接口异常");
          break;
        case 502:
          showMessage("后台接口正在发布中，请稍后再试");
          break;
        case 504:
          showMessage("服务器未开启，请联系管理员");
          break;
        default:
          showMessage("网络异常");
          break;
      };
    } else {
      showMessage("网络异常");
    }
  }
}

// 提示消息
function showMessage(msg) {
  store.state.loading = false
  Vue.prototype.$toast(msg);
}
