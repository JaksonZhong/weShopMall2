//app.js
App({
  onLaunch: function () {

    wx.cloud.init();

    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null,
    address:[]
  },
  initUserInfo() {
    return new Promise((resolve, reject) => {
      console.log("app.js个人信息:"+JSON.stringify(this.globalData.userInfo))
      // if (this.globalData.userInfo != null) {
      //   resolve()
      //   return
      // }
      console.log("连接数据库");
      const db = wx.cloud.database();
      console.log("获取数据");
      const userCollection = db.collection('user');
      userCollection.get().then((res) => {
        if (res.data.length == 0) {
          let data = {
            "integral": 0,
            "level": 1,
            "sumIntegral": 0
          }
          console.log("将积分信息加入数据库中" + data);
          userCollection.add({
            data: data
          }
          
          ).then(() => {
            this.globalData.userInfo = data
            resolve()
          }).catch((res) => {
            console.log(res)
            reject()
          })
          
        } else {

          this.globalData.userInfo = res.data[0]
          resolve()
        }
      }).catch(() => {
        reject()
      })
    })

  }
})