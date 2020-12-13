
//获取应用实例
var app = getApp()
var that;
Page({
  data:{
    uname:'',
    uid:''
  },
  onLoad: function (options) {
    this.setData({
      uname : wx.getStorageSync('uname'),
      uid : wx.getStorageSync('uid')
    })
    
  },
  onReady: function () {
    
  },
  onShow: function () {

  },

})
