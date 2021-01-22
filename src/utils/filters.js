// 过滤器
import Vue from 'vue'

//过滤金钱
export var formatMoney = Vue.filter("formatMoney", (value) => {
  if (value) {
    return (value / 10000).toFixed(2);
  } else {
    return '0.00';
  }
});
