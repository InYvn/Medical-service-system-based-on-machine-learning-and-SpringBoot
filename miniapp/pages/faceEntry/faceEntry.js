// pages/faceEntry/faceEntry.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    src: "", //图片的链接
    baidutoken: "",
    base64: "",
    msg: "",
    user:{}
  },

  takePhoto() {
    var that = this;
    //拍照
    const ctx = wx.createCameraContext()
    ctx.takePhoto({
      quality: 'high',
      success: (res) => {
        this.setData({
          src: res.tempImagePath    //获取图片
        })
        //图片base64编码
        wx.getFileSystemManager().readFile({
          filePath: this.data.src,    //选择图片返回的相对路径
          encoding: 'base64', 
          success: res => { 
            this.setData({
              base64: res.data
            })
          }
        })
        this.getBaiduToken();
      } 
    })

    wx.showToast({
      title: '',
      icon: 'loading',
      duration: 500
    })
  },

  
  getBaiduToken() {
    var that = this;
    //acess_token获取,qs:需要多次尝试
    wx.request({
      url: 'https://aip.baidubce.com/oauth/2.0/token', //是真实的接口地址
      data: {
        grant_type: 'client_credentials',//授权模式
        client_id: 'zjdg6i5HNean69G6WvS0NIof', //API Key
        client_secret: 'BILURlE1EVfSfalTrsvxjXpK5blGwHOE' //Secret Key
      },
      header: {
        'Content-Type': 'application/json' 
      },
      success(res) {
        that.setData({
          baidutoken: res.data.access_token //获取到token
        })
        that.uploadPhoto();
      }
    })
  },

  uploadPhoto() {
    var that = this;
    //上传人脸进行注册
    const user = wx.getStorageSync('user');
    wx.request({
      url: 'https://aip.baidubce.com/rest/2.0/face/v3/faceset/user/add?access_token=' + this.data.baidutoken,
      method: 'POST',
      data: {
        image: this.data.base64,
        image_type: 'BASE64',
        group_id: 'wjq', //用户组id
        user_id: ""+user.id //用户id
      },
      header: {
        'Content-Type': 'application/json' 
      },
      success(res) {
        that.setData({
          msg: res.data.error_msg
        })
        if (that.data.msg == "pic not has face") {
          wx.showToast({
            title: '未捕获到人脸',
            icon: 'error',
          })
        }
        if (that.data.msg == 'SUCCESS') {
          wx.showToast({
            title: '人脸录入成功',
            icon: 'success',
          })
        setTimeout(() => (
          wx.switchTab({
            url:'../index/index'
          })
        ), 1000)
        }
      }
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