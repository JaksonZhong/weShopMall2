// pages/myself/myself.js
let app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {
      "integral": 0,
      "level": 1,
      "sumIntegral": 0
    },
    levelRouLe: {
      1: 300,
      2: 600,
      3: 900,
      4: 1200,
      5: 2400,
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  turnQuanyi: function () {
    wx.switchTab({
      url: '/pages/quanyi/quanyi'
    })
  },
  turnMyOrder() {
    wx.navigateTo({
      url: '../myOrder/myOrder',
    })
  },
  turnAddress() {
    wx.navigateTo({
      url: '../address/address',
    })
  },
  turnGood() {
    wx.navigateTo({
      url: '../good/good',
    })
  },
  turnKefu() {

  },
  turnManage:function(){
    wx.navigateTo({
      url: '../adminLogon/adminLogon',
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
    console.log("my.js微信号信息1："+app.globalData.userInfo)
    app.initUserInfo().then(() => {
      console.log("my.js微信号信息2:"+JSON.stringify(app.globalData.userInfo))
    
      this.setData({
        userInfo: app.globalData.userInfo
      })
    })
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





// var app = getApp()
// Page( {
//   data: {
//     userInfo: {},
//     projectSource: 'https://github.com/liuxuanqiang/wechat-weapp-mall',
//     userListInfo: [ {
//       icon: '../../images/iconfont-dingdan.png',
//       text: '我的订单',
//       isunread: true,
//       unreadNum: 2
//     }, {
//         icon: '../../images/iconfont-card.png',
//         text: '我的代金券',
//         isunread: false,
//         unreadNum: 2
//       }, {
//         icon: '../../images/iconfont-icontuan.png',
//         text: '我的拼团',
//         isunread: true,
//         unreadNum: 1
//       }, {
//         icon: '../../images/iconfont-shouhuodizhi.png',
//         text: '收货地址管理'
//       }, {
//         icon: '../../images/iconfont-kefu.png',
//         text: '联系客服'
//       }, {
//         icon: '../../images/iconfont-help.png',
//         text: '常见问题'
//       }]
//   },

//   onLoad: function() {
//     var that = this
//     //调用应用实例的方法获取全局数据
//     app.getUserInfo( function( userInfo ) {
//       //更新数据
//       that.setData( {
//         userInfo: userInfo
//       })
//     })
//   }
// })