// pages/faceRecognition/faceRecognition.js
import { request } from '../../request/index'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    src: '',
    base64: "",
    baidutoken: "",
    msg: null,
    user: {}
  },
  
  takePhoto() {
    var that = this;
    //拍照
    const ctx = wx.createCameraContext()
    ctx.takePhoto({
      quality: 'high',
      success: (res) => {
        that.setData({
          src: res.tempImagePath
        })
        //图片base64编码
        wx.getFileSystemManager().readFile({
          filePath: that.data.src, //选择图片返回的相对路径
          encoding: 'base64', 
          success: res => {          
            that.setData({
              base64: res.data
            })
            that.checkPhoto();
          }
        })
      }
    })

    wx.showToast({
      title: "",
      icon: 'loading',
      duration: 500
    })
  },
  error(e) {
    console.log(e.detail)
  },
  checkPhoto() {
    var that = this;
    //acess_token获取
    wx.request({
      url: 'https://aip.baidubce.com/oauth/2.0/token', //真实的接口地址
      data: {
        grant_type: 'client_credentials',
        client_id: 'zjdg6i5HNean69G6WvS0NIof', //创建的应用的API Key
        client_secret: 'BILURlE1EVfSfalTrsvxjXpK5blGwHOE' //创建的应用的Secret Key
      },
      header: {
        'Content-Type': 'application/json' // 默认值
      },
      success(res) {
        that.setData({
          baidutoken: res.data.access_token //获取到token
        })
        that.validPhoto();
      }
    })
  },
  validPhoto() {
    var that = this;
    //上传人脸比对
    wx.request({
      url: 'https://aip.baidubce.com/rest/2.0/face/v3/search?access_token=' + that.data.baidutoken,
      method: 'POST',
      data: {
        image: this.data.base64,
        image_type: 'BASE64',
        group_id_list: 'wjq', //建的用户组id
      },
      header: {
        'Content-Type': 'application/json' 
      },
      success(res) {
        that.setData({
          // msg: res.data.result.user_list[0].score
          msg: res.data.error_msg
        })

        if (that.data.msg == "pic not has face") {
          wx.showToast({
            title: '未捕获到人脸',
            icon: 'error',
          })
        }
        if (that.data.msg == 'SUCCESS') {
          if (res.data.result.user_list[0].score > 80) {
            let data = res.data.result.user_list[0].user_id;
            request({
              url: '/user/mini/' + data,
              method: 'GET',
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
              }
            })
          } else {
            wx.showToast({
              title: '人脸识别失败',
              icon: 'error',
            })
          }
        }
      }
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