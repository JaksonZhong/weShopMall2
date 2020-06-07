// pages/confirmOrder/confirmOrder.js
// 在需要使用的js文件中，导入js
var util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    order:[],
    hasAddress: false,
    user:[]
    // address: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("确认订单页面***********************************************");
    // console.log('cart传送给confirmOrder的参数值是' + options.goodName + options.goodImg + "价格："+options.goodPrice + "数量"+options.count + "总价"+options.totalMoney);
    var arrConfirmOrder=wx.getStorageSync('confirmOrder');
    console.info("购物车缓存数据：" + arrConfirmOrder);
    var arr2 = JSON.stringify(arrConfirmOrder);
    console.log("在cart的cart.js转换从confirmOrder.js传送过来的arrConfirmOrder缓存数组----->" + arr2);
    var totalMoney=options.totalMoney;
    var integral=options.integral;

    if (arrConfirmOrder.length > 0) {
      //更新数据
      this.setData({
        order: arrConfirmOrder,
        totalMoney:totalMoney,
        integral: integral
        // iscart: true,
        // hidden: false
      });
      console.info("缓存数据：" + this.data.order);
      var transformOrders = JSON.stringify(this.data.order);
      console.log("转换后的carts----->" + transformOrders);
    } 
  },

  //更新地址
  updateAddress: function (){
    console.log("这是确认订单页面***************************************************");
    var arrReturnAddressData = wx.getStorageSync('AddressData');
    console.info("选中地址缓存数据：" + arrReturnAddressData);
    var arr2 = JSON.stringify(arrReturnAddressData);
    console.log("在cart的cart.js转换从confirmOrder.js传送过来的arrConfirmOrder缓存数组----->" + arr2);
    if (arrReturnAddressData.length > 0) {
      //更新数据
      this.setData({
        address: arrReturnAddressData
      });
    }
    // console.info("缓存数据：" + this.data.address);
    var transformOrders = JSON.stringify(this.data.address);
    console.log("转换后的地址数据----->" + transformOrders);
  },

  //转到地址管理
  toAddress:function(){
    wx.navigateTo({
      url: '../address/address'
    })
  },

  //提交订单
  submitOrder:function(j){
    console.log("提交订单*******************");
    //获取address和order两个数组
    let address=this.data.address;
    let order=this.data.order;
    for (let i = 0; i < address.length; i++) {
      var receiveName = address[i].receiveName;
      var phone = address[i].phone;
      var transportDay=address[i].transportDay;
      var receiveAddress=address[i].address;
    }
    console.log("收件人:" + receiveName + "," + phone + "," + transportDay + "," + receiveAddress);
    for(var i=0;i<order.length;i++){
      // var _id=order[i]._id;
      var goodName = order[i].goodName;
      var goodPrice = order[i].goodPrice;
      var goodImg = order[i].goodImg;
      var count = order[i].count;
    }  
    console.log(goodName + "," + goodPrice + "," + goodImg + "," + count);
    // var receiveName = address.receiveName;
    // var phone = address.phone;
    // var receivename = e.currentTarget.dataset.receivename;    
    // var phone = e.currentTarget.dataset.phone;

    var totalMoney = this.data.totalMoney;
    var addIntegral=this.data.integral;
    console.log("积分是：" + addIntegral);
    console.log("订单价格："+totalMoney);

    // 调用函数时，传入new Date()参数，返回值是日期和时间
    var createTime = util.formatTime(new Date());
    console.log("创建当前时间："+createTime);

    var random_no = "";
    for (var i = 0; i < j; i++) //j位随机数，用以加在时间戳后面。
    {
      random_no += Math.floor(Math.random() * 10);
    }
    random_no = new Date().getTime() + random_no;    
    var timestamp = Date.parse(new Date());
    timestamp = timestamp / 1000;
    //获取当前时间
    var n = timestamp * 1000;
    var date = new Date(n);
    //年
    var Y = date.getFullYear();
    //月
    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
    //日
    var D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
    //时
    var h = date.getHours();
    //分
    var m = date.getMinutes();
    //秒
    var s = date.getSeconds();
    var orderNo = Y + M + D + h + m + s + random_no;
    console.log("订单号:" + orderNo);
    // this.data.remarksColumn = e.detail.value
    var remarksColumn = this.data.remarksColumn;
    console.log("备注：" + remarksColumn);
    //连接数据库
    const db=wx.cloud.database();    
    db.collection("order").add({
      data: {
        receiveName: receiveName,
        phone: phone,
        transportDay: transportDay,
        address: receiveAddress,
        goodName: goodName,
        goodPrice: goodPrice,
        goodImg: goodImg,
        count:count,
        totalMoney: totalMoney,
        integral: addIntegral,
        createTime: createTime,
        orderNo: orderNo,
        //未支付默认为0
        state:"未支付"
      },
      success: res => {
        wx.showToast({
          title: '添加订单成功',
          duration: 2000
        })
        console.log("addStart");
      }, fail: err => {
        wx.showToast({
          title: '新增失败',
        })
      }
    })

    //提交订单的同时，也将用户表的积分数据修改
    
    const userCollection = db.collection('user'); 
    var _id = "01ace4015df5f3cf0385c48f110edcaa";
    // var integral;
    // var level;
    // var user=userCollection.where({
    //   _id:_id
    // }).get({
    //   success: res => {
    //     console.log("查询user表数据成功")
    //     integral = res.data[0].integral;
    //     level = res.data[0].level;
    //     console.log("从user表查询的integral是：" + integral+","+level);
        
    //   }, fail: err => {
    //     console.log(err)
    //   }
    // })
    
    // console.log("user表的数据："+JSON.stringify(user));
    // let userInfo = {
    //   "integral": 0,
    //   "level": 1,
    //   "sumIntegral": 0
    //   // "_openid": event.addData._openid
    // }
    // if (level == 0){
    //   userCollection.add({
    //     data:userInfo
    //   })
    // }else{
    //   userInfo=user.data[0]
    // }
    let userInfo = {
      "integral": 0,
      "level": 1,
      "sumIntegral": 0
      // "_openid": event.addData._openid
    }
    //首先获取user集合的积分信息
    db.collection("user").where({
      _id: _id
    }).get({
      success: res => {
        userInfo.integral = res.data[0].integral;
        userInfo.level = res.data[0].level;
        userInfo.sumIntegral = res.data[0].sumIntegral;
        console.log("从user集合获取的积分数据："+userInfo.integral + "," + userInfo.level+","+userInfo.sumIntegral);

        userInfo.sumIntegral = parseInt(userInfo.sumIntegral) + parseInt(addIntegral);
        console.log("购买商品获得的积分" + addIntegral);
        console.log("userInfo.sumIntegral当前总积分:" + userInfo.sumIntegral);        
        userInfo.integral = parseInt(userInfo.integral) + parseInt(addIntegral);
        console.log("可用积分integral:" + userInfo.integral);
        userInfo.level = this.upgradeLevel(userInfo.integral)
        console.log("购买商品获得的积分:" + JSON.stringify(userInfo));

        db.collection('user').doc(_id).update({
          data: {
            integral: userInfo.integral,
            level: userInfo.level,
            sumIntegral: userInfo.sumIntegral
          }, success: res => {

          }, fail: err => {
            wx.showToast({
              title: '修改失败',
            })
          }
        })
      }, fail: err => {
        console.log(err)
      }
    })

    
    wx.navigateTo({
      url: '../myOrder/myOrder',
    })
  },
  
  upgradeLevel:function(integral){
    if (integral > 2400) {
      return 6
    } else if (integral > 1200) {
      return 5
    } else if (integral > 900) {
      return 4
    } else if (integral > 600) {
      return 3
    } else if (integral > 300) {
      return 2
    } else {
      return 1
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