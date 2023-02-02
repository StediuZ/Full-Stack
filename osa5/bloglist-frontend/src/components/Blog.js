import { useState } from 'react'
import blogService from '../services/blogs'
const Blog = ({ blog, user, mockHandler }) => {
  const [info, setInfo] = useState(false)
  const [likes, setLikes] = useState(blog.likes)
  const show = info
    ? 'Show less' : 'Show more'

  const handleLike = async () => {
    try {

      const updatedBlog = {
        user: blog.user.id,
        likes: likes + 1,
        author: blog.author,
        title: blog.title,
        url: blog.url
      }
      if (mockHandler!==undefined) {
        setLikes(updatedBlog.likes)
        mockHandler(updatedBlog)
      } else {
        await blogService.update(blog.id, updatedBlog)
        setLikes(updatedBlog.likes)
      }
    } catch (error) {
      console.log(blog.id)
      console.error(error)
    }
  }

  const handleRemoval = async () => {
    try {
      if (window.confirm('Do you really want to delete this blog?')) {
        await blogService.remove(blog.id,blog.user)
      }
    } catch (error) {
      console.log(blog.id)
      console.error(error)
    }
  }

  const showBlog = () => {
    setInfo(!info)
  }

  return (
    <div className="blog">
      {info ? (
        <div className="blog-content">
          {blog.title} {blog.author} <button onClick={showBlog}>{show}</button>
          <p>{blog.url}</p>
          <p>{likes}
            <button onClick={handleLike}>like</button></p>
          <p>{blog.user.username}</p>
          { user.username === blog.user.username && <button onClick={handleRemoval}>Remove</button> }
        </div>
      ) : (
        <div className="blog-content">
          {blog.title} {blog.author}
          <button onClick={showBlog}>{show}</button>
        </div>
      )}
    </div>
  )

}
export default Blog