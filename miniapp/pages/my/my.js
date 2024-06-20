// pages/my/my.js
import { request } from '../../request/index'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    user:{}
  },

  addInformation(){
    wx.navigateTo({
      url:'../baseinformation/baseinformation'
    })
  },
  addFace(){
    wx.navigateTo({
      url:'../faceEntry/faceEntry'
    })
  },
  exit(){
    wx.clearStorageSync();
    wx.switchTab({
      url:'../index/index'
    })
  },
  searchAppoint(){
    wx.navigateTo({
      url:'../myAppointment/myAppointment'
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

  onShow:function(){
    const user = wx.getStorageSync('user');
    if(user.id){
      request({
        url:'/user/mini/'+user.id,
        method:'GET'
      }).then(res =>{
        wx.setStorageSync('user', res)
        this.setData({
          user:res
        })
        console.log(this.data.user)
      }
      )
    //   request({
    //     url:'/patient/'+user.id,
    //     method:'GET'
    //   }).then(res =>(
    //     wx.setStorageSync('patient',res),
    //     this.setData({
    //       patient:res
    //     })
    //   ))
    // }else{
    //   wx.navigateTo({
    //     url:'../login/login'
    //   })
    }else{
      wx.navigateTo({
        url:'../login/login'
      })}
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