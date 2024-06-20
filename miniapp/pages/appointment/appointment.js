// pages/appointment/appointment.js
import { request } from '../../request/index'
Page({

  data: {
    user: {},
    currentTag: 0,
    currentItem: 1,
    minDate: new Date().getTime(),
    currentDate: new Date().getTime(),
    doctorList1: [], doctorList2: [], doctorList3: [], doctorList4: [], doctorList5: [], doctorList6: [],
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
  onClose() {
    this.setData({
      show: false
    });
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
  onChangeTab(e) {
    this.setData({
      currentTag: e.detail.index,
    });
  },
  appointment() {
    let chooseItem = this.data.currentItem;//每个标签页的第x项（从0开始）
    const user = wx.getStorageSync('user');
    let currentTag = this.data.currentTag;//第x个标签页（从0开始）    
    if (currentTag == 0) {
      const doctorList = wx.getStorageSync('doctorList1');
      let did = doctorList[chooseItem].id;
      let uid = user.id;
      let data = { uid: uid, did: did, reservedate: this.data.currentDate }
      console.log(data)
      this.setData({
        show: false,
      });
      request({
        url: '/reserve/mini/add',
        method: 'POST',
        data: data
      }).then(res => {
        if (res) {
          wx.showToast({
            title: '预约成功',
            icon: 'success'
          })
          setTimeout(() => (
            wx.switchTab({
              url: '../index/index'
            })
          ), 1000)
        } else {
          wx.showToast({
            title: '预约失败',
            icon: 'error'
          })
        }
      })
    } else if (currentTag == 1) {
      const doctorList = wx.getStorageSync('doctorList2');
      let did = doctorList[chooseItem].id;
      let uid = user.id;
      let data = { uid: uid, did: did, reservedate: this.data.currentDate }
      console.log(data)
      this.setData({
        show: false,
      });
      request({
        url: '/reserve/mini/add',
        method: 'POST',
        data: data
      }).then(res => {
        if (res) {
          wx.showToast({
            title: '预约成功',
            icon: 'success'
          })
          setTimeout(() => (
            wx.switchTab({
              url: '../index/index'
            })
          ), 1000)
        } else {
          wx.showToast({
            title: '预约失败',
            icon: 'error'
          })
        }
      })
    } else if (currentTag == 2) {
      const doctorList = wx.getStorageSync('doctorList3');
      let did = doctorList[chooseItem].id;
      let uid = user.id;
      let data = { uid: uid, did: did, reservedate: this.data.currentDate }
      this.setData({
        show: false,
      });
      request({
        url: '/reserve/mini/add',
        method: 'POST',
        data: data
      }).then(res => {
        if (res) {
          wx.showToast({
            title: '预约成功',
            icon: 'success'
          })
          setTimeout(() => (
            wx.switchTab({
              url: '../index/index'
            })
          ), 1000)
        } else {
          wx.showToast({
            title: '预约失败',
            icon: 'error'
          })
        }
      })
    } else if (currentTag == 3) {
      const doctorList = wx.getStorageSync('doctorList4');
      let did = doctorList[chooseItem].id;
      let uid = user.id;
      let data = { uid: uid, did: did, reservedate: this.data.currentDate }
      this.setData({
        show: false,
      });
      request({
        url: '/reserve/mini/add',
        method: 'POST',
        data: data
      }).then(res => {
        if (res) {
          wx.showToast({
            title: '预约成功',
            icon: 'success'
          })
          setTimeout(() => (
            wx.switchTab({
              url: '../index/index'
            })
          ), 1000)
        } else {
          wx.showToast({
            title: '预约失败',
            icon: 'error'
          })
        }
      })
    } else if (currentTag == 4) {
      const doctorList = wx.getStorageSync('doctorList5');
      let did = doctorList[chooseItem].id;
      let uid = user.id;
      let data = { uid: uid, did: did, reservedate: this.data.currentDate }
      this.setData({
        show: false,
      });
      request({
        url: '/reserve/mini/add',
        method: 'POST',
        data: data
      }).then(res => {
        if (res) {
          wx.showToast({
            title: '预约成功',
            icon: 'success'
          })
          setTimeout(() => (
            wx.switchTab({
              url: '../index/index'
            })
          ), 1000)
        } else {
          wx.showToast({
            title: '预约失败',
            icon: 'error'
          })
        }
      })
    } else if (currentTag == 5) {
      const doctorList = wx.getStorageSync('doctorList6');
      let did = doctorList[chooseItem].id;
      let uid = user.id;
      let data = { uid: uid, did: did, reservedate: this.data.currentDate }
      this.setData({
        show: false,
      });
      request({
        url: '/reserve/mini/add',
        method: 'POST',
        data: data
      }).then(res => {
        if (res) {
          wx.showToast({
            title: '预约成功',
            icon: 'success'
          })
          setTimeout(() => (
            wx.switchTab({
              url: '../index/index'
            })
          ), 1000)
        } else {
          wx.showToast({
            title: '预约失败',
            icon: 'error'
          })
        }
      })
    }
  },
  addInformation() {
    wx.navigateTo({
      url: '../baseinformation/baseinformation'
    })
  },
  goToMy() {
    wx.switchTab({
      url: '../my/my'
    })
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
  onShow: function () {
    const user = wx.getStorageSync('user');
    if (user.id) {
      request({
        url: '/user/mini/' + user.id,
        method: 'GET'
      }).then(res => (
        this.setData({
          user: res
        })
      )),
        request({
          url: '/doctor/mini/1',
          method: 'GET'
        }).then(res => (
          this.setData({
            doctorList1: res
          }),
          wx.setStorageSync('doctorList1', res)
        )),
        request({
          url: '/doctor/mini/2',
          method: 'GET'
        }).then(res => (
          this.setData({
            doctorList2: res
          }),
          wx.setStorageSync('doctorList2', res)
        )),
        request({
          url: '/doctor/mini/3',
          method: 'GET'
        }).then(res => (
          this.setData({
            doctorList3: res
          }),
          wx.setStorageSync('doctorList3', res)
        )),
        request({
          url: '/doctor/mini/4',
          method: 'GET'
        }).then(res => (
          this.setData({
            doctorList4: res
          }),
          wx.setStorageSync('doctorList4', res)
        )),
        request({
          url: '/doctor/mini/5',
          method: 'GET'
        }).then(res => (
          this.setData({
            doctorList5: res
          }),
          wx.setStorageSync('doctorList5', res)
        )),
        request({
          url: '/doctor/mini/6',
          method: 'GET'
        }).then(res => (
          this.setData({
            doctorList6: res
          }),
          wx.setStorageSync('doctorList6', res)
        ))
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