import { useState, useEffect } from 'react'
import axios from 'axios'
import personService from './services/persons'
import Notification from './components/Notification'


const Filter =(props) =>{
  return(
  <div>
  filter: <input
   value={props.newFilter}
   onChange={props.handleFilterChange}
   />
  </div>)
}
const PersonForm = (props)=>{
  return(<form onSubmit={props.addPerson}>
        <div>
          name: <input
           value={props.newName}
           onChange={props.handleNameChange}
           />
        </div>
        <div>
          number: <input
           value={props.newNumber}
           onChange={props.handleNumberChange}
           />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
  )
}
const Persons = (props) =>{
  useEffect(()=>{personService.getAll().then(response=>props.setPersons(response.data))},[])  
  return(
    props.persons.map(i=>
    {if(i.name.toLowerCase().includes(props.newFilter.toLowerCase())){
      return(
      <div>
      <p>{i.name}: {i.number}
      <button onClick={() =>
        {if (window.confirm("Do you really want to delete "+i.name+" from the phonebook?"))
        {
          personService
          .remove(i.id).then(()=>{props.setPersons(props.persons.filter(n=>n.id!==i.id))
            props.setMessage("person "+i.name+" was deleted")
            props.setNature("good")
            setTimeout(()=>{props.setMessage(null)},5000)})
          .catch(error => {
            props.setMessage(
                `Person '${i.name}' was already removed from server`
              )
            props.setNature("bad")
            setTimeout(() => {props.setMessage(null)}, 5000)
            })
          //setTimeout(()=>{props.setNature(null)},5000)
        } }
        
        }>delete</button>
        </p>
      </div>
      )
    }return true}))
}
const App = () => {
  const [persons, setPersons] = useState([])
  useEffect(() => {
    personService.getAll().then(response => {
      setPersons(response.data)
      })
  },[])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [nature, setNature] = useState('')
  const [Message, setMessage] = useState('')
  
  

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber
    }
    const names = persons.map(i=>i.name)
    if(names.includes(newName)){
      //alert(newName + ' is already in phonebook')
      if (window.confirm(newName+" is already in phonebook, do you want to replace old number with new one?")) {
        console.log(newName)
        console.log(persons)
        const ind = persons.findIndex(ij => ij.name===newName)+1
        console.log(ind)
        personService.update(ind,personObject)
        
        
        /*.then(response => {
          setPersons(persons.concat(response.data))
          //setPersons('')
          
      })*/
    }}  else {
      
      personService
      .create(personObject)
      .then(response => {
        setPersons(persons.concat(response.data))
        //setPersons('')
      })
    }
    setMessage("person "+newName+" was added")
    setNature("good")
    setTimeout(()=>{setMessage(null)},5000)
    //setTimeout(()=>{setNature(null)},5000)
    setNewName('')
    setNewNumber('')
  }
    
  
  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }
  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }



  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={Message} nature={nature} />
      <Filter newFilter={newFilter} handleFilterChange={handleFilterChange}/>
      <h2>Add new</h2>
      <PersonForm addPerson={addPerson} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange}/>
      <h2>Numbers</h2>
      <Persons setMessage={setMessage} setNature={setNature} setPersons={setPersons} persons={persons} newFilter={newFilter}/>
    </div>
  )
  
}


export default App