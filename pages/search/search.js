const {
  default: api
} = require("../../http/api")

// pages/search/search.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    newHotWords: [],
    newhotWord: [],
    value: '',
    books: [],
    arr: [],
    flag: 0
  },

  // bookSearch() {
  //   api.bookSearch(this.content).then(res => {
  //     //console.log(res)
  //   }).catch(err => {})
  // },


  //随机色
  hotWord() {
    wx.showLoading({
      title: '加载中...',
    })
    api.hotWord().then(res => {
      console.log(res)

      wx.hideLoading()
      let arr = []
      res.newHotWords.map(item => {
        let obj = {}
        let r = Math.floor(Math.random() * 256);
        let g = Math.floor(Math.random() * 256);
        let b = Math.floor(Math.random() * 256);
        let color = "rgb(" + r + ',' + g + ',' + b + ")";
        obj.color = color
        obj.title = item
        arr.push(obj)
      })
      this.setData({
        newHotWords: arr,
        newhotWord: arr
      })
    }).catch(err => {})
  },
  //随机数
  change() {
    let index = 0
    index = Math.floor(Math.random() * (this.data.newHotWords.length));
    this.setData({
      newHotWords: this.data.newhotWord.slice(index),
    })
    this.data.newHotWords.map(item => {
      let r = Math.floor(Math.random() * 256);
      let g = Math.floor(Math.random() * 256);
      let b = Math.floor(Math.random() * 256);
      let color = "rgb(" + r + ',' + g + ',' + b + ")";
      item.color = color
    })
  },
 // 搜索框
  input(e) {
    // console.log(e)
    this.setData({
      value: e.detail.value
    })
    if (e.detail.value === '') {
      this.setData({
        flag: 0
      })
    } else {
      this.setData({
        flag: 1
      })
    }
  },
  //清空搜索框
  dsss(){
    this.setData({
      value:''
    })
  },
  //搜索
  search() {
    this.data.arr.push(this.data.value)
    wx.setStorageSync('value', this.data.arr)
    api.bookSearch(this.data.value).then(res => {
      res.books.map(item => {
        item.cover = 'https://statics.zhuishushenqi.com' + item.cover
      })
      this.setData({
        books: res.books
      })
    }).catch(err => {})
  },
  //清空
  dels() {
    wx.showModal({
      title: '是否确认删除',
      success: (result) => {
        if (result.confirm) {
          wx.removeStorageSync("value")
        } else {

        }

      }
    })
  },
  //详情传值
  detalist(e) {
    // console.log(e);
    let _id = e.currentTarget.dataset.item._id
    this.setData({
      _id: e.currentTarget.dataset.item._id
    })
    wx.navigateTo({
      url: `/pages/detailss/detailss?_id=${_id}`,
    })
  },
  // 历史  跳 搜索
  sf(e){
    this.setData({
      value: e.currentTarget.dataset.item
    })
    // console.log(this.data.value)
    this.search()
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // this.bookSearch()
    this.hotWord()
    //取
    let arr = wx.getStorageSync('value')
    if (arr) {
      this.setData({
        arr: arr
      })
    }
    // console.log(this.data.arr);
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