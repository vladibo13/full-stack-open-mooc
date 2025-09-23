import { createSlice } from '@reduxjs/toolkit'

const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const initialState = anecdotesAtStart.map(asObject)
const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState,
  reducers: {
    increment(state, action) {
      
      const id = action.payload
      const anecdoteToChange = state.find(a => a.id === id)

      if (anecdoteToChange) {
        anecdoteToChange.votes += 1
      }

      state.sort((a, b) => b.votes - a.votes)  
    },
    add(state, action) {
      state.push(action.payload)
    }
  }
})


export const {increment,add} = anecdoteSlice.actions
export default anecdoteSlice.reducer

// export const increment = (id) => {
//   return {
//     type: 'INCREMENT',
//     payload: {
//       id
//     }
//   }
// }

// export const add = (content) => {
//   return {
//     type: 'ADD',
//     payload: {
//       content,
//       id: getId(),
//       votes: 0
//     }
//   }
// }

// export default reducer

// const reducer = (state = initialState, action) => {
//   console.log('state now: ', state)
//   console.log('action', action)
//   switch (action.type) {
//     case 'INCREMENT':
//       const id = action.payload.id
//       const anecdoteToChange = state.find(a => a.id === id)
//       const changeAnecdote = {
//         ...anecdoteToChange,
//         votes: anecdoteToChange.votes + 1
//       }
//       return state
//         .slice()
//         .sort((a, b) => b.votes - a.votes)
//         .map(anecdote => anecdote.id !== id ? anecdote : changeAnecdote)
//     case 'ADD':
//       return [...state, action.payload]
//     default:
//       return state
//   }
// }