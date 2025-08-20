import { useState } from 'react'
import Button from './Button'
import Anecdote from './Anecdote'
import Header from './Header'
import TopAnecdote from './TopAnecdote'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0))
  const [topAnecdote, setTopAnecdote] = useState(null)

  const onAnecdote = () => {
    const randomIndex = Math.floor(Math.random() * anecdotes.length)
    setSelected(randomIndex)
  }

  const onVote = () => {
    const copy = [...votes]
    copy[selected] += 1
    setVotes(copy)

    const maxValue = Math.max(...copy);
    const maxIndex = copy.indexOf(maxValue);
    setTopAnecdote(anecdotes[maxIndex])
  }

  return (
    <>
      <div>
        <Header text='Anecdote of the day' />
        <Anecdote anecdote={anecdotes[selected]} />
      </div>
      <div>
        <Button onClick={onAnecdote} text='next anecdote' />
        <Button onClick={onVote} text='vote' />
      </div>
      <div>
        <Header text='Anecdote with most votes' />
        <TopAnecdote topAnecdote={topAnecdote}/>
      </div>
    </>
  )
}

export default App