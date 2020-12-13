var app = getApp();
var date;
const db = wx.cloud.database()

Page({
 
  /**
   * 页面的初始数据
   */
  data: {
    data:{
      longitude: 113.324520,
      latitude: 23.099994,
      markers:[{
        id: 0,
        latitude: 23.099994,
        longitude: 113.324520,
        width: 50,
        height: 50
      }]
     },
  },

  onLoad: function () {
    var that = this;
     wx.getLocation({
       type: "wgs84",
       success: function(res){
         var latitude = res.latitude;
         var longitude = res.longitude;
         console.log("latitude",res.latitude)
         console.log("longitude",res.longitude)
        //console.log(res.latitude);
         that.setData({
          latitude: res.latitude,
          longitude: res.longitude,
          markers:[{
            latitude: res.latitude,
            longitude: res.longitude
          }]
         })
         
       }
     })
  },
 
  btn_click: function(){
    var that = this;
    db.collection('punch').add({
      data:{
        longitude:that.data.longitude,
        latitude:that.data.latitude,
        
      },
      success:function(res){
        console.log('打卡成功',res)
      }
    })
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
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    
  },

  onShareAppMessage: function () {
    
  },
 
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
 
  }
})
 
 