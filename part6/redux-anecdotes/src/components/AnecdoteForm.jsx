import { useDispatch } from 'react-redux'
import { add, createAnecdote } from '../reducers/anecdoteReducer'
import { notification } from '../reducers/notificationReducer'
import anecdotesService from '../services/anecdotesService'


const AnecdoteForm = () => {
    const dispatch = useDispatch()  

    const addAnecdote = async (e) => {
        e.preventDefault()
        const content = e.target.anecdote.value
        const newAnecdote = {
            content,
            id: (100000 * Math.random()).toFixed(0),
            votes: 0
        }
        e.target.anecdote.value = ''
        const newAnecdoteBackend = await anecdotesService.create(newAnecdote)
        dispatch(createAnecdote(newAnecdoteBackend))
        dispatch(notification(content))
    }

    return (
        <>
            <h2>create new</h2>
            <form onSubmit={addAnecdote}>
                <div>
                    <input name="anecdote"/>
                </div>
                <button type='submit'>create</button>
            </form>
        </>
    )
}

export default AnecdoteForm