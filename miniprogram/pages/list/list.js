
//声明js
//var time=require('../../utils/util.js')
const app = getApp()
const db = wx.cloud.database()

Page({
  data: {
    //全局变量
    list: [],
    //加载样式是否显示
    loading: true
  },
  
  onLoad: function (options) {
    var that = this       //很重要，一定要写
    db.collection('reports').get({
      success: function(res) {
        // res.data 是包含以上定义的两条记录的数组
        var datas=res.data;//res.data就是从后台接收到的值
        
        that.setData({//循环完后，再对list进行赋值
          list: datas,
          loading: false
        })
      }
    })
  }
})