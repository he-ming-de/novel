// components/change/change.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    newHotWords: {
      type: Array
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    ss(e) {
      console.log(e)
      let _id =e.currentTarget.dataset.item.title.book
      wx.navigateTo({
        url: `/pages/detailss/detailss?_id=${_id}`,
      })
    }
  }
})