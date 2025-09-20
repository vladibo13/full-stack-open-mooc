import { render, screen } from '@testing-library/react'
import Blog from './Blog'

test('renders content', () => {
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