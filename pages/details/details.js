const {
  default: api
} = require("../../http/api")

// pages/details/details.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    typeList: [{
        id: 'hot',
        name: '热门'
      },
      {
        id: 'new',
        name: '新书'
      },
      {
        id: 'reputation',
        name: '好评'
      },
      {
        id: 'over',
        name: '完结'
      },
      {
        id: 'monthly',
        name: 'VIP'
      }
    ],
    list: [],
    index: '',
    name: "",
    sex: "",
    gender: "",
    type: "hot",
    major: "",
    minor: "",
    start: 0,
    limit: 20,
    books: [],
    indexs: 0,
    indexItem: 0,
  },
  //小类
  getMinor() {
    api.getMinor().then(res => {
      if (this.data.sex === "male") {
        res.male.map(item => {
          item.mins.unshift('全部')
        })
        this.setData({
          list: res.male.slice(this.data.index, Number(this.data.index) + 1),
        })
      }
      if (this.data.sex === "female") {
        res.female.map(item => {
          item.mins.unshift('全部')
        })
        this.setData({
          list: res.female.slice(this.data.index, Number(this.data.index) + 1),
        })
      }
      if (this.data.sex === "press") {
        res.press.map(item => {
          item.mins.unshift('全部')
        })
        this.setData({
          list: res.press.slice(this.data.index, Number(this.data.index) + 1),
        })
      }
      console.log(res)
    }).catch(err => {})
  },
  //分类书籍
  getCatsBooks() {
    // console.log(this.data.type);

    api.getCatsBooks(this.data.sex, this.data.type, this.data.name, this.data.minor, this.data.start).then(res => {
      res.books.map(item => {
        item.cover = `https://statics.zhuishushenqi.com` + item.cover,
          item.tags = item.tags.slice(0, 3)
      })
      this.setData({
        books: res.books,
      })
      // console.log(res)
    }).catch(err => {
      console.log(err)
    })
  },
  //小分类
  click(e) {
    console.log(e);
    let index = e.currentTarget.dataset.index
    this.data.minor = this.data.list[0].mins[index]
    this.setData({
      index: e.currentTarget.dataset.index,
      indexItem: index
    })
    console.log(this.data.minor);
    
    this.getCatsBooks()
  },
  //大分类
  clickItem(e) {
    console.log(e);
    let index = e.currentTarget.dataset.index
    let type = this.data.typeList[index].id
    let id = e.currentTarget.dataset.id
    this.setData({
      index: e.currentTarget.dataset.index,
      indexs: index,
      id: id,
      type: type
    })
    this.getCatsBooks()
  },
  // 跳转详情 传_id
  bindclicks(e){
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
    this.setData({
      index: options.index,
      name: options.name,
      sex: options.sex
    })
    this.getMinor()
    this.getCatsBooks()
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