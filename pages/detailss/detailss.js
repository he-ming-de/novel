const {
  default: api
} = require("../../http/api");

// pages/detailss/detailss.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    value: '',
    flag: 0,
    books: [],
    book: [],
    docs: [],
    obj: {},
    bookshelf: [],
    flags: 0,
    _id: '',
    cluck: 0,
    clcik: true,
    num:0,
  },
  // 推荐 换一换
  changes() {
    let index = Math.floor(Math.random() * (this.data.book.length - 2));
    this.setData({
      books: this.data.book.slice(index, index + 3),
    })
  },
  //存书架
  join() {
    if (this.data.flags === 0) {
      this.setData({
        flags: 1
      })
      let book = this.data.bookshelf
      let obj = {}
      obj.cover = this.data.obj.cover
      obj.title = this.data.obj.title
      obj._id = this.data.obj._id
      book.push(obj)
      let hash = {}
      book = book.reduce((item, next) => {
        hash[next.title] ? '' : hash[next.title] = true && item.push(next)
        return item
      }, [])
      wx.setStorageSync('book', book)
      console.log(book);
    } else {
      this.setData({
        flags: 0
      })
    }
  },
  bindclicks() {
    let _id = this.data._id
    wx.navigateTo({
      url: `/pages/read/read?_id=${_id}`,
    })
  },
  bindclick() {
    this.setData({
      cluck: 1
    })
  },
  bindlong(){
   this.setData({
    num:1
   })
  },
  bindbao(e){
    // console.log(e)
    wx.downloadFile({
      url: e.currentTarget.dataset.url,
      success: res=> {
        console.log(res);
        let rr = res.tempFilePath;
        wx.saveImageToPhotosAlbum({
          filePath: rr,
          success(res) {
            wx.showToast({
              title: '保存成功',
              icon: 'success',
              duration: 2000
            })
          }
        })
      },
    })
  },
  bindqu(){
    this.setData({
      cluck: 0
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // this.changes()
    // 评价 短评
    api.shortReviews(options._id).then(res => {
      // console.log(res);
      res.docs.map(item => {
        item.author.avatar = `https://statics.zhuishushenqi.com` + item.author.avatar
      })
      this.setData({
        docs: res.docs,
      })
      // console.log(this.data.docs); 
    }).catch(err => {})

    // 推荐
    api.relatedRecommendedBooks(options._id).then(res => {
      // console.log(res);
      res.books.map(item => {
        item.cover = `https://statics.zhuishushenqi.com` + item.cover
      })
      let index = Math.floor(Math.random() * (res.books.length - 2));
      this.setData({
        books: res.books.slice(index, index + 3),
        book: res.books,
      })
      // console.log(this.data.books);
    }).catch(err => {})
    // console.log(options._id);


    let book = wx.getStorageSync('book')
    if (book) {
      this.setData({
        bookshelf: book
      })
    }

    // 详情
    api.bookInfo(options._id).then(res => {
      res.cover = 'https://statics.zhuishushenqi.com' + res.cover
      // console.log(res);
      this.setData({
        obj: res,
        title: res.title,
        cover: res.cover,
        author: res.author,
        score: res.rating.score,
        lastChapter: res.lastChapter,
        longIntro: res.longIntro,
        chaptersCount: res.chaptersCount,
        _id: res._id
      })
    }).catch(err => {})
  },
  cls() {
    this.data.flag = 0
    this.setData({
      flag: this.data.flag
    })
  },
  clss() {
    this.data.flag = 1
    this.setData({
      flag: this.data.flag
    })
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