// // pages/cart/cart.js

// // pages/cart/index.js
// Page({
//     data: {
//       carts: [],               // 购物车列表
//       hasList:false,          // 列表是否有数据
//       totalPrice:0,           // 总价，初始为0
//       selectAllStatus:true,    // 全选状态，默认全选
//       obj: {
//         name:"hello"
//     }
//     },
//     onShow() {
//     this.setData({
//       hasList: true,
//       carts: [
//         { id: 1, title: '新鲜芹菜 半斤', image: '/image/s5.png', num: 4, price: 0.01, selected: true },
//         { id: 2, title: '素米 500g', image: '/image/s6.png', num: 1, price: 0.03, selected: true }
//       ]
//     });
//     this.getTotalPrice();
//   },
//   /**
//    * 当前商品选中事件
//    */
//   selectList(e) {
//     const index = e.currentTarget.dataset.index;
//     let carts = this.data.carts;
//     const selected = carts[index].selected;
//     carts[index].selected = !selected;
//     this.setData({
//       carts: carts
//     });
//     this.getTotalPrice();
//   },

//   /**
//    * 删除购物车当前商品
//    */
//   deleteList(e) {
//     const index = e.currentTarget.dataset.index;
//     let carts = this.data.carts;
//     carts.splice(index, 1);
//     this.setData({
//       carts: carts
//     });
//     if(!carts.length) {
//       this.setData({
//         hasList: false
//       });
//     }else{
//       this.getTotalPrice();
//     }
//   },

//   /**
//    * 购物车全选事件
//    */
//   selectAll(e) {
//     let selectAllStatus = this.data.selectAllStatus;
//     selectAllStatus = !selectAllStatus;
//     let carts = this.data.carts;

//     for(let i = 0; i<carts.length; i++) {
//   carts[i].selected = selectAllStatus;
// }
// this.setData({
//   selectAllStatus: selectAllStatus,
//   carts: carts
// });
// this.getTotalPrice();
//   },

// /**
//  * 绑定加数量事件
//  */
// addCount(e) {
//   const index = e.currentTarget.dataset.index;
//   let carts = this.data.carts;
//   let num = carts[index].num;
//   num = num + 1;
//   carts[index].num = num;
//   this.setData({
//     carts: carts
//   });
//   this.getTotalPrice();
// },

// /**
//  * 绑定减数量事件
//  */
// minusCount(e) {
//   const index = e.currentTarget.dataset.index;
//   const obj = e.currentTarget.dataset.obj;
//   let carts = this.data.carts;
//   let num = carts[index].num;
//   if (num <= 1) {
//     return false;
//   }
//   num = num - 1;
//   carts[index].num = num;
//   this.setData({
//     carts: carts
//   });
//   this.getTotalPrice();
// },

// /**
//  * 计算总价
//  */
// getTotalPrice() {
//   let carts = this.data.carts;                  // 获取购物车列表
//   let total = 0;
//   for (let i = 0; i < carts.length; i++) {         // 循环列表得到每个数据
//     if (carts[i].selected) {                     // 判断选中才会计算价格
//       total += carts[i].num * carts[i].price;   // 所有价格加起来
//     }
//   }
//   this.setData({                                // 最后赋值到data中渲染到页面
//     carts: carts,
//     totalPrice: total.toFixed(2)
//   });
// }


