// pages/read/read.js
const {
  default: api
} = require("../../http/api");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    link: '',
    obj: {},
    flag: 0,
    chapters: [],
    flags: 0,
    font: 32,
    color: ["(255,255,255)", "(246,153,180)", "(203,28,54)", "(66,224,209)"],
    fonts: 0,
    index:'',
  },
  bindclick() {
    if (this.data.flag === 0) {
      this.setData({ 
        flag: 1
      })
    } else {
      this.setData({
        flag: 0
      })
    }
  },
  bindclicks() {
    if (this.data.flags === 0) {
      this.setData({
        flags: 1
      })
    } else {
      this.setData({
        flags: 0
      })
    }
  },
  bindfont() {
    this.data.font = this.data.font + 2
    this.setData({
      font: this.data.font
    })
  },
  bindfonts() {
    this.data.font = this.data.font - 2
    this.setData({
      font: this.data.font
    })
  },
  bindcolor() {
    if (this.data.fonts === 0) {
      this.setData({
        fonts: 1
      })
    } else {
      this.setData({
        fonts: 0
      })
    }
  },
  bindcolors(e) {
    // console.log(e)
    this.setData({
      index:e.currentTarget.dataset.item
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(options._id)
    api.bookChapters(options._id).then(res => {
      console.log(res)
      this.setData({
        link: res.chapters[0].link,
        chapters: res.chapters
      })
      api.chapterContent(this.data.link).then(res => {
        this.setData({
          obj: res.chapter,
        })
        // console.log(this.data.obj)
      }).catch(err => {})
    }).catch(err => {})
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