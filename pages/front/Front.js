const {
  default: api
} = require("../../http/api")

// pages/front/Front.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    flag:0,
    books: [],
    _id: '',
    monthRank: '',
    totalRank: '',
    arr: [{
        name: '周榜'
      },
      {
        name: '月榜'
      },
      {
        name: '总榜'
      }
    ]
  },
  // 排行榜
  getrank(id) {
    api.rankInfo(id).then(res => {
      res.ranking.books.map(item => {
        item.cover = `https://statics.zhuishushenqi.com` + item.cover
      })
      this.setData({
        books: res.ranking.books
      })
      // console.log(res)
    }).catch(err => {})
  },
  bindClick(e){
    let index =e.currentTarget.dataset.index
    this.setData({
      flag:index
    })
    //周榜
    if(this.data.flag===0) {
      this.getrank(this.data._id)
    }
    //月榜
    if(this.data.flag===1){
      this.getrank(this.data.monthRank)
    }
    //总榜
    if(this.data.flag===2) {
      this.getrank(this.data.totalRank)
    }
    // console.log(e)
  },
  detailss(e){
    console.log(e)
    let _id = e.currentTarget.dataset.item._id
    wx.navigateTo({
      url: `/pages/detailss/detailss?_id=${_id}`,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(options)
    this.setData({
      _id: options._id,
      monthRank: options.monthRank,
      totalRank: options.totalRank
    })
    this.getrank(this.data._id)
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