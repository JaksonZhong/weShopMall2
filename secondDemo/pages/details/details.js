// page/component/details/details.js
var goods = null;
var goodsId = null;
Page({
  data:{
    textColor: "#FF0000",
    goods: {
      id: 1,
      image: '/image/goods1.png',
      title: '新鲜梨花带雨',
      price: 0.01,
      stock: '有货',
      detail: '这里是梨花带雨详情。',
      parameter: '125g/个',
      service: '不支持退货'
    },
    num: 1,
    count:1,
    totalNum: 0,
    hasCarts: false,
    curIndex: 0,
    show: false,
    scaleCart: false,
    goods: null
  },
  isLike: true,
  showDialog: false, 

  addCount() {
    let count = this.data.count;
    count++;
    this.setData({
      count: count
    })
  },
  substractCount() {
    let count = this.data.count;
    if (count>1){
      count--;
    }
    this.setData({
      count: count
    })
  },

  bindTap(e) {
    const index = parseInt(e.currentTarget.dataset.index);
    this.setData({
      curIndex: index
    })
  },

  onLoad:function(options){
    console.log('index传送给details商品_id值是' + options._id);
    var that=this;
    // that.goodsInfoShow();
    if (options._id) {
      const db = wx.cloud.database();
      db.collection("Goods").where({
        _id: options._id
      }).get({
        success: res => {
          this.setData({
            Goods: res.data[0],//返回的是一个数组，取第一个
            // Goods:Goods           
          })
          console.log("这是"+Goods.goodName+"的详情页面")
        }, fail: err => {
          console.log(err)
        }
      })
    }
  },

  checkCart:function(){
    console.log('查看购物车信息'); 
    wx.switchTab({
      url: '../cart/cart'
    })
  },

  //加入购物车
  addCart:function(e){
    let _id = e.currentTarget.dataset.id
    console.log('从details传送到cart的商品ID：' + _id)    
    var that = this;
    if (_id) {
      const db = wx.cloud.database();
      db.collection("Goods").where({
        _id: _id
      }).get({
        success: res => {
          this.setData({
            Goods: res.data[0],//返回的是一个数组，取第一个       
          })
          console.log(Goods.name)
        }, fail: err => {
          console.log(err)
        }
      })
    }
    var Goods=this.data.Goods;
    //购物车商品默认没被选中
    Goods.isSelect=false;
    console.log("Goods的信息是："+Goods);
    // var count=this.data.Goods.count;
    // var name=this.data.Goods.name;
    //获取加入购物车的数量
    let count = this.data.count;
    Goods.count=count;
    var name = this.data.Goods.goodName;
    var imgUrl=this.data.Goods.goodImg;
    var integral=this.data.Goods.integral;
    console.log('从details传送到cart的商品count数量：' + count)
    console.log('从details传送到cart的商品Goods.count数量：' + Goods.count)
    console.log('从details传送到cart的商品name名称：' + name)
    console.log('从details传送到cart的商品imgUrl图片路径' + imgUrl)
    //获取购物车的缓存数组（没有数据，则赋予一个空数组）
    var arr=wx.getStorageSync("cart")||[];
    console.log("arr,{}",arr);
    if(arr.length>0){
      //遍历购物车数组
      for(var j in arr){
          // 判断购物车内的item的id，和事件传递过来的id，是否相等  
          if(arr[j]._id==_id){
              // 如果购物车已有同样的商品，则给购物车同样商品的数量再+从详情页面传送来的count
              arr[j].count=arr[j].count+count;
              // 最后，把购物车数据，存放入缓存（此处不用再给购物车数组push元素进去，因为这个是购物车有的，直接更新当前数组即可）
              try {
                console.log("如果购物车有同样的商品，则数量+1，再放入到购物村cart");
                wx.setStorageSync('cart', arr);
                console.log("放入购物车的缓存数组"+arr);
                var arr2 = JSON.stringify(arr);
                console.log("有同样商品转后的的放入购物车的缓存数组arr------>" + arr2);
              }catch(e){
                console.log(e)
              }
              //关闭窗口
              wx.showToast({
                  title: '加入购物车成功',
                  icon:'success',
                  duration:2000
               });
              // 返回（在if内使用return，跳出循环节约运算，节约性能） 
              return;
          }
      }
      // 遍历完购物车后，没有对应的item项，把goodslist的当前项放入购物车数组
      console.log("遍历完购物车后，没有对应的item项，把goodslist的当前项放入购物车数组");
      arr.push(Goods);
    }else{
        //如果购物车没有数据，则直接将Goods的信息放入到数组缓存
        console.log("如果购物车没有数据，则直接将Goods的信息放入到数组缓存");
        arr.push(Goods);
    }
    // 最后，把购物车数据，存放入缓存
    try{
        console.log("最后，把购物车数据，存放入缓存");
        wx.setStorageSync('cart',arr)
        console.log("存放在缓存的数组数据："+arr)
        var arr2 = JSON.stringify(arr);
        console.log("最后转后的的放入购物车的缓存数组arr------>" + arr2);
        // 返回（在if内使用return，跳出循环节约运算，节约性能） 
        //关闭窗口
        wx.showToast({
            title: '加入购物车成功！',
            icon: 'success',
            duration: 2000
        });
        // this.closeDialog();
        return;
    }catch(e){
        console.log(e)
    }
  },
  
  // addToCart:function(e){       
  //   let _id = e.currentTarget.dataset.id
  //   console.log('加入购物车的商品ID：' + _id)
  //     wx.navigateTo({
  //       url: '../cart/index?_id=' + _id,
  //     })   
  // },

  //点击我显示底部弹出框
  // clickme: function () {
  //   this.showModal();
  // },

  // //显示对话框
  // showModal: function () {
  //   // 显示遮罩层
  //   var animation = wx.createAnimation({
  //     duration: 200,
  //     timingFunction: "linear",
  //     delay: 0
  //   })
  //   this.animation = animation
  //   animation.translateY(300).step()
  //   this.setData({
  //     animationData: animation.export(),
  //     showModalStatus: true
  //   })
  //   setTimeout(function () {
  //     animation.translateY(0).step()
  //     this.setData({
  //       animationData: animation.export()
  //     })
  //   }.bind(this), 200)
  // },
  // //隐藏对话框
  // hideModal: function () {
  //   // 隐藏遮罩层
  //   var animation = wx.createAnimation({
  //     duration: 200,
  //     timingFunction: "linear",
  //     delay: 0
  //   })
  //   this.animation = animation
  //   animation.translateY(300).step()
  //   this.setData({
  //     animationData: animation.export(),
  //   })
  //   setTimeout(function () {
  //     animation.translateY(0).step()
  //     this.setData({
  //       animationData: animation.export(),
  //       showModalStatus: false
  //     })
  //   }.bind(this), 200)
  // },


  // immeBuy() {
  //   wx.showToast({
  //     title: '购买成功',
  //     icon: 'success',
  //     duration: 2000
  //   });
  // },
  // /**
  //    * sku 弹出
  //    */
  // toggleDialog: function () {
  //   this.setData({
  //     showDialog: !this.data.showDialog
  //   });
  // },
  // /**
  //  * sku 关闭
  //  */
  // closeDialog: function () {
  //   console.info("关闭");
  //   this.setData({
  //     showDialog: false
  //   });
  // },
  // /* 减数 */
  // delCount: function (e) {
  //   console.log("刚刚您点击了减一");
  //   var count = this.data.quantity1.quantity;
  //   // 商品总数量-1
  //   if (count > 1) {
  //     count -= 1;
  //   }
  //   // 只有大于一件的时候，才能normal状态，否则disable状态  
  //   var delStatus = count <= 1 ? 'disabled' : 'normal';
  //   // 只有大于10件的时候，才能normal状态，否则disable状态  
  //   var addStatus = count >= 10 ? 'disabled' : 'normal';
  //   // 将数值与状态写回  
  //   this.setData({
  //     quantity1: {
  //       quantity: count,
  //       delStatus: delStatus,
  //       addStatus: addStatus
  //     }
  //   });
  // },
  // /* 加数 */
  // addCount: function (e) {
  //   console.log("刚刚您点击了加一");
  //   var count = this.data.quantity1.quantity;
  //   // 商品总数量-1  
  //   if (count < 10) {
  //     count += 1;
  //   }

  //   // 只有大于一件的时候，才能normal状态，否则disable状态  
  //   var delStatus = count <= 1 ? 'disabled' : 'normal';
  //   // 只有大于10件的时候，才能normal状态，否则disable状态  
  //   var addStatus = count >= 10 ? 'disabled' : 'normal';
  //   // 将数值与状态写回  
  //   this.setData({
  //     quantity1: {
  //       quantity: count,
  //       delStatus: delStatus,
  //       addStatus: addStatus
  //     }
  //   });
  // },
  // /* 输入框事件 */
  // bindManual: function (e) {
  //   var count = this.data.quantity1.quantity;
  //   // 将数值与状态写回  
  //   this.setData({
  //     count: count
  //   });
  // },
  // /**
  //  * 加入购物车
  //  */
  // addCar: function (e) {
  //   console.log(e.target.dataset.goodid);
  //   wx.showToast({
  //     title: '加入购物车成功',
  //     icon: 'success',
  //     duration: 2000
  //   });
  //   console.info("关闭");
  //   this.setData({
  //     showDialog: false
  //   });
  // },
  // // 收藏
  // addLike() {
  //   this.setData({
  //     isLike: !this.data.isLike
  //   });
  // },
  // // 跳到购物车
  // toCar() {
  //   wx.switchTab({
  //     url: '/pages/cart/cart'
  //   })
  // },
  // // 立即购买
  // immeBuy() {
  //   wx.showToast({
  //     title: '购买成功',
  //     icon: 'success',
  //     duration: 2000
  //   });
  // },
 
})