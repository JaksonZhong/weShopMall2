//index.js
//获取应用实例
const app = getApp()

Page({
  
  data: {
    imgUrls: [
      'cloud://firstdemo-gppan.6669-firstdemo-gppan-1300829064/images/tv.jpg',
      'cloud://firstdemo-gppan.6669-firstdemo-gppan-1300829064/images/i11.png',
      'cloud://firstdemo-gppan.6669-firstdemo-gppan-1300829064/images/banner3.jpg'
    ],
    indicatorDots: false,
    autoplay: false,
    interval: 3000,
    duration: 800,
    textColor: "#FF0000"
  },
  // 点击事件
  search: function (e) {
    console.log("eeee");
  },
  /**
  * 生命周期函数--监听页面加载
  */
  onLoad: function (options) {
    const db = wx.cloud.database()

    // db.collection("indexPic").get({
    //   success: res => {
    //     this.setData({
    //       indexPic: res.data
    //     })
    //   }, fail: err => {
    //     wx.showToast({
    //       icon: "none",
    //       title: '查询记录失败',
    //     })
    //   }
    // })
    var goodType="热销商品";
    db.collection("Goods").where({
      goodType: goodType
    }).get({
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
  goSet: function () {
    wx.navigateTo({
      url: '../set/set',
    })
  },
  // onUpdate:function(){
  //     wx.navigateTo({
  //       url: '../update/update',
  //     })
  // },
  onUpdate: function (e) {
    let _id = e.currentTarget.dataset.id
    console.log(_id)
    wx.navigateTo({
      url: '../update/update?_id=' + _id,
    })
  },
  
  //详情
  details: function (e) {
    let _id = e.currentTarget.dataset.id
    console.log('商品ID：' + _id)
    wx.navigateTo({
      url: '../details/details?_id=' + _id,
    })
  },
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
    console.log('被删除的_id:'+_id)
  },
  


  onQuery: function () {
    const db = wx.cloud.database()
    // 查询当前用户所有的 counters
    db.collection('Goods').where({
      _openid: this.data.openid
    }).get({
      success: res => {
        console.log(res);
        this.setData({
          queryResult: JSON.stringify(res.data, null, 2)
        })
        console.log('[数据库] [查询记录] 成功: ', res)
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '查询记录失败'
        })
        console.error('[数据库] [查询记录] 失败：', err)
      }
    })
  },

  onshow: function () {
    this.onLoad();
  },
  changeIndicatorDots: function (e) {
    this.setData({
      indicatorDots: !this.data.indicatorDots
    })
  },
  changeAutoplay: function (e) {
    this.setData({
      autoplay: !this.data.autoplay
    })
  },
  intervalChange: function (e) {
    this.setData({
      interval: e.detail.value
    })
  },
  durationChange: function (e) {
    this.setData({
      duration: e.detail.value
    })
  }
    
    // wx.redirectTo( {
    //   url: '../set/set',
    // }),
    // wx.switchTab({
    //   url: '../my/index'
    // }),
    // wx.navigateTo({
    //   url: "../detail/detail?id=" + event.currentTarget.dataset.id,//url跳转地址
    //   success: function (res) {
    //     console.log(res)
    //   },
    //   fail: function (res) {
    //     console.log(res)
    //   }
    // })

})




// Component({
//   data: {
//     background: ['demo-text-1', 'demo-text-2', 'demo-text-3'],
//     indicatorDots: true,
//     vertical: true,
//     autoplay: true,
//     interval: 2000,
//     duration: 300
//   },
// })
