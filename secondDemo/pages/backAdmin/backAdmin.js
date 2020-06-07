// pages/backAdmin/backAdmin.js
//获取应用实例
const app = getApp()
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
    const db = wx.cloud.database()
    db.collection("Goods").get({
      success: res => {
        this.setData({
          Goods: res.data
        })
      }, fail: err => {
        wx.showToast({
          icon: "none",
          title: '查询记录失败',
        })
      }
    })
  },

  //添加
  goSet: function () {
    wx.navigateTo({
      url: '../set/set',
    })
  },

  //修改
  onUpdate: function (e) {
    let _id = e.currentTarget.dataset.id
    console.log(_id)
    wx.navigateTo({
      url: '../update/update?_id=' + _id,
    })
  },

  //删除
  onDel: function (e) {
    let _id = e.currentTarget.dataset.id
    const db = wx.cloud.database();
    db.collection("Goods").doc(_id).remove({
      success: res => {
        wx.showToast({
          title: '删除成功',
        })
        this.onLoad()//删除成功重新加载
      }, fail: err => {
        wx.showToast({
          title: '删除失败',
        })
      }
    })
    console.log('被删除的_id:' + _id)
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