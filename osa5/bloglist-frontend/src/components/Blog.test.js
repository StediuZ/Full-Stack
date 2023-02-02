import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import Blog from './Blog'
import userEvent from '@testing-library/user-event'
describe('Blog',() => {
  const user = {
    'username': 'root',
    'id': '63c7a2ba89ca9d118818e241'
  }

  const blog = {
    'title': 'Component testing is done with react-testing-library',
    'author': 'kurre',
    'url': 'serla.net',
    'user': user,
    'likes': 8,
  }

  const mockHandler = jest.fn()
  beforeEach(() => {
    /*const rendered = */render(<Blog
      blog={blog}
      user={user}
      mockHandler={mockHandler}
    />)
  })
  screen.debug()
  test('renders content', async() => {
    /*const element = */screen.getByText(/Component testing is done with react-testing-library/)
  //console.log(element.debug())
  //expect(element).toBeDefined()
  })
  test('clicking the button shows more info', async () => {
    //const mockHandler = jest.fn()
    //jest.fn()
    screen.debug()
    const clicker = userEvent.setup()
    const button = screen.getByText(/Show more/)
    await clicker.click(button)
    const url = screen.getByText(/serla.net/)
    const likes = screen.getByText(/8/)
    const userofblog = screen.getByText(/root/)
    expect(url).toBeDefined()
    expect(likes).toBeDefined()
    expect(userofblog).toBeDefined()
  //expect(mockHandler.mock.calls).toHaveLength(1)
  })

  test('clicking the button calls event handler twice', async () => {
    const clicker = userEvent.setup()
    const showmore = screen.getByText(/Show more/)
    await clicker.click(showmore)
    screen.debug()
    const like = screen.getByText(/like/)
    await clicker.click(like)
    screen.debug()
    await clicker.click(like)
    screen.debug()
    expect(mockHandler.mock.calls).toHaveLength(2)
    //expect(like).toBeDefined()
  })
})//describe