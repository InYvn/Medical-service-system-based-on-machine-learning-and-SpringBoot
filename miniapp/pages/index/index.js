// pages/index/index.ts
var app = getApp()
const baseUrl = app.globalDatas.baseurl;
import { request } from '../../request/index'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    user:{},
    swip1:"",
    swip2:"",
    swip3:"",
    swip4:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {

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
    this.setData({
      swip1:baseUrl+"/finalDesignPic/pic1.jpg",
      swip2:baseUrl+"/finalDesignPic/pic2.jpg",
      // swip3:baseUrl+"/finalDesignPic/pic3.jpg",
      // swip4:baseUrl+"/finalDesignPic/pic4.jpg"
    })
    const user = wx.getStorageSync('user');
    if(user.aid){
      request({
        url:'/user/'+user.aid,
        method:'GET'
      }).then(res =>(
        this.setData({
          user:res,
        })
      ))
      }
  },

  local(){
    wx.openLocation({
      latitude:34.599351,	//纬度
      longitude: 112.427491, //经度
      name: "河南科技大学第一附属医院",	
      scale: 15,	
      address: "河南省洛阳市洛龙区关林路636号"	
    })
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
