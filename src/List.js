import React from 'react'
import { FaEdit, FaTrash } from 'react-icons/fa'
const List = ({ noiseMakers, removeName, editName }) => {
  return (
    <div className="grocery-list">
      {noiseMakers.map((noiseMaker) => {
        const {id, title} = noiseMaker;
        return(
            <article className="grocery-item" key={id}>
            <p className="title">{title}</p>
            <div className="btn-container">
              <button className="edit-btn" type="button" onClick={() => editName(id)} >
                <FaEdit />
              </button>
              <button className="delete-btn" type="button" onClick={() => removeName(id)} >
                <FaTrash />
              </button>
            </div>
          </article>
        )
      })}
    </div>
  )
}

export default List
