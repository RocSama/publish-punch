// pages/loginer/loginer.js
const app = getApp()
const db = wx.cloud.database()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    hiddenmodalput: true,
    openid:''
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // 调用云函数
    
  },

  bindGetUserInfo: function(e) {
    var that = this;
    // 查看是否授权
    wx.getSetting({
      success: function(res) {
        if (res.authSetting['scope.userInfo']) {
          console.log("已授权")
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          //调用API从本地缓存中获取数据
          try {
            var value = wx.getStorageSync('user_openid')
            if (value) {
              console.log("value不为空")
              //缓存中存在个人信息，登陆成功 ，传值并跳转到个人信息页面
              wx.switchTab({
                url: '../punch/punch',
              })
            } else {
              //缓存中不存在个人信息，登陆或注册
              console.log("value为空")
              wx.cloud.callFunction({
                name: 'login',
                data: {},
                success: res => {
                  console.log('[云函数] [login] user openid: ', res.result.openid)
                  var openid = res.result.openid
                  db.collection('users').where({
                    _openid:openid
                  }).get({
                    success: function(res){
                      console.log('result',res)
                      if(res.data!=0){
                        console.log("data不为空，查询登陆成功，带信息跳转")
                        var uname = res.data[0].uname
                        var uid = res.data[0].uid
                        wx.setStorageSync('uname', uname)
                        wx.setStorageSync('uid', uid)
                        wx.setStorageSync('uopenid', openid)
                        wx.switchTab({
                          url: '../mine/mine',
                        })
                      }else{
                        console.log("data为空，查询失败，跳转到注册页面")
                        wx.navigateTo({
                          url: '../register/register',
                        })
                      }
                    }
                  })
                },
                fail: err => {
                  console.error('[云函数] [login] 调用失败', err)
                }
              });
            }
          } catch (e) {
            console.log("登陆失败")
          }
          wx.checkSession({
            success: function() {},
            fail: function() {
              //登录态过期
              wx.login()
            }
          })

        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
	console.log('show')
  try{
    var nickname = wx.getStorageSync("my_username")
    var openid = wx.getStorageSync("user_openid")
    console.log(nickname)
    console.log(openid)
    if (nickname && openid) {
      wx.switchTab({
        url: '../punch/punch',
      })
    }
  }
  finally{

  }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {
    wx.stopPullDownRefresh()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },


  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})