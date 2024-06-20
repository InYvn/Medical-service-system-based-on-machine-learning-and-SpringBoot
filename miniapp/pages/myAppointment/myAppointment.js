// pages/myAppointment/myAppointment.js
var app = getApp()
const baseUrl = app.globalDatas.baseurl;
import { request } from '../../request/index'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    user:{},
    myAppointList:[],
    src:"",
    showT: false,
    show1: false,
    ScreenBrightness:0.7,
    minDate: new Date().getTime(),
    currentDate: new Date().getTime(),
    currentItem: 1,
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
  showPopup(e) {
    let chooseItem = e.currentTarget.dataset.index;
    this.setData({
      show: true,
      currentItem: chooseItem,
    });
  },
  onInput(event) {
    this.setData({
      currentDate: event.detail,
    });
  },
  onClose() {
    this.setData({
      show: false
    });
  },
  update() {
    let chooseItem = this.data.currentItem;//每个标签页的第x项（从0开始）
    const user = wx.getStorageSync('user');
      const myAppointList = wx.getStorageSync('myAppointList');
      let did = myAppointList[chooseItem].did;
      let id = myAppointList[chooseItem].id;
      let uid = user.uid;
      let data = { id:id,uid: uid, did: did, reservedate: this.data.currentDate }
      this.setData({
        show: false,
      });
      request({
        url: '/reserve/mini/update',
        method: 'POST',
        data: data
      }).then(res => {
        if (res) {
          wx.showToast({
            title: '修改成功',
            icon: 'success'
          })
          setTimeout(() => (
            wx.switchTab({
              url: '../my/my'
            })
          ), 1000)
        } else {
          wx.showToast({
            title: '修改失败',
            icon: 'error'
          })
        }
      })

  },

  onShow:function(){
    const user = wx.getStorageSync('user');
    const src1=baseUrl+"/finalDesignPic/"+user.id+".png";
    request({
      url:'/Vwreserve/mini/'+user.id,
      method:'GET'
    }).then(res =>(
      this.setData({
        myAppointList:res,
        src:src1
      }),
      console.log(this.data.src),
      wx.setStorageSync('myAppointList',res)
    ))
    },
    cancelappointment(e){
      let chooseTab = e.currentTarget.dataset.index;
      const myAppointList = wx.getStorageSync('myAppointList');
      let id = myAppointList[chooseTab].id;
      console.log(myAppointList[chooseTab].id);
      request({
        url:'/reserve/mini/delete/'+id,
        method:'POST'
      }).then(res =>{
        if (res) {
          wx.showToast({
            title: '取消预约成功',
            icon: 'success'
          })
          setTimeout(() => (
            wx.switchTab({
              url: '../my/my'
            })
          ), 1000)
        } else {
          wx.showToast({
            title: '取消失败',
            icon: 'error'
          })
        }
      }
      )
    },
    showPicture(){
      this.setData({ showT: true });
    },
    onCloseT(){
      this.setData({
        showT: false
      });
    }
})