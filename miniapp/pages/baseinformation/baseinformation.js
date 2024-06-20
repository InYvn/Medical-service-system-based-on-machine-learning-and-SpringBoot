// pages/baseinformation/baseinformation.js
import { request } from '../../request/index'
import { areaList } from '../../node_File/area-data/dist/data';
Page({
  /**
   * 页面的初始数据
   */
  data: {
    user:'',
    realname:'',
    radio: '1',
    show: false,
    show2:false,
    area:'',
    currentDate: new Date().getTime(),
    minDate: new Date(1923,5,27).getTime(),
    maxDate: new Date().getTime(),
    phone:'',
    areaList,
    detailAddress:'',
    address:'',
    // fphone:'',
    formatter(type, value) {
      if (type === 'year') {
        return `${value}年`;
      }
      if (type === 'month') {
        return `${value}月`;
      }
      return `${value}日`;
    },
  },

  submit(){
    let sex='';
    if(this.data.radio=='1'){
      sex='1';
    }else{
      sex='2';
    }
    const user=wx.getStorageSync('user');
    let id=user.id;
    let address = this.data.area+this.data.detailAddress
    let data = {realname:this.data.realname,sex:sex,birthday:this.data.currentDate,phone:this.data.phone,address:address,id:id}
    request({
      url:'/user/mini/addInfo',
      method:'POST',
      data:data
    }).then(res =>{
      if(res){
        console.log(res);
        wx.showToast({
          title:'添加成功',
          icon:'success'
        })
        wx.setStorageSync('patient',res)
        setTimeout(()=>(
          wx.switchTab({
            url:'../index/index'
          })
        ),1000)
      }else{
        wx.showToast({
          title:'添加失败',
          icon:'error'
        })
      }
    })
  },
  onAreaConfirm(e){
    let values = e.detail.values
    console.log(values)
    this.setData({
        area : values[0].name + values[1].name + values[2].name,
        show2: false,
    })
  },
  showPopup() {
    this.setData({ show: true });
  },
  show2Popup() {
    this.setData({ show2: true });
  },
  onInput(event) {
    this.setData({
      currentDate: event.detail,
    });
  },


  onClose() {
    this.setData({ show: false });
  },
  onCancel() {
    this.setData({ show: false });
  },


  onClose2() {
    this.setData({ show2: false });
  },

  inputCheck(){
    console.log(this.data.area)
    if(!this.data.area){
      this.setData({
        show2: true,
      });
    }
  },

  onConfirm() {
    this.setData({
      show: false,
      currentDate: this.data.currentDate,
    });
  },

  onChange(e) {
    this.setData({
      radio: e.detail,
    });
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
  onShow:function(){
    const user = wx.getStorageSync('user');
    if(user.id){
      request({
        url:'/user/mini/'+user.id,
        method:'GET'
      }).then(res =>{
        this.setData({
          user:res,
          realname:res.realname,
          phone:res.phone,
          sex:res.sex,
          // currentDate:res.birthday
        })
      }
      )
    }
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