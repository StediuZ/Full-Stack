import { useState } from 'react'

const BlogForm = (props) => {
  const [newBlogTitle, setNewBlogTitle] = useState('')
  const [newBlogAuthor, setNewBlogAuthor] = useState('')
  const [newBlogUrl, setNewBlogUrl] = useState('')
  const handleBlogTitleChange = (event) => {
    setNewBlogTitle(event.target.value)
  }
  const handleBlogAuthorChange = (event) => {
    setNewBlogAuthor(event.target.value)
  }
  const handleBlogUrlChange = (event) => {
    setNewBlogUrl(event.target.value)
  }
  const addBlog = (event) => {
    event.preventDefault()
    const BlogObject = {
      title: newBlogTitle,
      author: newBlogAuthor,
      url: newBlogUrl
    }
    props.createBlog({ BlogObject })
    setNewBlogTitle('')
    setNewBlogAuthor('')
    setNewBlogUrl('')
  }

  return (
    <div>
      <h2>Add new blog</h2>

      <form onSubmit={addBlog}>
        <p><label>Title: </label>
          <input
            id='title'
            name = "title"
            value={newBlogTitle}
            onChange={handleBlogTitleChange}
            placeholder='write blog title here'
          /></p><p>
          <label>Author: </label>
          <input
            id='author'
            name = "author"
            value={newBlogAuthor}
            onChange={handleBlogAuthorChange}
            placeholder='write blog author here'
          /></p><p>
          <label>Url: </label>
          <input
            id='url'
            name = "url"
            value={newBlogUrl}
            onChange={handleBlogUrlChange}
            placeholder='write blog url here'
          /></p>
        <button type="submit">save</button>
      </form>
    </div>
  )
}

export default BlogForm