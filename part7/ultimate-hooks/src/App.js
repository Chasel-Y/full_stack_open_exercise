import { useState, useEffect } from 'react'
import axios from 'axios'

const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  const clear = () => {
    setValue('')
  }

  return {
    type,
    value,
    onChange,
    clear
  }
}

const useResource = (baseUrl) => {
  const [resources, setResources] = useState([])

  useEffect(() => {
    const getAll = async () => {
      const response = await axios.get(baseUrl)
      setResources(response.data)
    }
    getAll()
  }, [baseUrl])

  const create = (newObject) => {
    const post = async () => {
      const response = await axios.post(baseUrl, newObject)
      setResources([...resources, response.data])
    }
    post()
  }

  const update = (id, newObject) => {
    const put = async () => {
      const response = await axios.put(`${baseUrl}/${id}`, newObject)
      setResources(resources.map(r => r.id !== id ? r : response.data))
    }
    put()
  }

  const service = {
    create,
    update
  }

  return [
    resources, service
  ]
}

const App = () => {
  const content = useField('text')
  const name = useField('text')
  const number = useField('text')

  const [notes, noteService] = useResource('http://localhost:3005/notes')
  const [persons, personService] = useResource('http://localhost:3005/persons')

  const handleNoteSubmit = (event) => {
    event.preventDefault()
    noteService.create({ content: content.value })
    content.clear()
  }
 
  const handlePersonSubmit = (event) => {
    event.preventDefault()
    personService.create({ name: name.value, number: number.value})
    name.clear()
    number.clear()

  }

  return (
    <div>
      <h2>notes</h2>
      <form onSubmit={handleNoteSubmit}>
        <input value={content.value} type={content.type} onChange={content.onChange} />
        <button>create</button>
      </form>
      {notes.map(n => <p key={n.id}>{n.content}</p>)}

      <h2>persons</h2>
      <form onSubmit={handlePersonSubmit}>
        name <input value={name.value} type={name.type} onChange={name.onChange} /> <br/>
        number <input value={number.value} type={number.type} onChange={number.onChange} />
        <button>create</button>
      </form>
      {persons.map(n => <p key={n.id}>{n.name} {n.number}</p>)}
    </div>
  )
}

export default App