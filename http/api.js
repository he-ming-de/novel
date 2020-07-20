
const fly = require('./index')

export default {
    //1.获取大分类
    getCats() {
        return fly.get(`/cats/lv2/statistics`)
    },
    //2.获取小类 
    getMinor(){
       return fly.get(`/cats/lv2`)},
    //3.获取分类书籍  @param gender 性别排行（male）type 排行类型（hot）major 大类 minor 小类  start 分页开始 
    getCatsBooks(gender, type, major, minor, start) {
      if (minor) {
         return fly.get(`/book/by-categories?gender=${gender}&type=${type}&major=${major}&minor=${minor}&start=${start}&limit=20`)
      } else {
         return fly.get(`/book/by-categories?gender=${gender}&type=${type}&major=${major}&start=${start}&limit=20`)
      }
    },
     //4.书籍详情
     bookInfo(book_id) { 
      // @param book_id 书籍id
      return fly.get(`/book/${book_id}`)
    },
    //5.相关推荐
    relatedRecommendedBooks(book_id) { 
      // @param book_id 书籍id
      return fly.get(`/book/${book_id}/recommend`)
    },
    //6.作者名下的书籍
    authorBooks(author) {   
      // @param author 作者名
      return fly.get(`/book/accurate-search?author=${author}`)
    },
    //7.书源  注意：第一个优质书源为收费源
    bookSources: function (book_id) {  
      // @param book_id 书籍id
      return fly.get(`/atoc?view=summary&book=${book_id}`)
    },
    //8.书籍章节 根据书源id
    bookChapters(id) {  
      // @param id 书源id
      return fly.get(`/atoc/${id}?view=chapters`)
    },
    //9.章节内容
    chapterContent(link) {  // @param link 章节link
      return fly.get(`https://chapter2.zhuishushenqi.com/chapter/${encodeURIComponent(link)}`)
    },
    //10.搜索热词
    hotWord() {
      return fly.get(`/book/hot-word`)
    },
    //11.书籍搜索 (分类，书名，作者名)
    bookSearch(content) { 
      //@param content 搜索内容
      return fly.get( `/book/fuzzy-search?start=0&limit=50&v=1&query=${content}`)
    },
    //12.排名分类
    rankCategory() { 
      return fly.get(`/ranking/gender`)
    },
    //13.排名详情
    rankInfo(rank_id) { 
      //@param rank_id 分类ID
      return fly.get(`/ranking/${rank_id}`)
    },
    //14.讨论
    discussions(book_id) {  
      // @param book_id 书籍id
      return fly.get(`/post/by-book?book=${book_id}`)
    },
    //15.短评
    shortReviews(book_id) {  
      // @param book_id 书籍id    完整接口 ?book=5816b415b06d1d32157790b1&limit=20&total=true&start=0&sortType=hottest
      return fly.get(`/post/short-review?book=${book_id}&total=true&sortType=newest`)
    },
    //16.长评
    bookReviews(book_id){ 
      // @param book_id 书籍id
      return fly.get(`/post/review/by-book?book=${book_id}`)
    },
    //17
    detail(id) {  
      // @param id 书单id
      return fly.get(`/book-list/${book_id}`)
    }
}