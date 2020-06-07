// pages/update/update.js
var app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    Goods: []
  },
  //上传图片
  gotoShow:function(){
    var _this = this
    wx.chooseImage({
      count: 9, // 最多可以选择的图片张数，默认9
      sizeType: ['original', 'compressed'], // original 原图，compressed 压缩图，默认二者都有
      sourceType: ['album', 'camera'], // album 从相册选图，camera 使用相机，默认二者都有
      success: function (res) {
        // success
        console.log(res)
        _this.setData({
          src: res.tempFilePaths
        })
      },
      fail: function () {
        // fail
      },
      complete: function () {
        // complete
      }
    })
  },

  update: function (e) {
    var pages ;
    const db = wx.cloud.database()
    // console.log(_id)
    let Goods = e.detail.value
    console.log(Goods);
    console.log("修改后的图片："+this.data.src);
    db.collection("Goods").doc(Goods._id).update({
      data: {
        goodName: Goods.goodName,
        goodDesc: Goods.goodDesc,
        goodPrice: parseFloat(Goods.goodPrice),
        goodImg : this.data.src,
        goodType:Goods.goodType,
        integral:Goods.integral
      }, success: res => {
        wx.showToast({
          title: '修改记录成功',
        }),
        // pages = getCurrentPages();//获取页面栈
        // if (pages.length > 1) {
        //   //上一个页面实例对象
        //   var prePage = pages[pages.length - 2];
        //   //调用上一个页面的onShow方法
        //   prePage.onShow()
        // }
        pages = getCurrentPages();
        if (pages.length > 1) {
          //上一个页面实例对象
          var prePage = pages[pages.length - 2];
          //关键在这里
          prePage.onLoad()
        }
        
        // wx.navigateTo({
        //   url: '../index/index',
        // })
        // wx.switchTab({
        //   url: '../index/index'
        // })
            wx.navigateBack({
              url: '../index/index'
          })
      }, fail: err => {
        wx.showToast({
          title: '修改失败',
        })
      }
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {   
    console.log('index传来的_id值是' + options._id);
    if (options._id) {
      const db = wx.cloud.database();
      db.collection("Goods").where({
        _id: options._id
      }).get({
        success: res => {
          this.setData({
            Goods: res.data[0]//返回的是一个数组，取第一个
          })
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