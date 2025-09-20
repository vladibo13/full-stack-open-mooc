import { render, screen } from '@testing-library/react'
import Blog from './Blog'
import userEvent from '@testing-library/user-event'

const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'john doe',
    url: 'http://test.com',
    likes: 0,
    user: {
    name: 'Test User',
    id: '123'
    }
}

test('renders content', () => {
    const mockHandler = () => {}

    render(
        <Blog 
        blog={blog} 
        handleLike={mockHandler}
        handleDelete={mockHandler}
        />
    )

    const element = screen.getByText('Component testing is done with react-testing-library - john doe')
    expect(element).toBeDefined()

    const detailsDiv = screen.queryByTestId('blog-details')
    expect(detailsDiv).toBeNull()
})

test('url and likes are shown when view button is clicked', async () => {
    const mockHandler = vi.fn()
    const user = userEvent.setup()

    render(
        <Blog 
        blog={blog} 
        handleLike={mockHandler}
        handleDelete={mockHandler}
        />
    )

    const button = screen.getByText('view')
    await user.click(button)

    expect(screen.getByText(`url: ${blog.title}`)).toBeDefined()
    expect(screen.getByText(`likes: ${blog.likes}`)).toBeDefined()
})

test('clicking like button twice calls event handler twice', async () => {
  const mockHandler = vi.fn()
  const user = userEvent.setup()

  render(
    <Blog 
      blog={blog} 
      handleLike={mockHandler}
      handleDelete={() => {}}
    />
  )

  const viewButton = screen.getByText('view')
  await user.click(viewButton)

  const likeButton = screen.getByText('like')
  await user.click(likeButton)
  await user.click(likeButton)

  expect(mockHandler.mock.calls).toHaveLength(2)
})