Page({

  data: {
    carts: [],               // 购物车列表
    // hasList:false,          // 列表是否有数据
    // totalPrice:0,           // 总价，初始为0
    // selectAllStatus:true,    // 全选状态，默认全选
    iscart: false,
    hidden: null,
    isAllSelect: false,
    totalMoney: 0,
    integral:0,
    obj: {
      name: "hello"
    },
    cartData:{}
  },
  // onLoad:function(options){
  //   console.log("这是cart页面---->"+options.integralOffsetCash);
  //   // 获取产品展示页保存的缓存数据（购物车的缓存数组，没有数据，则赋予一个空数组）
  //   var arr = wx.getStorageSync('cart') || [];
  //   console.info("购物车缓存数据：" + arr);
  //   var arr2 = JSON.stringify(arr);
  //   console.log("在cart的index.js转换从details.js传送过来的arr缓存数组----->" + arr2);
  //   // 有数据的话，就遍历数据，计算总金额 和 总数量  
  //   if (arr.length > 0) {
  //     //更新数据
  //     this.setData({
  //       carts: arr,
  //       iscart: true,
  //       hidden: false
  //     });
  //     console.info("缓存数据：" + this.data.carts);
  //     var transformCarts = JSON.stringify(this.data.carts);
  //     console.log("转换后的carts----->" + transformCarts);
  //   } else {
  //     this.setData({
  //       iscart: false,
  //       hidden: true,
  //     });
  //   }
  // },

  onShow: function () {
    // 获取产品展示页保存的缓存数据（购物车的缓存数组，没有数据，则赋予一个空数组）
    var arr = wx.getStorageSync('cart') || [];
    console.info("购物车缓存数据：" + arr);
    var arr2 = JSON.stringify(arr);
    console.log("在cart的index.js转换从details.js传送过来的arr缓存数组----->" + arr2);
    // 有数据的话，就遍历数据，计算总金额 和 总数量  
    if (arr.length > 0) {
      //更新数据
      this.setData({
        carts: arr,
        iscart: true,
        hidden: false
      });
      console.info("缓存数据：" + this.data.carts);
      var transformCarts = JSON.stringify(this.data.carts);
      console.log("转换后的carts----->" + transformCarts);
    } else {
      this.setData({
        iscart: false,
        hidden: true,
      });
    }
  },

  //勾选事件处理函数
  switchSelect: function (e) {
    // 获取item项的id，和数组的下标值 
    var Allprice = 0, i = 0,culIntegral=0;
    let _id = e.target.dataset.id;
    let carts = this.data.carts;
    var index = parseInt(e.target.dataset.index);
    //统计价钱
    const isSelect = carts[index].isSelect;
    carts[index].isSelect = !isSelect;
    if (this.data.carts[index].isSelect) {
      this.data.totalMoney = this.data.totalMoney + (carts[index].goodPrice * carts[index].count);

      this.data.integral = this.data.integral + (carts[index].integral * carts[index].count);

    } else {
      this.data.totalMoney = this.data.totalMoney - (carts[index].goodPrice * carts[index].count);

      this.data.integral = this.data.integral - (carts[index].integral * carts[index].count);

    }
    //是否全选
    for (i = 0; i < carts.length; i++) {
      Allprice = Allprice + (carts[index].goodPrice * carts[index].count);

      culIntegral = culIntegral + (carts[index].integral * carts[index].count);

    }
    if (Allprice == this.data.totalMoney) {
      this.data.isAllSelect = true;
    } else {
      this.data.isAllSelect = false;
    }
    this.setData({
      carts: carts,
      totalMoney: this.data.totalMoney,
      isAllSelect: this.data.isAllSelect,
      integral:this.data.integral
    })
  },

  //全选
  allSelect: function (e) {
    // var index = e.currentTarget.dataset.index;
    let carts = this.data.carts;
    let i = 0;
    //处理全选逻辑
    if (!this.data.isAllSelect) {
      this.data.totalMoney = 0;

      this.data.integral=0;

      for (i = 0; i < carts.length; i++) {
        carts[i].isSelect = true;
        this.data.totalMoney = this.data.totalMoney + (carts[i].goodPrice * carts[i].count);
        this.data.integral = this.data.integral + (carts[i].integral * carts[i].count);
        console.log("商品" + i + "的价格为：" + carts[i].goodPrice);
        console.log("商品" + i + "的数量为：" + carts[i].count);
      }
    } else {
      for (i = 0; i < carts.length; i++) {
        carts[i].isSelect = false;
      }
      this.data.totalMoney = 0;
      this.data.integral=0;
    }
    this.setData({
      carts: carts,
      isAllSelect: !this.data.isAllSelect,
      totalMoney: this.data.totalMoney,

      integral:this.data.integral

    })
  },

  //结算
  toBuy() {
    wx.showToast({
      title: '结算',
      icon: 'success',
      duration: 3000
    });
    this.setData({
      showDialog: !this.data.showDialog
    });
  },

  //删除item
  delGoods: function (e) {
    //获取购物车列表
    let carts = this.data.carts;
    // var Goods = this.data.Goods;
    // var name = this.data.Goods.goodName;
    // 更新data数据对象
    /*
    *第一个参数index：整数，规定了添加/删除元素的位置，使用负数可从数组结尾处规定位置
    *第二个参数：要删除的元素的数量
    */
    carts.splice(e.target.id.substring(3), 1);
    if (carts.length > 0) {
      this.setData({
        carts: this.data.carts
      })
      wx.setStorageSync('cart', carts);
      this.priceCount();
    } else {
      this.setData({
        cart: this.data.carts,
        iscart: false,
        hidden: true,
      })
      wx.setStorageSync('cart', []);
    }
  },

  turnToIndex: function (e) {
    console.log("跳转到index页面");
    wx.switchTab({
      url: '../index/index'
    })
  },


  //数量减少
  delCount: function (e) {
    // var index=e.target.dataset.index;
    var index = e.currentTarget.dataset.index;
    console.log("当前选中的商品下标为：" + index);
    let carts = this.data.carts;
    //获取当前数量
    var count = carts[index].count;
    //如果数量>1则减少
    if (count > 1) {
      count--;
      console.log("数量-1");
    }
    else if (count == 1) {
      wx.showToast({
        title: '不能再减少啦',
        icon: "none",
        duration: 2000
      })
    }
    carts[index].count = count;
    //将数值与状态写回
    this.setData({
      carts: carts
    });
    console.log("carts:" + this.data.carts);
    console.log("数值+1后的购物车列表:" + JSON.stringify(carts));
    this.priceCount();
    this.integralCount();
  },

  //数量增加
  addCount: function (e) {
    // var index=e.target.dataset.index;
    var index = e.currentTarget.dataset.index;
    let carts = this.data.carts;
    //获取当前数量
    var count = carts[index].count;
    if (count < 10) {
      count++;
    }
    carts[index].count = count;
    this.setData({
      carts: carts
    });
    console.log("数量+1");
    console.log("carts:" + carts);
    console.log("数值+1后的购物车列表:" + JSON.stringify(carts));
    this.priceCount();
    this.integralCount();
  },

  //计算总价
  priceCount: function (e) {
    let carts = this.data.carts;
    let total = 0;
    for (let i = 0; i < carts.length; i++) {
      if (carts[i].isSelect) {
        total = total + (carts[i].count * carts[i].goodPrice);
      }
    }
    this.setData({
      carts: carts,
      totalMoney:total
      // totalMoney: total.toFixed(2)
    })
  },

  //计算总积分
  integralCount: function (e) {
    let carts = this.data.carts;
    let sumIntegral = 0;
    for (let i = 0; i < carts.length; i++) {
      if (carts[i].isSelect) {
        sumIntegral = sumIntegral + (carts[i].count * carts[i].integral);
      }
    }
    this.setData({
      carts: carts,
      // totalMoney: total,
      integral: sumIntegral
      // totalMoney: total.toFixed(2)
    })
  },


  //结算
  checkout:function(e){
    console.log("您点击了结算");
    let carts = this.data.carts;
    //获取总价,总积分
    var totalMoney =this.data.totalMoney;
    var integral=this.data.integral;
    console.log(totalMoney+integral);
    var cartData={};
    var arrConfirmOrder = [];
    //遍历购物车数组
    for (let i = 0; i < carts.length; i++) {      
        //如果遍历到被勾选的商品，则获取相关数据
        if (carts[i].isSelect) {
          cartData={
            count: carts[i].count,
            goodImg: carts[i].goodImg,
            goodName: carts[i].goodName,
            goodPrice: carts[i].goodPrice
          }          
          arrConfirmOrder.push(cartData);         
        }
        // arrConfirmOrder.push(cartData);
        console.log("确认订单的数组" + arrConfirmOrder);
      wx.setStorageSync('confirmOrder', arrConfirmOrder)
        // var count = {count:carts[i].count};
        // var goodImg = {goodImg:carts[i].goodImg};
        // var goodName = {goodName:carts[i].goodName};
        // var goodPrice = {goodPrice:carts[i].goodPrice};     
        // console.log("选中的商品名:" + goodName + "图片：" + goodImg + "数量：" + count + "价格：" + goodPrice);        
    }   
    console.log("准备进入确认订单界面");
    // var arrConfirmOrder=[];
    // arrConfirmOrder.push(cartData);
    console.log("确认订单的数组" + arrConfirmOrder);
    console.log("最后，把购物车数据，存放入缓存");
    // wx.setStorageSync('order', arrConfirmOrder)
    wx.navigateTo({
      url: '../confirmOrder/confirmOrder?totalMoney=' + totalMoney + '&integral=' + integral,
    });
  },

  


  // //结算总价
  // priceCount:function(e){
  //   this.data.totalMoney = 0;
  //   // let totalMoney=this.data.totalMoney;
  //   // console.log("总价:"+this.data.totalMoney);
  //   // let totalMoney=0;
  //   //获取购物车列表
  //   let carts = this.data.carts;
  //   for(let i=0;i<this.data.length;i++){
  //     //如果被选中才计算价格
  //     if(carts[i].isSelect==true){
  //       //所有价格
  //       this.data.totalMoney = this.data.totalMoney + (carts[i].goodPrice * carts[i].count);
  //       // totalMoney == this.data.totalMoney + (carts[i].goodPrice * carts[i].count);
  //     }
  //   }
  //   //数值回写
  //   this.setData({
  //     totalMoney:this.data.totalMoney,
  //     // carts:carts,
  //     // totalMoney: this.data.totalMoney,
  //   })
  // },

  

  




})