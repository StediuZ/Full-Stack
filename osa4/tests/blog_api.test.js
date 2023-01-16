const supertest = require('supertest')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const bcrypt = require('bcrypt')
const User = require('../models/user')
//jest.setTimeout(10000)

beforeAll(async () => {
  const response = await api
        .post('/api/login')
        .send({username: "testeribotti", password: "testeribotti"})
        .expect(200)
  testToken =  "Bearer "+response.body.token
  testId = "63c5328571adcf64898490f8"
})

beforeEach(async () => {
    await Blog.deleteMany({});
    await Blog.insertMany(helper.initialBlogs);
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')
  
    expect(response.body).toHaveLength(helper.initialBlogs.length)
  })
  

  test('a valid blog can be added ', async () => {
    const newBlog = {
        title: "Async",
        author: "Await",
        url: "Async.com/Awaittesting",
        likes: 2,
        user: testId
    }
  
    await api
      .post('/api/blogs')
      .send(newBlog)
      .set('Authorization', testToken)
      .expect(201)
      .expect('Content-Type', /application\/json/)
  
    const response = await api.get('/api/blogs')
  
    const titles = response.body.map(r => r.title)
    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)
    expect(titles).toContain(
      'Async'
    )
  })


test('a specific blog can be viewed', async () => {
const blogsAtStart = await helper.blogsInDb()

const blogToView = blogsAtStart[0]

const resultBlog = await api
    .get(`/api/blogs/${blogToView.id}`)
    .expect(200)
    .expect('Content-Type', /application\/json/)

const processedBlogToView = JSON.parse(JSON.stringify(blogToView))

expect(resultBlog.body).toEqual(processedBlogToView)
})

test('a blog can be deleted', async () => {
const blogsAtStart = await helper.blogsInDb()
const blogToDelete = blogsAtStart[0]

await api
    .delete(`/api/blogs/${blogToDelete.id}`)
    .set('Authorization', testToken)
    .expect(204)

const blogsAtEnd = await helper.blogsInDb()

expect(blogsAtEnd).toHaveLength(
    helper.initialBlogs.length - 1
)

const titles = blogsAtEnd.map(r => r.title)

expect(titles).not.toContain(blogToDelete.title)
})

test('a blog can be edited', async () => {
  
  const blogsAtStart = await helper.blogsInDb()
  const blogToEdit = blogsAtStart[0]
  const newData = {
    title: "New title",
    author: "New author",
    url: "https://newurl.com",
    likes: 99
  }
  const response = await api
    .put(`/api/blogs/${blogToEdit.id}`)
    .set('Authorization', testToken)
    .send(newData)
    .expect(200)
  const blogsAtEnd = await helper.blogsInDb()
  const editedBlog = response.body
  expect(editedBlog.title).toBe(newData.title)
  expect(editedBlog.author).toBe(newData.author)
  expect(editedBlog.url).toBe(newData.url)
  expect(editedBlog.likes).toBe(newData.likes)
  expect(blogsAtEnd).toHaveLength(blogsAtStart.length)
  })

test('all blogs have id named id', async () => {
  const blogs = await helper.blogsInDb()
  blogs.map(blog=>expect(blog.id).toBeDefined())
  
})

test('blog without likes is set to 0', async () => {
  const newBlog = {
    title: "zerolikes",
    author: "Await",
    url: "Async.com/Awaittesting",
    user: testId
}
await api
.post('/api/blogs')
.set('Authorization', testToken)
.send(newBlog)
.expect(201)
.expect('Content-Type', /application\/json/)

const blogs = await helper.blogsInDb()
expect(blogs).toHaveLength(helper.initialBlogs.length + 1)
blogs.map(blog=>{
  if (blog.title === "zerolikes") {
    expect(blog.likes).toEqual(0)
  }}
  )
})


test('bad request without title', async () => {
  const newBlog = {
    url: "Async.com/requesttesting",
    likes: 560,
    user: testId
}
await api
.post('/api/blogs')
.set('Authorization', testToken)
.send(newBlog)
.expect(400)
})

test('unauthorized', async () => {
  const newBlog = {
    title:"title",
    author:"author",
    url: "Async.com/requesttesting",
    likes: 560,
    user: testId
}
await api
.post('/api/blogs')
.send(newBlog)
.expect(401)
})

//USERS
describe('when there is initially one user at db', () => {
  beforeEach(async () => {
    await User.deleteMany({username:"mluukkai"})
    await User.deleteMany({username:"root"})

    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'root', passwordHash })

    await user.save()
  })

  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'mluukkai',
      name: 'Matti Luukkainen',
      password: 'salainen',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    expect(usernames).toContain(newUser.username)
  })
})

describe('USER TEST: when there is initially one user at db', () => {
    // ...
  
    test('creation fails with proper statuscode and message if username already taken', async () => {
      const usersAtStart = await helper.usersInDb()
  
      const newUser = {
        username: 'root',
        name: 'Superuser',
        password: 'salainen',
      }
  
      const result = await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
        .expect('Content-Type', /application\/json/)
  
      expect(result.body.error).toContain('username must be unique')
  
      const usersAtEnd = await helper.usersInDb()
      expect(usersAtEnd).toHaveLength(usersAtStart.length)
    })

    test('creation fails with proper statuscode and message if username too short', async () => {
      const usersAtStart = await helper.usersInDb()
  
      const newUser = {
        username: 'rt',
        name: 'Superuser',
        password: 'salainen',
      }
  
      const result = await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
        .expect('Content-Type', /application\/json/)
  
      expect(result.body.error).toContain('username or password invalid')
      const usersAtEnd = await helper.usersInDb()
      expect(usersAtEnd).toHaveLength(usersAtStart.length)
    })

    test('creation fails with proper statuscode and message if password too short', async () => {
      const usersAtStart = await helper.usersInDb()
  
      const newUser = {
        username: 'roooot',
        name: 'Superuser',
        password: 'n',
      }
  
      const result = await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
        .expect('Content-Type', /application\/json/)
  
      expect(result.body.error).toContain('username or password invalid')
      const usersAtEnd = await helper.usersInDb()
      expect(usersAtEnd).toHaveLength(usersAtStart.length)
    })



  })

afterAll(async() => {
  mongoose.connection.close()
})
