import React, { useState, useEffect } from 'react'
import List from './List'
import Alert from './Alert'

const getLocalStorage = () => {
  let list = localStorage.getItem('list');
  if(list){
    return JSON.parse(localStorage.getItem('list'))
  } else {
    return []
  }
}

function App() {
  const [name, setName] = useState('');
  const [list, setList] = useState(getLocalStorage());
  const [isEditing, setIsEditing] = useState(false);
  const [editID, setEditID] = useState(null);
  const [alert, setAlert] = useState({ show: false, msg: '', type: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    if(!name) {
      //show error alert
      showAlert(true, 'please enter a name', 'danger')
    } else if(name && isEditing) {
      //edit the current name
      setList(
        list.map((item) => {
          if (item.id === editID){
            return { ...item, title: name }
          }
          return item
        })
      )
      setName('');
      setEditID(null);
      setIsEditing(false);
      showAlert(true, 'Name Edited successfully', 'success')
    } else {
      //add Name and show success alert
      showAlert(true, 'Name added successfully', 'success')
      const newName = {id: new Date().getTime().toString(), title:name};
      setList([...list, newName]);
      setName('');
    }
  }
  
  const showAlert = (show=false, msg='',type='') => {
    setAlert({ show, msg, type })
  }

  const clearList = () => {
    showAlert(true, 'list is now empty', 'success')
    setList([])
  }

  const removeName = (id) => {
    showAlert(true, 'Name removed', 'success')
    setList(list.filter((person) => person.id !== id ))
  }

  const editName = (id) => {
    const specificName = list.find((person) => person.id === id);
    setIsEditing(true);
    setEditID(id)
    setName(specificName.title)
  }

  useEffect(() => {
    localStorage.setItem('list', JSON.stringify(list))
  }, [list])

  return (
    <section className="section-center">
      <div className="grocery-container">
        <form className="grocery-form" onSubmit={handleSubmit} >
          {alert.show && <Alert { ...alert} removeAlert={showAlert} list={list}  />}
          <h3>List of Noise Makers</h3>
          <div className="form-control">
            <input type="text" className="grocery" placeholder="e.g Marvelous or Solace" value={name} onChange={(e) => setName(e.target.value)} />
            <button className="submit-btn">{isEditing ? 'edit' : 'add'}</button>
          </div>
        </form>
        <List noiseMakers={list} removeName={removeName} editName={editName} />
        <button className="clear-btn" onClick={clearList}>clear list</button>
      </div>
    </section>
  )
}

export default App
