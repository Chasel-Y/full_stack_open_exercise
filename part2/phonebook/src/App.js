import { useState, useEffect } from 'react'
import personsService from "./service/personsService"
import PersonForm from "./component/addPersonForm"
import {Notification, ErrorNotification} from "./component/notification"
import PersonsFilter from "./component/personsFilter"
import Persons from "./component/showPersonsData"


const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [informMessage, setInformMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  
  useEffect(() => {
    personsService
      .getAll()
      .then(personsData => {
        setPersons(personsData)
      })
  }, [])

  const handleNameChange = (event) =>{
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) =>{
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) =>{
    setNewFilter(event.target.value)
  }
  const addPerson = (event)=>{
    event.preventDefault()
    if(persons.some(person => person.name === newName)){
      if(window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)){
        const updateId = persons.filter(person => person.name === newName)[0].id
        console.log(updateId)
        const personObject = {
          name: newName,
          number: newNumber,
          id: updateId,
        }
        personsService
        .update(updateId, personObject)
        .then(returnedPerson => {
          setPersons(persons.filter(person => person.id !== returnedPerson.id).concat(returnedPerson))
          setInformMessage(
            `Updated ${returnedPerson.name}'s phonenumber`
          )
          setTimeout(() => {
            setInformMessage(null)
          }, 3000)
          setNewName('')
          setNewNumber('')
        })
        .catch(error => {
          setErrorMessage(
            `Information of ${personObject.name} has already been moved from server`
          )
          setTimeout(() => {
            setInformMessage(null)
          }, 3000)
        }) 
      }
    }else{
      const personObject = {
      name: newName,
      number: newNumber,
      }
      personsService
      .create(personObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setInformMessage(
          `Added ${returnedPerson.name}`
        )
        setTimeout(() => {
          setInformMessage(null)
        }, 3000)
        setNewName('')
        setNewNumber('')
      })
      .catch(error => {
        setErrorMessage(error.response.data.error)
        setTimeout(() => {
          setErrorMessage(null)
        }, 3000)
      })
    }
  }

  const deletePerson= (id, name) =>{
    if(window.confirm(`Delete ${name}?`)){
      const copy = [...persons]
      personsService
      .deletePerson(id)
      .then(() => {
        setPersons(copy.filter(person => person.id !== id))})
      }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={informMessage} />
      <ErrorNotification message={errorMessage} />
      <PersonsFilter value={newFilter} onChange={handleFilterChange}/>
      <h2>add a new</h2>
      <PersonForm addPerson={addPerson} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange}/>
      <h2>Numbers</h2>
      <Persons persons={persons} newFilter={newFilter} deletePerson={deletePerson}/>
    </div>
  )
}

export default App
