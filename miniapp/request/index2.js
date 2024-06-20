// 同时发送异步请求的次数
var app = getApp()
let ajaxTimes = 0;
export const request = (params) => {
  ajaxTimes ++;
  wx.showLoading({
    title: '加载中',
    mask: true
  })

  // 后台的请求地址
  //const baseUrl = 'http://localhost:9090';
  // const baseUrl = 'http://192.168.31.86:8080';
  
  return new Promise((resolve, reject) => {
    wx.request({
      ...params,
      url: params.url,
      success: (result) => {
        resolve(result.data);
      },
      fail: (err) => {
        reject(err);
      },
      complete: () => {
        ajaxTimes --;
        if(ajaxTimes === 0) {  // 所有请求都完成后再关闭提示
          wx.hideLoading();
        }
      },
    })
  })
}