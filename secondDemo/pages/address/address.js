//pages/address/address.js
let app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("开始查询地址表");
    const db = wx.cloud.database()
    db.collection("address").get({
      success: res => {
        this.setData({
          address: res.data
        })
      }, fail: err => {
        wx.showToast({
          icon: "none",
          title: '查询记录失败',
        })
      }
    })
  },

  //删除地址
  delAddress:function(e) {
      //获取当前地址id
      let _id = e.currentTarget.dataset.id
      console.log("选择删除的地址下标是："+_id);
      const db = wx.cloud.database();
      db.collection("address").doc(_id).remove({
        success: res => {
          wx.showToast({
            title: '删除地址成功',
          })
          //删除成功重新加载
          this.onLoad();
        }, fail: err => {
          wx.showToast({
            title: '删除失败',
          })
        }
      })
      console.log('被删除的_id:' + _id)
  },

  //选择地址
  chooseAddress:function(e) {
    //获取当前地址id
    // let _id = e.currentTarget.dataset.id;
    // console.log("选中的地址的_id是：" + _id);
    var that = this;
    // let index = e.currentTarget.dataset.index;
    // console.log("选中的地址下标是：" + index);
    var receiveName = e.currentTarget.dataset.receivename;
    var phone = e.currentTarget.dataset.phone;
    var address = e.currentTarget.dataset.address;
    var transportDay = e.currentTarget.dataset.transportday;
    console.log(receiveName + "," + phone + "," + address + "," + transportDay);
    var returnAddressData = {};
    var arrReturnAddressData = [];
    returnAddressData={
      receiveName: receiveName,
      phone: phone,
      address: address,
      transportDay: transportDay,
    }
    arrReturnAddressData.push(returnAddressData);
    console.log("返回选中地址数组：" + arrReturnAddressData);
    wx.setStorageSync('AddressData', arrReturnAddressData);
    console.log("返回选中地址数组（转换）------->："+JSON.stringify(arrReturnAddressData));
    //当前页面栈
    var pages = getCurrentPages();
    if (pages.length > 1) {
      var beforePage = pages[pages.length - 2];
      //调用上一个页面的onLoad()方法
      beforePage.updateAddress();
    }
    wx.navigateBack({
      //返回的页面数
      delta: 1
    })
    
//     let pages = getCurrentPages();  // 当前页的数据，可以输出来看看有什么东西
//     let prevPage = pages[pages.length - 2];  // 上一页的数据，也可以输出来看看有什么东西
//     /** 设置数据 这里面的 value 是上一页你想被携带过去的数据，
// 后面是本方法里你得到的数据，我这里是detail.value，根据自己实际情况设置 */
//     prevPage.setData({
//       value: detail.value,
//     })
//     /** 返回上一页 这个时候数据就传回去了 可以在上一页的onShow方法里把 value 输出来查看是否已经携带完成 */
//     wx.navigateBack({})
    // wx.navigateBack({
    //   success: function () {      
    //     if (page.route == "pages/confirmOrder/confirmOrder") {
    //       page.updateAddress(_id);
    //     }
    //   }
    // })
  },

  addNewAddress:function() {
    wx.navigateTo({
      url: '../addNewAddress/addNewAddress',
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  updateAddress: function () {
    this.setData({
      address: app.globalData.address
    })
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