// pages/adminLogon/adminLogon.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    admin:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  adminLogon:function(e){
    var usernameFromPage = e.detail.value.usename;
    var usernameFromPage = e.detail.value.password;
    var username=null;
    var password=null;
    var that = this;
    if (usernameFromPage == "" || usernameFromPage=="") {
      wx.showToast({
        title: '账号或密码不能为空',
        icon: 'none',
        duration: 2000
      })
    }else{
      const db = wx.cloud.database();
      console.log("连接admin表");
      db.collection("admin").get({
        success: res => {
          username = res.data[0].username;
          password = res.data[0].password;
          console.log("username:" + res.data[0].username)
          if (usernameFromPage == username && usernameFromPage == password) {
            console.log("登录成功");
            wx.showToast({
              title: '登录成功',
              icon: 'none',
              duration: 2000
            })
            wx.navigateTo({
              url: '../backAdmin/backAdmin',
            })
          }else{
            wx.showToast({
              icon: "none",
              title: '账号或密码错误',
              duration: 2000
            })
          }
        }, fail: err => {
          wx.showToast({
            icon: "none",
            title: '查询记录失败',
          })
        }
      })
      
      // db.collection("admin").where({
      //   username: username,
      //   password:password
      // }).get({
      //   success: res => {
      //     this.setData({
      //       admin: res.data[0],//返回的是一个数组，取第一个
      //       // Goods:Goods           
      //     })
      //     console.log(admin);
      //   }, fail: err => {
      //     console.log(err)
      //   }
      // })
      
    }
    
    
      
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