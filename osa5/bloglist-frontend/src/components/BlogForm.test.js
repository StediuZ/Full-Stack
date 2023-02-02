import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import BlogForm from './BlogForm'
import userEvent from '@testing-library/user-event'

test('<BlogForm /> updates parent state and calls onSubmit', async () => {
  const user = userEvent.setup()
  const createBlog = jest.fn()

  render(<BlogForm createBlog={createBlog} />)

  //const boxes = screen.getAllByRole('textbox')
  const title = screen.getByPlaceholderText('write blog title here')
  const author = screen.getByPlaceholderText('write blog author here')
  const url = screen.getByPlaceholderText('write blog url here')
  const sendButton = screen.getByText('save')
  await user.type(title,'test title')
  await user.type(author,'test author')
  await user.type(url,'test url')
  await screen.debug()
  await user.click(sendButton)
  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0].BlogObject.title).toBe('test title')
})