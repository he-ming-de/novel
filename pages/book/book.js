// pages/book/book.js
import api from '../../http/api'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    flag: 0,
    male: [],
    man: '男生',
    girl: '女生',
    publish: '出版',
    female: [],
    press: [],
    males: [],
    females: []
  },
  cls() {
    this.data.flag = 0
    this.setData({
      flag: this.data.flag
    })
  },
  clc() {
    this.data.flag = 1
    this.setData({
      flag: this.data.flag
    })
  },
  // 分类
  getCats() {
    api.getCats().then(res => {
      console.log(res)
      this.setData({
        male: res.male,
        female: res.female,
        press: res.press
      })
    }).catch(err => {})
  },
  //排行
  rankCategory() {
    api.rankCategory().then(res => {
      res.male.map(item => {
        item.cover = 'https://statics.zhuishushenqi.com' + item.cover
      })
      res.female.map(item => {
        item.cover = 'https://statics.zhuishushenqi.com' + item.cover
      })

      this.setData({
        males: res.male,
        males: res.male.slice(0, 6),
        females: res.female,
        females: res.female.slice(0, 6),
      })
      console.log(res)
    }).catch(err => {})
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getCats()
    this.rankCategory()
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