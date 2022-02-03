import React, { useState, useEffect } from 'react'
import List from './List'
import Alert from './Alert'

const getLocalStorage = () => {
  let list = localStorage.getItem("list");
  if(list){
    return JSON.parse(localStorage.getItem("list"));
  }else{
    return [];
  }
}

function App() {
  const [alert, setAlert] = useState({show: false, type: '', msg: ''});
  const [name, setName] = useState("");
  const [list, setList] = useState(getLocalStorage());
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if(!name){
      showAlert(true, "danger", "please enter value");
    }else if(name && isEditing){
      const newList = list.map((item) => {
        if(item.id === editId){
          return {...item, title: name};
        }
        return item;
      })

      setList(newList);
      setName("");
      showAlert(true, "success", "item updated");
      setEditId(null);
      setIsEditing(false);
    }else{
      showAlert(true, "success", "item added");
      const newItem = {id: new Date().getTime().toString(), title: name};
      setList([...list, newItem]);
      setName("");
    }
  }

  const editItem = (id) => {
    const specificItem = list.find((item) => item.id === id);
    setEditId(id);
    setIsEditing(true);
    setName(specificItem.title);
  }

  const deleteItem = (id) => {
    const newList = list.filter((item) => item.id !== id);
    setList(newList);
    showAlert(true, "danger", "item removed");
  }

  const clearList = () => {
    showAlert(true, "danger", "all items removed");
    setList([]);
  }

  const showAlert = (show=false, type="", msg="") => {
    setAlert({show, type, msg});
  }

  useEffect(() => {
    localStorage.setItem("list", JSON.stringify(list));
  }, [list]);

  return (
    <section className="section-center">
      <form className="grocery-form" onSubmit={handleSubmit}>
        {alert.show && <Alert {...alert} removeAlert={showAlert} list={list} />}
        <h3>grocery bud</h3>
        <div className="form-control">
          <input type="text" className='grocery' placeholder='e.g. fruits' value={name} onChange={(e) => setName(e.target.value)} />
          <button type="submit" className='submit-btn'>
            {isEditing ? 'edit' : 'submit'}
          </button>
        </div>
      </form>

      <div className="grocery-container">
        <List items={list} editItem={editItem} deleteItem={deleteItem} />
        <button className='clear-btn' onClick={clearList}>clear items</button>
      </div>
    </section>
  )
}

export default App
