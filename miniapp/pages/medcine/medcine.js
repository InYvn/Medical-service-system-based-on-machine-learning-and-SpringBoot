// pages/medcine/medcine.js
var app = getApp()
const baseUrl = app.globalDatas.baseurl;
import { request } from '../../request/index'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    user:{},
    currentDate: new Date().getTime(),
    src:"",
    show: false,
    show1: false,
    ScreenBrightness:0.7,
    medcineList:[],
  },

  addInformation(){
    wx.navigateTo({
      url:'../baseinformation/baseinformation'
    })
  },
  goToMy(){
    wx.switchTab({
      url:'../my/my'
    })
  },

  showPicture(){
    this.setData({ show: true });
  },

  
  /**
   * 生命周期函数--监听页面显示
   */
  onShow:function(){
    const user = wx.getStorageSync('user');
    const src1=baseUrl+"/finalDesignPic/"+user.id+".png";
    if(user.id){
      request({
        url:'/user/mini/'+user.id,
        method:'GET'
      }).then(res =>(
        this.setData({
          user:res,
          src:src1
        })
      )),
      request({
        url: '/Vwjdmedicine/未取/'+user.id,
        method: 'GET'
      }).then(res => (
        this.setData({
          medcineList: res
        }),
        wx.setStorageSync('medcineList',res)
      ))
    }
  },
  onEnter(){
    var that = this
    // 获取屏幕亮度
    wx.getScreenBrightness({
      success: function (res) {
        that.setData({
          ScreenBrightness: res.value
        })
      }
    })
    //设置屏幕亮度
    wx.setScreenBrightness({
      value: 1,    //屏幕亮度值 0 最暗，1 最亮
    })
  },
  onClose() {
    this.setData({ show: false });
    wx.setScreenBrightness({
      value: this.data.ScreenBrightness,
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {
    wx.setScreenBrightness({
      value: this.data.ScreenBrightness,
    })
    this.setData({ show: false });
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