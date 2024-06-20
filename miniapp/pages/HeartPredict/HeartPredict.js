// pages/HeartPredict/HeartPredict.js
import {
  request
} from '../../request/index2'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    show: false,
    result:'',
    age:'',
    height:'',
    weight:'',
    cholesterol:'',
    glucose:'',
    exercise:'',
    radsmoke:'1',
    radsex:'1'
  },

  submit(){
    let sex='';
    if(this.data.radsex=='1'){
      sex='1';
    }else{
      sex='0';
    }
    let smoke='';
    if(this.data.radsmoke=='1'){
      smoke='1';
    }else{
      smoke='0';
    }
    let symptom = JSON.stringify({age:this.data.age,height:this.data.height,weight:this.data.weight,cholesterol:this.data.cholesterol,glucose:this.data.glucose,exercise:this.data.exercise,sex:sex,smoke:smoke})
    request({
      url: 'http://localhost:5000/heartpredict?symptom=' + symptom,
      method: 'GET'
    }).then(res => {
      this.setData({
        res: res.data,
        result:res.data,
        show:true
      })
      console.log(this.data.res)
    })
  },

  onClose(){
    this.data.show=false
  },

  onChangeSmo(e) {
    this.setData({
      radsmoke: e.detail,
    });
  },

  onChangeSex(e) {
    this.setData({
      radsex: e.detail,
    });
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