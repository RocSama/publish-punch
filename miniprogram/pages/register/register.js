// miniprogram/pages/register/register.js
const app = getApp()
const db = wx.cloud.database()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    uname:'',
    uid:''
  },

  unameInput:function(e){
    this.setData({
      uname:e.detail.value
    })
  },
  uidInput:function(e){
    this.setData({
      uid:e.detail.value
    })
  },

  registerClick:function(e){
    wx.cloud.callFunction({
      name: 'login',
      data: {},
      success: res => {
        var openid = res.result.openid
        var uname = this.data.uname
        var uid = this.data.uid
        console.log(uname)
        db.collection('users').add({
          data: {
            uname:uname,
            uid:uid,
          },
          success: function(res) {
            // res 是一个对象，其中有 _id 字段标记刚创建的记录的 id
            console.log('注册成功并跳转',res)
            wx.setStorageSync('uname', uname)
            wx.setStorageSync('uid', uid)
            wx.setStorageSync('uopenid', openid)
            wx.switchTab({
              url: '../mine/mine',
            })
          }
        })
      },
      fail: err => {
        console.error('[云函数] [login] 调用失败', err)
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})