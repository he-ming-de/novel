// components/ranking/ranking.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    males:{
      type:Array
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
    front(e){
      // console.log(e);
      let _id = e.currentTarget.dataset.item._id
      let monthRank =e.currentTarget.dataset.item.monthRank
      let totalRank = e.currentTarget.dataset.item.totalRank
      wx.navigateTo({
        url: `/pages/front/Front?_id=${_id}&monthRank=${monthRank}&totalRank=${totalRank}`,
      })
      
    }
  }
})
