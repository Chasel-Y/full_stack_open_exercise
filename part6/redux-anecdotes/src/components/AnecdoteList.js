import { useDispatch, useSelector } from "react-redux"
import { voteAnecdote } from "../reducers/anecdoteReducer"
import { setNotification } from '../reducers/notificationReducer'
import { removeNotification } from '../reducers/notificationReducer'

const Anecdote = ({ anecdote, handleClick }) => {
  return(
    <div>
      <li>
        {anecdote.content}
        <br></br>
        has {anecdote.votes}
        <button onClick={handleClick}>vote</button>
      </li>
      <br></br>
    </div>
  )
}

const AnecdoteList = () => {
  const dispatch = useDispatch()
  const showAnecdotes = useSelector(({ filter, anecdotes }) =>{
    return anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(filter.toLowerCase()))
  })
  
  return(
    <div>
      <ul>
        {showAnecdotes.sort((a, b) => b.votes - a.votes).map(anecdote =>
          <Anecdote key={anecdote.id} anecdote={anecdote} 
          handleClick={() =>{
            dispatch(voteAnecdote(anecdote.id))
            dispatch(setNotification(`you voted '${anecdote.content}'`, 10))
          }} />
        )}
      </ul>
    </div>
  )
}

export default AnecdoteList