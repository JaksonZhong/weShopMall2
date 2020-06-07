// pages/detailOrder/detailOrder.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let _id=options._id;
    console.log("从订单传来的订单_id:"+_id);
    var that = this;
    if (options._id) {
      const db = wx.cloud.database();
      db.collection("order").where({
        _id: options._id
      }).get({
        success: res => {
          this.setData({
            order: res.data[0],//返回的是一个数组，取第一个
            // Goods:Goods           
          })
          console.log("这是" + order._id + "的详情页面")
        }, fail: err => {
          console.log(err)
        }
      })
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