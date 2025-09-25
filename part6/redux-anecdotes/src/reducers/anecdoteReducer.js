import { createSlice } from '@reduxjs/toolkit'
import anecdotesService from '../services/anecdotesService'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
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
    },
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  }
})

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdotesService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdotesService.create(content)
    dispatch(add(newAnecdote))
  }
}

export const {increment,add,appendAnecdote,setAnecdotes} = anecdoteSlice.actions
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