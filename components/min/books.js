// components/min/books.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    male: {
      type: Array
    },
    man: {
      type: String
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
    goto(e){
      console.log(e)
      let index =e.currentTarget.dataset.index
      let name = e.currentTarget.dataset.item.name
      let sex =e.currentTarget.dataset.sex
      wx.navigateTo({
        url: `/pages/details/details?name=${name}&index=${index}&sex=${sex}`,
      })
    }
  }
})