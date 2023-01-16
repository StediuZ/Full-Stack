require('lodash')
const dummy = (blogs) => {
    return 1
  }
  
const totalLikes = (blogs) => {
    let total = 0
    blogs.map(blog => 
        total += blog.likes
        )
    return total
}

const favoriteBlog = (blogs) => {
    let favorite = {
        title: "Favorite Dummy Blog",
        author: "Tester",
        likes: -1
      }
    blogs.map(blog=>{
        if (blog.likes>favorite.likes) {
            favorite.title = blog.title
            favorite.author = blog.author
            favorite.likes = blog.likes
        }
    })
    
    return favorite
}
const mostBlogs = (blogs) => {
    var _=require('lodash')
    const BlogsByAuthors =_.entries(_.countBy(blogs,"author")).map(([author,blogs])=>({author,blogs}))
    const most =_.maxBy(BlogsByAuthors,"blogs")
    return most
}

const mostLikes = (blogs) => {
    var _=require('lodash')
    const BlogsByAuthors =_.groupBy(blogs,"author")
    const authors = _.map(BlogsByAuthors, (blogs, author) => {
        return {
          author: author,
          likes: _.sumBy(blogs, "likes")
        }
      })
    const most = _.maxBy(authors, "likes")
    return most
}

module.exports = {
dummy,
totalLikes,
favoriteBlog,
mostBlogs,
mostLikes
}