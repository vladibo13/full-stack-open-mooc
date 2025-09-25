import { useSelector, useDispatch } from 'react-redux'
import { increment, voteDBUpdate } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'
const AnecdoteList = () => {
  const anecdotes = useSelector(state => {

    if (!state.filter || state.filter === 'ALL') {
      return state.anecdotes
    }
    const filter = state.filter.toLowerCase()
    return state.anecdotes.filter(a => a.content.toLowerCase().includes(filter))

  })
  // const filter = useSelector(state => state.filter)
  const dispatch = useDispatch()

  // const parsedFilter = filter.trim().toLowerCase()

  const vote = (anecdote) => {
    dispatch(voteDBUpdate(anecdote))
    dispatch(setNotification(`you voted '${anecdote.content}'`, 5))
    // dispatch(notification('you voted for ' + anecdote.content))
    // setTimeout(() => {
    //   dispatch(notification(''))
    // }, 5000)
  }

  return (
    <>
      {anecdotes
        .map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
          <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </>
  )
}

export default AnecdoteList