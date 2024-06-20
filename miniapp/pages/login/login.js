// pages/login/login.js
import { request } from '../../request/index'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    username: '',
    password: '',
    password2: ''
  },

  login() {
    let data = { username: this.data.username, password: this.data.password }
    request({
      url: '/user/mini/login',
      method: 'POST',
      data: data
    }).then(res => {
      if (res) {
        wx.showToast({
          title: '登录成功',
          icon: 'success'
        })
        wx.setStorageSync('user', res)
        setTimeout(() => (
          wx.switchTab({
            url: '../my/my'
          })
        ), 1000)
      } else {
        wx.showToast({
          title: '账号或密码错误',
          icon: 'error'
        })
      }
    })
  },
  wxlogin(){
    wx.showLoading({
      title: '正在登录',
      mask: true
    })
    wx.getUserProfile({
      desc: '获取您的相关信息',
      success:(res)=>{
        console.log(res)
      }
    })
  },
  register() {
    if (this.data.password != this.data.password2) {
      wx.showToast({
        title: '密码不一致',
        icon: 'error'
      })
    } else {
      let data = { username: this.data.username, password: this.data.password }
      request({
        url: '/user/mini/register',
        method: 'POST',
        data: data
      }).then(res => {
        console.log(res)
        if (res) {
          wx.showToast({
            title: '注册成功',
            icon: 'success'
          })
          wx.setStorageSync('user', res)
          setTimeout(() => (
            wx.switchTab({
              url: '../index/index'
            })
          ), 1000)
        } else {
          wx.showToast({
            title: '用户名重复',
            icon: 'error'
          })
        }
      })
    }
  },
  faceLogin() {
    wx.navigateTo({
      url: '../faceRecognition/faceRecognition'
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})