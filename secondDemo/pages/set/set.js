var app = getApp()
var util = require('../../utils/util.js')
Page({

data:{
  Goods: []
},
  /**
    * 生命周期函数--监听页面加载
    */
  onLoad: function (options) {
    if (options.id) {
      const db = wx.cloud.database();
      db.collection("Goods").where({
        _id: options.id
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
  // comfirm: function (e) {
  //   const db = wx.cloud.database()//打开数据库连接
  //   let Goods = e.detail.value
  //   if (Goods.id == "") {//id等于空是新增数据
  //     this.add(db, Goods) //新增记录
  //   } else {
  //     this.update(db, Goods) //修改记录
  //   }
  // },

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

//添加事件
  addGoods: function (e) {
    var pages;
    const db = wx.cloud.database()
    let Goods = e.detail.value;
    console.log("图片路径" + this.data.src);
   

    db.collection("Goods").add({
      data: {
        goodName: Goods.goodName,
        goodDesc: Goods.goodDesc,
        goodPrice: parseFloat(Goods.goodPrice),
        // goodImg: Goods.goodImg,
        goodImg:this.data.src,
        goodType:Goods.goodType,
        integral:Goods.integral
      }, success: res => {
        wx.showToast({
          title: '新增记录成功',
        })
        console.log("addStart");
        // wx.navigateTo({
        //   url: '../index/index',
        // })
        pages = getCurrentPages();
        if (pages.length > 1) {
          //上一个页面实例对象
          var prePage = pages[pages.length - 2];
          //关键在这里
          prePage.onLoad()
        }
        wx.navigateTo({
          url: '../backAdmin/backAdmin'
        })
        index.refresg()
      }, fail: err => {
        wx.showToast({
          title: '新增失败',
        })
      }
    })
  }
  // update: function (db, Goods) {
  //   db.collection("Goods").doc(Goods._id).update({
  //     data: {
  //       goodName: Goods.goodName,
  //       goodDesc: Goods.goodDesc,
  //       goodPrice: parseFloat(Goods.goodPrice)
  //     }, success: res => {
  //       wx.showToast({
  //         title: '修改记录成功',
  //       }),
  //       // wx.navigateTo({
  //       //   url: '../index/index',
  //       // })
  //       wx.switchTab({
  //         url: '../index/index'
  //       })
  //     }, fail: err => {
  //       wx.showToast({
  //         title: '修改失败',
  //       })
  //     }
  //   })
  // } 

})