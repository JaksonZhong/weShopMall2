// pages/quanyi/quanyi.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    banner: [
      {
        bgUrl: '../../images/banner5.jpg',
      },
      {
        bgUrl: '../../images/banner6.jpg',
      }
    ],
    products: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (e) {
    var type="积分商品";    
      const db = wx.cloud.database();
      db.collection("Goods").where({
        goodType: type
      }).get({
        success: res => {
          this.setData({
            products: res.data
          })
        }, fail: err => {
          wx.showToast({
            icon: "none",
            title: '查询记录失败',
          })
        }
      })
    
    //查询该用户的积分信息
    var _id = "01ace4015df5f3cf0385c48f110edcaa";
    db.collection("user").where({
      _id: _id
    }).get({
      success: res => {
        var integral = res.data[0].integral;
        var level = res.data[0].level;
        var sumIntegral = res.data[0].sumIntegral;
        //使用积分抵换价格
        var integralOffsetCash = parseInt(integral) * 0.1;
        console.log("可以抵换的价格：" + integralOffsetCash);
        //最大抵换价格为30
        if (integralOffsetCash>30){
          integralOffsetCash=30;
        }
        var maxOffset=0;
        var goodPrice=0;
        // var maxOffset=0;
        // let products = this.data.products;
        // for (var i = 0; i < products.length; i++) {
        //   goodPrice=products[i].goodPrice;
        //   console.log("积分商品的原价："+goodPrice);
        //   maxOffset = goodPrice - integralOffsetCash;
        //   //获取商品_id
        //   let _id = e.currentTarget.dataset.id
        //   console.log('商品ID：' + _id);

        //   const db = wx.cloud.database()
        //   db.collection("Goods").doc(_id).update({
        //     data: {
        //       maxOffset: maxOffset
        //     }, success: res => {

        //     }, fail: err => {
        //       wx.showToast({
        //         title: '新增失败',
        //       })
        //     }
        //   })
        // }

        this.setData({
          integralOffsetCash: integralOffsetCash,
          maxOffset:maxOffset
        })
      }, fail: err => {
        console.log(err)
      }
    })
   
  },

  //查看积分商品详情
  goGoodsDetail:function(e){
    let _id = e.currentTarget.dataset.id
    console.log('商品ID：' + _id);
    var integralOffsetCash = this.data.integralOffsetCash;
    console.log("抵换积分后的价格：" + integralOffsetCash);
    // wx.navigateTo({
    //   url: '../confirmOrder/confirmOrder',
    // })
    wx.navigateTo({
      url: '../integralDetail/integralDetail?_id=' + _id + "&integralOffsetCash=" + integralOffsetCash,
    })
  },


  // test:function(){   
  //   //查询该用户的积分信息
  //   var _id = "01ace4015df5f3cf0385c48f110edcaa";
  //   const db = wx.cloud.database();
  //   db.collection("user").where({
  //     _id: _id
  //   }).get({
  //     success: res => {
  //       var integral = res.data[0].integral;
  //       var level = res.data[0].level;
  //       var sumIntegral = res.data[0].sumIntegral;
  //       console.log("11");
  //       //使用积分抵换价格
  //       var integralOffsetCash = parseInt(integral) * 0.1;
  //       console.log("可以抵换的价格：" + integralOffsetCash);
  //       this.setData({
  //         integralOffsetCash: integralOffsetCash
  //       })
  //     }, fail: err => {
  //       console.log(err)
  //     }
  //   })
  // },

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