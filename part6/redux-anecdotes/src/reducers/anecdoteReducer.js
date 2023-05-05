import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    vote(state, action){
      const id = action.payload
      const voteAnecdote = state.find(a => a.id === id)
      const votedAnecdote = {
        ...voteAnecdote,
        votes: voteAnecdote.votes + 1
      }
      return state.map(a => a.id !== id ? a : votedAnecdote)
    },
    createAnecdote(state, action){
      const anecdote = action.payload
      state.push(anecdote)
    },
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  }
})

export const { vote, appendAnecdote, setAnecdotes } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = (content) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createAnecdote(content)
    dispatch(appendAnecdote(newAnecdote))
  }
}

export const voteAnecdote = (id) => {
  return async dispatch => {
    const anecdote = await anecdoteService.getAnecdote(id)
    const voteAnecdote = {
      ...anecdote,
      votes: anecdote.votes + 1
    }
    const votedAnecdote = await anecdoteService.updateAnecdote(id, voteAnecdote)
    dispatch(vote(votedAnecdote.id))
  }
}

export default anecdoteSlice.reducer