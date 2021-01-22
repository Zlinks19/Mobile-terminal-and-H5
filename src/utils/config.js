// 定义全局变量
var imgUrl
var h5url
switch (process.env.NODE_ENV) {
  case 'production':
    // 线上环境
    h5url = 'https://m.eziyy.com/';
    imgUrl = '';
    break;
  case 'simulation':
    // 仿真环境
    h5url = 'https://m.eziyy.com/';
    imgUrl = '';
    break;
  case 'testEnvironment':
    // 测试环境
    h5url = 'https://m.eziyy.com/';
    imgUrl = '';
    break;
  case 'development':
    // 开发环境 使用仿真接口
    // h5url = 'https://m.eziyy.com/';
    h5url = 'http://192.168.21.212/';
    imgUrl = 'http://192.168.21.212';
    break;
}

export {
  imgUrl,
  h5url
}
