Page({

  /**
   * 页面的初始数据
   */
  data: {
    arr: [],
    flag: 0,
    _id:''
  },
  goto() {
    wx.navigateTo({
      url: '/pages/help/help',
    })
  },
  dell() {
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
  delss(e) {
    console.log(e)
    let index = e.currentTarget.dataset.index
    let book = this.data.arr
    book.splice(index,1)
    this.setData({
      book: book
    })
    wx.setStorageSync('book', book)
  },
  sscz(e){
    console.log(e)
    let _id=e.currentTarget.dataset.item._id
    this.setData({
      _id:e.currentTarget.dataset.item._id
    })
    // console.log(this.data._id)
    wx.navigateTo({
      url: `/pages/detailss/detailss?_id=${_id}`,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.data.arr = wx.getStorageSync('book')
    this.setData({
      arr: this.data.arr
    })
    console.log(this.data.arr);
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